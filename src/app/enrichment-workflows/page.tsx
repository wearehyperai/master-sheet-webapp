"use client";

import React, { useState, useEffect } from 'react';
import { EWorkflow, WorkflowTab, WorkflowView } from '@/types/workflow';
import { customWorkflowNodes } from '@/data/workflow';
import WorkflowTabs from './components/WorkflowTabs';
import WorkflowList from './components/WorkflowList';
import WorkflowDetail from './components/WorkflowDetail';
import CustomWorkflowForm from './components/CustomWorkflowForm';
import { findWorkflowById } from './components/workflowGens';

const EnrichmentWorkflows: React.FC = () => {
  // State for the view and data
  const [activeTab, setActiveTab] = useState<WorkflowTab>('all');
  const [currentView, setCurrentView] = useState<WorkflowView>('cards');
  const [selectedWorkflow, setSelectedWorkflow] = useState<EWorkflow | null>(null);
  const [currentNode, setCurrentNode] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>([]);

  // Initialize state for custom workflow options
  useEffect(() => {
    setSelectedOptions(Array(customWorkflowNodes.length).fill(null));
  }, []);

  // Tab selection handler
  const handleTabChange = (tab: WorkflowTab) => {
    setActiveTab(tab);
  };

  // View workflow detail
  const showWorkflowDetail = (id: number) => {
    const workflow = findWorkflowById(id);
    if (workflow) {
      setSelectedWorkflow(workflow);
      setCurrentView('detail');
      setCurrentNode(0);
    }
  };

  // Create custom workflow
  const createCustomWorkflow = () => {
    setCurrentView('custom');
    setCurrentNode(0);
    setSelectedOptions(Array(customWorkflowNodes.length).fill(null));
  };

  // Back to workflows listing
  const backToWorkflows = () => {
    setCurrentView('cards');
    setSelectedWorkflow(null);
  };

  // Handle option selection in custom workflow
  const handleOptionSelect = (nodeIndex: number, optionIndex: number | null) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[nodeIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  // Handle workflow submission
  const handleSubmitWorkflow = () => {
    alert('Workflow submitted!');
    backToWorkflows();
  };

  // Handle custom workflow creation
  const handleCreateWorkflow = () => {
    alert('Custom workflow created!');
    backToWorkflows();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-6">Enrichment Workflows</h1>
      
      {/* Tabs (Hide in detail view) */}
      {currentView === 'cards' && (
        <WorkflowTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}

      {/* Main content */}
      {currentView === 'cards' && (
        <WorkflowList
          activeTab={activeTab}
          onViewWorkflow={showWorkflowDetail}
          onCreateCustom={createCustomWorkflow}
        />
      )}

      {currentView === 'detail' && selectedWorkflow && (
        <WorkflowDetail
          workflow={selectedWorkflow}
          currentNode={currentNode}
          onBack={backToWorkflows}
          onNodeChange={setCurrentNode}
          onSubmit={handleSubmitWorkflow}
        />
      )}

      {currentView === 'custom' && (
        <CustomWorkflowForm
          nodes={customWorkflowNodes}
          currentNode={currentNode}
          selectedOptions={selectedOptions}
          onBack={backToWorkflows}
          onNodeChange={setCurrentNode}
          onOptionSelect={handleOptionSelect}
          onSubmit={handleCreateWorkflow}
        />
      )}
    </div>
  );
};

export default EnrichmentWorkflows;