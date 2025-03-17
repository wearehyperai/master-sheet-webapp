import { Workflow } from '@/types/myWorkflows';
import { formatDate, formatDateTime } from '@/utils/myWorkflows';
import React, { useState } from 'react';
import ResponseTable from './ResponseTable';
import ApiCallsList from './ApiCallsList';

interface WorkflowDetailProps {
  workflow: Workflow;
}

const WorkflowDetail: React.FC<WorkflowDetailProps> = ({ workflow }) => {
  const [activeTab, setActiveTab] = useState<'response' | 'apiCalls'>('response');
  
  const {
    name,
    status,
    createdAt,
    lastRunAt,
    apiCalls,
    successfulRuns,
    failedRuns,
    totalCreditsConsumed,
    response,
    description
  } = workflow;
  
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <span 
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              status === 'completed' 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {status === 'completed' ? 'Completed' : 'Draft'}
          </span>
        </div>
        
        {description && (
          <p className="text-gray-600 mb-4">{description}</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-sm text-gray-500">Created</div>
            <div className="text-base font-medium text-gray-800">{formatDate(createdAt)}</div>
          </div>
          
          {lastRunAt && (
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="text-sm text-gray-500">Last Run</div>
              <div className="text-base font-medium text-gray-800">{formatDateTime(lastRunAt)}</div>
            </div>
          )}
          
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-sm text-gray-500">API Calls</div>
            <div className="text-base font-medium text-gray-800">{apiCalls.length}</div>
          </div>
          
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-sm text-gray-500">Runs</div>
            <div className="text-base font-medium text-gray-800">
              <span className="text-emerald-600">{successfulRuns}</span> / 
              <span className="text-red-600 ml-1">{failedRuns}</span>
            </div>
          </div>
          
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-sm text-gray-500">Credits Consumed</div>
            <div className="text-base font-medium text-gray-800">{totalCreditsConsumed}</div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px px-6">
          <button
            onClick={() => setActiveTab('response')}
            className={`mr-6 py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'response'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Response Data
          </button>
          <button
            onClick={() => setActiveTab('apiCalls')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'apiCalls'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            API Calls ({apiCalls.length})
          </button>
        </nav>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {activeTab === 'response' ? (
          response ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Response Data</h3>
                <div className="text-sm text-gray-500">
                  {formatDateTime(response.timestamp)}
                </div>
              </div>
              <ResponseTable data={response.data} />
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No response data available</p>
            </div>
          )
        ) : (
          <ApiCallsList apiCalls={apiCalls} />
        )}
      </div>
    </div>
  );
};

export default WorkflowDetail;