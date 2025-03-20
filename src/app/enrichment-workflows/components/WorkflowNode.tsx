import React from 'react';
import { WorkflowNode as NodeType } from '@/types/workflow';
import { getNodeIcon } from './workflowGens';


interface WorkflowNodeProps {
  node: NodeType;
  index: number;
  currentNode: number;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ node, index, currentNode }) => {
  return (
    <div 
      className={`flex items-center p-3 mb-3 rounded-md ${
        index === currentNode 
          ? 'bg-emerald-500 text-white' 
          : (index < currentNode 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-600')
      }`}
    >
      <div className={`bg-white p-1.5 rounded mr-2 ${
        index === currentNode 
          ? 'text-emerald-500' 
          : (index < currentNode 
            ? 'text-blue-500' 
            : 'text-gray-500')
      }`}>
        {getNodeIcon(node.name)}
      </div>
      <div>
        <h4 className="font-medium text-sm">{node.name}</h4>
        <p className="text-xs">{node.desc}</p>
      </div>
    </div>
  );
};

export default WorkflowNode;