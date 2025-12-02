import React from 'react';
import type { SVGProps } from 'react';

export interface TemplateSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const TemplateSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: TemplateSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M7 7H17C17.5523 7 18 7.44771 18 8V10H6V8C6 7.44771 6.44771 7 7 7ZM6 11V16C6 16.5523 6.44771 17 7 17H9V11H6ZM10 17H17C17.5523 17 18 16.5523 18 16V11H10V17ZM5 8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V16C19 17.1046 18.1046 18 17 18H7C5.89543 18 5 17.1046 5 16V8Z" fill={color}/>
    </svg>
  );
};
