import React from 'react';
import { Brain, Database, FileDown, MessageSquare, Zap, Link as LinkIcon, Settings, Edit, Globe, MapPin, User, ThumbsUp, Search as SearchIcon, Beaker, Combine, Workflow } from 'lucide-react';
import { CategoryData } from '@/types/comps';

// Centralized sidebar data structure
export const sidebarStructure: CategoryData[] = [
  {
    id: 'my-workflows',
    title: 'MY WORKFLOWS',
    icon: <Workflow size={18} className="text-emerald-500" />,
    items: [
      { id: 'my-all-workflow', icon: <Workflow size={16} className="text-emerald-500" />, title: 'My workflows', path: '/my-workflows' }
    ]
  },
  {
    id: 'api-kit',
    title: 'API KIT',
    icon: <Combine size={18} className="text-emerald-500" />,
    items: [
      { id: 'my-api-kit', icon: <Combine size={16} className="text-emerald-500" />, title: 'API Kit', path: '/api-kit' }
    ]
  },
  {
    id: 'ai-tools',
    title: 'AI TOOLS',
    icon: <Brain size={18} className="text-emerald-500" />,
    items: [
      { id: 'ask-ai', icon: <MessageSquare size={16} className="text-emerald-500" />, title: 'Ask AI', path: '/ask-ai' },
      { id: 'extract-ai', icon: <FileDown size={16} className="text-emerald-500" />, title: 'Extract AI', path: '/extract-ai' },
    ]
  },
  {
    id: 'data-bank',
    title: 'DATA BANK',
    icon: <Database size={18} className="text-emerald-500" />,
    items: [
      { id: 'data-sources', icon: <Database size={16} className="text-emerald-500" />, title: 'Data Sources', path: '/data-sources' },
      { id: 'data-pipelines', icon: <Zap size={16} className="text-emerald-500" />, title: 'Data Pipelines', path: '/data-pipelines' },
    ]
  },
  {
    id: 'data-enrichment',
    title: 'DATA ENRICHMENT',
    icon: <Zap size={18} className="text-emerald-500" />,
    items: [
      { id: 'universal-api', icon: <LinkIcon size={16} className="text-emerald-500" />, title: 'Universal API connector', path: '/universal-api' },
      { id: 'enrichment-workflows', icon: <Settings size={16} className="text-emerald-500" />, title: 'Enrichment Workflows', path: '/enrichment-workflows' },
      { id: 'hyper-personalization', icon: <Edit size={16} className="text-emerald-500" />, title: 'Hyper Personalization', path: '/hyper-personalization' },
      { id: 'enrichment-recipes', icon: <Beaker size={16} className="text-emerald-500" />, title: 'Enrichment Recipes', path: '/enrichment-recipes' },
    ]
  },
  {
    id: 'scrapers',
    title: 'SCRAPERS',
    icon: <Globe size={18} className="text-emerald-500" />,
    nested: [
      {
        id: 'google-scrapers',
        title: 'Google Scrapers',
        items: [
          { id: 'google-map-scraper', icon: <MapPin size={16} className="text-emerald-500" />, title: 'Google Map Scraper', path: '/google-map-scraper' },
        ]
      },
      {
        id: 'linkedin-scrapers',
        title: 'LinkedIn Scrapers',
        items: [
          { id: 'linkedin-profile-scraper', icon: <User size={16} className="text-emerald-500" />, title: 'LinkedIn Profile Scraper', path: '/linkedin-profile-scraper' },
          { id: 'linkedin-like-scraper', icon: <ThumbsUp size={16} className="text-emerald-500" />, title: 'LinkedIn Like Scraper', path: '/linkedin-like-scraper' },
          { id: 'linkedin-profile-finder', icon: <SearchIcon size={16} className="text-emerald-500" />, title: 'LinkedIn Profile Finder', path: '/linkedin-profile-finder' },
        ]
      }
    ]
  }
];