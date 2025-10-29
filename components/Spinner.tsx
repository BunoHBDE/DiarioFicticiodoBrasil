
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-accent"></div>
      <p className="ml-4 text-ink font-semibold">Gerando as notícias do dia...</p>
    </div>
  );
};

export default Spinner;
