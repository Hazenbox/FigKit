import React from 'react';
import type { SVGProps } from 'react';

export interface Stroke-diamond-arrowIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const Stroke-diamond-arrowIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: Stroke-diamond-arrowIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 10.793C4.90237 11.1835 4.90237 11.8167 5.29289 12.2072L7.79289 14.7072C8.18342 15.0978 8.81658 15.0978 9.20711 14.7072L11.7071 12.2072C11.7704 12.1439 11.8235 12.0742 11.8663 12.0001H18.5C18.7761 12.0001 19 11.7763 19 11.5001C19 11.224 18.7761 11.0001 18.5 11.0001H11.8663C11.8235 10.9261 11.7704 10.8564 11.7071 10.793L9.20711 8.29302C8.81658 7.90249 8.18342 7.90249 7.79289 8.29302L5.29289 10.793ZM11 11.5001L10.2929 10.793L9.20711 9.70723L8.5 9.00012L7.79289 9.70723L6.70711 10.793L6 11.5001L6.70711 12.2072L7.79289 13.293L8.5 14.0001L9.20711 13.293L10.2929 12.2072L11 11.5001Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
