import './badge.css';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export type BadgeVariant =
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

export interface BadgeProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children?: ReactNode;
  variant?: BadgeVariant;
  icon?: ReactNode;
  iconLead?: boolean; // From Figma component property "🎛️ Icon Lead"
  strong?: boolean; // From Figma component property "🐣 Strong"
}

export const Badge = ({
  children,
  variant = "default",
  icon,
  iconLead = false, // From Figma: "🎛️ Icon Lead" property
  strong = false, // From Figma: "🐣 Strong" property
  className,
  disabled,
  ...rest
}: BadgeProps) => {
  // iconLead is the Figma component property - if true, show icon
  const hasIcon = iconLead && icon !== undefined && icon !== null;

  return (
    <button
      className={clsx(
        'badge',
        `badge--${variant}`,
        strong && 'badge--strong',
        disabled && 'badge--disabled',
        hasIcon && 'badge--icon-lead',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {hasIcon && <span className="badge-icon badge-icon--lead">{icon}</span>}
      <span className="badge-text">{children}</span>
    </button>
  );
};
