import React from 'react';
import { Workflow } from '@/types/myWorkflows';
import WorkflowCard from './WorkflowCard';

interface WorkflowGridProps {
  workflows: Workflow[];
  onWorkflowSelect: (workflow: Workflow) => void;
}

const WorkflowGrid: React.FC<WorkflowGridProps> = ({ workflows, onWorkflowSelect }) => {
  if (workflows.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-medium text-gray-600">No workflows found</h3>
        <p className="text-gray-500 mt-2">
          Try changing your filter or create a new workflow.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workflows.map(workflow => (
        <WorkflowCard
          key={workflow.id} 
          workflow={workflow} 
          onClick={() => onWorkflowSelect(workflow)} 
        />
      ))}
    </div>
  );
};

export default WorkflowGrid;