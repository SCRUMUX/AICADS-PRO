import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline } from './Sparkline';

const meta: Meta<typeof Sparkline> = {
  title: 'Primitives/Sparkline',
  component: Sparkline,
};
export default meta;
type Story = StoryObj<typeof Sparkline>;

export const Accent: Story = {
  args: {
    values: [0.12, 0.18, 0.15, 0.22, 0.31, 0.28, 0.4],
    stroke: 'accent',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240, height: 80 }}>
        <Story />
      </div>
    ),
  ],
};

export const Empty: Story = {
  args: { values: [] },
  decorators: [
    (Story) => (
      <div style={{ width: 240, height: 80 }}>
        <Story />
      </div>
    ),
  ],
};
