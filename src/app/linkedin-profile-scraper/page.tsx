"use client";

import React, { useState } from 'react';
import { ScraperEndpoint } from '@/types/workflow';
import ScraperCards from './components/ScraperCards';
import scraperEndpoints from '@/data/scraperEndpoints';
import ScraperWorkflow from './components/ScraperWorkflow';

const LinkedInProfileScraper = () => {
  // State for managing views and selected scraper
  const [view, setView] = useState<'cards' | 'workflow'>('cards');
  const [selectedScraper, setSelectedScraper] = useState<ScraperEndpoint | null>(null);

  // Handle scraper card click
  const handleScraperClick = (scraper: ScraperEndpoint) => {
    setSelectedScraper(scraper);
    setView('workflow');
  };

  // Handle back button click
  const handleBackClick = () => {
    setView('cards');
    setSelectedScraper(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-7xl mx-auto px-4 pt-8 sm:px-6 lg:px-8">
       {view === 'cards' ? (
          <ScraperCards
            scraperEndpoints={scraperEndpoints} 
            onScraperClick={handleScraperClick} 
          />
        ) : (
          <ScraperWorkflow
            scraper={selectedScraper!} 
            onBack={handleBackClick} 
          />
        )}
      </div>
    </div>
  );
};

export default LinkedInProfileScraper;