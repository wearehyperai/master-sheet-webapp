import React from 'react';
import { ArrowLeft } from 'lucide-react';
import CustomWorkflowNode from './CustomWorkflowNode';
import InputField from './InputField';
import { CustomWorkflowNode as CustomNodeType } from '@/types/workflow';

interface CustomWorkflowFormProps {
  nodes: CustomNodeType[];
  currentNode: number;
  selectedOptions: (number | null)[];
  onBack: () => void;
  onNodeChange: (index: number) => void;
  onOptionSelect: (nodeIndex: number, optionIndex: number | null) => void;
  onSubmit: () => void;
}

const CustomWorkflowForm: React.FC<CustomWorkflowFormProps> = ({
  nodes,
  currentNode,
  selectedOptions,
  onBack,
  onNodeChange,
  onOptionSelect,
  onSubmit
}) => {
  const handleNext = () => {
    if (currentNode < nodes.length - 1) {
      onNodeChange(currentNode + 1);
    } else {
      onSubmit();
    }
  };

  return (
    <div>
      {/* Back button */}
      <button onClick={onBack} className="flex items-center text-gray-600 mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to workflows
      </button>
      
      {/* Workflow header */}
      <h2 className="text-lg font-bold mb-2">Create Custom Workflow</h2>
      <p className="text-gray-600 text-sm mb-4">Define each step of your custom workflow</p>
      
      {/* Workflow content */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left column - Nodes */}
        <div className="w-full md:w-1/3">
          {nodes.map((node, index) => (
            <CustomWorkflowNode 
              key={node.node_id} 
              node={node} 
              index={index} 
              currentNode={currentNode}
              selectedOption={selectedOptions[index]}
              onSelectOption={onOptionSelect}
            />
          ))}
        </div>
        
        {/* Right column - Current node details */}
        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow">
          {currentNode < nodes.length && selectedOptions[currentNode] !== null ? (
            <>
              <h3 className="text-base font-bold mb-3">
                {nodes[currentNode].options[selectedOptions[currentNode] as number].name}
              </h3>

              {nodes[currentNode].options[selectedOptions[currentNode] as number].inputs.map((input, idx) => (
                <InputField key={idx} input={input} />
              ))}

              <div className="flex justify-between mt-6">
                {currentNode > 0 ? (
                  <button 
                    className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs"
                    onClick={() => onNodeChange(currentNode - 1)}
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button 
                  className="bg-emerald-500 text-white px-3 py-1.5 rounded text-xs"
                  onClick={handleNext}
                >
                  {currentNode === nodes.length - 1 ? 'Create Workflow' : 'Next'}
                </button>
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-sm italic">
              {currentNode < nodes.length && (
                `Please select a ${nodes[currentNode].name} option from the dropdown on the left`
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomWorkflowForm;