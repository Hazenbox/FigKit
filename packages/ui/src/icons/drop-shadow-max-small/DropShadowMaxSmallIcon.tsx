import React from 'react';
import type { SVGProps } from 'react';

export interface DropShadowMaxSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const DropShadowMaxSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: DropShadowMaxSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M13.5 7H7.5C7.22386 7 7 7.22386 7 7.5V13.5C7 13.7761 7.22386 14 7.5 14H13.5C13.7761 14 14 13.7761 14 13.5V7.5C14 7.22386 13.7761 7 13.5 7ZM7.5 6C6.67157 6 6 6.67157 6 7.5V13.5C6 14.3284 6.67157 15 7.5 15H13.5C14.3284 15 15 14.3284 15 13.5V7.5C15 6.67157 14.3284 6 13.5 6H7.5Z" fill={color}/>
<path fillRule="evenodd" clipRule="evenodd" d="M9 15V16.5C9 17.3284 9.67157 18 10.5 18H16.5C17.3284 18 18 17.3284 18 16.5V10.5C18 9.67157 17.3284 9 16.5 9H15V13.5C15 14.3284 14.3284 15 13.5 15H9Z" fill="black" fillOpacity="0.3"/>
    </svg>
  );
};
