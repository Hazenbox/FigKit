import './avatar.css';
import type { ReactNode, HTMLAttributes } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export type AvatarVariant =
  | 'photo'
  | 'purple'
  | 'blue'
  | 'pink'
  | 'red'
  | 'yellow'
  | 'green'
  | 'grey'
  | 'overflow-unread'
  | 'overflow-read'
  | 'org';

export type AvatarSize = 'small' | 'default' | 'large';

export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'size'> {
  /** Image source URL (for photo variant) */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Initials to display (for color variants) */
  initials?: string;
  /** Overflow count (for overflow variants) */
  count?: number;
  /** Variant type */
  variant?: AvatarVariant;
  /** Size */
  size?: AvatarSize;
  /** Shape */
  shape?: AvatarShape;
  /** Disabled state */
  disabled?: boolean;
  /** Custom content (overrides initials/image) */
  children?: ReactNode;
}

export const Avatar = ({
  src,
  alt,
  initials,
  count,
  variant = 'grey',
  size = 'default',
  shape = 'circle',
  disabled = false,
  children,
  className,
  ...rest
}: AvatarProps) => {
  const hasImage = variant === 'photo' && src;
  const hasInitials = initials && variant !== 'photo' && variant !== 'overflow-unread' && variant !== 'overflow-read';
  const hasOverflow = (variant === 'overflow-unread' || variant === 'overflow-read') && count !== undefined;
  const hasOrg = variant === 'org';

  // Generate initials from children if provided and no initials prop
  let displayInitials = initials;
  if (!displayInitials && children && typeof children === 'string' && variant !== 'photo' && !hasOverflow) {
    const parts = children.trim().split(/\s+/);
    if (parts.length >= 2) {
      displayInitials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts[0].length > 0) {
      displayInitials = parts[0].substring(0, 2).toUpperCase();
    }
  }

  return (
    <div
      className={clsx(
        'avatar',
        `avatar--${variant}`,
        `avatar--${size}`,
        `avatar--${shape}`,
        disabled && 'avatar--disabled',
        className
      )}
      {...rest}
    >
      {hasImage && (
        <img src={src} alt={alt || 'Avatar'} className="avatar-image" />
      )}
      {hasInitials && displayInitials && (
        <span className="avatar-initials">{displayInitials}</span>
      )}
      {hasOverflow && (
        <span className="avatar-overflow">
          {count !== undefined && count > 0 ? `+${count}` : '+'}
        </span>
      )}
      {hasOrg && !children && (
        <svg className="avatar-org-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {children && !hasImage && !hasInitials && !hasOverflow && !hasOrg && (
        <span className="avatar-content">{children}</span>
      )}
    </div>
  );
};
