from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

from PIL import Image, ImageDraw

from split_character_sheet import split_sheet


class SplitCharacterSheetTest(unittest.TestCase):
    def test_splits_and_names_grid_cells_in_reading_order(self):
        names = [
            "colg",
            "colw",
            "copg",
            "copw",
            "calg",
            "calw",
            "capg",
            "capw",
        ]

        with TemporaryDirectory() as tmp_dir:
            tmp_path = Path(tmp_dir)
            source = tmp_path / "sheet-a.png"
            output_dir = tmp_path / "out"

            image = Image.new("RGB", (800, 600), "white")
            draw = ImageDraw.Draw(image)

            rectangles = [
                (40, 40, 140, 220),
                (240, 40, 340, 220),
                (440, 40, 540, 220),
                (640, 40, 740, 220),
                (40, 320, 140, 520),
                (240, 320, 340, 520),
                (440, 320, 540, 520),
                (640, 320, 740, 520),
            ]

            colors = [
                "#0f766e",
                "#166534",
                "#a21caf",
                "#475569",
                "#14b8a6",
                "#1d4ed8",
                "#f97316",
                "#6b7280",
            ]

            for rect, color in zip(rectangles, colors):
                draw.rectangle(rect, fill=color)

            image.save(source)

            written = split_sheet(
                image_path=source,
                output_dir=output_dir,
                names=names,
                canvas_size=256,
                threshold=245,
                min_component_pixels=1000,
                padding=12,
            )

            self.assertEqual([path.stem for path in written], names)
            self.assertTrue(all(path.exists() for path in written))

            sample = Image.open(written[0])
            self.assertEqual(sample.size, (256, 256))
            self.assertEqual(sample.mode, "RGBA")
            self.assertEqual(sample.getpixel((0, 0))[3], 0)


if __name__ == "__main__":
    unittest.main()
