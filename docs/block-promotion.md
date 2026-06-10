# Block promotion — child repo → AICADS-PRO

How to move a successful block from a product repository (e.g. `damiat-landing`) into the canonical design system (`SCRUMUX/AICADS-PRO`).

## When to promote

Promote upstream when **all** are true:

- The block is reusable across products (no brand name, no product API, no hard-coded URLs).
- It composes only `@ai-ds/core` primitives and tokens (no direct Radix/cmdk/vaul/sonner).
- It has (or will have) a Storybook story and an entry in `ai-patterns.json`.

Keep in the child repo when:

- The block is a full page template for one product (`DamiatLandingPage`, branded login).
- Fixtures reference product copy, images, or backend APIs.
- The block is an experiment not yet validated in production.

## Promotion checklist

1. **Extract** — copy the component folder from the child repo into `blocks/marketing/<Name>/` in AICADS-PRO.
2. **Generalize** — remove product props, rename `Damiat*` → neutral names, replace fixtures with `aicadsPro*Fixtures`.
3. **Wire exports** — add to [`blocks/index.ts`](../blocks/index.ts) and [`package.json`](../package.json) `"./blocks/<Name>"` if needed.
4. **Demo content** — add `aicadsPro*Fixtures.ts` with AICADS-themed copy; put images in `blocks/marketing/demo-assets/`.
5. **Storybook** — add `<Name>.stories.tsx` under `Blocks/Marketing/` or `Screens/AICADS PRO …`.
6. **Patterns** — register in [`ai-patterns.json`](../ai-patterns.json); run `npm run patterns:check`.
7. **Tokens** — no hardcoded colors/spacing; run `npm run lint` (blocks are ESLint-covered).
8. **CI** — `npm run storybook:build`, `npm run storybook:consumer`, `npm run storybook:consumer-pro`.
9. **Release** — tag `v0.7.x` on AICADS-PRO.
10. **Child update** — in the product repo: `npm install git+https://github.com/SCRUMUX/AICADS-PRO.git#v0.7.x` and delete the local duplicate.

## Sync direction (downstream)

Child projects **never** copy folders from AICADS-PRO by hand. Update the git tag:

```bash
npm install git+https://github.com/SCRUMUX/AICADS-PRO.git#v0.7.7
```

Use [`templates/consumer-storybook/`](../templates/consumer-storybook/) or [`templates/consumer-pro/`](../templates/consumer-pro/) as the starting layout for new products.

## Example: Login / Case / Admin (completed)

Damiat-branded pages (`DamiatLoginPage`, `DamiatCaseDetailPage`, `DamiatAdminPage`) stay in `damiat-landing/product/`.

Generic equivalents already live in AICADS-PRO:

| Product (Damiat) | AICADS-PRO (reusable) |
|------------------|----------------------|
| `DamiatLoginPage` | `LoginPageTemplate` + `LoginBlock` |
| `DamiatCaseStudiesBlock` | `CaseStudiesBlock` |
| `DamiatCaseDetailPage` | `CaseDetailPageTemplate` |
| `DamiatAdminPage` | `AdminPageTemplate` |

Fixtures: `aicadsProLoginFixtures`, `aicadsProCaseStudiesFixtures`, `aicadsProCaseDetailFixtures`, `aicadsProAdminFixtures`.

## Related

- [Ecosystem map](./ecosystem-map.md)
- [Pattern layer](./pattern-layer.md)
- [Storybook parity](./storybook-parity.md)
