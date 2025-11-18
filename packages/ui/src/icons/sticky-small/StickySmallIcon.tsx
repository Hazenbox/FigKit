import React from 'react';
import type { SVGProps } from 'react';

export interface StickySmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const StickySmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: StickySmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M7.5 7H16.5C16.7761 7 17 7.22386 17 7.5V12H12.5C12.2239 12 12 12.2239 12 12.5V17H7.5C7.22386 17 7 16.7761 7 16.5V7.5C7 7.22386 7.22386 7 7.5 7ZM13 16.9996C13.2549 16.9924 13.4979 16.8879 13.6787 16.7071L16.7071 13.6787C16.8879 13.4979 16.9924 13.2549 16.9996 13H13V16.9996ZM16.5 6H7.5C6.67157 6 6 6.67157 6 7.5V16.5C6 17.3284 6.67157 18 7.5 18H12.9716C13.502 18 14.0107 17.7893 14.3858 17.4142L17.4142 14.3858C17.7893 14.0107 18 13.502 18 12.9716V7.5C18 6.67157 17.3284 6 16.5 6Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
