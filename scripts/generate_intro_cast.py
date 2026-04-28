from pathlib import Path
from PIL import Image

ROOT = Path('/Users/neil/Documents/ship-mbti')
CHAR_DIR = ROOT / 'public' / 'characters'
OUT = ROOT / 'public' / 'hero' / 'intro-cast.png'

codes = ['colg', 'capw', 'tolg', 'talw']
canvas_w, canvas_h = 1100, 820
card_w, card_h = 360, 290
scale = 0.44
positions = [
    (95, 45),   # top-left
    (645, 45),  # top-right
    (95, 425),  # bottom-left
    (645, 425), # bottom-right
]

canvas = Image.new('RGBA', (canvas_w, canvas_h), (255, 255, 255, 0))

for code, (cell_x, cell_y) in zip(codes, positions):
    image = Image.open(CHAR_DIR / f'{code}.png').convert('RGBA')
    new_size = (int(image.width * scale), int(image.height * scale))
    resized = image.resize(new_size, Image.LANCZOS)
    x = cell_x + (card_w - resized.width) // 2
    y = cell_y + (card_h - resized.height) // 2
    canvas.alpha_composite(resized, (x, y))

OUT.parent.mkdir(parents=True, exist_ok=True)
canvas.save(OUT)
print(f'Wrote {OUT}')
