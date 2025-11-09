import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, Button } from '@org/ui';

const DialogExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description. It provides context about what the dialog is for.
          </DialogDescription>
          <div style={{ marginTop: '16px' }}>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const meta = {
  title: 'UI/Dialog',
  component: DialogExample,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DialogExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

