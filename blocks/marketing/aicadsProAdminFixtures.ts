/**
 * AICADS PRO admin panel — Storybook fixtures (front-only, no API).
 */
import type { AppShellNavItem } from './AppShellBlock';
import type {
  AdminCaseDraft,
  AdminEventDraft,
  AdminPartnerRecord,
  AdminUserRecord,
} from './AdminContentEditorBlock/AdminContentEditor.types';
import type { AdminPageTemplateProps } from './AdminPageTemplate/AdminPageTemplate';
import { partnersDemoLogo } from './demo-assets/partnersDemoLogos';

export const aicadsProAdminNav: AppShellNavItem[] = [
  { id: 'cases', label: 'Case studies' },
  { id: 'events', label: 'Events' },
  { id: 'users', label: 'Users' },
  { id: 'partners', label: 'Partners' },
];

export const aicadsProAdminCasePublished: AdminCaseDraft = {
  id: 'pattern-layer',
  kind: 'case',
  title: 'Pattern Layer rollout',
  status: 'published',
  updatedAt: '2026-06-01',
  slug: 'pattern-layer',
  seoTitle: 'Case: Pattern Layer — AICADS PRO',
  anchorNav: [
    { id: 'case-results', label: 'Outcomes' },
    { id: 'case-shipped', label: 'What shipped' },
  ],
  heroBreadcrumbs: ['Home', 'Case studies', 'Pattern Layer'],
  heroTitle: 'Composable blocks for AI page assembly',
  heroSubtitle: 'Reference implementation for marketing and console surfaces.',
  leadParagraphs: [
    'AICADS PRO ships distributable blocks, spacing recipes, and a pattern manifest so teams assemble pages without improvising layout.',
  ],
  highlights: [
    { label: 'Blocks', value: '24+' },
    { label: 'Recipes', value: 'section.*' },
  ],
  trailParagraphs: ['Consumers import from @ai-ds/core/blocks and stay on the semantic API.'],
  businessStats: [
    { value: '−40%', label: 'layout rework' },
    { value: '1', label: 'token source' },
  ],
  implementedIntro: 'Delivered in the design system:',
  implementedItems: ['HeroBlock', 'LandingPageTemplate', 'AppShellBlock', 'Admin workspaces'],
  narrativeSections: [
    {
      id: 'case-why',
      title: 'Why it matters',
      paragraphs: [
        'Pattern blocks keep Storybook, npm exports, and AI assemblers aligned on the same section vocabulary.',
      ],
    },
  ],
};

export const aicadsProAdminCaseDraft: AdminCaseDraft = {
  id: 'design-tokens-draft',
  kind: 'case',
  title: 'Token pipeline — draft',
  status: 'draft',
  updatedAt: '2026-06-08',
  slug: 'design-tokens-draft',
  seoTitle: 'Case: design tokens',
  anchorNav: [{ id: 'case-results', label: 'Outcomes' }],
  heroBreadcrumbs: ['Home', 'Case studies', 'Draft'],
  heroTitle: 'CSS variables from a single build',
  leadParagraphs: ['Draft case study for the tokens:build workflow.'],
  highlights: [{ label: 'Formats', value: 'CSS + Tailwind' }],
  trailParagraphs: [],
  businessStats: [{ value: '—', label: 'metrics TBD' }],
  implementedIntro: 'Planned sections:',
  implementedItems: ['tokens:check', 'Figma plugin sync'],
  narrativeSections: [
    {
      id: 'case-notes',
      title: 'Notes',
      paragraphs: ['Work in progress for the next release.'],
    },
  ],
};

export const aicadsProAdminEventsSeed: AdminEventDraft[] = [
  {
    id: 'webinar-pattern-layer',
    kind: 'event',
    title: 'Pattern Layer deep dive',
    status: 'published',
    updatedAt: '2026-06-01',
    slug: 'webinar-pattern-layer',
    seoTitle: 'Webinar: Pattern Layer',
    anchorNav: [{ id: 'event-body', label: 'Description' }],
    format: 'online',
    date: '2026-07-10',
    eventTitle: 'Pattern Layer deep dive',
    location: 'Online',
    href: '#events-pattern-layer',
    paragraphs: ['Walkthrough of blocks, recipes, and ai-patterns.json for consumer apps.'],
  },
  {
    id: 'workshop-storybook',
    kind: 'event',
    title: 'Storybook parity workshop',
    status: 'published',
    updatedAt: '2026-05-20',
    slug: 'workshop-storybook',
    seoTitle: 'Workshop: Storybook parity',
    anchorNav: [{ id: 'event-body', label: 'Description' }],
    format: 'hybrid',
    date: '2026-08-05',
    eventTitle: 'Storybook parity workshop',
    location: 'Remote + hub',
    paragraphs: ['Consumer Storybook setup with createMainConfig and shared viewports.'],
  },
];

export const aicadsProAdminEventDraft: AdminEventDraft = {
  id: 'event-release-notes',
  kind: 'event',
  title: 'v0.8 release notes livestream',
  status: 'draft',
  updatedAt: '2026-06-09',
  slug: 'release-livestream',
  seoTitle: 'Release livestream',
  anchorNav: [{ id: 'event-body', label: 'Description' }],
  format: 'online',
  date: '2026-09-01',
  eventTitle: 'v0.8 release notes livestream',
  location: 'Online',
  paragraphs: ['Draft event for the next major tag.'],
};

export const aicadsProAdminUsersSeed: AdminUserRecord[] = [
  {
    id: 'user-design',
    organization: 'AICADS Design',
    email: 'design@aicads.example',
    role: 'Editor',
    passwordStatus: 'active',
    lastLogin: '2026-06-09',
  },
  {
    id: 'user-dev',
    organization: 'Platform team',
    email: 'dev@aicads.example',
    role: 'Admin',
    passwordStatus: 'pending',
    lastLogin: '2026-05-28',
  },
  {
    id: 'user-partner',
    organization: 'Partner org',
    email: 'partner@example.com',
    role: 'Viewer',
    passwordStatus: 'expired',
    lastLogin: '2026-04-12',
  },
];

export const aicadsProAdminPartnersSeed: AdminPartnerRecord[] = [
  { id: 'radix', name: 'Radix UI', imageSrc: partnersDemoLogo('radix') },
  { id: 'storybook', name: 'Storybook', imageSrc: partnersDemoLogo('storybook') },
  { id: 'tailwind', name: 'Tailwind CSS', imageSrc: partnersDemoLogo('tailwind') },
  { id: 'typescript', name: 'TypeScript', imageSrc: partnersDemoLogo('typescript') },
];

export const aicadsProAdminArgs: AdminPageTemplateProps = {
  storageLabel: 'Admin console',
  userLabel: 'Product team',
  nav: aicadsProAdminNav,
  defaultSection: 'cases',
  initialCases: [aicadsProAdminCasePublished, aicadsProAdminCaseDraft],
  initialEvents: [...aicadsProAdminEventsSeed, aicadsProAdminEventDraft],
  initialUsers: aicadsProAdminUsersSeed,
  initialPartners: aicadsProAdminPartnersSeed,
};
