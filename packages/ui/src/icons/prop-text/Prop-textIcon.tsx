import React from 'react';
import type { SVGProps } from 'react';

export interface Prop-textIconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const Prop-textIcon = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: Prop-textIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_1_535560)">
<path d="M9.97949 8L11.9678 11.2266H12.0303L14.0186 8H15.2881L12.7842 12L15.2959 16H14.0225L12.0303 12.8242H11.9678L9.97559 16H8.70215L11.2686 12L8.70996 8H9.97949Z" fill="black" fillOpacity="0.5"/>
</g>
<defs>
<clipPath id="clip0_1_535560">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
    </svg>
  );
};
