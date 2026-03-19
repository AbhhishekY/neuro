# Local skills

Skills stored in this project for offline and AI context use.

## ui-ux-pro-max-skill

**Source:** [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (fetched and stored locally).

**Location:** `skills/ui-ux-pro-max-skill/`

**Contents:**
- **`.claude/skills/ui-ux-pro-max/SKILL.md`** — Main UI/UX design intelligence skill (when to use, rule categories, quick reference, how to run scripts).
- **`src/ui-ux-pro-max/scripts/`** — Python search and design-system generator:
  - `search.py` — CLI: domain search, `--design-system`, `--persist`, `--page`
  - `core.py` — BM25 search, CSV config, data path `../data`
  - `design_system.py` — Design system generator and persistence (Master + page overrides)
- **`src/ui-ux-pro-max/data/`** — CSV data directory (see `data/README.md`; copy CSVs from upstream repo for full behavior).
- **`README.md`** — How to run from project root and from scripts dir.
- **`LICENSE`** — MIT.

**Run design-system (after adding CSV data):**
```bash
cd skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts
python search.py "healthcare mental wellness" --design-system -p "NeuroBright"
```

**Use in Cursor:** Reference `skills/ui-ux-pro-max-skill/.claude/skills/ui-ux-pro-max/SKILL.md` when doing UI/UX work so the agent follows the rule categories and checklist.
