"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, title, path, isActive }) => {
  return (
    <Link href={path} className={`flex items-center py-2 px-4 my-1 rounded-lg transition-colors ${
      isActive 
        ? 'bg-emerald-100 text-emerald-700 font-medium' 
        : 'bg-white hover:bg-gray-50 text-gray-700'
    }`}>
      <div className="mr-3">{icon}</div>
      <div>{title}</div>
    </Link>
  );
};

interface SidebarCategoryProps {
  title: string;
  children: React.ReactNode;
}

const SidebarCategory: React.FC<SidebarCategoryProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-3">
      <div 
        className="flex justify-between items-center py-2 px-3 cursor-pointer text-gray-700 hover:text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-semibold text-sm">{title}</h2>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};

interface NestedSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const NestedSection: React.FC<NestedSectionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="bg-white rounded-lg mb-2 shadow-sm">
      <div 
        className="flex justify-between items-center py-2.5 px-4 cursor-pointer border-l-2 border-transparent hover:border-emerald-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="text-gray-700 font-medium text-sm">{title}</div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      
      {isOpen && (
        <div className="px-2 pb-2">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  
  return (
    <div className="w-72 h-screen bg-gray-50 flex-shrink-0 border-r border-gray-200 font-sans">
      {/* Title instead of header */}
      <div className="py-5 px-4">
        <h1 className="text-xl font-bold text-emerald-600">Master Enrichment</h1>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div className="flex items-center bg-white rounded-lg p-2 border border-gray-200 shadow-sm">
          <Search className="text-gray-400 mr-2" size={16} />
          <input
            type="text"
            placeholder="Search data sources..."
            className="bg-transparent outline-none text-gray-600 w-full text-sm"
          />
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="px-4 overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}>
        {/* Data Enrichment Section */}
        <SidebarCategory title="DATA ENRICHMENT">
          <SidebarItem
            icon={<div className="text-emerald-500 w-5 flex justify-center">🔗</div>}
            title="Universal API connector"
            path="/universal-api"
            isActive={pathname === '/universal-api'}
          />
          <SidebarItem
            icon={<div className="text-emerald-500 w-5 flex justify-center">⚙️</div>}
            title="Enrichment Workflows"
            path="/enrichment-workflows"
            isActive={pathname === '/enrichment-workflows'}
          />
          <SidebarItem
            icon={<div className="text-emerald-500 w-5 flex justify-center">✏️</div>}
            title="Hyper Personalization"
            path="/hyper-personalization"
            isActive={pathname === '/hyper-personalization'}
          />
          <SidebarItem
            icon={<div className="text-emerald-500 w-5 flex justify-center">⚗️</div>}
            title="Enrichment Recipes"
            path="/enrichment-recipes"
            isActive={pathname === '/enrichment-recipes'}
          />
        </SidebarCategory>

        {/* Scrapers Section */}
        <SidebarCategory title="SCRAPERS">
          {/* Google Scrapers Subsection */}
          <NestedSection title="Google Scrapers">
            <Link href="/google-map-scraper" 
              className={`flex items-center py-2 px-3 my-1 rounded-md text-sm ${
                pathname === '/google-map-scraper' 
                  ? 'bg-emerald-50 text-emerald-600 font-medium' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}>
              <div className="text-emerald-500 mr-3 w-5 flex justify-center">📍</div>
              <div>Google Map Scraper</div>
            </Link>
          </NestedSection>

          {/* LinkedIn Scrapers Subsection */}
          <NestedSection title="LinkedIn Scrapers">
            <Link href="/linkedin-profile-scraper" 
              className={`flex items-center py-2 px-3 my-1 rounded-md text-sm ${
                pathname === '/linkedin-profile-scraper' 
                  ? 'bg-emerald-50 text-emerald-600 font-medium' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}>
              <div className="text-emerald-500 mr-3 w-5 flex justify-center">👤</div>
              <div>LinkedIn Profile Scraper</div>
            </Link>
            <Link href="/linkedin-like-scraper" 
              className={`flex items-center py-2 px-3 my-1 rounded-md text-sm ${
                pathname === '/linkedin-like-scraper' 
                  ? 'bg-emerald-50 text-emerald-600 font-medium' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}>
              <div className="text-emerald-500 mr-3 w-5 flex justify-center">👍</div>
              <div>LinkedIn Like Scraper</div>
            </Link>
          </NestedSection>
        </SidebarCategory>
      </div>
      
      {/* Quick actions button */}
      <div className="absolute bottom-6 left-6">
        <button className="bg-emerald-500 text-white p-3 rounded-full shadow-lg hover:bg-emerald-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;