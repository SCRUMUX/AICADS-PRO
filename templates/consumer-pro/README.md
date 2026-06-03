# AICADS PRO + Synaptik starter

Copy this folder into your **product landing repo** (alongside your app source) to get:

- Full `@ai-ds/core` Storybook catalog (consumer mode)
- **Generated Icons** section with Synaptik guide story
- `src/assets/generated-icons/` catalog layout
- `synaptik.config.json` for CLI output paths

## Quick start

```bash
# 1. Install design system + Synaptik (same git tag)
npm install git+https://github.com/SCRUMUX/AICADS-PRO.git#v0.7.6
npm install "github:SCRUMUX/AICADS-PRO#v0.7.6&path:modules/synaptik-icon-builder"

# 2. Copy template files into your repo root
#    .storybook/, src/, tailwind.config.cjs, postcss.config.cjs, tsconfig.json
#    synaptik.config.example.json → synaptik.config.json

# 3. Storybook toolchain (see package.json.template devDependencies)
npm install -D storybook@8.6.18 @storybook/react-vite@8.6.18 tailwindcss@3.4.16 ...

# 4. .env in product root (FAL_KEY, OPENAI_API_KEY, …)

# 5. Generate & publish icons
npx synaptik run --url https://your-site --icon-style isometric
npx synaptik publish --session <id> --card <cardId> --approve
# or use UI — see docs/SYNAPTIK.md

# 6. Storybook
npm run storybook
```

## Monorepo CI fixture

`fixture/` is used by AICADS-PRO CI (`npm run storybook:consumer-pro`) with `file:` links to the monorepo.

## Docs

- In your product repo after copy: `docs/SYNAPTIK.md`
- In AICADS-PRO: [docs/synaptik-pro-project.md](../../docs/synaptik-pro-project.md)
