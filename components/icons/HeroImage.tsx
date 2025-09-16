import React from 'react';

const HeroImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <filter id="sketch-filter" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="3" result="turbulence" seed="5"/>
        <feDisplacementMap in="SourceGraphic" in2="turbulence" scale={2} xChannelSelector="R" yChannelSelector="G" result="displacement"/>
      </filter>
      <linearGradient id="car-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="50%" stopColor="#d1d5db" /> 
        <stop offset="50%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    
    <g stroke="#333333" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#sketch-filter)">
      {/* Car Body with gradient */}
      <path fill="url(#car-gradient)" d="M190,65 C185,55 170,52 160,52 L145,52 L135,40 L75,40 L65,52 L40,52 C20,52 10,65 10,75 C10,80 15,85 25,85 L175,85 C185,85 190,80 190,75 V65 Z" />
      
      {/* Windows */}
      <path fill="#f7f4ed" d="M142,52 L134,42 L78,42 L68,52 Z" />
      
      {/* Wheels */}
      <circle cx="50" cy="83" r={10} fill="#333333" strokeWidth="2" />
      <circle cx="150" cy="83" r={10} fill="#333333" strokeWidth="2" />

      {/* Details */}
      <path d="M40,68 L20,68" />
      <path d="M160,68 L180,68" />
      <path d="M80,52 L85,65" />
    </g>
  </svg>
);

export default HeroImage;
