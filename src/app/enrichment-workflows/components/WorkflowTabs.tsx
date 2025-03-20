import React from 'react';
import { WorkflowTab } from '@/types/workflow';

interface WorkflowTabsProps {
  activeTab: WorkflowTab;
  onTabChange: (tab: WorkflowTab) => void;
}

const WorkflowTabs: React.FC<WorkflowTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8">
        <button 
          className={`pb-2 ${activeTab === 'all' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}
          onClick={() => onTabChange('all')}
        >
          All workflows
        </button>
        <button 
          className={`pb-2 ${activeTab === 'email' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}
          onClick={() => onTabChange('email')}
        >
          Email workflows
        </button>
        <button 
          className={`pb-2 ${activeTab === 'linkedin' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}
          onClick={() => onTabChange('linkedin')}
        >
          LinkedIn URL workflows
        </button>
        <button 
          className={`pb-2 ${activeTab === 'website' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}
          onClick={() => onTabChange('website')}
        >
          Website workflows
        </button>
      </div>
    </div>
  );
};

export default WorkflowTabs;