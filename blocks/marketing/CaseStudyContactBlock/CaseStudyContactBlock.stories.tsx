import type { Meta, StoryObj } from '@storybook/react';
import { CaseStudyContactBlock } from './CaseStudyContactBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';

const meta: Meta<typeof CaseStudyContactBlock> = {
  title: 'Blocks/Marketing/CaseStudyContactBlock',
  component: CaseStudyContactBlock,
  parameters: marketingBlockParameters,
  argTypes: {
    onSubmit: { action: 'case-contact-submit' },
  },
  args: {
    title: 'Questions about this case study?',
    description:
      'Leave your contacts — we will walk through pattern blocks, tokens, and consumer Storybook setup.',
    submitLabel: 'Talk to us',
    labels: {
      name: 'Name',
      company: 'Company',
    },
  },
};
export default meta;

type Story = StoryObj<typeof CaseStudyContactBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
