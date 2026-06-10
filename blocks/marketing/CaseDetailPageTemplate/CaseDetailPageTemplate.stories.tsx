import type { Meta, StoryObj } from '@storybook/react';
import { CaseDetailPageTemplate } from './CaseDetailPageTemplate';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';
import { aicadsProCaseDetailArgs } from '../aicadsProCaseDetailFixtures';

const meta: Meta<typeof CaseDetailPageTemplate> = {
  title: 'Screens/AICADS PRO Case Detail',
  component: CaseDetailPageTemplate,
  parameters: {
    ...marketingBlockParameters,
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'AICADS PRO case study long-read — photo hero, intro metrics, sticky anchor nav, stats cards, related projects, contact + footer closing band.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof CaseDetailPageTemplate>;

export const Default: Story = {
  render: () => <CaseDetailPageTemplate {...aicadsProCaseDetailArgs} />,
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const Mobile: Story = {
  render: () => <CaseDetailPageTemplate {...aicadsProCaseDetailArgs} />,
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const Tablet: Story = {
  render: () => <CaseDetailPageTemplate {...aicadsProCaseDetailArgs} />,
  parameters: { viewport: { defaultViewport: 'tablet' } },
};

export const Desktop: Story = {
  render: () => <CaseDetailPageTemplate {...aicadsProCaseDetailArgs} />,
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
