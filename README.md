# Black Spider — Marketing Agency Platform

A workspace-managed web platform (`black-spider`) for a marketing agency, featuring a design-system-driven UI extracted from Stitch (`stitch_source/`, `screens_list.json`, `tailwind_theme_dashboard.json`) and a core application under `spider/`.

## Executive Summary & Purpose
`spider-marketingagencyplateform` is built to power a digital marketing agency's client-facing presence and internal dashboard. Design tokens and screen specifications are tracked alongside the `spider/` application package.

## Architecture & Tech Stack
- **Workspace**: npm prefix workspace (`spider/`)
- **Design System**: Extracted Tailwind theme configurations (`tailwind_config_extracted.json`, `tailwind_theme_clean.json`, `tailwind_theme_dashboard.json`)

## Project Structure
```text
├── spider/                         # Core application package
├── stitch_source/                  # Stitch design source exports
├── screens_list.json               # Screen inventory
├── tailwind_config_extracted.json  # Extracted Tailwind config
├── tailwind_theme_clean.json       # Clean theme tokens
├── tailwind_theme_dashboard.json   # Dashboard theme tokens
└── package.json                    # Root workspace scripts
```

## Getting Started

```bash
git clone https://github.com/islamsamyy/spider-marketingagencyplateform.git
cd spider-marketingagencyplateform
npm --prefix spider install
```

### Available Scripts
| Command | Description |
| :--- | :--- |
| `npm run dev` | Start the `spider` development server |
| `npm run build` | Build the `spider` production bundle |
| `npm run start` | Start the `spider` production server |
| `npm run lint` | Run linter in `spider` |
| `npm test` | Run test suite in `spider` |
