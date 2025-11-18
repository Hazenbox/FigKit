import React from 'react';
import type { SVGProps } from 'react';

export interface Layout-grid-columnsIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const Layout-grid-columnsIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: Layout-grid-columnsIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M5 5H8V19H5V5ZM11 5H14V19H11V5ZM20 5H17V19H20V5Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
