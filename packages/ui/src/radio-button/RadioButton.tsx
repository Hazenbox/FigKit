import './radio-button.css';
import React from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export type RadioButtonVariant = 'input' | 'button';

export type RadioButtonState = 'default' | 'active' | 'focused' | 'disabled';

export interface RadioButtonProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  variant?: RadioButtonVariant;
  state?: RadioButtonState;
  checked?: boolean;
  label?: ReactNode;
  name?: string;
  value?: string;
}

export const RadioButton = ({
  variant = 'input',
  state = 'default',
  checked = false,
  label,
  disabled = false,
  name,
  value,
  className,
  id,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: RadioButtonProps) => {
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  const [isFocused, setIsFocused] = React.useState(false);
  const isDisabled = disabled || state === 'disabled';
  const isFocusedState = state === 'focused' || isFocused;

  return (
    <div
      className={clsx(
        'radio-button-wrapper',
        `radio-button-wrapper--${variant}`,
        `radio-button-wrapper--state-${state}`,
        checked && 'radio-button-wrapper--checked',
        isDisabled && 'radio-button-wrapper--disabled',
        isFocusedState && 'radio-button-wrapper--focused',
        label ? 'radio-button-wrapper--with-label' : null,
        className
      )}
    >
      <div className="radio-button-container">
        <input
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          disabled={isDisabled}
          className="radio-button-input"
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onChange={onChange}
          {...rest}
        />
        {variant === 'input' ? (
          <label htmlFor={radioId} className="radio-button-label">
            <div className="radio-button-circle">
              <div className="radio-button-background" />
              {checked && (
                <div className="radio-button-dot">
                  <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="4" cy="4" r="4" fill="currentColor" />
                  </svg>
                </div>
              )}
            </div>
            {label && <span className="radio-button-label-text">{label}</span>}
          </label>
        ) : (
          <label htmlFor={radioId} className="radio-button-label radio-button-label--button">
            {label && <span className="radio-button-label-text">{label}</span>}
          </label>
        )}
      </div>
    </div>
  );
};

