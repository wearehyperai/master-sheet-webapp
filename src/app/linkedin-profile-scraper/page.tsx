"use client";

import React, { useState, useEffect } from 'react';
import { 
  Info, 
  PlusCircle, 
  Play, 
  X, 
  User, 
  IdCard, 
  Building, 
  Filter, 
  Newspaper, 
  ThumbsUp, 
  MessageSquare, 
  Megaphone, 
  Search, 
  Briefcase, 
  MapPin, 
  Link, 
  Key, 
  Settings,
  ArrowLeft,
  Zap
} from 'lucide-react';

interface ScraperEndpoint {
  id: number;
  tab: string;
  title: string;
  description: string;
  credits: number;
  details: {
    usage: string;
    inputParams: {
      fieldName: string;
      type: string;
      required: boolean;
      description: string;
      name: string;
    }[];
    endpoint: string;
    method: string;
    headers: Record<string, string>;
    queryParams?: boolean;
    queryParamMap?: Record<string, string>;
    pagination?: boolean;
    paginationParam?: string;
    bodyParams?: boolean;
    defaultParams?: Record<string, number | string>;
  };
}

const LinkedInProfileScraper = () => {
  const [currentTab, setCurrentTab] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [inputValues, setInputValues] = useState<Record<string, string[]>>({});
  const [inputRowsCount, setInputRowsCount] = useState(1);
  const [startRow, setStartRow] = useState(1);
  const [outputStartColumn, setOutputStartColumn] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [view, setView] = useState<'cards' | 'detail'>('cards');

  // Array of scraper endpoint configurations
  const scraperEndpoints: ScraperEndpoint[] = [
    {
      id: 1,
      tab: "personData",
      title: "Person Data",
      description: "Takes a LinkedIn URL and retrieves that person's details.",
      credits: 1,
      details: {
        usage: "This Scraper finds the details about the user based on the LinkedIn URL",
        inputParams: [
          {
            fieldName: "link",
            type: "string",
            required: true,
            description: "LinkedIn URL of the person",
            name: "Link",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/person",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    },
    {
      id: 2,
      tab: "personDataURN",
      title: "Person Data (using URN)",
      description: "Scrape profile data using LinkedIn URN identifier.",
      credits: 1,
      details: {
        usage: "This Scraper extracts profile information using LinkedIn's unique URN identifier instead of URL.",
        inputParams: [
          {
            fieldName: "link",
            type: "string",
            required: true,
            description: "LinkedIn URN identifier (format: ACoAA...)",
            name: "LinkedIn URN Link",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/person_urn",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    },
    {
      id: 3,
      tab: "companyData",
      title: "Company Data",
      description: "Scrape company profile data from LinkedIn.",
      credits: 2,
      details: {
        usage: "This Scraper extracts comprehensive company information from LinkedIn using the company URL.",
        inputParams: [
          {
            fieldName: "link",
            type: "string",
            required: true,
            description: "LinkedIn company URL (e.g., https://www.linkedin.com/company/company-name)",
            name: "LinkedIn Company URL",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/company",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    },
    {
      id: 4,
      tab: "searchPeopleWithFilters",
      title: "Search People with Filters",
      description: "Search for people on LinkedIn with various filters.",
      credits: 3,
      details: {
        usage: "This Scraper searches for people on LinkedIn based on specified filters.",
        inputParams: [
          {
            fieldName: "keyword",
            type: "string",
            required: true,
            description: "General search keyword",
            name: "Keyword",
          },
          {
            fieldName: "page",
            type: "number",
            required: false,
            description: "Page number for pagination (default: 1)",
            name: "Page Number",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/search_people_with_filters",
        method: "POST",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      },
    },
    {
      id: 5,
      tab: "personUpdates",
      title: "Person Updates",
      description: "Retrieve recent updates/posts from a LinkedIn profile.",
      credits: 2,
      details: {
        usage: "This Scraper extracts recent posts and updates from a LinkedIn profile.",
        inputParams: [
          {
            fieldName: "profile_url",
            type: "string",
            required: true,
            description: "LinkedIn profile URL (e.g., https://www.linkedin.com/in/username)",
            name: "LinkedIn Profile URL",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/profile_updates",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          profile_url: "profile_url",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 6,
      tab: "postReactions",
      title: "Post Reactions",
      description: "Get reactions on a LinkedIn post.",
      credits: 2,
      details: {
        usage: "This Scraper retrieves reaction data for a specific LinkedIn post.",
        inputParams: [
          {
            fieldName: "reactionsUrn",
            type: "string",
            required: true,
            description: "URN of the LinkedIn post (format: urn:li:activity:1234567890)",
            name: "Post URN",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/post_reactions",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          reactionsUrn: "reactionsUrn",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 7,
      tab: "postComments",
      title: "Post Comments",
      description: "Retrieve comments on a LinkedIn post.",
      credits: 2,
      details: {
        usage: "This Scraper fetches comments from a specific LinkedIn post.",
        inputParams: [
          {
            fieldName: "commentsUrn",
            type: "string",
            required: true,
            description: "Comments URN of the LinkedIn post (complex format)",
            name: "Comments URN",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/post_comments",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          commentsUrn: "commentsUrn",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 8,
      tab: "companyUpdates",
      title: "Company Updates",
      description: "Get recent posts from a company LinkedIn page.",
      credits: 3,
      details: {
        usage: "This Scraper extracts recent posts and updates from a company LinkedIn page.",
        inputParams: [
          {
            fieldName: "company_url",
            type: "string",
            required: true,
            description: "LinkedIn company page URL (e.g., https://www.linkedin.com/company/google)",
            name: "Company URL",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/company_updates",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          company_url: "company_url",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 9,
      tab: "searchPosts",
      title: "Search Posts",
      description: "Search for posts on LinkedIn using keywords.",
      credits: 3,
      details: {
        usage: "This Scraper searches for posts on LinkedIn based on keywords and filters.",
        inputParams: [
          {
            fieldName: "query",
            type: "string",
            required: true,
            description: "Search query for LinkedIn posts",
            name: "Search Query",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/search_posts_with_filters",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          query: "query",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 10,
      tab: "searchJobs",
      title: "Search Jobs",
      description: "Search for job listings on LinkedIn.",
      credits: 3,
      details: {
        usage: "This Scraper searches for job listings on LinkedIn based on keywords and filters.",
        inputParams: [
          {
            fieldName: "query",
            type: "string",
            required: true,
            description: "Job search keywords (e.g., 'software engineer')",
            name: "Search Query",
          },
        ],
        endpoint: "https://linkedin-bulk-data-scraper.p.rapidapi.com/search_jobs",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "linkedin-bulk-data-scraper.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          query: "query",
          searchLocationId: "searchLocationId",
          page: "page",
        },
        pagination: true,
      },
    },
    {
      id: 11,
      tab: "locateAndSearch",
      title: "Locate and Search (Google Maps)",
      description: "Search Google Maps based on location and keywords.",
      credits: 3,
      details: {
        usage: "This Scraper searches Google Maps based on location and keywords.",
        inputParams: [
          {
            fieldName: "query",
            type: "string",
            required: true,
            description: "Search query including location (e.g., 'attorney in Philadelphia, PA, USA')",
            name: "Search Query",
          },
        ],
        endpoint: "https://google-maps-extractor2.p.rapidapi.com/locate_and_search",
        method: "GET",
        headers: {
          "x-rapidapi-key": "Sign Up for Key",
          "x-rapidapi-host": "google-maps-extractor2.p.rapidapi.com",
        },
        queryParams: true,
        queryParamMap: {
          query: "query",
          limit: "limit",
          country: "country",
          language: "language",
          offset: "offset",
        },
        pagination: true,
        paginationParam: "offset",
      },
    },
  ];

  useEffect(() => {
    // Try to load saved API key
    const savedApiKey = localStorage.getItem("linkedinScraperApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  useEffect(() => {
    // When tab changes, reset input values and initialize with empty strings
    if (currentTab) {
      const currentScraper = scraperEndpoints.find(endpoint => endpoint.tab === currentTab);
      if (currentScraper) {
        const initialInputValues: Record<string, string[]> = {};
        currentScraper.details.inputParams.forEach(param => {
          initialInputValues[param.fieldName] = Array(inputRowsCount).fill("");
        });
        setInputValues(initialInputValues);
        
        // Validate form after a slight delay to allow state updates
        setTimeout(() => {
          validateForm();
        }, 100);
      }
    }
  }, [currentTab]);

  // Function to get icon for a tab
  const getIconForTab = (tab: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      personData: <User className="text-blue-500" />,
      personDataURN: <IdCard className="text-blue-500" />,
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
  };

  const addInputRow = () => {
    setInputRowsCount(prev => prev + 1);
    
    // Add a new empty value to all parameter arrays
    const newInputValues = { ...inputValues };
    Object.keys(newInputValues).forEach(key => {
      if (!newInputValues[key]) {
        newInputValues[key] = [];
      }
      newInputValues[key] = [...newInputValues[key], ""];
    });
    
    setInputValues(newInputValues);
    validateForm();
  };

  const removeInputRow = (index: number) => {
    if (inputRowsCount <= 1) return;
    
    setInputRowsCount(prev => prev - 1);
    
    // Remove value at index from all parameter arrays
    const newInputValues = { ...inputValues };
    Object.keys(newInputValues).forEach(key => {
      newInputValues[key] = newInputValues[key].filter((_, i) => i !== index);
    });
    
    setInputValues(newInputValues);
    validateForm();
  };

  const updateInputValue = (fieldName: string, index: number, value: string) => {
    const newInputValues = { ...inputValues };
    if (!newInputValues[fieldName]) {
      newInputValues[fieldName] = Array(inputRowsCount).fill("");
    }
    newInputValues[fieldName][index] = value;
    setInputValues(newInputValues);
    validateForm();
  };

  const validateForm = () => {
    // Check API key
    if (!apiKey) {
      setIsFormValid(false);
      return;
    }

    // Check start row and output column
    if (!startRow || !outputStartColumn) {
      setIsFormValid(false);
      return;
    }

    // Check required input parameters
    const currentScraper = scraperEndpoints.find(endpoint => endpoint.tab === currentTab);
    if (!currentScraper) {
      setIsFormValid(false);
      return;
    }

    let allRequiredInputsFilled = true;
    currentScraper.details.inputParams.forEach(param => {
      if (param.required) {
        for (let i = 0; i < inputRowsCount; i++) {
          if (!inputValues[param.fieldName] || !inputValues[param.fieldName][i]) {
            allRequiredInputsFilled = false;
          }
        }
      }
    });

    setIsFormValid(allRequiredInputsFilled);
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setApiKey(value);
    localStorage.setItem("linkedinScraperApiKey", value);
    
    // Schedule validation for the next tick to ensure state updates
    setTimeout(() => {
      validateForm();
    }, 0);
  };

  const handleStartScraping = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current scraper configuration
    const currentScraper = scraperEndpoints.find(endpoint => endpoint.tab === currentTab);
    if (!currentScraper) return;
    
    // Calculate end row
    const endRow = startRow + inputRowsCount - 1;
    
    // Create request object
    const scraperRequest = {
      apiKey,
      config: {
        startRow,
        endRow,
        outputStartColumn,
      },
      formula: {
        credits: currentScraper.credits,
        details: currentScraper.details,
      },
      inputs: inputValues,
    };
    
    console.log("Starting scraping with:", scraperRequest);
    
    // Here you would typically call your API
    alert("Scraping started! Check console for details.");
  };

  const handleCardClick = (tab: string) => {
    setCurrentTab(tab);
    setView('detail');
  };

  const handleBackToCards = () => {
    setView('cards');
  };

  const currentScraper = scraperEndpoints.find(endpoint => endpoint.tab === currentTab);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-6">
          <h1 className="text-2xl font-semibold text-gray-800">LinkedIn Data Enrichment</h1>
          <p className="mt-1 text-sm text-gray-600">
            Access LinkedIn data through our suite of specialized scrapers
          </p>
        </div>

        {/* Cards View */}
        {view === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scraperEndpoints.map((endpoint) => (
              <div 
                key={endpoint.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer" 
                onClick={() => handleCardClick(endpoint.tab)}
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
        )}

        {/* Detail View */}
        {view === 'detail' && currentScraper && (
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-4 border-b flex items-center">
              <button 
                onClick={handleBackToCards}
                className="mr-3 p-1.5 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft size={18} />
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-2">
                  {getIconForTab(currentTab)}
                </div>
                <h2 className="text-lg font-medium">{currentScraper.title}</h2>
              </div>
            </div>
            
            <form onSubmit={handleStartScraping} className="p-6 space-y-6">
              {/* Scraper Info Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <p className="text-gray-700">{currentScraper.description}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {currentScraper.credits} {currentScraper.credits > 1 ? 'Credits' : 'Credit'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 italic">{currentScraper.details.usage}</p>
              </div>

              {/* API Key Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Key className="text-yellow-500" size={18} />
                  <h3 className="text-base font-medium">API Configuration</h3>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      RapidAPI Key
                    </label>
                    <div title="Your RapidAPI key for LinkedIn Bulk Data Scraper">
                      <Info className="text-gray-400 cursor-help" size={16} />
                    </div>
                    <span className="text-red-500 text-xs">Required</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your RapidAPI key"
                    className="w-full p-2 border rounded focus:ring-emerald-500 focus:border-emerald-500"
                    required
                    value={apiKey}
                    onChange={handleApiKeyChange}
                  />
                </div>
              </div>

              {/* Input Parameters Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="text-emerald-500" size={18} />
                  <h3 className="text-base font-medium">Input Parameters</h3>
                </div>

                {currentScraper.details.inputParams.map((param) => (
                  <div key={param.fieldName} className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {param.name}
                        </label>
                        <div title={param.description}>
                          <Info className="text-gray-400 cursor-help" size={16} />
                        </div>
                        {param.required && (
                          <span className="text-red-500 text-xs">Required</span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="text-emerald-500 hover:text-emerald-700 flex items-center space-x-1 text-sm"
                        onClick={addInputRow}
                      >
                        <PlusCircle size={16} />
                        <span>Add Row</span>
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {Array.from({ length: inputRowsCount }).map((_, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder={`Enter ${param.name}`}
                            className="flex-1 p-2 border rounded focus:ring-emerald-500 focus:border-emerald-500"
                            value={inputValues[param.fieldName]?.[index] || ""}
                            onChange={(e) => updateInputValue(param.fieldName, index, e.target.value)}
                            required={param.required}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700 p-1"
                              onClick={() => removeInputRow(index)}
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Configuration Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="text-gray-500" size={18} />
                  <h3 className="text-base font-medium">Sheet Configuration</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start row
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={startRow}
                      onChange={(e) => {
                        setStartRow(parseInt(e.target.value));
                        validateForm();
                      }}
                      placeholder="Enter start row"
                      className="w-full p-2 border rounded focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      End row: {startRow + inputRowsCount - 1}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Output start column
                    </label>
                    <input
                      type="text"
                      pattern="[A-Z]"
                      maxLength={1}
                      value={outputStartColumn}
                      onChange={(e) => {
                        const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
                        setOutputStartColumn(value);
                        validateForm();
                      }}
                      placeholder="Column letter (A-Z)"
                      className="w-full p-2 border rounded focus:ring-emerald-500 focus:border-emerald-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  disabled={!isFormValid}
                >
                  <Play size={16} />
                  <span>Start Scraping</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInProfileScraper;