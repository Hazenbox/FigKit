import React from 'react';
import type { SVGProps } from 'react';

export interface SectionSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const SectionSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: SectionSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M13 7H16C16.5523 7 17 7.44771 17 8V16C17 16.5523 16.5523 17 16 17H8C7.44771 17 7 16.5523 7 16V10H12.25C12.6642 10 13 9.66422 13 9.25V7ZM12 7H8C7.44771 7 7 7.44771 7 8V9H12V7ZM12.25 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V9.25V8C6 6.89543 6.89543 6 8 6H12.25Z" fill={color}/>
    </svg>
  );
};
