"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, Play, SquareArrowUpRight, Mail, Share2, Cog, Table, Plus } from 'lucide-react';
import { NodeOption, WorkflowNode } from '@/types/workflow';
import { RunTabProps } from '@/types/comps';
import InputRow from './InputRow';
import FileUploadSection from './FileUploadSection';

const RunTab: React.FC<RunTabProps> = ({
  nodes,
  currentNode,
  selectedOptions,
  completedNodes,
  isScraperMode = false,
  showFileUpload = false,
  inputValues,
  inputRowsCount,
  onUpdateInputValue,
  onAddInputRow,
  onRemoveInputRow,
  onPreviousNode,
  onNextNode,
  onSubmit
}) => {
  // Get icon based on node name
  const getNodeIcon = (nodeName: string) => {
    if (nodeName.includes('Extract') || nodeName.includes('Scraper')) return <Table className="h-4 w-4" />;
    if (nodeName.includes('Profile')) return <SquareArrowUpRight className="h-4 w-4" />;
    if (nodeName.includes('Email')) return <Mail className="h-4 w-4" />;
    if (nodeName.includes('Integration')) return <Share2 className="h-4 w-4" />;
    return <Cog className="h-4 w-4" />;
  };

  // Get node status class (for styling)
  const getNodeStatusClass = (nodeIndex: number): string => {
    if (nodeIndex === currentNode) return 'border-2 border-emerald-500 bg-white text-gray-700';
    if (nodeIndex < currentNode) return 'bg-emerald-100 text-emerald-700';
    return 'bg-gray-200 text-gray-600';
  };

  // Get option by ID
  const getOptionById = (nodeIndex: number, optionId: string): NodeOption | undefined => {
    if (!nodes[nodeIndex] || !nodes[nodeIndex].options) {
      return undefined;
    }
    return nodes[nodeIndex]?.options.find((option: NodeOption) => option.id === optionId);
  };

  // Handle next action
  const handleNext = (): void => {
    if (currentNode === nodes.length - 1 || (isScraperMode && currentNode === getLastSelectedNodeIndex())) {
      onSubmit();
    } else {
      onNextNode();
    }
  };

  // Get the index of the last selected node
  const getLastSelectedNodeIndex = (): number => {
    if (isScraperMode) {
      // For scraper mode, find the last consecutive completed node
      let lastIndex = 0;
      for (let i = 0; i < completedNodes.length; i++) {
        if (completedNodes[i]) {
          lastIndex = i;
        } else {
          break;
        }
      }
      return lastIndex;
    }
    
    return nodes.length - 1;
  };

  // Get the current option details
  const currentOption = selectedOptions[currentNode]
    ? getOptionById(currentNode, selectedOptions[currentNode] as string)
    : null;

  // Function to determine if this is the last node
  const isLastNode = (): boolean => {
    if (isScraperMode) {
      return currentNode === getLastSelectedNodeIndex();
    }
    return currentNode === nodes.length - 1;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-[calc(100vh-242px)] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Run Your Workflow</h2>
      <p className="text-gray-600 text-sm mb-6">
        Provide inputs for each step to execute your workflow.
      </p>
      
      {/* File Upload (Optional) */}
      {showFileUpload && <FileUploadSection />}
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - Nodes */}
        <div className="w-full md:w-1/3">
          {nodes.map((node: WorkflowNode, index: number) => {
            // For scraper mode, only show nodes that have been selected
            if (isScraperMode && index > 0 && !completedNodes[index-1]) {
              return null;
            }
            
            return (
              <div 
                key={node.node_id}
                className={`p-4 mb-3 rounded-md transition-all ${getNodeStatusClass(index)}`}
              >
                <div className="flex items-center">
                  <div className="bg-white p-1.5 rounded mr-2 text-emerald-500 shadow-sm">
                    {getNodeIcon(node.name)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{node.name}</h4>
                    <p className="text-xs opacity-75 max-w-[180px] truncate">
                      {getOptionById(index, selectedOptions[index] as string)?.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Right column - Current node inputs */}
        <div className="w-full md:w-2/3 bg-gray-50 p-6 rounded-lg">
          {currentOption && (
            <>
              <h3 className="text-lg font-semibold mb-2">
                {currentOption.name}
              </h3>
              <p className="text-gray-600 mb-4">{nodes[currentNode].desc}</p>
              
              <div className="bg-white p-4 rounded-md border border-gray-200">
                {/* Add input row button */}
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Input Parameters</h4>
                  <button
                    type="button"
                    onClick={onAddInputRow}
                    className="text-emerald-500 hover:text-emerald-700 flex items-center space-x-1 text-sm"
                  >
                    <Plus size={16} />
                    <span>Add Row</span>
                  </button>
                </div>
                
                {/* Input fields */}
                {currentOption.inputs.map((input, inputIdx) => (
                  <div key={inputIdx} className="mb-4">
                    <div className="flex items-center space-x-1 mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {input.label}
                      </label>
                      {input.required && (
                        <span className="text-red-500 text-xs">Required</span>
                      )}
                      {input.description && (
                        <span className="text-gray-400 text-xs italic ml-1">({input.description})</span>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      {Array.from({ length: inputRowsCount }).map((_, rowIdx) => (
                        <InputRow
                          key={rowIdx}
                          input={input}
                          value={inputValues[input.label]?.[rowIdx] || ""}
                          index={rowIdx}
                          onChange={(value) => onUpdateInputValue(input.label, rowIdx, value)}
                          onRemove={() => onRemoveInputRow(rowIdx)}
                          canRemove={rowIdx > 0}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button 
                  type="button"
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm flex items-center"
                  onClick={onPreviousNode}
                  disabled={currentNode === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </button>
                
                <button 
                  type="button"
                  className="bg-emerald-500 text-white px-4 py-2 rounded text-sm flex items-center"
                  onClick={handleNext}
                >
                  {isLastNode() ? (
                    <>
                      Submit
                      <Play className="h-4 w-4 ml-1" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunTab;