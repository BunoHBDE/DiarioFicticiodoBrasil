import React from 'react';

const BrightnessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a4.5 4.5 0 00-4.5 4.5v.008c0 .093.005.185.014.275a4.502 4.502 0 008.972 0c.009-.09.014-.182.014-.275v-.008A4.5 4.5 0 0012 12z" />
    </svg>
);

export default BrightnessIcon;
