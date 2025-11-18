import React from 'react';
import type { SVGProps } from 'react';

export interface ReturnIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const ReturnIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: ReturnIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M10.3536 5.64645C10.5488 5.84171 10.5488 6.15829 10.3536 6.35355L7.70711 9H11.5C15.0761 9 18 11.9239 18 15.5V17.5C18 17.7761 17.7761 18 17.5 18C17.2239 18 17 17.7761 17 17.5V15.5C17 12.4761 14.5239 10 11.5 10H7.70711L10.3536 12.6464C10.5488 12.8417 10.5488 13.1583 10.3536 13.3536C10.1583 13.5488 9.84171 13.5488 9.64645 13.3536L6.14645 9.85355C5.95118 9.65829 5.95118 9.34171 6.14645 9.14645L9.64645 5.64645C9.84171 5.45118 10.1583 5.45118 10.3536 5.64645Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
