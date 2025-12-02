import React from 'react';
import type { SVGProps } from 'react';

export interface CreateVariantSmallIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const CreateVariantSmallIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: CreateVariantSmallIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M5.88394 11.1159L11.1162 5.8837C11.6043 5.39554 12.3958 5.39554 12.8839 5.88369L18.1162 11.1159C18.6043 11.6041 18.6043 12.3955 18.1162 12.8837L12.8839 18.1159C12.3958 18.6041 11.6043 18.6041 11.1162 18.1159L5.88394 12.8837C5.39578 12.3955 5.39578 11.6041 5.88394 11.1159Z" fill={color}/>
    </svg>
  );
};
