import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import { Tabs } from '@figkit/ui';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs
      items={[
        { label: 'Active Tab' },
        { label: 'Second tab' },
      ]}
      defaultValue={0}
    />
  ),
};

export const Three: Story = {
  render: () => (
    <Tabs
      items={[
        { label: 'Active tab' },
        { label: 'Second tab' },
        { label: 'Third tab' },
      ]}
      defaultValue={0}
    />
  ),
};

export const Four: Story = {
  render: () => (
    <Tabs
      items={[
        { label: 'Active Tab' },
        { label: 'Second tab' },
        { label: 'Third tab' },
        { label: 'Fourth tab' },
      ]}
      defaultValue={0}
    />
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Tabs
      items={[
        { label: 'Active Tab', badge: '21' },
        { label: 'Second tab' },
        { label: 'Third tab', badge: '5' },
      ]}
      defaultValue={0}
    />
  ),
};

export const Single: Story = {
  render: () => (
    <Tabs
      items={[
        { label: 'Single Tab Title' },
      ]}
      defaultValue={0}
    />
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState(0);
    return (
      <Tabs
        items={[
          { label: 'First tab' },
          { label: 'Second tab' },
          { label: 'Third tab' },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

