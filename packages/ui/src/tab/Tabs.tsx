import './tab.css';
import React, { useState } from 'react';
import type { HTMLAttributes } from 'react';
import { Tab, type TabProps } from './Tab';

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export interface TabsItem {
  label: string;
  badge?: number | string;
  disabled?: boolean;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabsItem[];
  value?: number;
  defaultValue?: number;
  onChange?: (index: number) => void;
}

export const Tabs = ({
  items,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  className,
  ...rest
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const selectedIndex = isControlled ? controlledValue : internalValue;

  const handleTabClick = (index: number) => {
    if (items[index]?.disabled) return;
    
    if (!isControlled) {
      setInternalValue(index);
    }
    onChange?.(index);
  };

  return (
    <div className={clsx('tabs', className)} role="tablist" {...rest}>
      {items.map((item, index) => (
        <Tab
          key={index}
          selected={selectedIndex === index}
          badge={item.badge}
          onClick={() => handleTabClick(index)}
        >
          {item.label}
        </Tab>
      ))}
    </div>
  );
};

