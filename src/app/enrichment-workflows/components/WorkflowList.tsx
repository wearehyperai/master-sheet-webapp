import React from 'react';
import WorkflowCard from './WorkflowCard';
import CustomWorkflowCard from './CustomWorkflowCard';
import { filterWorkflows } from './workflowGens';

interface WorkflowListProps {
  activeTab: string;
  onViewWorkflow: (id: number) => void;
  onCreateCustom: () => void;
}

const WorkflowList: React.FC<WorkflowListProps> = ({ 
  activeTab, 
  onViewWorkflow, 
  onCreateCustom 
}) => {
  const filteredWorkflows = filterWorkflows(activeTab);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {/* Custom workflow card */}
      <CustomWorkflowCard onCreate={onCreateCustom} />

      {/* Workflow cards */}
      {filteredWorkflows.map(workflow => (
        <WorkflowCard 
          key={workflow.id} 
          workflow={workflow} 
          onView={onViewWorkflow} 
        />
      ))}
    </div>
  );
};

export default WorkflowList;