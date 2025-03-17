"use client";

import { dummyWorkflows } from '@/data/myWorkflows';
import { Workflow, WorkflowStatus } from '@/types/myWorkflows';
import React, { useState } from 'react';
import WorkflowFilter from './components/WorkflowFilter';
import WorkflowDetail from './components/WorkflowDetail';
import WorkflowGrid from './components/WorkflowGrid';

export default function MyWorkflows() {
  const [selectedStatus, setSelectedStatus] = useState<WorkflowStatus>('completed');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  
  // Filter workflows based on selected status
  const filteredWorkflows = dummyWorkflows.filter(workflow => 
    selectedStatus === 'all' || workflow.status === selectedStatus
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
         {selectedWorkflow ? <></> :   <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Workflows</h1>
        <WorkflowFilter
          selectedStatus={selectedStatus} 
          onStatusChange={setSelectedStatus} 
        />
      </div> }
     

      {selectedWorkflow ? (
        <div>
          <button 
            onClick={() => setSelectedWorkflow(null)}
            className="mb-4 text-emerald-600 font-medium flex items-center hover:text-emerald-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <WorkflowDetail workflow={selectedWorkflow} />
        </div>
      ) : (
        <WorkflowGrid 
          workflows={filteredWorkflows} 
          onWorkflowSelect={setSelectedWorkflow} 
        />
      )}
    </div>
  );
}