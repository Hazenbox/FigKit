import React from 'react';
import type { SVGProps } from 'react';

export interface ChevronDownLargeDefaultIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const ChevronDownLargeDefaultIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: ChevronDownLargeDefaultIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M7.64645 10.1464C7.84171 9.95118 8.15829 9.95118 8.35355 10.1464L12 13.7929L15.6464 10.1464C15.8417 9.95118 16.1583 9.95118 16.3536 10.1464C16.5488 10.3417 16.5488 10.6583 16.3536 10.8536L12.3536 14.8536C12.1583 15.0488 11.8417 15.0488 11.6464 14.8536L7.64645 10.8536C7.45118 10.6583 7.45118 10.3417 7.64645 10.1464Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
