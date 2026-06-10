import type { Meta, StoryObj } from '@storybook/react';
import { CaseStudyIntroBlock } from './CaseStudyIntroBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';

const meta: Meta<typeof CaseStudyIntroBlock> = {
  title: 'Blocks/Marketing/CaseStudyIntroBlock',
  component: CaseStudyIntroBlock,
  parameters: marketingBlockParameters,
  args: {
    leadParagraphs: [
      'Заказчик — крупный агрохолдинг Юга России с сетью хранилищ картофеля. На площадке в Краснодарском крае хранится до 15 000 т клубней в сезон.',
    ],
    highlights: [
      { label: 'Объём хранения', value: '15 000 т картофеля' },
      { label: 'Регион', value: 'Краснодарский край' },
    ],
    trailParagraphs: [
      'Before the Pattern Layer rollout, the team evaluated hand-rolled sections versus importing blocks from @ai-ds/core/blocks with spacing recipes.',
    ],
  },
};
export default meta;

type Story = StoryObj<typeof CaseStudyIntroBlock>;

export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
export const Tablet: Story = { parameters: { viewport: { defaultViewport: 'tablet' } } };
export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
