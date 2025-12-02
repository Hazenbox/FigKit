import React from 'react';
import type { SVGProps } from 'react';

export interface BooleanUnionSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const BooleanUnionSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: BooleanUnionSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M14 7H7V14H10V17H17V10H14V7Z" fill="black" fillOpacity="0.3"/>
<path fillRule="evenodd" clipRule="evenodd" d="M10 14V15V17H17V10H15H14V9V7L7 7V14H9H10ZM8 15H7C6.44772 15 6 14.5523 6 14V7C6 6.44772 6.44772 6 7 6H14C14.5523 6 15 6.44772 15 7V8V9H16H17C17.5523 9 18 9.44772 18 10V17C18 17.5523 17.5523 18 17 18H10C9.44772 18 9 17.5523 9 17V16V15H8Z" fill={color}/>
    </svg>
  );
};
