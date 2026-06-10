import type { Meta, StoryObj } from '@storybook/react';
import { CaseStudyInlineStatsBlock } from './CaseStudyInlineStatsBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';

const meta: Meta<typeof CaseStudyInlineStatsBlock> = {
  title: 'Blocks/Marketing/CaseStudyInlineStatsBlock',
  component: CaseStudyInlineStatsBlock,
  parameters: marketingBlockParameters,
  args: {
    title: 'Outcomes',
    stats: [
      { value: '−40%', label: 'layout rework after adopting pattern blocks' },
      { value: '2×', label: 'faster Storybook parity for consumer repos' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof CaseStudyInlineStatsBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
