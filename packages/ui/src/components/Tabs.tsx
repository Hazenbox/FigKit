import './Tabs.css';
import { useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

export interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface TabsListProps {
  children: ReactNode;
}

export interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

export interface TabsContentProps {
  value: string;
  children: ReactNode;
}

export const Tabs = ({ children, defaultValue, value: controlledValue, onValueChange }: TabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children }: TabsListProps) => {
  return <div className="tabs-list">{children}</div>;
};

export const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within Tabs');

  const isActive = context.value === value;

  return (
    <button
      className="tabs-trigger"
      data-value={value}
      data-active={isActive}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }: TabsContentProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within Tabs');

  if (context.value !== value) return null;

  return (
    <div className="tabs-content" data-value={value}>
      {children}
    </div>
  );
};

