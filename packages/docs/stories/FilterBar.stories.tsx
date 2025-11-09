import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilterBar } from '@org/patterns';

const meta = {
  title: 'Patterns/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FilterBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSpacing: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FilterBar />
    </div>
  ),
};

