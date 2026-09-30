import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from './AppShell';
import { SidebarNav } from '../SidebarNav/SidebarNav';
import { Card } from '../Card/Card';

const meta: Meta<typeof AppShell> = {
  title: 'Primitives/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'AppShell: aside + main. Sidebar width is `--space-sidebar`. Collapses to a column below tablet.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AppShell>;

export const Default: Story = {
  render: () => (
    <AppShell
      sidebar={
        <SidebarNav
          brandName="AtIn"
          brandSub="Attention Intelligence"
          items={[
            { href: '#', label: 'Главная', active: true },
            { href: '#', label: 'Отрасли' },
          ]}
        />
      }
    >
      <Card variant="panel" size="fluid" title="Main" description="Content column" />
    </AppShell>
  ),
};
