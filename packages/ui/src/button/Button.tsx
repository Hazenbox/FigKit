import './button.css';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export type ButtonVariant =
  | 'primary'
  | 'destructive'
  | 'inverse'
  | 'success'
  | 'figjam'
  | 'secondary'
  | 'secondary-destruct'
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
  variant = "primary",
  size = "large",
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  const hasIcon = icon !== undefined && icon !== null;
  const iconAlign = hasIcon ? (iconPosition === 'center' ? 'center' : 'left') : null;

  return (
    <button
      className={clsx(
        'button',
        `button--${variant}`,
        `button--${size}`,
        disabled && 'button--disabled',
        hasIcon && iconAlign && `button--icon-${iconAlign}`,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {hasIcon && iconAlign === 'left' && <span className="button-icon button-icon--left">{icon}</span>}
      {hasIcon && iconAlign === 'center' && <span className="button-icon button-icon--center">{icon}</span>}
      <span className="button-text">{children}</span>
    </button>
  );
};
