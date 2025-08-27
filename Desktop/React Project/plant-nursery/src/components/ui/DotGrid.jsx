import React from 'react';

const DotGrid = () => {
  return (
    <div 
      className="absolute top-0 left-0 w-full h-full"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    ></div>
  );
};

export default DotGrid;
