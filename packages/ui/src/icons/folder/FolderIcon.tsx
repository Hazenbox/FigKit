import React from 'react';
import type { SVGProps } from 'react';

export interface FolderIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const FolderIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: FolderIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M7 7H10.882L11.382 8H7V7ZM6 8V7C6 6.44771 6.44771 6 7 6H10.882C11.2607 6 11.607 6.214 11.7764 6.55278L12.5 8H16.5C17.3284 8 18 8.67157 18 9.5V15.5C18 16.3284 17.3284 17 16.5 17H7.5C6.67157 17 6 16.3284 6 15.5V9V8ZM13 9H11.882H7V15.5C7 15.7761 7.22386 16 7.5 16H16.5C16.7761 16 17 15.7761 17 15.5V9.5C17 9.22386 16.7761 9 16.5 9H13Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
