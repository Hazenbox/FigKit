import React from 'react';
import type { SVGProps } from 'react';

export interface PlaySmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const PlaySmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: PlaySmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M10.1587 7.17447C9.6598 6.85016 9 7.20822 9 7.8033V16.1966C9 16.7917 9.6598 17.1497 10.1587 16.8254L16.8086 12.503C17.1726 12.2664 17.1726 11.7335 16.8086 11.4969L10.1587 7.17447ZM8 7.8033C8 6.41478 9.53954 5.5793 10.7037 6.33603L17.3536 10.6584C18.3243 11.2894 18.3243 12.7105 17.3536 13.3415L10.7037 17.6639C9.53954 18.4206 8 17.5851 8 16.1966V7.8033Z" fill={color}/>
    </svg>
  );
};
