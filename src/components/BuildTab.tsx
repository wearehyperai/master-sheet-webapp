"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, Play, SquareArrowUpRight, Mail, Share2, Cog, Table } from 'lucide-react';
import { NodeOption, WorkflowNode } from '@/types/workflow';

interface BuildTabProps {
  nodes: WorkflowNode[];
  currentNode: number;
  selectedOptions: (string | null)[];
  completedNodes: boolean[];
  isScraperMode?: boolean;
  initialScraperId?: string;
  onSelectOption: (nodeIndex: number, optionId: string | null) => void;
  onPreviousNode: () => void;
  onNextNode: () => void;
  onProceedToRun: () => void;
}

const BuildTab: React.FC<BuildTabProps> = ({
  nodes,
  currentNode,
  selectedOptions,
  completedNodes,
  isScraperMode = false,
  initialScraperId,
  onSelectOption,
  onPreviousNode,
  onNextNode,
  onProceedToRun
}) => {
  // Get icon based on node name
  const getNodeIcon = (nodeName: string) => {
    if (nodeName.includes('Extract') || nodeName.includes('Scraper')) return <Table className="h-4 w-4" />;
    if (nodeName.includes('Profile')) return <SquareArrowUpRight className="h-4 w-4" />;
    if (nodeName.includes('Email')) return <Mail className="h-4 w-4" />;
    if (nodeName.includes('Integration')) return <Share2 className="h-4 w-4" />;
    return <Cog className="h-4 w-4" />;
  };

  // Check if a node is selectable
  const isNodeSelectable = (nodeIndex: number) => {
    if (nodeIndex === 0) return true;
    return completedNodes[nodeIndex - 1];
  };

  // Get node status class (for styling)
  const getNodeStatusClass = (nodeIndex: number) => {
    if (nodeIndex === currentNode) return 'border-2 border-emerald-500 bg-white text-gray-700';
    if (completedNodes[nodeIndex]) return 'bg-emerald-100 text-emerald-700';
    return 'bg-gray-200 text-gray-600';
  };

  // Get option by ID
  const getOptionById = (nodeIndex: number, optionId: string): NodeOption | undefined => {
    return nodes[nodeIndex]?.options.find(option => option.id === optionId);
  };

  // Handle next action
  const handleNext = () => {
    if (currentNode === nodes.length - 1) {
      onProceedToRun();
    } else {
      onNextNode();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-[calc(100vh-242px)] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Build Your Workflow</h2>
      <p className="text-gray-600 text-sm mb-6">
        {isScraperMode 
          ? "The scraper is already selected. You can optionally add more steps to your workflow."
          : "Complete all steps below to configure your workflow, then proceed to Run."
        }
      </p>
      
      {/* Centered Node Builder */}
      <div className="max-w-2xl mx-auto">
        {nodes.map((node, index) => (
          <div 
          key={node.node_id}
          className={`p-4 mb-4 rounded-md transition-all ${getNodeStatusClass(index)}`}
          style={{ cursor: isNodeSelectable(index) ? 'default' : 'not-allowed' }}
        >
          <div className="flex justify-between items-start">
            {/* Left side - Node description */}
            <div className="flex items-center">
              <div className="bg-white p-1.5 rounded mr-3 text-emerald-500 shadow-sm">
                {getNodeIcon(node.name)}
              </div>
              <div>
                <h4 className="font-medium text-sm">{node.name}</h4>
                <p className="text-xs opacity-75">{node.desc}</p>
              </div>
            </div>
        
            {/* Right side - Dropdown or selection info */}
            <div className="ml-4 min-w-[200px] flex-shrink-0">
              {isNodeSelectable(index) ? (
                <>
                  {index === currentNode ? (
                    // If it's scraper mode and this is the first node, show the preselected scraper
                    isScraperMode && index === 0 ? (
                      <div className="text-sm font-medium text-emerald-700 p-2 bg-emerald-50 rounded-md">
                        Selected: {getOptionById(index, initialScraperId || '')?.name || "Scraper"}
                      </div>
                    ) : (
                      // Otherwise, show the dropdown to select an option
                      <select 
                        className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        value={selectedOptions[index] || ""}
                        onChange={(e) => onSelectOption(index, e.target.value || null)}
                      >
                        <option value="">Select an option...</option>
                        {node.options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    )
                  ) : completedNodes[index] ? (
                    // If node is completed, show the selected option
                    <div className="text-sm font-medium text-emerald-700 p-2 bg-emerald-50 rounded-md">
                      Selected: {getOptionById(index, selectedOptions[index] as string)?.name || "Option selected"}
                    </div>
                  ) : null}
                </>
              ) : (
                // If node is not selectable, show a message
                <div className="text-xs italic text-gray-500 p-2 bg-gray-50 rounded-md">
                  Complete previous steps first
                </div>
              )}
            </div>
          </div>
        </div>
        ))}

        {/* Navigation buttons - Centered at bottom */}
        <div className="flex justify-between mt-6">
          <button 
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm flex items-center disabled:opacity-50"
            onClick={onPreviousNode}
            disabled={currentNode === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </button>
          
          <button 
            className="bg-emerald-500 text-white px-4 py-2 rounded text-sm flex items-center disabled:opacity-50"
            onClick={handleNext}
            disabled={isScraperMode && currentNode === 0 ? false : !selectedOptions[currentNode]}
          >
            {currentNode === nodes.length - 1 ? (
              <>
                Proceed to Run
                <Play className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Next Step
                <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildTab;