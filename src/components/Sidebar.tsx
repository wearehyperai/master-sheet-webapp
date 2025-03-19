"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  MessageSquare, 
  Database, 
  FileDown, 
  Brain,
  Zap,
  Link as LinkIcon,
  Settings,
  Edit,
  Globe,
  MapPin,
  User,
  ThumbsUp,
  Search as SearchIcon,
  Beaker,
  Combine,
  Workflow
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  path: string;
  isActive?: boolean;
}

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  path: string;
}

interface NestedSectionData {
  id: string;
  title: string;
  items: SidebarItem[];
}

interface CategoryData {
  id: string;
  title: string;
  icon: React.ReactNode;
  items?: SidebarItem[];
  nested?: NestedSectionData[];
}

interface FilteredSections {
  [key: string]: boolean;
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
  icon?: React.ReactNode;
  initialOpen?: boolean;
  id: string;
  isVisible: boolean;
}

const SidebarCategory: React.FC<SidebarCategoryProps> = ({ 
  title, 
  children, 
  icon, 
  initialOpen = true,
  id,
  isVisible 
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  if (!isVisible) return null;

  return (
    <div key={id} className="mb-4">
      <div 
        className="flex justify-between items-center py-2 px-3 cursor-pointer text-gray-700 hover:text-emerald-700 rounded-md hover:bg-emerald-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {icon && <div className="mr-2">{icon}</div>}
          <h2 className="font-semibold text-sm">{title}</h2>
        </div>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

interface NestedSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id: string;
  isVisible: boolean;
}

const NestedSection: React.FC<NestedSectionProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  id,
  isVisible 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!isVisible) return null;
  
  return (
    <div key={id} className="bg-white rounded-lg mb-2 shadow-sm">
      <div 
        className="flex justify-between items-center py-2.5 px-4 cursor-pointer border-l-2 border-transparent hover:border-emerald-300 transition-all"
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSections, setFilteredSections] = useState<FilteredSections>({});
  
  // Data structure for all sidebar items with unique IDs
  const sidebarStructure: CategoryData[] = [
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

  // Effect to handle search filtering
  useEffect(() => {
    if (!searchQuery) {
      // Show all sections when search is empty
      const allVisible: FilteredSections = {};
      sidebarStructure.forEach(category => {
        allVisible[category.id] = true;
        
        if (category.items) {
          category.items.forEach(item => {
            allVisible[item.id] = true;
          });
        }
        
        if (category.nested) {
          category.nested.forEach(section => {
            allVisible[section.id] = true;
            
            section.items.forEach(item => {
              allVisible[item.id] = true;
            });
          });
        }
      });
      
      setFilteredSections(allVisible);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const visible: FilteredSections = {};
    
    // Helper function to check if an item matches the search
    const isMatch = (title: string) => title.toLowerCase().includes(query);
    
    sidebarStructure.forEach(category => {
      // Check if category title matches
      const categoryMatch = isMatch(category.title);
      let categoryHasVisibleItems = categoryMatch;
      
      // Check regular items
      if (category.items) {
        category.items.forEach(item => {
          const itemMatch = isMatch(item.title);
          visible[item.id] = itemMatch;
          if (itemMatch) categoryHasVisibleItems = true;
        });
      }
      
      // Check nested sections
      if (category.nested) {
        category.nested.forEach(section => {
          const sectionMatch = isMatch(section.title);
          let sectionHasVisibleItems = sectionMatch;
          
          section.items.forEach(item => {
            const itemMatch = isMatch(item.title);
            visible[item.id] = itemMatch;
            if (itemMatch) sectionHasVisibleItems = true;
          });
          
          visible[section.id] = sectionHasVisibleItems;
          if (sectionHasVisibleItems) categoryHasVisibleItems = true;
        });
      }
      
      visible[category.id] = categoryHasVisibleItems;
    });
    
    setFilteredSections(visible);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);
  
  return (
    <div className="w-72 h-screen bg-gray-50 flex-shrink-0 border-r border-gray-200 font-sans flex flex-col">
      {/* Title instead of header */}
      <div className="py-5 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-emerald-600">Master Enrichment</h1>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center bg-white rounded-lg p-2 border border-gray-200 shadow-sm hover:border-emerald-300 focus-within:border-emerald-400 transition-colors">
          <Search className="text-gray-400 mr-2" size={16} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none text-gray-600 w-full text-sm"
          />
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="px-4 py-3 overflow-y-auto flex-grow custom-scrollbar">
              {/* AI Tools Section */}
              <SidebarCategory 
          id="my-workflows"
          title="MY WORKFLOWS" 
          icon={<Workflow size={18} className="text-emerald-500" />}
          isVisible={filteredSections['my-workflows'] ?? true}
        >
          {sidebarStructure[0].items?.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              path={item.path}
              isActive={pathname === item.path}
            />
          ))}
        </SidebarCategory>

                {/* AI Tools Section */}
                <SidebarCategory 
          id="api-kit"
          title="API KIT" 
          icon={<Combine size={18} className="text-emerald-500" />}
          isVisible={filteredSections['api-kit'] ?? true}
        >
          {sidebarStructure[1].items?.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              path={item.path}
              isActive={pathname === item.path}
            />
          ))}
        </SidebarCategory>

        {/* AI Tools Section */}
        <SidebarCategory 
          id="ai-tools"
          title="AI TOOLS" 
          icon={<Brain size={18} className="text-emerald-500" />}
          isVisible={filteredSections['ai-tools'] ?? true}
        >
          {sidebarStructure[2].items?.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              path={item.path}
              isActive={pathname === item.path}
            />
          ))}
        </SidebarCategory>

        {/* Data Bank Section */}
        <SidebarCategory 
          id="data-bank"
          title="DATA BANK" 
          icon={<Database size={18} className="text-emerald-500" />}
          isVisible={filteredSections['data-bank'] ?? true}
        >
          {sidebarStructure[3].items?.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              path={item.path}
              isActive={pathname === item.path}
            />
          ))}
        </SidebarCategory>

        {/* Data Enrichment Section */}
        <SidebarCategory 
          id="data-enrichment"
          title="DATA ENRICHMENT"
          icon={<Zap size={18} className="text-emerald-500" />}
          isVisible={filteredSections['data-enrichment'] ?? true}
        >
          {sidebarStructure[4].items?.map(item => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              title={item.title}
              path={item.path}
              isActive={pathname === item.path}
            />
          ))}
        </SidebarCategory>

        {/* Scrapers Section */}
        <SidebarCategory 
          id="scrapers"
          title="SCRAPERS"
          icon={<Globe size={18} className="text-emerald-500" />}
          isVisible={filteredSections['scrapers'] ?? true}
        >
          {/* Google Scrapers Subsection */}
          <NestedSection 
            id="google-scrapers"
            title="Google Scrapers"
            isVisible={filteredSections['google-scrapers'] ?? true}
          >
            {sidebarStructure[5].nested?.[0].items.map(item => (
              <Link 
                key={item.id}
                href={item.path} 
                className={`flex items-center py-2 px-3 my-1 rounded-md text-sm ${
                  pathname === item.path
                    ? 'bg-emerald-50 text-emerald-600 font-medium' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="mr-3">{item.icon}</div>
                <div>{item.title}</div>
              </Link>
            ))}
          </NestedSection>

          {/* LinkedIn Scrapers Subsection */}
          <NestedSection 
            id="linkedin-scrapers"
            title="LinkedIn Scrapers"
            isVisible={filteredSections['linkedin-scrapers'] ?? true}
          >
            {sidebarStructure[5].nested?.[1].items.map(item => (
              <Link 
                key={item.id}
                href={item.path} 
                className={`flex items-center py-2 px-3 my-1 rounded-md text-sm ${
                  pathname === item.path
                    ? 'bg-emerald-50 text-emerald-600 font-medium' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="mr-3">{item.icon}</div>
                <div>{item.title}</div>
              </Link>
            ))}
          </NestedSection>
        </SidebarCategory>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #10b981;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;