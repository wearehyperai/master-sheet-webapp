import { CustomWorkflowNode, EWorkflow } from "@/types/workflow";

// Sample workflows data
export const workflows: EWorkflow[] = [
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

// Custom workflow nodes data
export const customWorkflowNodes: CustomWorkflowNode[] = [
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