"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  SquareArrowUpRight, 
  Mail, 
  Share2, 
  Table, 
  Cog, 
} from 'lucide-react';

// Types
interface WorkflowNode {
  node_id: number;
  name: string;
  desc: string;
  input: string[];
}

interface Workflow {
  id: number;
  name: string;
  desc: string;
  type: string;
  input: string[];
  output: string;
  nodes: WorkflowNode[];
}

interface CustomWorkflowOption {
  name: string;
  inputs: {
    label: string;
    placeholder: string;
    type?: string;
    options?: string[];
  }[];
}

interface CustomWorkflowNode {
  node_id: number;
  name: string;
  desc: string;
  isDropdown: boolean;
  options: CustomWorkflowOption[];
}

const EnrichmentWorkflows = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [currentView, setCurrentView] = useState('cards');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [currentNode, setCurrentNode] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>([]);

  // Define sample workflows
  const workflows: Workflow[] = [
    {
      id: 1,
      name: "LinkedIn Profile to Email Verification",
      desc: "Uses a LinkedIn profile URL to fetch the associated email and verify its validity.",
      type: "linkedin",
      input: ["LinkedIn URL", "Email"],
      output: "Verified Email",
      nodes: [
        {
          node_id: 1,
          name: "Scrape Local Business",
          desc: "Scrape the data of local businesses",
          input: ["Location name", "Number of records"]
        },
        {
          node_id: 2,
          name: "Find their LinkedIn",
          desc: "Find LinkedIn profile from the scrapping",
          input: ["First Name", "Last Name"]
        },
        {
          node_id: 3,
          name: "Hyper personalization email",
          desc: "Appreciate their job email content by LinkedIn profile",
          input: ["Email", "Phone no."]
        },
        {
          node_id: 4,
          name: "Push to Email marketing software",
          desc: "Instantly give API key and start the campaign to push the data",
          input: ["Email", "Phone no."]
        }
      ]
    },
    {
      id: 2,
      name: "Email to LinkedIn Connection Message",
      desc: "Generates a personalized LinkedIn connection request message based on the user's LinkedIn profile.",
      type: "email",
      input: ["Email", "LinkedIn URL"],
      output: "Connection Message",
      nodes: [
        {
          node_id: 1,
          name: "Scrape Local Business",
          desc: "Scrape the data of local businesses",
          input: ["Location name", "Number of records"]
        },
        {
          node_id: 2,
          name: "Find their LinkedIn",
          desc: "Find LinkedIn profile from the scrapping",
          input: ["First Name", "Last Name"]
        },
        {
          node_id: 3,
          name: "Hyper personalization email",
          desc: "Appreciate their job email content by LinkedIn profile",
          input: ["Email", "Phone no."]
        },
        {
          node_id: 4,
          name: "Push to Email marketing software",
          desc: "Instantly give API key and start the campaign to push the data",
          input: ["Email", "Phone no."]
        }
      ]
    },
    {
      id: 3,
      name: "Email to LinkedIn Profile",
      desc: "Take an email as input and retrieves the associated LinkedIn profile, providing details such as name, position, and company.",
      type: "email",
      input: ["Email"],
      output: "LinkedIn Profile",
      nodes: [
        {
          node_id: 1,
          name: "Scrape Local Business",
          desc: "Scrape the data of local businesses",
          input: ["Location name", "Number of records"]
        },
        {
          node_id: 2,
          name: "Find their LinkedIn",
          desc: "Find LinkedIn profile from the scrapping",
          input: ["First Name", "Last Name"]
        },
        {
          node_id: 3,
          name: "Hyper personalization email",
          desc: "Appreciate their job email content by LinkedIn profile",
          input: ["Email", "Phone no."]
        },
        {
          node_id: 4,
          name: "Push to Email marketing software",
          desc: "Instantly give API key and start the campaign to push the data",
          input: ["Email", "Phone no."]
        }
      ]
    },
    {
      id: 4,
      name: "Website to LinkedIn Profiles",
      desc: "Extracts LinkedIn profiles from a website domain.",
      type: "website",
      input: ["Website URL"],
      output: "LinkedIn Profiles",
      nodes: [
        {
          node_id: 1,
          name: "Scrape Local Business",
          desc: "Scrape the data of local businesses",
          input: ["Location name", "Number of records"]
        },
        {
          node_id: 2,
          name: "Find their LinkedIn",
          desc: "Find LinkedIn profile from the scrapping",
          input: ["First Name", "Last Name"]
        },
        {
          node_id: 3,
          name: "Hyper personalization email",
          desc: "Appreciate their job email content by LinkedIn profile",
          input: ["Email", "Phone no."]
        },
        {
          node_id: 4,
          name: "Push to Email marketing software",
          desc: "Instantly give API key and start the campaign to push the data",
          input: ["Email", "Phone no."]
        }
      ]
    },
    {
      id: 5,
      name: "LinkedIn URL to Company Info",
      desc: "Extracts company information from a LinkedIn company URL.",
      type: "linkedin",
      input: ["LinkedIn URL"],
      output: "Company Info",
      nodes: [
        {
          node_id: 1,
          name: "Scrape Local Business",
          desc: "Scrape the data of local businesses",
          input: ["Location name", "Number of records"]
        },
        {
          node_id: 2,
          name: "Find their LinkedIn",
          desc: "Find LinkedIn profile from the scrapping",
          input: ["First Name", "Last Name"]
        },
        {
          node_id: 3,
          name: "Hyper personalization email",
          desc: "Appreciate their job email content by LinkedIn profile",
          input: ["Email", "Phone no."]
        },
        {
          node_id: 4,
          name: "Push to Email marketing software",
          desc: "Instantly give API key and start the campaign to push the data",
          input: ["Email", "Phone no."]
        }
      ]
    }
  ];

  // Define custom workflow nodes
  const customWorkflowNodes: CustomWorkflowNode[] = [
    {
      // First node - dropdown with two options
      node_id: 1,
      name: "Data Extraction Source",
      desc: "Select the source to extract data from",
      isDropdown: true,
      options: [
        {
          name: "Google Map Scrapper",
          inputs: [
            { label: "Query", placeholder: "surat in Gujarat, India" },
            { label: "Offset(Optional)", placeholder: "0" },
            { label: "Limit(Optional)", placeholder: "10" },
            { label: "Zoom(Optional)", placeholder: "Enter zoom level for map. Range from 3 to 21" },
            { label: "Country", placeholder: "Enter country code. For example: us, in, etc." },
            { label: "Language", placeholder: "Enter language code. For example: en, hi, etc." }
          ]
        },
        {
          name: "Linkedin Sales Navigator Scrapper",
          inputs: [
            { label: "Linkedin Sales Navigator URL", placeholder: "Enter navigator URL" },
            { label: "Account Number", placeholder: "Enter account number. For example: 1, 2, etc." }
          ]
        }
      ]
    },
    {
      // Second node - dropdown with one option
      node_id: 2,
      name: "Profile Finder",
      desc: "Find LinkedIn profiles from the extracted data",
      isDropdown: true,
      options: [
        {
          name: "Hyper - Linkedin Profile Finder",
          inputs: [
            { label: "Linkedin Profile URL", placeholder: "Enter profile URL" }
          ]
        }
      ]
    },
    {
      // Third node - dropdown with one option
      node_id: 3,
      name: "Email Finder",
      desc: "Find email addresses from LinkedIn profiles",
      isDropdown: true,
      options: [
        {
          name: "Hyper - Email Finder",
          inputs: [
            { label: "Linkedin Profile URL", placeholder: "Enter profile URL" }
          ]
        }
      ]
    },
    {
      // Fourth node - dropdown with five options
      node_id: 4,
      name: "Additional Information",
      desc: "Find additional contact information",
      isDropdown: true,
      options: [
        {
          name: "Hyper - Linkedin Profile Finder",
          inputs: [
            { label: "Linkedin Profile URL", placeholder: "Enter profile URL" }
          ]
        },
        {
          name: "Hyper - Email Finder",
          inputs: [
            { label: "Linkedin Profile URL", placeholder: "Enter profile URL" }
          ]
        },
        {
          name: "Hyper - Phone Finder",
          inputs: [
            { label: "Linkedin Profile URL", placeholder: "Enter profile URL" }
          ]
        },
        {
          name: "Hyper - Address Finder",
          inputs: [
            { label: "Linkedin Profile URL", placeholder: "Enter profile URL" }
          ]
        },
        {
          name: "Hyper - Company Finder",
          inputs: [
            { label: "Linkedin Profile URL", placeholder: "Enter profile URL" }
          ]
        }
      ]
    },
    {
      // Fifth node - dropdown with one option
      node_id: 5,
      name: "Integration",
      desc: "Send data to third-party services",
      isDropdown: true,
      options: [
        {
          name: "Third party Integration",
          inputs: [
            { 
              label: "Provider Name", 
              placeholder: "Select the provider", 
              type: "dropdown",
              options: ["Instantly", "Smartlead", "Lemlist", "Heyreach", "Expandi"]
            },
            { 
              label: "API Key", 
              placeholder: "Enter API key" 
            },
            { 
              label: "Select Campaign", 
              placeholder: "Select the campaign", 
              type: "dropdown",
              options: ["Campaign 1", "Campaign 2", "Campaign 3", "Campaign 4"]
            },
            { 
              label: "Field Mapping for the data to send to provider", 
              placeholder: "", 
              type: "checkbox",
              options: ["Name", "Email", "LinkedIn URL", "Phone", "Company"] 
            }
          ]
        }
      ]
    }
  ];

  // Initialize state for custom workflow options
  useEffect(() => {
    setSelectedOptions(Array(customWorkflowNodes.length).fill(null));
  }, [customWorkflowNodes.length]);

  // Tab selection handler
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // View workflow detail
  const showWorkflowDetail = (id: number) => {
    const workflow = workflows.find(w => w.id === id);
    if (workflow) {
      setSelectedWorkflow(workflow);
      setCurrentView('detail');
      setCurrentNode(0);
    }
  };

  // Create custom workflow
  const createCustomWorkflow = () => {
    setCurrentView('custom');
    setCurrentNode(0);
    setSelectedOptions(Array(customWorkflowNodes.length).fill(null));
  };

  // Back to workflows listing
  const backToWorkflows = () => {
    setCurrentView('cards');
    setSelectedWorkflow(null);
  };

  // Get icon based on node name
  const getNodeIcon = (nodeName: string) => {
    if (nodeName.includes('Scrape')) return <Table className="h-4 w-4" />;
    if (nodeName.includes('LinkedIn')) return <SquareArrowUpRight className="h-4 w-4" />;
    if (nodeName.includes('Email') || nodeName.includes('email')) return <Mail className="h-4 w-4" />;
    if (nodeName.includes('Push')) return <Share2 className="h-4 w-4" />;
    return <Cog className="h-4 w-4" />;
  };

  // Handle option selection in custom workflow
  const handleOptionSelect = (nodeIndex: number, optionIndex: number | null) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[nodeIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  // Render workflow cards
  const renderWorkflowCards = () => {
    const filteredWorkflows = activeTab === 'all' 
      ? workflows 
      : workflows.filter(w => w.type === activeTab.replace('workflows', '').trim());

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {/* Custom workflow card */}
        <div className="bg-emerald-500 rounded-lg p-3 text-white">
          <h3 className="text-base font-bold mb-1">Custom workflow</h3>
          <p className="text-xs mb-3">Use this card to create the custom workflow based on your requirement and use this in your implementation.</p>
          <div className="flex justify-between items-center">
            <button className="bg-transparent text-white px-2 py-1 rounded border border-white text-xs">Custom</button>
            <button 
              className="bg-white text-emerald-500 px-2 py-1 rounded text-xs"
              onClick={createCustomWorkflow}
            >
              Create
            </button>
          </div>
        </div>

        {/* Workflow cards */}
        {filteredWorkflows.map(workflow => (
          <div key={workflow.id} className="bg-white rounded-lg p-3 shadow-md">
            <h3 className="text-base font-bold mb-1">{workflow.name}</h3>
            <p className="text-xs text-gray-600 mb-3">{workflow.desc}</p>
            <div className="flex justify-between items-center">
              <button className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">{workflow.input[0]}</button>
              <button 
                className="bg-emerald-500 text-white px-2 py-1 rounded text-xs"
                onClick={() => showWorkflowDetail(workflow.id)}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render workflow detail view
  const renderWorkflowDetail = () => {
    if (!selectedWorkflow) return null;

    return (
      <div>
        {/* Back button */}
        <button onClick={backToWorkflows} className="flex items-center text-gray-600 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to workflows
        </button>
        
        {/* Workflow header */}
        <h2 className="text-lg font-bold mb-2">{selectedWorkflow.name}</h2>
        <p className="text-gray-600 text-sm mb-4">{selectedWorkflow.desc}</p>
        
        {/* Workflow content */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column - Nodes */}
          <div className="w-full md:w-1/3">
            {selectedWorkflow.nodes.map((node, index) => (
              <div 
                key={node.node_id} 
                className={`flex items-center p-3 mb-3 rounded-md ${
                  index === currentNode 
                    ? 'bg-emerald-500 text-white' 
                    : (index < currentNode 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600')
                }`}
              >
                <div className={`bg-white p-1.5 rounded mr-2 ${
                  index === currentNode 
                    ? 'text-emerald-500' 
                    : (index < currentNode 
                      ? 'text-blue-500' 
                      : 'text-gray-500')
                }`}>
                  {getNodeIcon(node.name)}
                </div>
                <div>
                  <h4 className="font-medium text-sm">{node.name}</h4>
                  <p className="text-xs">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right column - Current node details */}
          <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow">
            {currentNode < selectedWorkflow.nodes.length && (
              <>
                <h3 className="text-base font-bold mb-3">{selectedWorkflow.nodes[currentNode].name}</h3>
                
                {selectedWorkflow.nodes[currentNode].input.map((input, idx) => (
                  <div key={idx} className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mt-3">{input}</label>
                    <select className="mt-1 block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md border">
                      <option>Select {input.toLowerCase()}</option>
                    </select>
                  </div>
                ))}
                
                <div className="flex justify-between mt-6">
                  {currentNode > 0 ? (
                    <button 
                      className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs"
                      onClick={() => setCurrentNode(prev => prev - 1)}
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <button 
                    className="bg-emerald-500 text-white px-3 py-1.5 rounded text-xs"
                    onClick={() => {
                      if (currentNode < selectedWorkflow.nodes.length - 1) {
                        setCurrentNode(prev => prev + 1);
                      } else {
                        alert('Workflow submitted!');
                        backToWorkflows();
                      }
                    }}
                  >
                    {currentNode === selectedWorkflow.nodes.length - 1 ? 'Submit' : 'Next'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render custom workflow 
  const renderCustomWorkflow = () => {
    return (
      <div>
        {/* Back button */}
        <button onClick={backToWorkflows} className="flex items-center text-gray-600 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to workflows
        </button>
        
        {/* Workflow header */}
        <h2 className="text-lg font-bold mb-2">Create Custom Workflow</h2>
        <p className="text-gray-600 text-sm mb-4">Define each step of your custom workflow</p>
        
        {/* Workflow content */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left column - Nodes */}
          <div className="w-full md:w-1/3">
            {customWorkflowNodes.map((node, index) => (
              <div 
                key={node.node_id} 
                className={`p-3 mb-3 rounded-md ${
                  index === currentNode 
                    ? 'bg-emerald-500 text-white' 
                    : (index < currentNode 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-600')
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className={`bg-white p-1.5 rounded mr-2 ${
                    index === currentNode 
                      ? 'text-emerald-500' 
                      : (index < currentNode 
                        ? 'text-blue-500' 
                        : 'text-gray-500')
                  }`}>
                    {getNodeIcon(node.name)}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{node.name}</h4>
                    <p className="text-xs">{node.desc}</p>
                  </div>
                </div>

                {index <= currentNode ? (
                  <select 
                    className={`mt-2 block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none rounded-md border ${
                      index === currentNode 
                        ? 'border-white text-gray-800' 
                        : 'border-blue-400 bg-blue-500 text-white'
                    }`}
                    value={selectedOptions[index] === null ? "" : selectedOptions[index]?.toString()}
                    onChange={(e) => handleOptionSelect(index, e.target.value === "" ? null : parseInt(e.target.value))}
                    disabled={index !== currentNode}
                  >
                    <option value="">Select {node.name} option</option>
                    {node.options.map((option, optIndex) => (
                      <option key={optIndex} value={optIndex}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="mt-2 text-xs italic">Complete previous steps first</div>
                )}
              </div>
            ))}
          </div>
          
          {/* Right column - Current node details */}
          <div className="w-full md:w-2/3 bg-white p-4 rounded-lg shadow">
            {currentNode < customWorkflowNodes.length && selectedOptions[currentNode] !== null ? (
              <>
                <h3 className="text-base font-bold mb-3">
                  {customWorkflowNodes[currentNode].options[selectedOptions[currentNode] as number].name}
                </h3>

                {customWorkflowNodes[currentNode].options[selectedOptions[currentNode] as number].inputs.map((input, idx) => (
                  <div key={idx} className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 mt-3">{input.label}</label>
                    
                    {input.type === 'dropdown' ? (
                      <select className="mt-1 block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md border">
                        <option value="">{input.placeholder}</option>
                        {input.options?.map((option, optIdx) => (
                          <option key={optIdx} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : input.type === 'checkbox' ? (
                      <div className="mt-2 space-y-2">
                        {input.options?.map((option, optIdx) => (
                          <div key={optIdx} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={`checkbox-${option.replace(/\s+/g, '-').toLowerCase()}`}
                              className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
                            />
                            <label 
                              htmlFor={`checkbox-${option.replace(/\s+/g, '-').toLowerCase()}`}
                              className="ml-2 text-xs text-gray-700"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <input 
                        type="text" 
                        placeholder={input.placeholder}
                        className="mt-1 block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md border"
                      />
                    )}
                  </div>
                ))}

                <div className="flex justify-between mt-6">
                  {currentNode > 0 ? (
                    <button 
                      className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs"
                      onClick={() => setCurrentNode(prev => prev - 1)}
                    >
                      Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <button 
                    className="bg-emerald-500 text-white px-3 py-1.5 rounded text-xs"
                    onClick={() => {
                      if (currentNode < customWorkflowNodes.length - 1) {
                        setCurrentNode(prev => prev + 1);
                      } else {
                        alert('Custom workflow created!');
                        backToWorkflows();
                      }
                    }}
                  >
                    {currentNode === customWorkflowNodes.length - 1 ? 'Create Workflow' : 'Next'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-sm italic">
                {currentNode < customWorkflowNodes.length && (
                  `Please select a ${customWorkflowNodes[currentNode].name} option from the dropdown on the left`
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-6">Enrichment Workflows</h1>
      
      {/* Tabs (Hide in detail view) */}
      {currentView === 'cards' && (
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button 
              className={`pb-2 ${activeTab === 'all' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}
              onClick={() => handleTabChange('all')}
            >
              All workflows
            </button>
            <button 
              className={`pb-2 ${activeTab === 'email' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}
              onClick={() => handleTabChange('email')}
            >
              Email workflows
            </button>
            <button 
              className={`pb-2 ${activeTab === 'linkedin' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}
              onClick={() => handleTabChange('linkedin')}
            >
              LinkedIn URL workflows
            </button>
            <button 
              className={`pb-2 ${activeTab === 'website' ? 'border-b-2 border-emerald-500 font-medium' : 'text-gray-500'}`}
              onClick={() => handleTabChange('website')}
            >
              Website workflows
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      {currentView === 'cards' && renderWorkflowCards()}
      {currentView === 'detail' && renderWorkflowDetail()}
      {currentView === 'custom' && renderCustomWorkflow()}
    </div>
  );
};

export default EnrichmentWorkflows;