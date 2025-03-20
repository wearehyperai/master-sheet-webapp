import React from 'react';
import { ArrowLeft } from 'lucide-react';
import WorkflowNode from './WorkflowNode';
import { EWorkflow } from '@/types/workflow';

interface WorkflowDetailProps {
  workflow: EWorkflow;
  currentNode: number;
  onBack: () => void;
  onNodeChange: (index: number) => void;
  onSubmit: () => void;
}

const WorkflowDetail: React.FC<WorkflowDetailProps> = ({ 
  workflow, 
  currentNode, 
  onBack, 
  onNodeChange, 
  onSubmit 
}) => {
  const handleNext = () => {
    if (currentNode < workflow.nodes.length - 1) {
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
      <h2 className="text-lg font-bold mb-2">{workflow.name}</h2>
      <p className="text-gray-600 text-sm mb-4">{workflow.desc}</p>
      
      {/* Workflow content */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left column - Nodes */}
        <div className="w-full md:w-1/3">
          {workflow.nodes.map((node, index) => (
            <WorkflowNode 
              key={node.node_id} 
              node={node} 
              index={index} 
              currentNode={currentNode} 
            />
          ))}
        </div>
        
        {/* Right column - Current node details */}
        <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow">
          {currentNode < workflow.nodes.length && (
            <>
              <h3 className="text-base font-bold mb-3">{workflow.nodes[currentNode].name}</h3>
              
              {workflow.nodes[currentNode].input.map((input, idx) => (
                <div key={idx} className="mb-3">
                  <label className="block text-xs font-medium text-gray-700 mt-3">{input}</label>
                  <select className="mt-1 block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md border">
                    <option>Select {input.toLowerCase()}</option>
                  </select>
                </div>
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
                  {currentNode === workflow.nodes.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowDetail;