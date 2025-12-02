import React from 'react';
import type { SVGProps } from 'react';

export interface PollSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const PollSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: PollSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M6.5 6C6.22386 6 6 6.22386 6 6.5V8V10V11V13V14V16V17.5C6 17.7761 6.22386 18 6.5 18C6.77614 18 7 17.7761 7 17.5L7 17H15C15.5523 17 16 16.5523 16 16V14H18C18.5523 14 19 13.5523 19 13V11C19 10.4477 18.5523 10 18 10H14V8C14 7.44772 13.5523 7 13 7H7V6.5C7 6.22386 6.77614 6 6.5 6ZM7 8V10H13V8H7ZM7 11V13H15H18V11H13H7ZM7 14V16H15V14H7Z" fill={color}/>
    </svg>
  );
};
