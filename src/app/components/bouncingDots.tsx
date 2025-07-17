'use client';

import React from 'react';

const BouncingDotsLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {[...Array(3)].map((_, index) => (
        <span
          key={index}
          className={`w-4 h-4 bg-white rounded-full animate-bounce`}
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
    </div>
  );
};

export default BouncingDotsLoader;
