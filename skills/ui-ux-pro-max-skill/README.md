# UI UX Pro Max Skill (local copy)

Local mirror of [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill). Fetched and stored for offline use and Cursor/AI context.

## Layout

- **`.claude/skills/`** — Skill definitions (SKILL.md) for Claude/Cursor. Main entry: `ui-ux-pro-max/SKILL.md`.
- **`src/ui-ux-pro-max/`** — Source of truth:
  - **`data/`** — CSV databases (products, styles, colors, typography, landing, ux, charts, etc.).
  - **`scripts/`** — Python search and design-system generator (`search.py`, `core.py`, `design_system.py`).
  - **`templates/`** — Platform-specific templates (base, platforms).

## Run design-system search (from project repo root)

Python 3 required. Run from the **scripts** directory so imports and data paths resolve:

```bash
cd skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts
python search.py "healthcare mental wellness" --design-system -p "MyApp"
```

Or from repo root with module run:

```bash
cd skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts
python -m search "beauty spa" --design-system -p "Serenity Spa"
```

Domain search:

```bash
python search.py "minimalism dark mode" --domain style -n 5
```

## Skills included

| Skill            | Path                           | Purpose                          |
|------------------|--------------------------------|----------------------------------|
| ui-ux-pro-max    | `.claude/skills/ui-ux-pro-max/`| Main UI/UX design intelligence   |
| banner-design    | (see repo)                    | Banner sizes and styles          |
| brand            | (see repo)                    | Brand guidelines, assets         |
| design-system    | (see repo)                    | Tokens, components, slides       |
| design           | (see repo)                    | CIP, icon, logo, slides          |
| slides           | (see repo)                    | Slide strategies, copy           |
| ui-styling       | (see repo)                    | Tailwind, shadcn, canvas fonts   |

This copy focuses on **ui-ux-pro-max** (SKILL + data + scripts). Other skills’ SKILL.md and key references can be added under `.claude/skills/<name>/`.

## License

MIT. See [LICENSE](LICENSE). Original repo: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.
