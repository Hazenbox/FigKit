import React from 'react';
import type { SVGProps } from 'react';

export interface Stroke-roundIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const Stroke-roundIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: Stroke-roundIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M19 7.5C19 7.22386 18.7761 7 18.5 7H10C7.23858 7 5 9.23858 5 12C5 14.7614 7.23858 17 10 17H18.5C18.7761 17 19 16.7761 19 16.5C19 16.2239 18.7761 16 18.5 16H10C7.79086 16 6 14.2091 6 12C6 9.79086 7.79086 8 10 8H18.5C18.7761 8 19 7.77614 19 7.5Z" fill={color}/>
    </svg>
  );
};
