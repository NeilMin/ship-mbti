from __future__ import annotations

import argparse
from collections import deque
from pathlib import Path
from typing import Iterable

from PIL import Image

if hasattr(Image, "Resampling"):
    RESAMPLING_LANCZOS = Image.Resampling.LANCZOS
else:
    RESAMPLING_LANCZOS = Image.LANCZOS


SHEET_NAMES = {
    "sheet-a": [
        "colg",
        "colw",
        "copg",
        "copw",
        "calg",
        "calw",
        "capg",
        "capw",
    ],
    "sheet-b": [
        "tolg",
        "tolw",
        "topg",
        "topw",
        "talg",
        "talw",
        "tapg",
        "tapw",
    ],
}


def is_foreground(pixel: tuple[int, int, int], threshold: int) -> bool:
    return any(channel < threshold for channel in pixel[:3])


def find_components(image: Image.Image, threshold: int, min_component_pixels: int) -> list[tuple[int, int, int, int]]:
    rgb_image = image.convert("RGB")
    width, height = rgb_image.size
    pixels = rgb_image.load()
    visited: set[tuple[int, int]] = set()
    boxes: list[tuple[int, int, int, int]] = []

    for y in range(height):
        for x in range(width):
            if (x, y) in visited or not is_foreground(pixels[x, y], threshold):
                continue

            queue = deque([(x, y)])
            visited.add((x, y))
            min_x = max_x = x
            min_y = max_y = y
            count = 0

            while queue:
                current_x, current_y = queue.popleft()
                count += 1
                min_x = min(min_x, current_x)
                max_x = max(max_x, current_x)
                min_y = min(min_y, current_y)
                max_y = max(max_y, current_y)

                for next_x, next_y in (
                    (current_x + 1, current_y),
                    (current_x - 1, current_y),
                    (current_x, current_y + 1),
                    (current_x, current_y - 1),
                ):
                    if (
                        next_x < 0
                        or next_x >= width
                        or next_y < 0
                        or next_y >= height
                        or (next_x, next_y) in visited
                    ):
                        continue

                    visited.add((next_x, next_y))
                    if is_foreground(pixels[next_x, next_y], threshold):
                        queue.append((next_x, next_y))

            if count >= min_component_pixels:
                boxes.append((min_x, min_y, max_x + 1, max_y + 1))

    return boxes


def sort_boxes(boxes: Iterable[tuple[int, int, int, int]]) -> list[tuple[int, int, int, int]]:
    box_list = list(boxes)
    if not box_list:
        return []

    heights = sorted(box[3] - box[1] for box in box_list)
    row_tolerance = max(20, heights[len(heights) // 2] // 2)

    ordered = sorted(box_list, key=lambda box: (box[1], box[0]))
    rows: list[list[tuple[int, int, int, int]]] = []

    for box in ordered:
        center_y = (box[1] + box[3]) / 2
        placed = False
        for row in rows:
            row_center = sum((item[1] + item[3]) / 2 for item in row) / len(row)
            if abs(center_y - row_center) <= row_tolerance:
                row.append(box)
                placed = True
                break
        if not placed:
            rows.append([box])

    rows.sort(key=lambda row: min(box[1] for box in row))

    result: list[tuple[int, int, int, int]] = []
    for row in rows:
        row.sort(key=lambda box: box[0])
        result.extend(row)

    return result


def crop_to_canvas(
    image: Image.Image,
    box: tuple[int, int, int, int],
    canvas_size: int,
    padding: int,
    threshold: int,
) -> Image.Image:
    left, top, right, bottom = box
    crop = image.crop((left, top, right, bottom)).convert("RGBA")
    pixels = crop.load()

    for y in range(crop.height):
        for x in range(crop.width):
            red, green, blue, alpha = pixels[x, y]
            if alpha == 0:
                continue
            if red >= threshold and green >= threshold and blue >= threshold:
                pixels[x, y] = (255, 255, 255, 0)

    canvas = Image.new("RGBA", (canvas_size, canvas_size), (255, 255, 255, 0))
    inner_size = canvas_size - padding * 2
    scale = min(inner_size / crop.width, inner_size / crop.height)
    resized = crop.resize(
        (max(1, int(crop.width * scale)), max(1, int(crop.height * scale))),
        RESAMPLING_LANCZOS,
    )

    offset_x = (canvas_size - resized.width) // 2
    offset_y = (canvas_size - resized.height) // 2
    canvas.alpha_composite(resized, (offset_x, offset_y))
    return canvas


def split_sheet(
    image_path: Path,
    output_dir: Path,
    names: list[str],
    canvas_size: int,
    threshold: int,
    min_component_pixels: int,
    padding: int,
) -> list[Path]:
    image = Image.open(image_path)
    boxes = sort_boxes(find_components(image, threshold, min_component_pixels))

    if len(boxes) != len(names):
        raise ValueError(
            f"{image_path.name}: expected {len(names)} characters, found {len(boxes)} components"
        )

    output_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []

    for box, name in zip(boxes, names):
        canvas = crop_to_canvas(
            image,
            box,
            canvas_size=canvas_size,
            padding=padding,
            threshold=threshold,
        )
        target = output_dir / f"{name}.png"
        canvas.save(target)
        written.append(target)

    return written


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Split a character reference sheet into named PNG files.")
    parser.add_argument(
        "--input-dir",
        type=Path,
        default=Path("artwork/character-sheets"),
        help="Directory containing raw sheet images.",
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("public/characters"),
        help="Directory for cropped character PNG files.",
    )
    parser.add_argument(
        "--canvas-size",
        type=int,
        default=768,
        help="Output square canvas size for each character PNG.",
    )
    parser.add_argument(
        "--threshold",
        type=int,
        default=245,
        help="White-background threshold. Lower values are stricter.",
    )
    parser.add_argument(
        "--min-component-pixels",
        type=int,
        default=5000,
        help="Minimum connected-component size to keep as a character.",
    )
    parser.add_argument(
        "--padding",
        type=int,
        default=36,
        help="Transparent padding inside each output canvas.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    for sheet_name, names in SHEET_NAMES.items():
        source = args.input_dir / f"{sheet_name}.png"
        if not source.exists():
            raise FileNotFoundError(
                f"Missing sheet image: {source}. Put your exported image there and use the exact filename."
            )

        split_sheet(
            image_path=source,
            output_dir=args.output_dir,
            names=names,
            canvas_size=args.canvas_size,
            threshold=args.threshold,
            min_component_pixels=args.min_component_pixels,
            padding=args.padding,
        )

        print(f"Processed {source.name} -> {len(names)} characters")


if __name__ == "__main__":
    main()
