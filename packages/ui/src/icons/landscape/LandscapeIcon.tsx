import React from 'react';
import type { SVGProps } from 'react';

export interface LandscapeIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const LandscapeIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: LandscapeIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M18 8H6C5.44772 8 5 8.44772 5 9V15C5 15.5523 5.44772 16 6 16H18C18.5523 16 19 15.5523 19 15V9C19 8.44772 18.5523 8 18 8ZM6 7C4.89543 7 4 7.89543 4 9V15C4 16.1046 4.89543 17 6 17H18C19.1046 17 20 16.1046 20 15V9C20 7.89543 19.1046 7 18 7H6Z" fill={color}/>
    </svg>
  );
};
