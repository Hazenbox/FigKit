import React from 'react';
import type { SVGProps } from 'react';

export interface PlayIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const PlayIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: PlayIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fillRule="evenodd" clipRule="evenodd" d="M9.37165 17.8665L17.5339 12.8441C18.1676 12.4542 18.1687 11.5335 17.536 11.1421L9.37353 6.09188C8.77396 5.72092 8 6.15218 8 6.85724L8 17.1C8 17.8041 8.77201 18.2355 9.37165 17.8665ZM18.0579 13.6958C19.3253 12.916 19.3276 11.0746 18.0621 10.2917L9.89968 5.24149C8.6339 4.45834 7 5.36878 7 6.85724L7 17.1C7 18.5864 8.6298 19.4971 9.89571 18.7182L18.0579 13.6958Z" fill="black" fillOpacity="0.9"/>
    </svg>
  );
};
