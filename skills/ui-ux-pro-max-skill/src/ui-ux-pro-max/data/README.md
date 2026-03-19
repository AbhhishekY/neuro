# UI UX Pro Max – Data (CSV)

The search and design-system scripts expect CSV files in this directory.

## Get full data

This local copy does not include the full CSV set (they are large). To get them:

1. **Clone the repo** (recommended). From project root, in PowerShell:
   ```powershell
   git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git _tmp_uipro
   Copy-Item _tmp_uipro\src\ui-ux-pro-max\data\*.csv .\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\data\
   Copy-Item -Recurse _tmp_uipro\src\ui-ux-pro-max\data\stacks .\skills\ui-ux-pro-max-skill\src\ui-ux-pro-max\data\
   Remove-Item -Recurse -Force _tmp_uipro
   ```

2. **Or download raw files** from:
   - https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/main/src/ui-ux-pro-max/data

## Expected files

| File | Purpose |
|------|---------|
| `products.csv` | Product types → style/landing/color hints |
| `styles.csv` | UI styles (glassmorphism, minimal, etc.) |
| `colors.csv` | Color palettes by product type |
| `typography.csv` | Font pairings |
| `landing.csv` | Landing page patterns |
| `ux-guidelines.csv` | UX do/don’t |
| `ui-reasoning.csv` | Reasoning rules for design-system generator |
| `charts.csv` | Chart type recommendations |
| `app-interface.csv` | App interface guidelines |
| `icons.csv` | Icon recommendations |
| `react-performance.csv` | React performance |
| `google-fonts.csv` | Google Fonts metadata (optional, large) |
| `stacks/react-native.csv` | React Native stack guidelines |

Once these are in place, from the **scripts** directory run:

```bash
python search.py "healthcare mental" --design-system -p "MyApp"
```
