import './button.css';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'figjam'
  | 'destructive'
  | 'secondary-destruct'
  | 'inverse'
  | 'success'
  | 'link'
  | 'link-danger'
  | 'ghost';

export type ButtonSize = 'default' | 'large' | 'wide';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'center';
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'default',
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  const hasIcon = icon !== undefined && icon !== null;

  return (
    <button
      className={clsx(
        'figkit-button',
        `figkit-button--${variant}`,
        `figkit-button--${size}`,
        disabled && 'figkit-button--disabled',
        hasIcon && `figkit-button--icon-${iconPosition}`,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {hasIcon && iconPosition === 'left' && (
        <span className="figkit-button__icon figkit-button__icon--left">{icon}</span>
      )}
      {hasIcon && iconPosition === 'center' && (
        <span className="figkit-button__icon figkit-button__icon--center">{icon}</span>
      )}
      <span className="figkit-button__text">{children}</span>
    </button>
  );
};
