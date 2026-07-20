from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 960, 540
BG = "#0b1020"
PANEL = "#151c31"
PANEL_2 = "#1c2640"
TEXT = "#f4f7ff"
MUTED = "#9ba8c7"
BLUE = "#5b8cff"
CYAN = "#43d9c5"
GREEN = "#55d68b"
AMBER = "#f7c65c"
RED = "#ff6b81"

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "docs" / "media"
OUTPUT = OUTPUT_DIR / "project-starter-kit-demo.gif"


def load_font(size, bold=False):
    candidates = [
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


F12 = load_font(12)
F14 = load_font(14)
F16 = load_font(16)
F18 = load_font(18)
F22 = load_font(22, True)
F28 = load_font(28, True)
F36 = load_font(36, True)


def rounded(draw, box, fill, radius=14, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def label(draw, xy, text, font=F16, fill=TEXT):
    draw.text(xy, text, font=font, fill=fill)


def base(step, title, subtitle):
    image = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(image)
    rounded(draw, (24, 20, 936, 64), PANEL, 12)
    label(draw, (42, 31), "PROJECT STARTER KIT", F14, CYAN)
    label(draw, (770, 31), f"DEMO  {step}/8", F14, MUTED)
    rounded(draw, (778, 78, 928, 108), "#34243b", 14)
    label(draw, (796, 84), "DADOS FICTÍCIOS", F12, "#ffb4c0")
    label(draw, (40, 88), title, F28)
    label(draw, (40, 126), subtitle, F14, MUTED)
    return image, draw


def footer(draw, text):
    label(draw, (40, 510), text, F12, MUTED)


def scene_cover():
    image, draw = base(1, "Build software with AI,", "without losing control.")
    label(draw, (40, 190), "Briefing → arquitetura → specs → código → evidências", F22, TEXT)
    rounded(draw, (40, 248, 920, 388), PANEL, 18)
    cards = [
        ("Briefing", "1 fonte"),
        ("Specs", "18"),
        ("Rastreio", "ponta a ponta"),
        ("Agentes", "coordenados"),
    ]
    for index, (name, value) in enumerate(cards):
        x = 62 + index * 210
        rounded(draw, (x, 275, x + 178, 360), PANEL_2, 12)
        label(draw, (x + 16, 292), name, F14, MUTED)
        label(draw, (x + 16, 321), value, F22, CYAN if index != 1 else BLUE)
    footer(draw, "Uma demonstração de 20 segundos do fluxo automatizado")
    return image


def scene_briefing():
    image, draw = base(2, "1. Preencha o briefing", "Uma única entrada para requisitos, restrições e objetivos.")
    rounded(draw, (40, 170, 920, 482), PANEL, 16)
    label(draw, (62, 190), "PREENCHA_PRIMEIRO.md", F18, BLUE)
    lines = [
        ("Nome do projeto:", "Portal de Atendimento"),
        ("Resumo:", "Centralizar solicitações internas"),
        ("Tipo:", "sistema web"),
        ("Obrigatório:", "cadastro, filas, SLA e relatórios"),
        ("Plataforma:", "web / Windows"),
        ("Banco:", "PostgreSQL"),
    ]
    for index, (key, value) in enumerate(lines):
        y = 232 + index * 38
        label(draw, (70, y), key, F14, MUTED)
        rounded(draw, (220, y - 6, 885, y + 25), PANEL_2, 8)
        label(draw, (236, y), value, F14, TEXT)
    footer(draw, "O exemplo é fictício e não altera o briefing real do template")
    return image


def scene_command():
    image, draw = base(3, "2. Gere as visões", "Um comando transforma as fontes de verdade em artefatos navegáveis.")
    rounded(draw, (40, 188, 920, 410), "#090d17", 16, "#2d3959")
    rounded(draw, (40, 188, 920, 228), PANEL_2, 16)
    for index, color in enumerate([RED, AMBER, GREEN]):
        draw.ellipse((60 + index * 22, 202, 72 + index * 22, 214), fill=color)
    label(draw, (68, 264), "PS C:\\projetos\\portal-atendimento>", F14, MUTED)
    label(draw, (68, 306), "node _project-kit/scripts/generate-project-views.mjs", F18, TEXT)
    label(draw, (68, 352), "✓ Visões geradas: 6 arquivos", F16, GREEN)
    footer(draw, "Use --check no CI para detectar artefatos desatualizados")
    return image


def metric_card(draw, x, y, title, value, color=TEXT):
    rounded(draw, (x, y, x + 156, y + 92), PANEL_2, 12)
    label(draw, (x + 15, y + 15), title, F12, MUTED)
    label(draw, (x + 15, y + 43), value, F28, color)


def scene_dashboard():
    image, draw = base(4, "3. Dashboard automático", "O estado do projeto fica visível sem consolidar números manualmente.")
    rounded(draw, (40, 166, 920, 484), PANEL, 16)
    label(draw, (64, 187), "Portal de Atendimento", F18)
    label(draw, (690, 187), "60%", F28, CYAN)
    rounded(draw, (64, 230, 896, 250), PANEL_2, 10)
    rounded(draw, (64, 230, 563, 250), BLUE, 10)
    metrics = [
        ("Specs", "18", BLUE),
        ("Concluídas", "12", GREEN),
        ("Pendentes", "6", AMBER),
        ("Riscos", "3", RED),
        ("ADRs", "7", CYAN),
    ]
    for index, data in enumerate(metrics):
        metric_card(draw, 64 + index * 166, 280, *data)
    label(draw, (64, 398), "Open Decisions", F14, MUTED)
    label(draw, (64, 428), "2", F28, AMBER)
    footer(draw, "Indicadores derivados de specs, riscos, decisões e ADRs")
    return image


def scene_timeline():
    image, draw = base(5, "4. Linha do tempo", "Marcos reais aparecem na ordem em que foram registrados.")
    steps = [
        ("Briefing", "01 jul", BLUE),
        ("Arquitetura", "03 jul", CYAN),
        ("Sprint 1", "08 jul", GREEN),
        ("Sprint 2", "15 jul", GREEN),
        ("Release", "20 jul", AMBER),
    ]
    y = 300
    draw.line((100, y, 860, y), fill="#34415f", width=5)
    for index, (name, date, color) in enumerate(steps):
        x = 100 + index * 190
        draw.ellipse((x - 16, y - 16, x + 16, y + 16), fill=color)
        label(draw, (x - 48, y - 78), name, F16, TEXT)
        label(draw, (x - 28, y + 32), date, F12, MUTED)
    rounded(draw, (250, 398, 710, 452), PANEL, 12)
    label(draw, (273, 416), "ACTIVITY_LOG → timeline automática", F16, CYAN)
    footer(draw, "Etapas inexistentes não são inventadas pelo gerador")
    return image


def scene_dependencies():
    image, draw = base(6, "5. Dependências entre specs", "A ordem de execução e os bloqueios ficam evidentes.")
    nodes = [
        (110, 275, "SPEC-01", "Fundação", GREEN),
        (390, 275, "SPEC-04", "Autenticação", BLUE),
        (670, 275, "SPEC-08", "Dashboard", AMBER),
    ]
    for index in range(2):
        x1 = nodes[index][0] + 180
        x2 = nodes[index + 1][0]
        draw.line((x1, 320, x2, 320), fill=MUTED, width=4)
        draw.polygon([(x2, 320), (x2 - 14, 312), (x2 - 14, 328)], fill=MUTED)
        label(draw, ((x1 + x2) // 2 - 31, 286), "depende", F12, MUTED)
    for x, y, spec, name, color in nodes:
        rounded(draw, (x, y, x + 180, y + 92), PANEL_2, 14, color, 2)
        label(draw, (x + 18, y + 17), spec, F16, color)
        label(draw, (x + 18, y + 50), name, F14, TEXT)
    rounded(draw, (295, 410, 665, 454), "#173126", 10)
    label(draw, (326, 422), "✓ Nenhuma dependência circular", F14, GREEN)
    footer(draw, "O grafo é derivado da coluna “Depende de” do índice de specs")
    return image


def scene_traceability():
    image, draw = base(7, "6. Rastreabilidade ponta a ponta", "Responda rapidamente quais arquivos e testes nasceram de um requisito.")
    columns = [
        ("Requisito", "§5 SLA"),
        ("Feature", "F-006"),
        ("Spec", "SPEC-08"),
        ("Arquivos", "sla.ts"),
        ("Teste", "CA-02 ✓"),
        ("Commit", "a31f9c"),
        ("Release", "v1.2.0"),
    ]
    x = 42
    for index, (title, value) in enumerate(columns):
        width = 116 if index < 3 else 120
        rounded(draw, (x, 230, x + width, 342), PANEL_2, 12)
        label(draw, (x + 12, 248), title, F12, MUTED)
        label(draw, (x + 12, 292), value, F14, CYAN if index in [0, 6] else TEXT)
        if index < len(columns) - 1:
            label(draw, (x + width + 4, 278), "→", F22, BLUE)
        x += width + 14
    rounded(draw, (190, 392, 770, 452), PANEL, 12)
    label(draw, (216, 410), "“Esse requisito gerou quais arquivos?”  →  sla.ts", F16, TEXT)
    footer(draw, "Commit e PR permanecem opcionais para projetos locais")
    return image


def scene_release():
    image, draw = base(8, "7. Release notes prontas", "O histórico do produto e do próprio kit vira uma leitura compartilhável.")
    rounded(draw, (40, 170, 920, 475), PANEL, 16)
    label(draw, (64, 194), "Release v1.2.0 — 20 jul 2026", F22, CYAN)
    sections = [
        ("ADICIONADO", ["Dashboard de SLA", "Filtros por equipe", "Exportação CSV"], GREEN),
        ("ALTERADO", ["Fila priorizada por vencimento", "Rastreabilidade até a release"], BLUE),
        ("VALIDADO", ["18 specs · 42 testes · 0 bloqueios"], AMBER),
    ]
    y = 244
    for title, items, color in sections:
        label(draw, (68, y), title, F12, color)
        label(draw, (190, y), "  •  ".join(items), F14, TEXT)
        y += 58
    rounded(draw, (64, 414, 896, 452), "#173126", 10)
    label(draw, (84, 425), "✓ Briefing → código → testes → release, com evidência", F14, GREEN)
    footer(draw, "Project Starter Kit · Build software with AI, without losing control.")
    return image


def transition(first, second, frames=2):
    return [Image.blend(first, second, (index + 1) / (frames + 1)) for index in range(frames)]


scenes = [
    scene_cover(),
    scene_briefing(),
    scene_command(),
    scene_dashboard(),
    scene_timeline(),
    scene_dependencies(),
    scene_traceability(),
    scene_release(),
]
frames = []
durations = []
for index, scene in enumerate(scenes):
    frames.append(scene)
    durations.append(1800 if index not in (1, 6) else 2300)
    if index < len(scenes) - 1:
        blends = transition(scene, scenes[index + 1])
        frames.extend(blends)
        durations.extend([120] * len(blends))

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
palette_frames = [frame.quantize(colors=128, method=Image.Quantize.MEDIANCUT) for frame in frames]
palette_frames[0].save(
    OUTPUT,
    save_all=True,
    append_images=palette_frames[1:],
    duration=durations,
    loop=0,
    optimize=True,
    disposal=2,
)
print(f"GIF criado: {OUTPUT}")
