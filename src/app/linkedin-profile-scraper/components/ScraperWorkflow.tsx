"use client";

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import WorkflowStarter from '@/components/WorkflowStarter';
import { ScraperEndpoint } from '@/types/workflow';
import { convertScraperToApiInfo, createScraperWorkflowNodes } from '@/utils/scraperAdaptors';

interface ScraperWorkflowProps {
  scraper: ScraperEndpoint;
  onBack: () => void;
}

const ScraperWorkflow: React.FC<ScraperWorkflowProps> = ({ 
  scraper, 
  onBack 
}) => {
  // Convert scraper to ApiInfo and WorkflowNodes for the WorkflowStarter component
  const apiInfo = convertScraperToApiInfo(scraper);
  const workflowNodes = createScraperWorkflowNodes([scraper]);

  return (
    <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-64px)] overflow-y-auto">
      {/* Header with back button */}
      <div className="p-4 border-b flex items-center">
        <button 
          onClick={onBack}
          className="mr-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-medium">{scraper.title}</h2>
      </div>
      
      {/* Workflow component */}
      <div className="p-4">
        <WorkflowStarter 
          apiInfo={apiInfo} 
          nodes={workflowNodes} 
          config={{
            isScraperMode: true,
            initialScraperId: scraper.tab,
            allowFileUpload: true,
            showSheetConfig: false
          }}
        />
      </div>
    </div>
  );
};

export default ScraperWorkflow;