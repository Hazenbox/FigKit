import './Button.css';
import type { ReactNode } from 'react';

export interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

