import { WorkflowStatus } from '@/types/myWorkflows';
import React from 'react';

interface WorkflowFilterProps {
  selectedStatus: WorkflowStatus;
  onStatusChange: (status: WorkflowStatus) => void;
}

const WorkflowFilter: React.FC<WorkflowFilterProps> = ({ 
  selectedStatus, 
  onStatusChange 
}) => {
  return (
    <div className="relative">
      <select
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value as WorkflowStatus)}
        className="block appearance-none bg-white border border-gray-300 hover:border-emerald-400 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-emerald-400"
      >
        <option value="all">All Workflows</option>
        <option value="completed">Completed</option>
        <option value="draft">Draft</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default WorkflowFilter;