import React from 'react';
import type { SVGProps } from 'react';

export interface HomeSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const HomeSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: HomeSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M11 17C11 17.5523 10.5523 18 10 18H7C6.44772 18 6 17.5523 6 17V10C6 9.69622 6.13809 9.4089 6.3753 9.21913L11.3753 5.21913C11.7405 4.92696 12.2595 4.92696 12.6247 5.21913L17.6247 9.21913C17.8619 9.4089 18 9.69622 18 10V17C18 17.5523 17.5523 18 17 18H14C13.4477 18 13 17.5523 13 17V13H11V17ZM8 17H7V16V10L12 6L17 10V16V17H16H15H14V16V13C14 12.4477 13.5523 12 13 12H11C10.4477 12 10 12.4477 10 13V16V17H9H8Z" fill={color}/>
    </svg>
  );
};
