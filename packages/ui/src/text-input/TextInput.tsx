import './text-input.css';
import React from 'react';
import type { InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export type TextInputVariant = 'single-line' | 'multi-line' | 'quick-action';

export type TextInputSize = 'default' | 'large';

export type TextInputState = 
  | 'default' 
  | 'focus' 
  | 'disabled' 
  | 'active' 
  | 'variable' 
  | 'empty' 
  | 'active-empty' 
  | 'active-filled';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: TextInputVariant;
  size?: TextInputSize;
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  dropdown?: boolean;
  error?: boolean;
  helperText?: string;
  state?: TextInputState;
}

export const TextInput = ({
  variant = 'single-line',
  size = 'default',
  label,
  placeholder,
  icon,
  iconPosition = 'left',
  dropdown = false,
  error = false,
  helperText,
  state,
  className,
  disabled,
  value,
  ...rest
}: TextInputProps) => {
  const isMultiLine = variant === 'multi-line';
  const hasIcon = icon !== undefined && icon !== null;
  const isEmpty = !value || (typeof value === 'string' && value.trim() === '');
  const isFocused = state === 'focus';
  const isActive = state === 'active' || state === 'active-empty' || state === 'active-filled';
  const isDisabled = disabled || state === 'disabled';
  
  // Determine actual state
  const actualState = state || (isDisabled ? 'disabled' : isFocused ? 'focus' : isEmpty ? 'empty' : 'default');

  const inputClasses = clsx(
    'text-input',
    `text-input--${variant}`,
    `text-input--size-${size}`,
    `text-input--state-${actualState}`,
    hasIcon && `text-input--icon-${iconPosition}`,
    dropdown && 'text-input--dropdown',
    error && 'text-input--error',
    className
  );

  const inputProps = {
    className: inputClasses,
    disabled: isDisabled,
    placeholder,
    value,
    ...rest,
  };

  return (
    <div className="text-input-wrapper">
      {label && (
        <label className="text-input-label" htmlFor={rest.id}>
          {label}
        </label>
      )}
      <div className="text-input-container">
        {hasIcon && iconPosition === 'left' && (
          <span className="text-input-icon text-input-icon--left">{icon}</span>
        )}
        {isMultiLine ? (
          <textarea
            {...(inputProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={clsx(inputClasses, 'text-input-textarea')}
          />
        ) : (
          <input
            type="text"
            {...inputProps}
            className={clsx(inputClasses, 'text-input-field')}
          />
        )}
        {hasIcon && iconPosition === 'right' && (
          <span className="text-input-icon text-input-icon--right">{icon}</span>
        )}
        {dropdown && (
          <span className="text-input-dropdown-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </div>
      {helperText && (
        <span className={clsx('text-input-helper', error && 'text-input-helper--error')}>
          {helperText}
        </span>
      )}
    </div>
  );
};
