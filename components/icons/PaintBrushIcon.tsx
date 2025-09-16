import React from 'react';

const PaintBrushIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M13.5,3.5l7,7" />
    <path d="M5.5,15.5l-2,2c-1,1-1,2.5,0,3.5l1,1c1,1,2.5,1,3.5,0l2-2" />
    <path d="M13.5,3.5l-9,9" />
    <path d="M17.5,7.5l-9,9" />
    <path d="M20.5,10.5c-1,2-3,3-5,2s-3-3-2-5l7,3z" />
  </svg>
);

export default PaintBrushIcon;