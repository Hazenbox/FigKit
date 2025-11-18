import React from 'react';
import type { SVGProps } from 'react';

export interface ActionNextSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const ActionNextSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: ActionNextSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M15.1458 7.14713C14.9506 7.34238 14.9506 7.65895 15.1458 7.85421L17.2922 10.0006L8.49965 10.0006C6.56674 10.0006 4.9998 11.5675 4.9998 13.5005C4.9998 15.4334 6.56674 17.0003 8.49966 17.0003H9.49961C9.77574 17.0003 9.99959 16.7765 9.99959 16.5003C9.99959 16.2242 9.77574 16.0004 9.49961 16.0004H8.49966C7.119 16.0004 5.99976 14.8811 5.99976 13.5005C5.99976 12.1198 7.119 11.0006 8.49965 11.0006L17.2922 11.0006L15.1458 13.1469C14.9506 13.3421 14.9506 13.6587 15.1458 13.854C15.3411 14.0492 15.6577 14.0492 15.8529 13.854L18.8528 10.8541C18.9465 10.7604 18.9992 10.6332 18.9992 10.5006C18.9992 10.368 18.9466 10.2408 18.8528 10.147L15.8529 7.14713C15.6577 6.95188 15.3411 6.95188 15.1458 7.14713Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
