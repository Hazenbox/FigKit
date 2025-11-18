import React from 'react';
import type { SVGProps } from 'react';

export interface LineIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const LineIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: LineIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M19.8536 4.14645C20.0488 4.34171 20.0488 4.65829 19.8536 4.85355L4.85355 19.8536C4.65829 20.0488 4.34171 20.0488 4.14645 19.8536C3.95118 19.6583 3.95118 19.3417 4.14645 19.1464L19.1464 4.14645C19.3417 3.95118 19.6583 3.95118 19.8536 4.14645Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
