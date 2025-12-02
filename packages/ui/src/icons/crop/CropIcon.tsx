import React from 'react';
import type { SVGProps } from 'react';

export interface CropIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const CropIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: CropIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M8 3.5C8 3.22386 7.77614 3 7.5 3C7.22386 3 7 3.22386 7 3.5V7H3.5C3.22386 7 3 7.22386 3 7.5C3 7.77614 3.22386 8 3.5 8H7V16.5C7 16.7761 7.22386 17 7.5 17H16V20.5C16 20.7761 16.2239 21 16.5 21C16.7761 21 17 20.7761 17 20.5V17H20.5C20.7761 17 21 16.7761 21 16.5C21 16.2239 20.7761 16 20.5 16H17V7.5C17 7.22386 16.7761 7 16.5 7H8V3.5ZM8 8V16H16V8H8Z" fill={color}/>
    </svg>
  );
};
