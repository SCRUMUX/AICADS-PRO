import type { Meta, StoryObj } from '@storybook/react';
import { CaseStudySectionsBlock } from './CaseStudySectionsBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';

const meta: Meta<typeof CaseStudySectionsBlock> = {
  title: 'Blocks/Marketing/CaseStudySectionsBlock',
  component: CaseStudySectionsBlock,
  parameters: marketingBlockParameters,
  args: {
    sections: [
      {
        title: 'Why it mattered',
        paragraphs: [
          'Hand-rolled section spacing drifted between Storybook, Figma, and production. AI page generators improvised layout instead of importing blocks.',
        ],
        quote: {
          text: 'We needed assemblers to pick a pattern id and import a block — not rebuild hero grids from raw divs.',
          attribution: 'Design systems lead',
          role: 'Platform team',
        },
      },
      {
        title: 'Result',
        paragraphs: [
          'After adopting AICADS PRO, new screens assemble from documented blocks and consumer teams inherit the same Storybook catalog after install.',
        ],
      },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof CaseStudySectionsBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
