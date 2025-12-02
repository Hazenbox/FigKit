import React from 'react';
import type { SVGProps } from 'react';

export interface LineSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const LineSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: LineSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M17.9786 6.02145C18.1738 6.21671 18.1738 6.53329 17.9786 6.72855L6.72855 17.9786C6.53329 18.1738 6.21671 18.1738 6.02145 17.9786C5.82618 17.7833 5.82618 17.4667 6.02145 17.2714L17.2714 6.02145C17.4667 5.82618 17.7833 5.82618 17.9786 6.02145Z" fill={color}/>
    </svg>
  );
};
