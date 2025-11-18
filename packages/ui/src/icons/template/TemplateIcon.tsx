import React from 'react';
import type { SVGProps } from 'react';

export interface TemplateIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const TemplateIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: TemplateIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M6 6H18C18.5523 6 19 6.44771 19 7V10H5V7C5 6.44771 5.44771 6 6 6ZM5 11V17C5 17.5523 5.44771 18 6 18H9V11H5ZM10 18H18C18.5523 18 19 17.5523 19 17V11H10V18ZM4 7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V7Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
