import React from 'react';
import type { SVGProps } from 'react';

export interface Layout-grid-uniformIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const Layout-grid-uniformIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: Layout-grid-uniformIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M5 5H8V8H5V5ZM15 5H18V8H15V5ZM13 5H10V8H13V5ZM5 10H8V13H5V10ZM18 10H15V13H18V10ZM10 10H13V13H10V10ZM8 15H5V18H8V15ZM15 15H18V18H15V15ZM13 15H10V18H13V15Z" fill={color}/>
    </svg>
  );
};
