import React from 'react';
import type { SVGProps } from 'react';

export interface SearchIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const SearchIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: SearchIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M16 10.5C16 13.5376 13.5376 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46243 7.46243 5 10.5 5C13.5376 5 16 7.46243 16 10.5ZM14.7291 15.4362C13.5923 16.411 12.1149 17 10.5 17C6.91015 17 4 14.0899 4 10.5C4 6.91015 6.91015 4 10.5 4C14.0899 4 17 6.91015 17 10.5C17 12.1149 16.411 13.5923 15.4362 14.7291L19.8536 19.1464C20.0488 19.3417 20.0488 19.6583 19.8536 19.8536C19.6583 20.0488 19.3417 20.0488 19.1464 19.8536L14.7291 15.4362Z" fill={color}/>
    </svg>
  );
};
