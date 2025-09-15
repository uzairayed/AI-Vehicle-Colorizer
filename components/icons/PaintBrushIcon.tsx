
import React from 'react';

const PaintBrushIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    {...props}
  >
    <path d="M14.46 2.6L3.189 13.872a2.91 2.91 0 00-.81 1.954v2.54a1 1 0 001 1h2.54a2.91 2.91 0 001.954-.81l11.272-11.272a3.885 3.885 0 00-5.5-5.5zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    <path d="M19.95 2.54a1 1 0 00-1.414 0l-1.06 1.06-4.524 4.524 5.5 5.5 4.524-4.524 1.06-1.06a1 1 0 000-1.414l-4.086-4.086z" />
  </svg>
);

export default PaintBrushIcon;
