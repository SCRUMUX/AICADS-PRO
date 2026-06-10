import type { Meta, StoryObj } from '@storybook/react';
import { CaseStudyImplementedBlock } from './CaseStudyImplementedBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';

const meta: Meta<typeof CaseStudyImplementedBlock> = {
  title: 'Blocks/Marketing/CaseStudyImplementedBlock',
  component: CaseStudyImplementedBlock,
  parameters: marketingBlockParameters,
  args: {
    title: 'What shipped',
    intro: 'The team rolled out AICADS PRO across marketing and console surfaces:',
    items: [
      'Pattern blocks + spacing recipes',
      'Storybook consumer parity',
      'ai-patterns.json manifest',
      'Engine isolation via ESLint',
      'Admin + login consoles',
      'Case study long-read blocks',
    ],
  },
};
export default meta;

type Story = StoryObj<typeof CaseStudyImplementedBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
