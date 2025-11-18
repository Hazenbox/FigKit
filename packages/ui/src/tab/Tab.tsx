import './tab.css';
import React from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export interface TabProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  children: ReactNode;
  selected?: boolean;
  badge?: number | string;
  onClick?: () => void;
  state?: 'Default' | 'Focused' | 'Hover';
}

export const Tab = ({
  children,
  selected = false,
  badge,
  onClick,
  state = 'Default',
  className,
  ...rest
}: TabProps) => {
  return (
    <div
      className={clsx(
        'tab',
        selected && 'tab--selected',
        state === 'Focused' && 'tab--focused',
        state === 'Hover' && 'tab--hover',
        onClick && 'tab--clickable',
        className
      )}
      onClick={onClick}
      role={onClick ? 'tab' : undefined}
      aria-selected={selected}
      {...rest}
    >
      <div className="tab-content">
        <span className={clsx('tab-text', selected && 'tab-text--selected')}>
          {children}
        </span>
        {badge !== undefined && badge !== null && (
          <div className="tab-badge">
            <span className="tab-badge-text">{badge}</span>
          </div>
        )}
      </div>
    </div>
  );
};
