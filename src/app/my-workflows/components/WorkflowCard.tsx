import { Workflow } from '@/types/myWorkflows';
import { formatDate } from '@/utils/myWorkflows';
import React from 'react';

interface WorkflowCardProps {
  workflow: Workflow;
  onClick: () => void;
}

const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, onClick }) => {
  const { name, status, lastRunAt, apiCalls, successfulRuns, failedRuns, totalCreditsConsumed } = workflow;
  
  // Calculate successful API calls percentage
  const totalAPIs = apiCalls.length;
  const successfulAPIs = apiCalls.filter(call => call.status === 'success').length;
  const successRate = totalAPIs > 0 ? Math.round((successfulAPIs / totalAPIs) * 100) : 0;
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{name}</h3>
          <span 
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              status === 'completed' 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {status === 'completed' ? 'Completed' : 'Draft'}
          </span>
        </div>
        
        {status === 'completed' && lastRunAt && (
          <div className="text-sm text-gray-600 mb-4">
            Last run: {formatDate(lastRunAt)}
          </div>
        )}
        
        {workflow.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {workflow.description}
          </p>
        )}
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="rounded-md bg-gray-50 p-2">
            <div className="text-xs text-gray-500">API Calls</div>
            <div className="text-lg font-semibold text-gray-700">{apiCalls.length}</div>
          </div>
          
          <div className="rounded-md bg-gray-50 p-2">
            <div className="text-xs text-gray-500">Success Rate</div>
            <div className="text-lg font-semibold text-gray-700">{successRate}%</div>
          </div>
          
          <div className="rounded-md bg-gray-50 p-2">
            <div className="text-xs text-gray-500">Runs</div>
            <div className="text-lg font-semibold text-gray-700">
              {successfulRuns + failedRuns}
              <span className="text-xs font-normal text-gray-500 ml-1">
                ({successfulRuns}/{failedRuns})
              </span>
            </div>
          </div>
          
          <div className="rounded-md bg-gray-50 p-2">
            <div className="text-xs text-gray-500">Credits</div>
            <div className="text-lg font-semibold text-gray-700">{totalCreditsConsumed}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCard;