import { Button, Input } from '@org/ui';
import './FilterBar.css';
import type { ReactNode } from 'react';

export interface FilterBarProps {
  filters?: Array<{ label: string; value: string }>;
  searchPlaceholder?: string;
  onFilterChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
}

export const FilterBar = ({
  filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ],
  searchPlaceholder = 'Search...',
  onFilterChange,
  onSearchChange,
}: FilterBarProps) => {
  return (
    <div className="filter-bar">
      <div className="filter-bar-buttons">
        {filters.map((filter) => (
          <Button key={filter.value} onClick={() => onFilterChange?.(filter.value)}>
            {filter.label}
          </Button>
        ))}
      </div>
      <div className="filter-bar-search">
        <Input
          placeholder={searchPlaceholder}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
    </div>
  );
};

