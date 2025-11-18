import React from 'react';
import type { SVGProps } from 'react';

export interface Layout-tidy-up-list-verticalIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const Layout-tidy-up-list-verticalIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: Layout-tidy-up-list-verticalIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M5 6.75C5 6.33579 5.33579 6 5.75 6H17.25C17.6642 6 18 6.33579 18 6.75V7.25C18 7.66421 17.6642 8 17.25 8H5.75C5.33579 8 5 7.66421 5 7.25V6.75ZM5 11.75C5 11.3358 5.33579 11 5.75 11H17.25C17.6642 11 18 11.3358 18 11.75V12.25C18 12.6642 17.6642 13 17.25 13H5.75C5.33579 13 5 12.6642 5 12.25V11.75ZM5.75 16C5.33579 16 5 16.3358 5 16.75V17.25C5 17.6642 5.33579 18 5.75 18H17.25C17.6642 18 18 17.6642 18 17.25V16.75C18 16.3358 17.6642 16 17.25 16H5.75Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
