# AICADS ecosystem map

One-page guide: which folder is which, and what to open in Cursor.

## Rule of thumb

> Develop the design system in **AICADS-PRO**. Build products in **child repos** (e.g. damiat-landing). Promote reusable blocks upstream via PR to AICADS-PRO.

## Repositories

| Role | GitHub | Local folder | Package | Open when |
|------|--------|--------------|---------|-----------|
| **Parent (DS)** | [SCRUMUX/AICADS-PRO](https://github.com/SCRUMUX/AICADS-PRO) | `AICADS-publish` (rename to `AICADS-PRO` optional) | `@ai-ds/core` | Primitives, marketing blocks, Synaptik, Storybook catalog |
| **Child (Damiat)** | [SCRUMUX/damiat-landing](https://github.com/SCRUMUX/damiat-landing) | `DAMIAT/damiat-landing` | `damiat-landing-site` | Product landing, brand, API, Damiat-only pages |
| **Legacy (read-only)** | SCRUMUX/AICADS- | — | — | History only; do not develop here |
| **Archive** | — | `AICA DS`, `Sinaptic DS` | — | Old Figma snapshot / PDF docs; not active code |

## What lives in AICADS-PRO

```
@ai-ds/core
├── components/primitives/     # 57+ UI primitives
├── blocks/marketing/          # Reusable marketing sections + page templates
├── modules/synaptik-icon-builder/  # @ai-ds/synaptik CLI
├── generated-icons/           # Example Synaptik catalog (monorepo)
├── storybook/                 # Shared Storybook kit
├── playground/                # Local Storybook (port 6006)
└── templates/
    ├── consumer-storybook/    # Child: full primitive + block catalog
    └── consumer-pro/          # Child: landing + Synaptik raster icons
```

## Commands

### Parent (design system)

```bash
cd AICADS-publish
npm ci && cd playground && npm ci && cd ..
npm run storybook          # http://localhost:6006
npm run lint
npm run build-storybook
```

### Child (Damiat product)

```bash
cd DAMIAT/damiat-landing/site
npm install
npm run dev
```

### Synaptik icons for a child project

Run Synaptik UI from AICADS-PRO clone with workspace pointed at the child repo:

```bash
# In AICADS-publish
SYNAPTIK_WORKSPACE_ROOT=/path/to/damiat-landing npm run synaptik:ui
```

## Do not use

| Path | Why |
|------|-----|
| `DAMIAT/DAMIAT` | Full AICADS fork (~95% duplicate). Retired — use AICADS-PRO + damiat-landing only. |
| `damiat-landing/core/` | Vendored DS subset — being replaced by `npm install @ai-ds/core` from git tag. |
| `AICA DS` | Superseded by `figma-plugin/` in AICADS-PRO. |
| `Sinaptic DS` | Documentation PDFs only; code is in `modules/synaptik-icon-builder`. |

## Naming cheat sheet

| Name you see | Same thing |
|--------------|------------|
| AICADS PRO | Product brand for the monorepo |
| AICADS-PRO | GitHub repo name |
| AICADS-publish | Local clone folder name |
| @ai-ds/core | npm package inside the repo |
| Damiat | Product brand; not a design-system repo |

## Related docs

- [Getting started](./getting-started.md) — clone, install, Storybook
- [Block promotion](./block-promotion.md) — move a block from child to parent
- [Storybook parity](./storybook-parity.md) — monorepo vs consumer Storybook
- [Synaptik PRO project](./synaptik-pro-project.md) — child repo + raster icons
