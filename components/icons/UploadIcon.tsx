import React from 'react';

const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    {...props}
  >
    <path d="M14.8,31.1C14.8,31.1,14,31,14,31c-5.1,0-9.3,4.2-9.3,9.3c0,0,0,0.1,0,0.1c0,5.1,4.2,9.3,9.3,9.3h33.8c4.2,0,7.6-3.4,7.6-7.6s-3.4-7.6-7.6-7.6c0-0.2,0-0.4,0-0.6c0-6.5-5.3-11.8-11.8-11.8c-4.4,0-8.3,2.4-10.4,6c-0.6-0.1-1.2-0.2-1.8-0.2C21.2,27.5,17.4,28.8,14.8,31.1z" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M31.3,31.8l-0.1-12.8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M26.3,24l5-5l5,5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default UploadIcon;