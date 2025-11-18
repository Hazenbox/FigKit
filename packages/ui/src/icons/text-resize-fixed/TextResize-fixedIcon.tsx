import React from 'react';
import type { SVGProps } from 'react';

export interface TextResize-fixedIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const TextResize-fixedIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: TextResize-fixedIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M17 7H7L7 17H17V7ZM7 6C6.44772 6 6 6.44772 6 7V17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17V7C18 6.44772 17.5523 6 17 6H7Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
