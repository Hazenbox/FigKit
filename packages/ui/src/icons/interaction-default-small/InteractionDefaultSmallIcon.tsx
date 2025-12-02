import React from 'react';
import type { SVGProps } from 'react';

export interface InteractionDefaultSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const InteractionDefaultSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: InteractionDefaultSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M18 12C18 15.3137 15.3137 18 12 18C10.5231 18 9.17093 17.4664 8.12558 16.5815L16.5815 8.12558C17.4664 9.17093 18 10.5231 18 12ZM7.41849 15.8744L15.8744 7.41849C14.8291 6.53358 13.4769 6 12 6C8.68629 6 6 8.68629 6 12C6 13.4769 6.53358 14.8291 7.41849 15.8744ZM19 12C19 15.866 15.866 19 12 19C8.134 19 5 15.866 5 12C5 8.134 8.134 5 12 5C15.866 5 19 8.134 19 12Z" fill={color}/>
    </svg>
  );
};
