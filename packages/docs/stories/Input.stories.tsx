import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '@org/ui';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample text',
    placeholder: 'Enter text...',
  },
};

export const Wide: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Input placeholder="Enter text..." />
    </div>
  ),
};

