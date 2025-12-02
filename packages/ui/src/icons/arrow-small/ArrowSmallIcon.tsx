import React from 'react';
import type { SVGProps } from 'react';

export interface ArrowSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const ArrowSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: ArrowSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M12.5 7C12.2239 7 12 6.77614 12 6.5C12 6.22386 12.2239 6 12.5 6H17.5C17.7761 6 18 6.22386 18 6.5V11.5C18 11.7761 17.7761 12 17.5 12C17.2239 12 17 11.7761 17 11.5V7.70711L6.85355 17.8536C6.65829 18.0488 6.34171 18.0488 6.14645 17.8536C5.95118 17.6583 5.95118 17.3417 6.14645 17.1464L16.2929 7H12.5Z" fill={color}/>
    </svg>
  );
};
