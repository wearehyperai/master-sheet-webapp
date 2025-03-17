"use client";

import React from 'react';
import { 
  User, 
  Building, 
  Filter, 
  Newspaper, 
  ThumbsUp, 
  MessageSquare, 
  Megaphone, 
  Search, 
  Briefcase, 
  MapPin, 
  Link
} from 'lucide-react';

/**
 * Get the appropriate icon for a scraper tab
 */
export function getIconForTab(tab: string): React.ReactNode {
  const iconMap: Record<string, React.ReactNode> = {
    personData: <User className="text-blue-500" />,
    personDataURN: <User className="text-blue-500" />,
    companyData: <Building className="text-blue-500" />,
    searchPeopleWithFilters: <Filter className="text-blue-500" />,
    personUpdates: <Newspaper className="text-blue-500" />,
    postReactions: <ThumbsUp className="text-blue-500" />,
    postComments: <MessageSquare className="text-blue-500" />,
    companyUpdates: <Megaphone className="text-blue-500" />,
    searchPosts: <Search className="text-blue-500" />,
    searchJobs: <Briefcase className="text-blue-500" />,
    locateAndSearch: <MapPin className="text-red-500" />,
    searchPeopleViaURL: <Link className="text-blue-500" />,
    searchCompanyViaURL: <Building className="text-blue-500" />,
  };

  return iconMap[tab] || <User className="text-blue-500" />;
}