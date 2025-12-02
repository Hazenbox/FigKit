import './segmented-control.css';
import React from 'react';
import type { ReactNode } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export type SegmentedControlVariant = 'icon' | 'label';

export type SegmentedControlState = 'default' | 'disabled';

export interface Segment {
  id: string;
  label?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  variant?: SegmentedControlVariant;
  state?: SegmentedControlState;
  segments: Segment[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const SegmentedControl = ({
  variant = 'icon',
  state = 'default',
  segments,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  className,
}: SegmentedControlProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || segments[0]?.id || '');
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const isDisabled = disabled || state === 'disabled';

  const handleSegmentClick = (segmentId: string, segmentDisabled?: boolean) => {
    if (isDisabled || segmentDisabled) return;
    
    if (!isControlled) {
      setInternalValue(segmentId);
    }
    onChange?.(segmentId);
  };

  return (
    <div
      className={clsx(
        'segmented-control',
        `segmented-control--${variant}`,
        `segmented-control--state-${state}`,
        isDisabled && 'segmented-control--disabled',
        className
      )}
      role="tablist"
      aria-orientation="horizontal"
    >
      {segments.map((segment, index) => {
        const isActive = currentValue === segment.id;
        const segmentDisabled = isDisabled || segment.disabled;

        return (
          <button
            key={segment.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-disabled={segmentDisabled}
            disabled={segmentDisabled}
            className={clsx(
              'segmented-control-segment',
              `segmented-control-segment--${variant}`,
              isActive && 'segmented-control-segment--active',
              segmentDisabled && 'segmented-control-segment--disabled',
              index === 0 && 'segmented-control-segment--first',
              index === segments.length - 1 && 'segmented-control-segment--last'
            )}
            onClick={() => handleSegmentClick(segment.id, segment.disabled)}
          >
            {variant === 'icon' ? (
              <span className="segmented-control-icon" aria-hidden="true">
                {segment.icon}
              </span>
            ) : (
              <span className="segmented-control-label-text">{segment.label || segment.id}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

