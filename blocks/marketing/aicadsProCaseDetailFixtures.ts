/**
 * AICADS PRO case detail page — fixtures for Pattern Layer rollout (Cortel long-read layout).
 */
import type { NavbarBlockProps } from './NavbarBlock';
import type { HeroBlockProps } from './HeroBlock';
import type { SolutionsBlockProps, SolutionItem } from './SolutionsBlock';
import type { FooterBlockProps } from './FooterBlock';
import type { ContactHeroBlockProps } from './ContactHeroBlock';
import type { CaseStudyIntroBlockProps } from './CaseStudyIntroBlock';
import type { CaseStudyInlineStatsBlockProps } from './CaseStudyInlineStatsBlock';
import type { CaseStudyImplementedBlockProps } from './CaseStudyImplementedBlock';
import type { CaseStudySectionsBlockProps } from './CaseStudySectionsBlock';
import type { CaseStudyAnchorNavProps } from './CaseStudyAnchorNav';
import type { CaseDetailPageTemplateProps } from './CaseDetailPageTemplate/CaseDetailPageTemplate';
import type { CaseStudyItem } from './CaseStudiesBlock';
import { aicadsProNavbarFixture } from './NavbarBlock/navbarBlock.fixtures';
import {
  aicadsContactHeroDemoContent,
  aicadsEnterpriseFooterDemo,
} from './marketingDemoContent';
import { aicadsProCaseStudiesContent } from './aicadsProCaseStudiesFixtures';

const CURRENT_CASE_ID = 'pattern-layer';

function mapCaseToSolutionItem(caseItem: CaseStudyItem): SolutionItem {
  const parts = caseItem.meta.split(' · ');
  const date = parts[1]?.trim() ?? '';
  const category = parts[0]?.trim() ?? 'Case study';
  const savedMetric = caseItem.stats[2];
  const effect = caseItem.stats[3];

  return {
    id: caseItem.id,
    category,
    title: caseItem.title,
    description: savedMetric ? `${savedMetric.value} ${savedMetric.label}` : caseItem.meta,
    highlights: effect ? [`${effect.value} ${effect.label}`] : undefined,
    client: caseItem.title,
    date,
    href: caseItem.href ?? '#case',
    imageSrc: caseItem.imageSrc,
    imageAlt: caseItem.imageAlt,
  };
}

export const aicadsProCaseDetailNavbar: NavbarBlockProps = {
  ...aicadsProNavbarFixture,
};

export const aicadsProCaseDetailHero: HeroBlockProps = {
  variant: 'page',
  appearance: 'brand',
  breadcrumbs: [
    { label: 'Home', href: '#' },
    { label: 'Case studies', href: '#cases' },
    { label: 'Pattern Layer rollout' },
  ],
  title: 'Pattern Layer rollout — composable blocks for AI page assembly',
};

export const aicadsProCaseDetailIntro: CaseStudyIntroBlockProps = {
  leadParagraphs: [
    'A product team needed a single source for marketing sections, console shells, and spacing recipes — without consumer apps importing Radix, cmdk, or sonner directly.',
  ],
  highlights: [
    { label: 'Blocks catalog', value: '24+ sections' },
    { label: 'Recipes', value: 'section.* rhythm' },
  ],
  trailParagraphs: [
    'They adopted AICADS PRO pattern blocks, wired Storybook parity for consumer installs, and documented every section in ai-patterns.json for AI assemblers.',
  ],
};

export const aicadsProCaseDetailAnchorNav: Pick<CaseStudyAnchorNavProps, 'items'> = {
  items: [
    { id: 'case-business-results', label: 'Outcomes' },
    { id: 'case-implemented', label: 'What shipped' },
    { id: 'case-why', label: 'Why it mattered' },
    { id: 'case-approach', label: 'Approach' },
    { id: 'case-delivered', label: 'Deliverables' },
    { id: 'case-result', label: 'Result' },
  ],
};

export const aicadsProCaseDetailBusinessResults: CaseStudyInlineStatsBlockProps = {
  sectionId: 'case-business-results',
  title: 'Outcomes',
  stats: [
    {
      value: '−40%',
      label: 'layout rework after switching to pattern blocks',
    },
    {
      value: '2×',
      label: 'faster Storybook parity for new consumer repos',
    },
  ],
};

export const aicadsProCaseDetailImplemented: CaseStudyImplementedBlockProps = {
  sectionId: 'case-implemented',
  title: 'What shipped',
  intro: 'The team rolled out the AICADS pattern layer across marketing and console surfaces:',
  items: [
    'HeroBlock + LandingPageTemplate',
    'AppShellBlock + admin workspaces',
    'Case study long-read blocks',
    'Login split-screen console',
    'ai-patterns.json + ESLint isolation rules',
    'Consumer Storybook template',
  ],
};

export const aicadsProCaseDetailNarrative: CaseStudySectionsBlockProps = {
  sections: [
    {
      id: 'case-why',
      title: 'Why it mattered',
      paragraphs: [
        'Hand-rolled section spacing drifted between Storybook, Figma, and production. AI page generators improvised layout instead of importing blocks from the catalog.',
        'The team wanted one semantic API, one token pipeline, and distributable blocks that consumer apps could install from npm/git tags.',
      ],
      quote: {
        text: 'We needed assemblers to pick a pattern id and import a block — not rebuild hero grids from raw divs.',
        attribution: 'Design systems lead',
      },
    },
    {
      id: 'case-approach',
      title: 'Approach',
      paragraphs: [
        'They mapped every marketing section to a spacing recipe, wrapped content in SectionShell, and registered blocks in ai-patterns.json with Storybook references.',
        'Console surfaces (login, app shell, admin) followed the same contract — primitives only through @ai-ds/core/components.',
      ],
    },
    {
      id: 'case-delivered',
      title: 'Deliverables',
      bullets: [
        'Pattern manifest with page templates',
        'Block-level Storybook coverage',
        'Consumer install path via git tags',
        'Engine isolation enforced by ESLint',
      ],
    },
    {
      id: 'case-result',
      title: 'Result',
      paragraphs: [
        'New landing and console screens assemble from documented blocks. Consumer teams inherit the same Storybook catalog after npm install, and AI tools reference fixture payloads instead of inventing spacing.',
      ],
    },
  ],
};

export const aicadsProCaseDetailRelatedProjects: Extract<SolutionsBlockProps, { variant: 'grid' }> = {
  variant: 'grid',
  title: 'More customer stories',
  solutions: aicadsProCaseStudiesContent.cases
    .filter((caseItem) => caseItem.id !== CURRENT_CASE_ID)
    .map(mapCaseToSolutionItem),
  viewAll: { label: 'All stories', href: '#cases' },
};

export const aicadsProCaseDetailContactHero: ContactHeroBlockProps = aicadsContactHeroDemoContent;

export const aicadsProCaseDetailFooter: FooterBlockProps = aicadsEnterpriseFooterDemo;

export const aicadsProCaseDetailArgs: CaseDetailPageTemplateProps = {
  navbar: aicadsProCaseDetailNavbar,
  hero: aicadsProCaseDetailHero,
  intro: aicadsProCaseDetailIntro,
  anchorNav: aicadsProCaseDetailAnchorNav,
  businessResults: aicadsProCaseDetailBusinessResults,
  implemented: aicadsProCaseDetailImplemented,
  narrative: aicadsProCaseDetailNarrative,
  relatedProjects: aicadsProCaseDetailRelatedProjects,
  contactHero: aicadsProCaseDetailContactHero,
  footer: aicadsProCaseDetailFooter,
};
