import './checkbox.css';
import React from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  muted?: boolean;
  ghost?: boolean;
  focused?: boolean;
}

export const Checkbox = ({
  label,
  description,
  checked = false,
  indeterminate = false,
  disabled = false,
  muted = false,
  ghost = false,
  focused = false,
  className,
  id,
  onFocus,
  onBlur,
  ...rest
}: CheckboxProps) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const [isFocused, setIsFocused] = React.useState(focused);

  return (
    <div
      className={clsx(
        'checkbox-wrapper',
        checked && !indeterminate && 'checkbox-wrapper--checked',
        indeterminate && 'checkbox-wrapper--indeterminate',
        disabled && 'checkbox-wrapper--disabled',
        muted && 'checkbox-wrapper--muted',
        ghost && 'checkbox-wrapper--ghost',
        (isFocused || focused) && 'checkbox-wrapper--focused',
        className
      )}
    >
      <div className="checkbox-container">
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          className="checkbox-input"
          aria-checked={indeterminate ? 'mixed' : checked}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        <label htmlFor={checkboxId} className="checkbox-label">
          <div className="checkbox-check">
            <div className="checkbox-background" />
            {checked && !indeterminate && (
              <svg className="checkbox-icon checkbox-icon--check" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 8L6.5 10.5L12 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {indeterminate && (
              <svg className="checkbox-icon checkbox-icon--mixed" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 8H12"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
          {label && <span className="checkbox-label-text">{label}</span>}
        </label>
      </div>
      {description && <div className="checkbox-description">{description}</div>}
    </div>
  );
};
