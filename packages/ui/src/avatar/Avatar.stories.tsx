import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from '@figkit/ui';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'photo',
        'purple',
        'blue',
        'pink',
        'red',
        'yellow',
        'green',
        'grey',
        'overflow-unread',
        'overflow-read',
        'org',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
    },
    disabled: {
      control: 'boolean',
    },
    src: {
      control: 'text',
    },
    initials: {
      control: 'text',
    },
    count: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ===== VARIANTS ===== */
export const Photo: Story = {
  args: {
    variant: 'photo',
    size: 'default',
    shape: 'circle',
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
};

export const Purple: Story = {
  args: {
    variant: 'purple',
    size: 'default',
    shape: 'circle',
    initials: 'JD',
  },
};

export const Blue: Story = {
  args: {
    variant: 'blue',
    size: 'default',
    shape: 'circle',
    initials: 'AB',
  },
};

export const Pink: Story = {
  args: {
    variant: 'pink',
    size: 'default',
    shape: 'circle',
    initials: 'CD',
  },
};

export const Red: Story = {
  args: {
    variant: 'red',
    size: 'default',
    shape: 'circle',
    initials: 'EF',
  },
};

export const Yellow: Story = {
  args: {
    variant: 'yellow',
    size: 'default',
    shape: 'circle',
    initials: 'GH',
  },
};

export const Green: Story = {
  args: {
    variant: 'green',
    size: 'default',
    shape: 'circle',
    initials: 'IJ',
  },
};

export const Grey: Story = {
  args: {
    variant: 'grey',
    size: 'default',
    shape: 'circle',
    initials: 'KL',
  },
};

export const OverflowUnread: Story = {
  args: {
    variant: 'overflow-unread',
    size: 'default',
    shape: 'circle',
    count: 5,
  },
};

export const OverflowRead: Story = {
  args: {
    variant: 'overflow-read',
    size: 'default',
    shape: 'circle',
    count: 3,
  },
};

export const Org: Story = {
  args: {
    variant: 'org',
    size: 'default',
    shape: 'circle',
  },
};

/* ===== SIZES ===== */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar variant="blue" size="small" initials="S" shape="circle" />
      <Avatar variant="blue" size="default" initials="M" shape="circle" />
      <Avatar variant="blue" size="large" initials="L" shape="circle" />
    </div>
  ),
};

/* ===== SHAPES ===== */
export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar variant="purple" size="default" initials="C" shape="circle" />
      <Avatar variant="purple" size="default" initials="S" shape="square" />
    </div>
  ),
};

/* ===== STATES ===== */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Default</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar variant="blue" size="default" initials="AB" shape="circle" />
          <Avatar variant="green" size="default" initials="CD" shape="circle" />
          <Avatar variant="red" size="default" initials="EF" shape="circle" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Disabled</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar variant="blue" size="default" initials="AB" shape="circle" disabled />
          <Avatar variant="green" size="default" initials="CD" shape="circle" disabled />
          <Avatar variant="red" size="default" initials="EF" shape="circle" disabled />
        </div>
      </div>
    </div>
  ),
};

/* ===== ALL VARIANTS SHOWCASE ===== */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Color Variants (Circle)</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Avatar variant="purple" size="default" initials="P" shape="circle" />
          <Avatar variant="blue" size="default" initials="B" shape="circle" />
          <Avatar variant="pink" size="default" initials="P" shape="circle" />
          <Avatar variant="red" size="default" initials="R" shape="circle" />
          <Avatar variant="yellow" size="default" initials="Y" shape="circle" />
          <Avatar variant="green" size="default" initials="G" shape="circle" />
          <Avatar variant="grey" size="default" initials="G" shape="circle" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Color Variants (Square)</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Avatar variant="purple" size="default" initials="P" shape="square" />
          <Avatar variant="blue" size="default" initials="B" shape="square" />
          <Avatar variant="pink" size="default" initials="P" shape="square" />
          <Avatar variant="red" size="default" initials="R" shape="square" />
          <Avatar variant="yellow" size="default" initials="Y" shape="square" />
          <Avatar variant="green" size="default" initials="G" shape="square" />
          <Avatar variant="grey" size="default" initials="G" shape="square" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Special Variants</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <Avatar variant="photo" size="default" shape="circle" src="https://i.pravatar.cc/150?img=1" alt="Photo" />
          <Avatar variant="overflow-unread" size="default" shape="circle" count={5} />
          <Avatar variant="overflow-read" size="default" shape="circle" count={3} />
          <Avatar variant="org" size="default" shape="circle" />
        </div>
      </div>
    </div>
  ),
};

/* ===== WITH INITIALS FROM CHILDREN ===== */
export const WithInitialsFromChildren: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Avatar variant="blue" size="default" shape="circle">John Doe</Avatar>
      <Avatar variant="green" size="default" shape="circle">Jane Smith</Avatar>
      <Avatar variant="purple" size="default" shape="circle">Alice</Avatar>
    </div>
  ),
};

/* ===== SIZE VARIATIONS ===== */
export const SizeVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small (24px)</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar variant="blue" size="small" initials="S" shape="circle" />
          <Avatar variant="green" size="small" initials="S" shape="square" />
          <Avatar variant="photo" size="small" shape="circle" src="https://i.pravatar.cc/150?img=2" alt="Small" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Default (32px)</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar variant="blue" size="default" initials="M" shape="circle" />
          <Avatar variant="green" size="default" initials="M" shape="square" />
          <Avatar variant="photo" size="default" shape="circle" src="https://i.pravatar.cc/150?img=3" alt="Default" />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large (40px)</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Avatar variant="blue" size="large" initials="L" shape="circle" />
          <Avatar variant="green" size="large" initials="L" shape="square" />
          <Avatar variant="photo" size="large" shape="circle" src="https://i.pravatar.cc/150?img=4" alt="Large" />
        </div>
      </div>
    </div>
  ),
};
