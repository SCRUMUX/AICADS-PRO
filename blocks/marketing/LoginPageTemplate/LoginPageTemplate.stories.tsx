import type { Meta, StoryObj } from '@storybook/react';
import { LoginPageTemplate } from './LoginPageTemplate';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';
import { aicadsProLoginContent, aicadsProLoginWithErrorContent } from '../aicadsProLoginFixtures';

const meta: Meta<typeof LoginPageTemplate> = {
  title: 'Screens/AICADS PRO Login',
  component: LoginPageTemplate,
  parameters: {
    ...marketingBlockParameters,
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'AICADS PRO auth console — Cortel-style split screen: brand decor panel + white form panel with registration hint and legal footer.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof LoginPageTemplate>;

export const Default: Story = {
  render: () => <LoginPageTemplate {...aicadsProLoginContent} />,
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const WithError: Story = {
  render: () => <LoginPageTemplate {...aicadsProLoginWithErrorContent} />,
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const Mobile: Story = {
  render: () => <LoginPageTemplate {...aicadsProLoginContent} />,
  parameters: { viewport: { defaultViewport: 'mobile' } },
};

export const Tablet: Story = {
  render: () => <LoginPageTemplate {...aicadsProLoginContent} />,
  parameters: { viewport: { defaultViewport: 'tablet' } },
};

export const Desktop: Story = {
  render: () => <LoginPageTemplate {...aicadsProLoginContent} />,
  parameters: { viewport: { defaultViewport: 'desktop' } },
};
