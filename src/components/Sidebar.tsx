"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { FilteredSections, NestedSectionProps, SidebarCategoryProps, SidebarItemProps } from '@/types/comps';
import { sidebarStructure } from '@/data/sidebar';

/**
 * SidebarItem Component
 * Renders an individual navigation item
 */
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

/**
 * SidebarCategory Component
 * Renders a collapsible category of navigation items
 */
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

/**
 * NestedSection Component
 * Renders a nested section within a category
 */
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

/**
 * NestedItem Component
 * Renders an item within a nested section
 */
const NestedItem: React.FC<SidebarItemProps> = ({ icon, title, path, isActive }) => {
  return (
    <Link 
      href={path} 
      className={`flex items-center py-2 px-3 my-1 rounded-md text-sm ${
        isActive
          ? 'bg-emerald-50 text-emerald-600 font-medium' 
          : 'hover:bg-gray-50 text-gray-700'
      }`}
    >
      <div className="mr-3">{icon}</div>
      <div>{title}</div>
    </Link>
  );
};

/**
 * SearchBar Component
 * Renders the search input for filtering sidebar items
 */
const SearchBar: React.FC<{ value: string; onChange: (value: string) => void }> = ({ 
  value, 
  onChange 
}) => {
  return (
    <div className="px-4 py-3 border-b border-gray-200">
      <div className="flex items-center bg-white rounded-lg p-2 border border-gray-200 shadow-sm hover:border-emerald-300 focus-within:border-emerald-400 transition-colors">
        <Search className="text-gray-400 mr-2" size={16} />
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent outline-none text-gray-600 w-full text-sm"
        />
      </div>
    </div>
  );
};

/**
 * Main Sidebar Component
 * Contains the entire sidebar structure and filtering logic
 */
const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSections, setFilteredSections] = useState<FilteredSections>({});
  
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
  }, [searchQuery]);
  
  // Render the categories and their items
  const renderCategories = () => {
    return sidebarStructure.map((category) => (
      <SidebarCategory 
        key={category.id}
        id={category.id}
        title={category.title} 
        icon={category.icon}
        isVisible={filteredSections[category.id] ?? true}
      >
        {/* Regular items */}
        {category.items?.map(item => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            path={item.path}
            isActive={pathname === item.path}
          />
        ))}
        
        {/* Nested sections */}
        {category.nested?.map(section => (
          <NestedSection 
            key={section.id}
            id={section.id}
            title={section.title}
            isVisible={filteredSections[section.id] ?? true}
          >
            {section.items.map(item => (
              <NestedItem 
                key={item.id}
                icon={item.icon}
                title={item.title}
                path={item.path}
                isActive={pathname === item.path}
              />
            ))}
          </NestedSection>
        ))}
      </SidebarCategory>
    ));
  };

  return (
    <div className="w-72 h-screen bg-gray-50 flex-shrink-0 border-r border-gray-200 font-sans flex flex-col">
      {/* Title */}
      <div className="py-5 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-emerald-600">Master Enrichment</h1>
      </div>

      {/* Search */}
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
      />

      {/* Sidebar Content */}
      <div className="px-4 py-3 overflow-y-auto flex-grow custom-scrollbar">
        {renderCategories()}
      </div>

      {/* Custom scrollbar styles */}
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