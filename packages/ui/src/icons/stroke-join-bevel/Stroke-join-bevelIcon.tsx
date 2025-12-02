import React from 'react';
import type { SVGProps } from 'react';

export interface Stroke-join-bevelIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const Stroke-join-bevelIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: Stroke-join-bevelIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M6 6.5C6 6.22386 6.22386 6 6.5 6H12.5C12.6326 6 12.7598 6.05268 12.8536 6.14645L17.8536 11.1464C17.9473 11.2402 18 11.3674 18 11.5V17.5C18 17.7761 17.7761 18 17.5 18H12.5C12.2239 18 12 17.7761 12 17.5V12H6.5C6.22386 12 6 11.7761 6 11.5V6.5ZM7 7V11H12.5C12.7761 11 13 11.2239 13 11.5V17H17V11.7071L12.2929 7H7Z" fill={color}/>
    </svg>
  );
};
