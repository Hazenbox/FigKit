import './Dialog.css';
import type { ReactNode } from 'react';

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export interface DialogTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export interface DialogContentProps {
  children: ReactNode;
}

export interface DialogTitleProps {
  children: ReactNode;
}

export interface DialogDescriptionProps {
  children: ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;
  
  return (
    <div className="dialog-overlay" onClick={() => onOpenChange?.(false)}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const DialogTrigger = ({ children, asChild }: DialogTriggerProps) => {
  return <>{children}</>;
};

export const DialogContent = ({ children }: DialogContentProps) => {
  return <>{children}</>;
};

export const DialogTitle = ({ children }: DialogTitleProps) => {
  return <h2 className="dialog-title">{children}</h2>;
};

export const DialogDescription = ({ children }: DialogDescriptionProps) => {
  return <p className="dialog-description">{children}</p>;
};

