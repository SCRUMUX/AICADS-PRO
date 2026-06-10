import type { Meta, StoryObj } from '@storybook/react';
import { AppShellBlock } from './AppShellBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';
import { aicadsProAdminNav } from '../aicadsProAdminFixtures';

const meta: Meta<typeof AppShellBlock> = {
  title: 'Blocks/Marketing/AppShellBlock',
  component: AppShellBlock,
  parameters: marketingBlockParameters,
  args: {
    logo: 'AICADS PRO',
    storageLabel: 'Admin console',
    userLabel: 'Product team',
    nav: aicadsProAdminNav,
    activeId: 'cases',
    children: (
      <p className="m-0 text-style-body text-[var(--color-text-secondary)]">Main content area</p>
    ),
  },
};
export default meta;

type Story = StoryObj<typeof AppShellBlock>;

export const Desktop: Story = { parameters: { viewport: { defaultViewport: 'desktop' } } };
export const Mobile: Story = { parameters: { viewport: { defaultViewport: 'mobile' } } };
