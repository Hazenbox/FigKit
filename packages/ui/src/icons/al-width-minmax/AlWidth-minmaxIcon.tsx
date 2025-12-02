import React from 'react';
import type { SVGProps } from 'react';

export interface AlWidth-minmaxIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const AlWidth-minmaxIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: AlWidth-minmaxIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M5.5 18C5.22386 18 5 17.7761 5 17.5V6.5C5 6.22386 5.22386 6 5.5 6C5.77614 6 6 6.22386 6 6.5L6 17.5C6 17.7761 5.77614 18 5.5 18ZM18.5 18C18.2239 18 18 17.7761 18 17.5L18 6.5C18 6.22386 18.2239 6 18.5 6C18.7761 6 19 6.22386 19 6.5L19 17.5C19 17.7761 18.7761 18 18.5 18ZM7.604 8L9.48636 16H10.5154L12 10.0616L13.4846 16H14.5137L16.396 8H15.3687L13.9853 13.8795L12.5154 8H11.4846L10.0147 13.8795L8.63131 8H7.604Z" fill={color}/>
    </svg>
  );
};
