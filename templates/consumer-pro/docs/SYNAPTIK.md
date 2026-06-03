# Synaptik (product landing)

Raster AI icons for this repo. SVG primitives stay in `@ai-ds/core/icons`.

## Install

```bash
npm install git+https://github.com/SCRUMUX/AICADS-PRO.git#v0.7.6
npm install "github:SCRUMUX/AICADS-PRO#v0.7.6&path:modules/synaptik-icon-builder"
```

## Config

1. Copy `synaptik.config.example.json` → `synaptik.config.json`.
2. Add `.env` in **this repo root**: `FAL_KEY`, vision API key.

Default publish path: `src/assets/generated-icons/{projectSlug}/`.

## Commands

```bash
npx synaptik run --url https://your-site
npx synaptik publish --session <id> --card <cardId> --approve
npx synaptik check
npx synaptik check --fix-stories
```

## Storybook

- Sidebar: **Generated Icons → Synaptik guide**
- After publish: **Generated Icons / {projectSlug}**
- Example block: **Blocks/Marketing/FeaturesBlock/Synaptik**

Run `npm run storybook` (see root `package.json` / template README).

## Git

- Commit: `src/assets/generated-icons/`
- Ignore: `.synaptik/`

## UI (optional)

Clone [AICADS-PRO](https://github.com/SCRUMUX/AICADS-PRO), then:

```bash
SYNAPTIK_WORKSPACE_ROOT=/absolute/path/to/this-repo npm run synaptik:ui
```

(from the monorepo root, or follow `modules/synaptik-icon-builder` README).

Full guide in AICADS-PRO: `docs/synaptik-pro-project.md`.
