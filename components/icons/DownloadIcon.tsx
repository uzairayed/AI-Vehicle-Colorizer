import React from 'react';

const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    {...props}
  >
    <path d="M19.3,38.8v6c0,2.8,2.3,5.1,5.1,5.1h14c2.8,0,5.1-2.3,5.1-5.1v-6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M31.4,43.2v-24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M25.4,37.2l6,6l6-6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default DownloadIcon;