import React from 'react';
import { EWorkflow } from '@/types/workflow';

interface WorkflowCardProps {
  workflow: EWorkflow;
  onView: (id: number) => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onView }) => {
  return (
    <div className="bg-white rounded-lg p-3 shadow-md">
      <h3 className="text-base font-bold mb-1">{workflow.name}</h3>
      <p className="text-xs text-gray-600 mb-3">{workflow.desc}</p>
      <div className="flex justify-between items-center">
        <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">{workflow.input[0]}</button>
        <button 
          className="bg-emerald-500 text-white px-2 py-1 rounded text-xs"
          onClick={() => onView(workflow.id)}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default WorkflowCard;