import type { Meta, StoryObj } from '@storybook/react';
import { SolutionsBlock } from './SolutionsBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';
import { aicadsSolutionsDemoContent } from '../marketingDemoContent';
import { withSolutionCardCovers } from '../solutionsDemoMedia';

const meta: Meta<typeof SolutionsBlock> = {
  title: 'Blocks/Marketing/SolutionsBlock',
  component: SolutionsBlock,
  parameters: {
    ...marketingBlockParameters,
    controls: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof SolutionsBlock>;

const renderSolutionsDemo = () => (
  <SolutionsBlock {...withSolutionCardCovers({ ...aicadsSolutionsDemoContent })} />
);

/** Cortel-style case studies — asymmetric desktop grid, mobile scroll, inverse hover reveal. */
export const Default: Story = {
  render: () => renderSolutionsDemo(),
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const Mobile: Story = {
  render: () => renderSolutionsDemo(),
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const Tablet: Story = {
  render: () => renderSolutionsDemo(),
  parameters: { viewport: { defaultViewport: 'tablet' } },
};

export const Desktop: Story = {
  render: () => renderSolutionsDemo(),
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
