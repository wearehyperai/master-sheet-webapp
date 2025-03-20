import React from 'react';
import { CustomWorkflowNode as CustomNodeType } from '@/types/workflow';
import { getNodeIcon } from './workflowGens';

interface CustomWorkflowNodeProps {
  node: CustomNodeType;
  index: number;
  currentNode: number;
  selectedOption: number | null;
  onSelectOption: (nodeIndex: number, optionIndex: number | null) => void;
}

const CustomWorkflowNode: React.FC<CustomWorkflowNodeProps> = ({ 
  node, 
  index, 
  currentNode, 
  selectedOption,
  onSelectOption 
}) => {
  return (
    <div 
      className={`p-3 mb-3 rounded-md ${
        index === currentNode 
          ? 'bg-emerald-500 text-white' 
          : (index < currentNode 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-200 text-gray-600')
      }`}
    >
      <div className="flex items-center mb-2">
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

      {index <= currentNode ? (
        <select 
          className={`mt-2 block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none rounded-md border ${
            index === currentNode 
              ? 'border-white text-gray-800' 
              : 'border-blue-400 bg-blue-500 text-white'
          }`}
          value={selectedOption === null ? "" : selectedOption.toString()}
          onChange={(e) => onSelectOption(index, e.target.value === "" ? null : parseInt(e.target.value))}
          disabled={index !== currentNode}
        >
          <option value="">Select {node.name} option</option>
          {node.options.map((option, optIndex) => (
            <option key={optIndex} value={optIndex}>
              {option.name}
            </option>
          ))}
        </select>
      ) : (
        <div className="mt-2 text-xs italic">Complete previous steps first</div>
      )}
    </div>
  );
};

export default CustomWorkflowNode;