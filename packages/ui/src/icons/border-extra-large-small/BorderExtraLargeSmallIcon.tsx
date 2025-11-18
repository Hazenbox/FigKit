import React from 'react';
import type { SVGProps } from 'react';

export interface BorderExtraLargeSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const BorderExtraLargeSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: BorderExtraLargeSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V15C19 15.5523 18.5523 16 18 16H6C5.44772 16 5 15.5523 5 15V9ZM7 9H6V10V14V15H7H17H18V14V10V9H17H7Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
