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
  Settings
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
  const [currentTab, setCurrentTab] = useState('personData');
  const [apiKey, setApiKey] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [inputValues, setInputValues] = useState<Record<string, string[]>>({});
  const [inputRowsCount, setInputRowsCount] = useState(1);
  const [startRow, setStartRow] = useState(1);
  const [outputStartColumn, setOutputStartColumn] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

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
      // Validate after setting API key
      setTimeout(() => {
        validateForm();
      }, 100);
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
        setShowWelcome(false);
        
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
    // Check if we're showing welcome screen
    if (showWelcome) {
      setIsFormValid(false);
      return;
    }

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
    console.log("Form validation result:", allRequiredInputsFilled);
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

  const currentScraper = scraperEndpoints.find(endpoint => endpoint.tab === currentTab);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-lg font-medium">LinkedIn Profile Scraper</h1>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          {/* Scraping Options */}
          <div className="border-b">
            {scraperEndpoints.map((endpoint) => (
              <button
                key={endpoint.id}
                className={`w-full p-3 flex items-center text-sm hover:bg-gray-50 ${
                  currentTab === endpoint.tab ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => setCurrentTab(endpoint.tab)}
              >
                <div className="flex items-center space-x-2">
                  {getIconForTab(endpoint.tab)}
                  <span>{endpoint.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Content header with title */}
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-medium">
            {showWelcome ? "LinkedIn Profile Scraper" : currentScraper?.title}
          </h2>
        </div>

        {/* Content area */}
        <div className="space-y-4">
          {/* Welcome content */}
          {showWelcome && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center p-6">
                <User className="mx-auto text-blue-500" size={48} />
                <h3 className="text-xl font-medium mt-4">
                  Welcome to LinkedIn Profile Scraper
                </h3>
                <p className="text-gray-600 mt-2">
                  Select a scraping option from the sidebar to get started
                </p>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Quick Start Guide:</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Choose what data you want to scrape from the sidebar</li>
                  <li>Enter your RapidAPI key</li>
                  <li>Fill in the required input fields</li>
                  <li>Add more input rows using the + button if needed</li>
                  <li>
                    Click the
                    <span className="font-medium text-blue-500 mx-1">Start Scraping</span>
                    button
                  </li>
                </ol>
              </div>
            </div>
          )}

          {/* Scraper Content */}
          {!showWelcome && currentScraper && (
            <form onSubmit={handleStartScraping} className="space-y-4">
              {/* API Key Section */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Key className="text-yellow-500" size={18} />
                  <h2 className="text-lg font-medium">API Configuration</h2>
                </div>

                <div className="mb-4">
                                      <div className="flex items-center space-x-2 mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      RapidAPI Key
                    </label>
                    <div title="Your RapidAPI key for LinkedIn Bulk Data Scraper">
                      <Info className="text-gray-400 cursor-help" size={16} />
                    </div>
                    <span className="text-gray-400 text-xs">Required</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your RapidAPI key"
                    className="w-full p-2 border rounded"
                    required
                    value={apiKey}
                    onChange={handleApiKeyChange}
                  />
                </div>
              </div>

              {/* Scraper Info Section */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getIconForTab(currentTab)}
                    <h2 className="text-lg font-medium">{currentScraper.title}</h2>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {currentScraper.credits} {currentScraper.credits > 1 ? 'Credits' : 'Credit'}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{currentScraper.description}</p>

                <div className="border-t pt-3 mt-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Usage:</h3>
                  <p className="text-sm text-gray-600">{currentScraper.details.usage}</p>
                </div>
              </div>

              {/* Input Parameters Section */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="text-indigo-500" size={18} />
                  <h2 className="text-lg font-medium">Input Parameters</h2>
                </div>

                {currentScraper.details.inputParams.map((param) => (
                  <div key={param.fieldName} className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {param.name}
                        </label>
                        <div title={param.description}>
                          <Info className="text-gray-400 cursor-help" size={16} />
                        </div>
                        {param.required && (
                          <span className="text-gray-400 text-xs">Required</span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
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
                            placeholder="Enter value"
                            className="flex-1 p-2 border rounded"
                            value={inputValues[param.fieldName]?.[index] || ""}
                            onChange={(e) => updateInputValue(param.fieldName, index, e.target.value)}
                            required={param.required}
                          />
                          {index > 0 && (
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
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
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Settings className="text-gray-500" size={18} />
                  <h2 className="text-lg font-medium">Configuration</h2>
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
                      className="w-full p-2 border rounded"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      End row: {startRow + inputRowsCount - 1} (automatically calculated based on input rows)
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
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className={`px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
                  disabled={!isFormValid}
                >
                  <Play size={16} />
                  <span>Start Scraping</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedInProfileScraper;