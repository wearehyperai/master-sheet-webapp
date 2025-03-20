import React from 'react';

interface CustomWorkflowCardProps {
  onCreate: () => void;
}

const CustomWorkflowCard: React.FC<CustomWorkflowCardProps> = ({ onCreate }) => {
  return (
    <div className="bg-emerald-500 rounded-lg p-3 text-white">
      <h3 className="text-base font-bold mb-1">Custom workflow</h3>
      <p className="text-xs mb-3">Use this card to create the custom workflow based on your requirement and use this in your implementation.</p>
      <div className="flex justify-between items-center">
        <button className="bg-transparent text-white px-2 py-1 rounded border border-white text-xs">Custom</button>
        <button 
          className="bg-white text-emerald-500 px-2 py-1 rounded text-xs"
          onClick={onCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CustomWorkflowCard;