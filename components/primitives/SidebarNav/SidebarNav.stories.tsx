import type { Meta, StoryObj } from '@storybook/react';
import { SidebarNav } from './SidebarNav';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Paragraph } from '../Paragraph/Paragraph';

const meta: Meta<typeof SidebarNav> = {
  title: 'Primitives/SidebarNav',
  component: SidebarNav,
};
export default meta;
type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 230 }}>
      <SidebarNav
        brandName="AtIn"
        brandSub="Attention Intelligence"
        items={[
          { href: '#home', label: 'Главная', active: true },
          { href: '#now', label: 'Что популярно' },
          { href: '#industries', label: 'Отрасли' },
        ]}
        footer={
          <Card variant="filled" size="fluid" title="Advertising Intelligence">
            <Paragraph size="sm">Где растущее внимание может стать рекламной возможностью.</Paragraph>
            <Button appearance="brand" size="sm">
              Перейти
            </Button>
          </Card>
        }
      />
    </div>
  ),
};
