import React from 'react';
import type { SVGProps } from 'react';

export interface ActionBackSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const ActionBackSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: ActionBackSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M15.1464 7.14645C14.9512 7.34171 14.9512 7.65829 15.1464 7.85355L17.2929 10L8.5 10C6.567 10 5 11.567 5 13.5C5 15.433 6.567 17 8.5 17H9.5C9.77614 17 10 16.7762 10 16.5C10 16.2239 9.77614 16 9.5 16H8.5C7.11929 16 6 14.8807 6 13.5C6 12.1193 7.11929 11 8.5 11L17.2929 11L15.1464 13.1464C14.9512 13.3417 14.9512 13.6583 15.1464 13.8536C15.3417 14.0488 15.6583 14.0488 15.8536 13.8536L18.8536 10.8536C18.9473 10.7598 19 10.6326 19 10.5C19 10.3674 18.9473 10.2402 18.8536 10.1465L15.8536 7.14645C15.6583 6.95119 15.3417 6.95118 15.1464 7.14645Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
