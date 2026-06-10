/**
 * AICADS PRO case study — abstract hero/backdrop placeholders (no product PNGs).
 */
import { DEMO_PALETTE as C } from './demoMediaPalette';
import { svgDataUri } from './svgDataUri';

function brandGradientHero(accent: string, label: string): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" fill="none">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${C.gray90}"/>
      <stop offset="45%" stop-color="${C.brandDeep}"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <text x="960" y="540" text-anchor="middle" font-family="system-ui,sans-serif" font-size="48" font-weight="600" fill="${C.white}" opacity="0.35">${label}</text>
</svg>`;
  return svgDataUri(svg);
}

function caseCardCover(label: string, accent: string): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" fill="none">
  <rect width="640" height="400" fill="${C.gray90}"/>
  <rect x="40" y="40" width="560" height="320" rx="24" fill="${accent}" opacity="0.85"/>
  <text x="320" y="210" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="600" fill="${C.white}">${label}</text>
</svg>`;
  return svgDataUri(svg);
}

export const aicadsCaseStudyHeroBackgrounds = {
  case: brandGradientHero(C.brandPrimary, 'Case study'),
  closing: brandGradientHero(C.violet50, 'AICADS PRO'),
};

export const aicadsCaseStudyCardImages = {
  'pattern-layer': caseCardCover('Pattern Layer', C.brandPrimary),
  'design-tokens': caseCardCover('Design tokens', C.brandDeep),
  'storybook-parity': caseCardCover('Storybook', C.violet50),
};

export const aicadsLoginBrandBackground = brandGradientHero(C.brandDeep, 'AICADS PRO');
