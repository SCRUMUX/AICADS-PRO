# Synaptik in a PRO product landing repo

Use this guide when your **product repository** installs `@ai-ds/core` and `@ai-ds/synaptik` from the same AICADS-PRO Git tag, generates raster marketing icons, and shows them in Storybook and blocks like `FeaturesBlock`.

## Install (same tag, two packages)

```bash
npm install git+https://github.com/SCRUMUX/AICADS-PRO.git#v0.7.6
npm install "github:SCRUMUX/AICADS-PRO#v0.7.6&path:modules/synaptik-icon-builder"
```

Alternative (npm 10+):

```bash
npm install "git+https://github.com/SCRUMUX/AICADS-PRO.git#v0.7.6:modules/synaptik-icon-builder"
```

`@ai-ds/synaptik` ships the **CLI only** (`dist/`, `synaptik` bin). The Playwright UI is not in the npm tarball — run it from a clone of AICADS-PRO or point `SYNAPTIK_WORKSPACE_ROOT` at your landing repo (see below).

## Bootstrap from template

Copy [`templates/consumer-pro/`](../templates/consumer-pro/) into your product repo root:

| Path | Purpose |
|------|---------|
| `synaptik.config.json` | From `synaptik.config.example.json` — `outputDir`, `projectSlug` |
| `src/assets/generated-icons/` | Published catalog (commit after publish) |
| `.storybook/main.mjs` | `createMainConfig({ mode: 'consumer', generatedIconsDir: 'src/assets/generated-icons' })` |
| `src/stories/FeaturesBlockSynaptik.stories.tsx` | Example block + `generatedIcons` |

See also `docs/SYNAPTIK.md` in the template (copy into your repo).

## Configuration

**`synaptik.config.json`** (product root):

```json
{
  "outputDir": "src/assets/generated-icons",
  "projectSlug": "my-product",
  "iconSetStyleId": "isometric"
}
```

**`.env`** in the **product root** (not only in AICADS-PRO clone):

```
FAL_KEY=...
OPENAI_API_KEY=...   # or Anthropic for vision
```

Synaptik reads `.env` from the workspace root first (`getWorkspaceRoot()`), then falls back to the monorepo root when developing inside AICADS-PRO.

## Workflow

1. **Generate** — `npx synaptik run --url https://your-site --icon-style isometric`  
   Sessions live under `.synaptik/` (gitignored).
2. **Review** — CLI or UI. For UI from monorepo clone:  
   `SYNAPTIK_WORKSPACE_ROOT=/path/to/your-landing npm run synaptik:ui` (see [synaptik-icon-builder.md](./synaptik-icon-builder.md)).
3. **Publish** — `npx synaptik publish --session <id> --card <cardId> --approve`  
   Writes PNG/WebP + `icons.manifest.ts` + `Icons.stories.tsx` under  
   `src/assets/generated-icons/{projectSlug}/`.
4. **Sync stories** — `npx synaptik check` or `npx synaptik check --fix-stories`.
5. **Storybook** — `npm run storybook` → **Generated Icons → Synaptik guide** and **Generated Icons / {projectSlug}**.
6. **App** — pass `generatedIcons={iconsBySlug}` and `iconSlug` on feature items (see template story).
7. **Git** — commit `src/assets/generated-icons/`; do **not** commit `.synaptik/`.

## Storybook prep

If your project has `synaptik.config.json` and `@ai-ds/synaptik` installed, `storybook-prep` (via `@ai-ds/core/scripts/storybook-prep.mjs`) runs `synaptik check --fix-stories` before dev/build and prunes orphan folders under `outputDir`.

## Scripts (recommended)

```json
{
  "scripts": {
    "storybook": "node node_modules/@ai-ds/core/scripts/storybook-dev.mjs .",
    "build-storybook": "storybook build",
    "synaptik": "synaptik",
    "synaptik:check": "synaptik check",
    "synaptik:fix-stories": "synaptik check --fix-stories"
  }
}
```

## CLI vs UI

| Tool | Install | Use when |
|------|---------|----------|
| `@ai-ds/synaptik` | Git path above | CI, publish, check, headless run |
| Synaptik UI | Clone AICADS-PRO + `modules/synaptik-icon-builder/ui` | Visual review, batch publish |

## Related docs

- [synaptik-icon-builder.md](./synaptik-icon-builder.md) — pipeline, env, monorepo contributors
- [storybook-parity.md](./storybook-parity.md) — Checklist D (consumer generated icons)
- [getting-started.md](./getting-started.md) — core install + link here
