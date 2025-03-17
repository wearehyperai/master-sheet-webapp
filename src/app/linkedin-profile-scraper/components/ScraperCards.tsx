"use client";

import React from 'react';
import { Zap } from 'lucide-react';
import { ScraperEndpoint } from '@/types/workflow';
import { getIconForTab } from '@/utils/scraperIcons';

interface ScraperCardsProps {
  scraperEndpoints: ScraperEndpoint[];
  onScraperClick: (scraper: ScraperEndpoint) => void;
}

const ScraperCards: React.FC<ScraperCardsProps> = ({ 
  scraperEndpoints, 
  onScraperClick 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {scraperEndpoints.map((endpoint) => (
        <div 
          key={endpoint.id} 
          className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer" 
          onClick={() => onScraperClick(endpoint)}
        >
          <div className="p-6">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                {getIconForTab(endpoint.tab)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">{endpoint.title}</h3>
              </div>
            </div>

            <p className="text-gray-600 mb-4 text-sm min-h-[40px]">{endpoint.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Zap className="text-yellow-500 mr-1" size={16} />
                <span className="text-sm font-medium text-gray-700">
                  {endpoint.credits} {endpoint.credits > 1 ? 'Credits' : 'Credit'}
                </span>
              </div>
              <button 
                className="text-sm px-3 py-1.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScraperCards;