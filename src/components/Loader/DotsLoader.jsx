import React from 'react';

const DotsLoader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full space-x-2">
      <span className="w-5 h-5 rounded-full bg-purple-300 animate-pulse [animation-delay:-0.3s]" />
      <span className="w-5 h-5 rounded-full bg-purple-400 animate-pulse [animation-delay:-0.1s]" />
      <span className="w-5 h-5 rounded-full bg-purple-500 animate-pulse [animation-delay:0.1s]" />
    </div>
  );
};

export default DotsLoader;
