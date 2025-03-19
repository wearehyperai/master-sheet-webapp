"use client";

import React, { useState } from "react";
import WorkflowStarter from "@/components/WorkflowStarter";
import {
  User,
  Building,
  Mail,
  Link,
  Phone,
  FileSearch,
  CheckCircle,
  Share2,
  MessageSquare,
  AtSign,
  ArrowLeft,
  Zap,
} from "lucide-react";

// Formula type
interface Formula {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  credits: number;
  node_id?: number;
  details: {
    usage: string;
    inputParams: {
      name: string;
      fieldName?: string;
      type: string;
      required: boolean;
      description: string;
    }[];
    outputParams: {
      name: string;
      fieldName?: string;
      type: string;
      description: string;
    }[];
    example: string;
  };
}

// Card type for main category cards
interface CategoryCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  color?: string;
}

// API Info type
interface ApiInfo {
  title: string;
  description: string;
  endpoint: string;
  method: string;
  parameters: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  curl: string;
  responses: {
    code: string;
    description: string;
    example: string;
  }[];
}

// Workflow Node type
interface WorkflowNode {
  node_id: number;
  name: string;
  desc: string;
  options: {
    id: string;
    name: string;
    inputs: {
      label: string;
      placeholder: string;
      type?: string;
      options?: string[];
    }[];
  }[];
}

const EnrichmentFormulas = () => {
  // State for active tab, selected category, formula list, and selected formula
  const [activeTab, setActiveTab] = useState<"personal" | "company">(
    "personal"
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formulaList, setFormulaList] = useState<Formula[] | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [view, setView] = useState<"categories" | "formulas" | "details">(
    "categories"
  );

  // Personal Info cards
  const personalCards: CategoryCard[] = [
    {
      id: "emailByName",
      title: "Get email by name and company",
      icon: <Mail className="text-blue-500" />,
      color: "blue",
    },
    {
      id: "emailBySocial",
      title: "Get email from social link",
      icon: <Link className="text-indigo-500" />,
      color: "indigo",
    },
    {
      id: "phoneNumber",
      title: "Get phone number",
      icon: <Phone className="text-green-500" />,
      color: "green",
    },
    {
      id: "socialLink",
      title: "Find social link",
      icon: <Share2 className="text-purple-500" />,
      color: "purple",
    },
    {
      id: "lookupPerson",
      title: "Lookup person by email",
      icon: <FileSearch className="text-orange-500" />,
      color: "orange",
    },
    {
      id: "verifyEmailAndPhone",
      title: "Verify email & phone numbers",
      icon: <CheckCircle className="text-yellow-500" />,
      color: "yellow",
    },
    {
      id: "enrichSocialLinks",
      title: "Enrich social links",
      icon: <Share2 className="text-pink-500" />,
      color: "pink",
    },
  ];

  // Company Info cards
  const companyCards: CategoryCard[] = [
    {
      id: "companyData",
      title: "Lookup company data (all-in-one)",
      icon: <Building className="text-blue-500" />,
      color: "blue",
    },
    {
      id: "companyContacts",
      title: "Search contacts at company",
      icon: <User className="text-green-500" />,
      color: "green",
    },
    {
      id: "companySocial",
      title: "Find website & social link",
      icon: <Link className="text-purple-500" />,
      color: "purple",
    },
  ];

  // Sample formulas data (would be retrieved from API in real application)
  const formulas: Record<string, Formula[]> = {
    emailByName: [
      {
        id: 1,
        icon: <AtSign className="text-indigo-500" size={24} />,
        title: "Find work email by name and company",
        description:
          "Takes a name and company link or name and retrieves that person's work email.",
        credits: 3,
        node_id: 2,
        details: {
          usage:
            "This formula finds a person's work email address using their name and company information.",
          inputParams: [
            {
              name: "firstName",
              type: "string",
              required: true,
              description: "First name of the person",
            },
            {
              name: "lastName",
              type: "string",
              required: true,
              description: "Last name of the person",
            },
            {
              name: "company",
              type: "string",
              required: true,
              description: "Company name or website URL",
            },
          ],
          outputParams: [
            {
              name: "email",
              type: "string",
              description: "Work email address of the person",
            },
            {
              name: "confidence",
              type: "number",
              description: "Confidence score (0-100)",
            },
          ],
          example:
            "Input: John Smith, Acme Corp\nOutput: john.smith@acmecorp.com (Confidence: 85%)",
        },
      },
      {
        id: 2,
        icon: <Mail className="text-pink-500" size={24} />,
        title: "Get email by name and company",
        description:
          "Takes a first/last name and company link in, and returns that person's email.",
        credits: 4,
        node_id: 2,
        details: {
          usage:
            "Find verified business emails using a person's name and their company.",
          inputParams: [
            {
              name: "firstName",
              type: "string",
              required: true,
              description: "First name of the person",
            },
            {
              name: "lastName",
              type: "string",
              required: true,
              description: "Last name of the person",
            },
            {
              name: "companyDomain",
              type: "string",
              required: true,
              description: "Company domain (e.g. acmecorp.com)",
            },
          ],
          outputParams: [
            {
              name: "email",
              type: "string",
              description: "Email address of the person",
            },
            {
              name: "verified",
              type: "boolean",
              description: "Whether the email is verified",
            },
          ],
          example:
            "Input: Jane Doe, examplecompany.com\nOutput: jane.doe@examplecompany.com (Verified: Yes)",
        },
      },
      {
        id: 3,
        icon: <MessageSquare className="text-pink-500" size={24} />,
        title: "Get email by name and company",
        description:
          "FindyMail's email finder takes a person's full name and returns their email address.",
        credits: 4,
        node_id: 2,
        details: {
          usage:
            "FindyMail's proprietary algorithm finds professional email addresses with high accuracy.",
          inputParams: [
            {
              fieldName: "name",
              name: "Name",
              type: "string",
              required: true,
              description: "Full name of the person",
            },
            {
              fieldName: "domain",
              name: "Domain",
              type: "string",
              required: false,
              description: "Company domain (e.g. website.com)",
            },
          ],
          outputParams: [
            {
              fieldName: "contact.name",
              name: "Name",
              type: "string",
              description: "Name of the person",
            },
            {
              fieldName: "contact.domain",
              name: "Domain",
              type: "string",
              description: "Domain of the company",
            },
            {
              fieldName: "contact.email",
              name: "Email",
              type: "string",
              description: "Professional email address",
            },
          ],
          example: "Input: John Doe, website.com\nOutput: john@website.com",
        },
      },
    ],
    emailBySocial: [
      {
        id: 4,
        icon: <Link className="text-blue-500" size={24} />,
        title: "Get email from LinkedIn profile",
        description: "Extracts email from a LinkedIn profile URL.",
        credits: 5,
        node_id: 3,
        details: {
          usage:
            "This formula extracts email addresses from LinkedIn profiles.",
          inputParams: [
            {
              name: "linkedinUrl",
              type: "string",
              required: true,
              description: "LinkedIn profile URL",
            },
          ],
          outputParams: [
            {
              name: "email",
              type: "string",
              description: "Email address",
            },
          ],
          example:
            "Input: https://linkedin.com/in/johndoe\nOutput: john.doe@example.com",
        },
      },
    ],
    phoneNumber: [
      {
        id: 5,
        icon: <Phone className="text-green-500" size={24} />,
        title: "Find phone number by email",
        description: "Finds phone numbers associated with an email address.",
        credits: 10,
        node_id: 4,
        details: {
          usage: "This formula finds phone numbers linked to an email address.",
          inputParams: [
            {
              name: "email",
              type: "string",
              required: true,
              description: "Email address",
            },
          ],
          outputParams: [
            {
              name: "phoneNumber",
              type: "string",
              description: "Phone number",
            },
          ],
          example: "Input: john.doe@example.com\nOutput: +1 555-123-4567",
        },
      },
    ],
  };

  // Make sure all category IDs have at least an empty array
  personalCards.forEach((card) => {
    if (!formulas[card.id]) {
      formulas[card.id] = [];
    }
  });

  companyCards.forEach((card) => {
    if (!formulas[card.id]) {
      formulas[card.id] = [];
    }
  });

  // Sample workflow nodes and API info for the selected formula
  const getWorkflowNodes = (formula: Formula): WorkflowNode[] => {
    return [
      {
        node_id: 1,
        name: "Data Extraction Source",
        desc: "Select the source to extract data from",
        options: [
          {
            id: "google_map",
            name: "Google Map Scraper",
            inputs: [
              { label: "Query", placeholder: "surat in Gujarat, India" },
              { label: "Limit", placeholder: "10", type: "number" },
            ],
          },
          {
            id: "linkedin_sales",
            name: "LinkedIn Sales Navigator Scraper",
            inputs: [
              {
                label: "Sales Navigator URL",
                placeholder: "Enter navigator URL",
              },
              { label: "Account Number", placeholder: "Enter account number" },
            ],
          },
        ],
      },
      {
        node_id: 2,
        name: "Profile Finder",
        desc: "Find LinkedIn profiles from the extracted data",
        options: [
          {
            id: "linkedin_profile",
            name: "Hyper - LinkedIn Profile Finder",
            inputs: [
              { label: "First Name", placeholder: "Enter first name" },
              { label: "Last Name", placeholder: "Enter last name" },
              {
                label: "Company",
                placeholder: "Enter company name (optional)",
              },
            ],
          },
        ],
      },
      {
        node_id: 3,
        name: "Email Finder",
        desc: "Find email addresses from LinkedIn profiles",
        options: [
          {
            id: "email_finder",
            name: "Hyper - Email Finder",
            inputs: [
              {
                label: "LinkedIn Profile URL",
                placeholder: "Enter profile URL",
              },
              {
                label: "Company Domain",
                placeholder: "Enter company domain (optional)",
              },
            ],
          },
        ],
      },
      {
        node_id: 4,
        name: "Integration",
        desc: "Send data to third-party services",
        options: [
          {
            id: "email_integration",
            name: "Email Marketing Integration",
            inputs: [
              {
                label: "Provider",
                placeholder: "Select email provider",
                type: "dropdown",
                options: ["Mailchimp", "SendGrid", "HubSpot", "ActiveCampaign"],
              },
              { label: "API Key", placeholder: "Enter provider API key" },
            ],
          },
        ],
      },
    ];
  };

  const getApiInfo = (formula: Formula): ApiInfo => {
    return {
      title: formula.title,
      description: formula.description,
      endpoint: "https://api.example.com/v1/email-finder",
      method: "POST",
      parameters: formula.details.inputParams.map((param) => ({
        name: param.fieldName || param.name,
        type: param.type,
        required: param.required,
        description: param.description,
      })),
      curl: `curl --location --request POST 'https://api.example.com/v1/email-finder' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer YOUR_API_KEY' \\
--data-raw '{
    "firstName": "John",
    "lastName": "Doe",
    "company": "example.com"
}'`,
      responses: [
        {
          code: "200",
          description: "Successfully retrieved email",
          example: `{
  "success": true,
  "email": "john.doe@example.com",
  "confidence": 85,
  "verified": true
}`,
        },
        {
          code: "400",
          description: "Bad request - invalid parameters",
          example: `{
  "success": false,
  "error": "Missing required parameter",
  "code": "MISSING_PARAMS"
}`,
        },
      ],
    };
  };

  // Handle tab change
  const handleTabChange = (tab: "personal" | "company") => {
    setActiveTab(tab);
    setSelectedCategory(null);
    setFormulaList(null);
    setSelectedFormula(null);
    setView("categories");
  };

  // Handle category card click
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFormulaList(formulas[categoryId]);
    setSelectedFormula(null);
    setView("formulas");
  };

  // Handle formula click
  const handleFormulaClick = (formula: Formula) => {
    setSelectedFormula(formula);
    setView("details");
  };

  // Handle back button click
  const handleBackClick = () => {
    if (view === "details") {
      setView("formulas");
      setSelectedFormula(null);
    } else if (view === "formulas") {
      setView("categories");
      setSelectedCategory(null);
      setFormulaList(null);
    }
  };

  // Render category cards
  const renderCategoryCards = () => {
    const cards = activeTab === "personal" ? personalCards : companyCards;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCategoryClick(card.id)}
            className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-all flex"
          >
            {card.icon}
            <div className="ml-4">{card.title}</div>
          </div>
        ))}
      </div>
    );
  };

  // Render formula list
  const renderFormulaList = () => {
    if (!formulaList || formulaList.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500">
            No formulas available for this category.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formulaList.map((formula) => (
          <div
            key={formula.id}
            className="bg-white rounded-lg shadow-sm p-5 mb-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleFormulaClick(formula)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {formula.icon}
                <div>
                  <h3 className="font-medium">{formula.title}</h3>
                  <p className="text-gray-600 text-sm">{formula.description}</p>
                </div>
              </div>
              <div className="flex items-center text-purple-600 px-3 py-1 bg-purple-50 rounded-md">
                <Zap size={16} className="mr-1" />
                <span>{formula.credits}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render formula detail view with workflow starter
  const renderFormulaDetail = () => {
    if (!selectedFormula) return null;

    const nodes = getWorkflowNodes(selectedFormula);
    const apiInfo = getApiInfo(selectedFormula);

    return (
      <WorkflowStarter apiInfo={apiInfo} nodes={nodes} handleBackClick={handleBackClick}/>
    );
  };

  // Render content based on current view
  const renderContent = () => {
    if (view === "categories") {
      return renderCategoryCards();
    } else if (view === "formulas") {
      return renderFormulaList();
    } else if (view === "details") {
      return renderFormulaDetail();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 h-[calc(100vh-49px)] overflow-y-auto">
      {/* Only show tabs if not in detail view */}
      {view !== "details" && (
        <div className="mb-6 border-b border-gray-200">
          <div className="flex">
            {/* Back button */}
            {view !== "categories" && (
              <button
                onClick={handleBackClick}
                className="flex items-center text-blue-500 hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
              </button>
            )}
            <button
              className={`py-2 px-4 ${
                activeTab === "personal"
                  ? "border-b-2 border-emerald-500 text-black font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("personal")}
            >
              <div className="flex items-center">
                <User size={18} className="mr-2" />
                <span>Personal Info</span>
              </div>
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "company"
                  ? "border-b-2 border-emerald-500 text-black font-medium"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabChange("company")}
            >
              <div className="flex items-center">
                <Building size={18} className="mr-2" />
                <span>Company Info</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Content Container */}
      {renderContent()}
    </div>
  );
};

export default EnrichmentFormulas;
