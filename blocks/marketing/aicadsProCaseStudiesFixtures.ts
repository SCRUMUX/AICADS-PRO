/**
 * AICADS PRO case studies band — Storybook fixtures.
 */
import type { CaseStudiesBlockProps } from './CaseStudiesBlock';
import { aicadsCaseStudyCardImages } from './demo-assets/aicadsCaseStudyDemoImages';

export const aicadsProCaseStudiesContent: CaseStudiesBlockProps = {
  title: 'Customer stories',
  subtitle: 'How teams ship with pattern blocks and tokens',
  viewAll: { label: 'All stories', href: '#cases' },
  cases: [
    {
      id: 'pattern-layer',
      title: 'Pattern Layer rollout',
      meta: 'Design systems · 2026 · Enterprise',
      stats: [
        { value: '24+', label: 'blocks shipped' },
        { value: '−40%', label: 'layout rework' },
        { value: '1', label: 'token source' },
        { value: '100%', label: 'Storybook parity' },
      ],
      href: '#case-pattern-layer',
      imageSrc: aicadsCaseStudyCardImages['pattern-layer'],
      imageAlt: 'Pattern Layer case study cover',
    },
    {
      id: 'design-tokens',
      title: 'Unified token pipeline',
      meta: 'Platform · 2025 · SaaS',
      stats: [
        { value: 'CSS', label: 'variables' },
        { value: 'TW', label: 'preset' },
        { value: 'Figma', label: 'plugin sync' },
        { value: 'CI', label: 'tokens:check' },
      ],
      href: '#case-design-tokens',
      imageSrc: aicadsCaseStudyCardImages['design-tokens'],
      imageAlt: 'Design tokens case study cover',
    },
    {
      id: 'storybook-parity',
      title: 'Consumer Storybook parity',
      meta: 'DevEx · 2025 · Open source',
      stats: [
        { value: '8.6', label: 'Storybook' },
        { value: '2', label: 'build paths' },
        { value: '0', label: 'engine leaks' },
        { value: '∞', label: 'reuse' },
      ],
      href: '#case-storybook',
      imageSrc: aicadsCaseStudyCardImages['storybook-parity'],
      imageAlt: 'Storybook parity case study cover',
    },
  ],
};
