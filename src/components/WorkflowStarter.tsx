"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Code, Terminal } from 'lucide-react';
import { ApiInfo, WorkflowNode, WorkflowConfig } from '@/types/workflow';
import BuildTab from './BuildTab';
import RunTab from './RunTab';
import ApiDocumentation from './ApiDocTab';

interface WorkflowStarterProps {
  apiInfo: ApiInfo;
  nodes: WorkflowNode[];
  handleBackClick?: () => void;
  config?: WorkflowConfig;
}

const WorkflowStarter: React.FC<WorkflowStarterProps> = ({ 
  apiInfo, 
  nodes, 
  handleBackClick,
  config = {} 
}) => {
  // Config defaults
  const isScraperMode = config.isScraperMode || false;
  const initialScraperId = config.initialScraperId || null;
  const allowFileUpload = config.allowFileUpload || false;
  // const showSheetConfig = config.showSheetConfig !== undefined ? config.showSheetConfig : true;
  
  // Main tabs
  const [activeMainTab, setActiveMainTab] = useState<'api' | 'ui'>('api');
  
  // UI subtabs
  const [activeUITab, setActiveUITab] = useState<'build' | 'run'>('build');
  
  // Node state
  const [currentNode, setCurrentNode] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(string | null)[]>([]);
  const [completedNodes, setCompletedNodes] = useState<boolean[]>([]);
  
  // Input state for Run tab
  const [inputValues, setInputValues] = useState<Record<string, string[]>>({});
  const [inputRowsCount, setInputRowsCount] = useState(1);
  
  // Copy state
  const [copied, setCopied] = useState(false);

  // Initialize state
  useEffect(() => {
    // Setup array of selected options
    const initialSelectedOptions = Array(nodes.length).fill(null);
    
    // If in scraper mode, set first node to the initial scraper
    if (isScraperMode && initialScraperId) {
      initialSelectedOptions[0] = initialScraperId;
    }
    
    setSelectedOptions(initialSelectedOptions);
    
    // Setup completed nodes
    const initialCompletedNodes = Array(nodes.length).fill(false);
    
    // If in scraper mode, mark first node as completed
    if (isScraperMode && initialScraperId) {
      initialCompletedNodes[0] = true;
    }
    
    setCompletedNodes(initialCompletedNodes);
    
    // Initialize input values for the first node or scraper
    if (isScraperMode && initialScraperId) {
      const option = nodes[0]?.options.find(opt => opt.id === initialScraperId);
      if (option) {
        const initialInputs: Record<string, string[]> = {};
        option.inputs.forEach(input => {
          initialInputs[input.label] = Array(inputRowsCount).fill('');
        });
        setInputValues(initialInputs);
      }
    }
  }, [nodes, isScraperMode, initialScraperId, inputRowsCount]);

  // Handle option selection in build phase
  const handleOptionSelect = (nodeIndex: number, optionId: string | null) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[nodeIndex] = optionId;
    setSelectedOptions(newSelectedOptions);

    const newCompletedNodes = [...completedNodes];
    newCompletedNodes[nodeIndex] = optionId !== null;
    setCompletedNodes(newCompletedNodes);
    
    // Reset input values if this node's option changed
    if (optionId !== null) {
      const option = nodes[nodeIndex]?.options.find(opt => opt.id === optionId);
      if (option) {
        const initialInputs: Record<string, string[]> = {};
        option.inputs.forEach(input => {
          initialInputs[input.label] = Array(inputRowsCount).fill('');
        });
        setInputValues(prev => ({...prev, ...initialInputs}));
      }
    }
  };

  // Handle previous node in navigation
  const handlePreviousNode = () => {
    if (currentNode > 0) {
      setCurrentNode(prev => prev - 1);
    }
  };

  // Handle next node in navigation
  const handleNextNode = () => {
    if (currentNode < nodes.length - 1) {
      setCurrentNode(prev => prev + 1);
    }
  };

  // Switch to Run tab
  const handleProceedToRun = () => {
    setActiveUITab('run');
    setCurrentNode(0);
  };

  // Handle Copy button click for curl command
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Input handling functions for Run tab
  const handleUpdateInputValue = (fieldName: string, index: number, value: string) => {
    const newInputValues = { ...inputValues };
    if (!newInputValues[fieldName]) {
      newInputValues[fieldName] = Array(inputRowsCount).fill('');
    }
    newInputValues[fieldName][index] = value;
    setInputValues(newInputValues);
  };

  const handleAddInputRow = () => {
    setInputRowsCount(prev => prev + 1);
    
    // Add a new empty value to all parameter arrays
    const newInputValues = { ...inputValues };
    Object.keys(newInputValues).forEach(key => {
      if (!newInputValues[key]) {
        newInputValues[key] = [];
      }
      newInputValues[key] = [...newInputValues[key], ""];
    });
    
    setInputValues(newInputValues);
  };

  const handleRemoveInputRow = (index: number) => {
    if (inputRowsCount <= 1) return;
    
    setInputRowsCount(prev => prev - 1);
    
    // Remove value at index from all parameter arrays
    const newInputValues = { ...inputValues };
    Object.keys(newInputValues).forEach(key => {
      newInputValues[key] = newInputValues[key].filter((_, i) => i !== index);
    });
    
    setInputValues(newInputValues);
  };

  // Submit function
  const handleSubmit = () => {
    console.log("Workflow submitted with the following data:");
    console.log("Selected options:", selectedOptions);
    console.log("Input values:", inputValues);
    
    // In a real application, you would send this data to your backend
    // For now, just show an alert
    alert('Workflow submitted successfully!');
    
    // Reset to initial state
    setActiveMainTab('api');
    setActiveUITab('build');
    setCurrentNode(0);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-100 h-[calc(100vh-82px)] overflow-y-auto">
      {/* Main tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex">
          {/* Back button */}
              <button
                onClick={handleBackClick}
                className="flex items-center text-blue-500 hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
              </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${
              activeMainTab === 'api' 
                ? 'border-b-2 border-emerald-500 text-emerald-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveMainTab('api')}
          >
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-2" />
              API
            </div>
          </button>
          <button 
            className={`px-4 py-2 font-medium text-sm ${
              activeMainTab === 'ui' 
                ? 'border-b-2 border-emerald-500 text-emerald-700' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveMainTab('ui')}
          >
            <div className="flex items-center">
              <Terminal className="h-4 w-4 mr-2" />
              UI
            </div>
          </button>
        </div>
      </div>

      {/* UI subtabs - Only show if main tab is 'ui' */}
      {activeMainTab === 'ui' && (
        <div className="mb-6">
          <div className="inline-flex bg-gray-200 rounded-lg p-1">
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                activeUITab === 'build' 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveUITab('build')}
            >
              Build
            </button>
            <button 
              className={`px-4 py-1.5 text-sm font-medium rounded-md ${
                activeUITab === 'run' 
                  ? 'bg-white text-emerald-700 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveUITab('run')}
              disabled={!isScraperMode && !completedNodes.every(Boolean)}
            >
              Run
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      {activeMainTab === 'api' && (
        <ApiDocumentation 
          apiInfo={apiInfo} 
          copied={copied} 
          onCopy={handleCopy} 
        />
      )}
      
      {activeMainTab === 'ui' && activeUITab === 'build' && (
        <BuildTab 
          nodes={nodes}
          currentNode={currentNode}
          selectedOptions={selectedOptions}
          completedNodes={completedNodes}
          isScraperMode={isScraperMode}
          initialScraperId={initialScraperId as string}
          onSelectOption={handleOptionSelect}
          onPreviousNode={handlePreviousNode}
          onNextNode={handleNextNode}
          onProceedToRun={handleProceedToRun}
        />
      )}
      
      {activeMainTab === 'ui' && activeUITab === 'run' && (
        <RunTab 
          nodes={nodes}
          currentNode={currentNode}
          selectedOptions={selectedOptions}
          completedNodes={completedNodes}
          isScraperMode={isScraperMode}
          showFileUpload={allowFileUpload}
          inputValues={inputValues}
          inputRowsCount={inputRowsCount}
          onUpdateInputValue={handleUpdateInputValue}
          onAddInputRow={handleAddInputRow}
          onRemoveInputRow={handleRemoveInputRow}
          onPreviousNode={handlePreviousNode}
          onNextNode={handleNextNode}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default WorkflowStarter;