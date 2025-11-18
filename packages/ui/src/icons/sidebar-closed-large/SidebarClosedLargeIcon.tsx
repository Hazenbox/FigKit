import React from 'react';
import type { SVGProps } from 'react';

export interface SidebarClosedLargeIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const SidebarClosedLargeIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: SidebarClosedLargeIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M10 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H10V6ZM9 6H5C4.44772 6 4 6.44772 4 7V17C4 17.5523 4.44772 18 5 18H9V6ZM3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
