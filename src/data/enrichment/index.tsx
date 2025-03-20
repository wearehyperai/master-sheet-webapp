// data/enrichment/index.ts
import { Mail, Link, Phone, Share2, FileSearch, CheckCircle, User, Building, AtSign, MessageSquare } from "lucide-react";
import { ApiInfo } from "@/types/workflow";
import { CategoryCard, EnWorkflowNode, Formula } from "@/types/comps";

// Personal Info cards
export const personalCards: CategoryCard[] = [
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
export const companyCards: CategoryCard[] = [
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

// Sample formulas data
export const formulas: Record<string, Formula[]> = {
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

// Ensure all category IDs have at least an empty array
export const initializeFormulas = () => {
  const formulasWithAllCategories = { ...formulas };
  
  personalCards.forEach((card) => {
    if (!formulasWithAllCategories[card.id]) {
      formulasWithAllCategories[card.id] = [];
    }
  });

  companyCards.forEach((card) => {
    if (!formulasWithAllCategories[card.id]) {
      formulasWithAllCategories[card.id] = [];
    }
  });

  return formulasWithAllCategories;
};

export const initializedFormulas = initializeFormulas();

// Sample workflow nodes for the selected formula
export const getWorkflowNodes = (formula: Formula): EnWorkflowNode[] => {
  console.log(formula)
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

// Get API information for the selected formula
export const getApiInfo = (formula: Formula): ApiInfo => {
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