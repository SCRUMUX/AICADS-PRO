import type { Meta, StoryObj } from '@storybook/react';
import { CaseStudiesBlock } from './CaseStudiesBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';
import { aicadsProCaseStudiesContent } from '../aicadsProCaseStudiesFixtures';

const meta: Meta<typeof CaseStudiesBlock> = {
  title: 'Blocks/Marketing/CaseStudiesBlock',
  component: CaseStudiesBlock,
  parameters: marketingBlockParameters,
  args: aicadsProCaseStudiesContent,
};
export default meta;

type Story = StoryObj<typeof CaseStudiesBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Tablet: Story = { parameters: { viewport: { defaultViewport: 'tablet' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
