import React from 'react';
import type { SVGProps } from 'react';

export interface Layout-grid-rowsIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const Layout-grid-rowsIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: Layout-grid-rowsIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M5 5H19V8H5V5ZM5 11H19V14H5V11ZM19 17H5V20H19V17Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
