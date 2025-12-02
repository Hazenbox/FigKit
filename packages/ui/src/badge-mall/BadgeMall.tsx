import './badge-mall.css';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export type BadgeMallVariant =
  | 'default'
  | 'brand'
  | 'component'
  | 'danger'
  | 'feedback'
  | 'figjam'
  | 'invert'
  | 'selected'
  | 'success'
  | 'variable'
  | 'variable-selected'
  | 'warn'
  | 'merged'
  | 'archived'
  | 'menu';

export type BadgeMallSize = 'default' | 'large' | 'wide';

export interface BadgeMallProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children?: ReactNode;
  variant?: BadgeMallVariant;
  size?: BadgeMallSize;
  icon?: ReactNode;
  iconPosition?: 'left' | 'center';
}

export const BadgeMall = ({
  children,
  variant = "default",
  size = "large",
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...rest
}: BadgeMallProps) => {
  const hasIcon = icon !== undefined && icon !== null;
  const iconAlign = hasIcon ? (iconPosition === 'center' ? 'center' : 'left') : null;

  return (
    <button
      className={clsx(
        'badge-mall',
        `badge-mall--${variant}`,
        `badge-mall--${size}`,
        disabled && 'badge-mall--disabled',
        hasIcon && iconAlign && `badge-mall--icon-${iconAlign}`,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {hasIcon && iconAlign === 'left' && <span className="badge-mall-icon badge-mall-icon--left">{icon}</span>}
      {hasIcon && iconAlign === 'center' && <span className="badge-mall-icon badge-mall-icon--center">{icon}</span>}
      <span className="badge-mall-text">{children}</span>
    </button>
  );
};
