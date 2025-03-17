// Utility to convert scraper endpoint to workflow-compatible format
import { ScraperEndpoint } from '@/types/workflow';
import { ApiInfo, WorkflowNode, NodeOption, InputField } from '@/types/workflow';

/**
 * Convert a scraper endpoint to API info for WorkflowStarter
 */
export function convertScraperToApiInfo(scraper: ScraperEndpoint): ApiInfo {
  // Convert scraper input params to API parameters
  const parameters = scraper.details.inputParams.map(param => ({
    name: param.fieldName,
    type: param.type,
    required: param.required,
    description: param.description
  }));

  // Build curl command from scraper details
  let curlCommand = `curl --location --request ${scraper.details.method} '${scraper.details.endpoint}'`;
  
  // Add headers to curl
  Object.entries(scraper.details.headers).forEach(([key, value]) => {
    curlCommand += `\\\n--header '${key}: ${value}'`;
  });
  
  // Add sample body if it's a POST request
  if (scraper.details.method === 'POST') {
    curlCommand += `\\\n--data-raw '{`;
    
    // Add sample values for each input param
    const sampleParams = scraper.details.inputParams.map(param => {
      let sampleValue = '';
      switch (param.type) {
        case 'string':
          sampleValue = `"example-${param.fieldName}"`;
          break;
        case 'number':
          sampleValue = '1';
          break;
        case 'boolean':
          sampleValue = 'true';
          break;
        default:
          sampleValue = `"example"`;
      }
      return `"${param.fieldName}": ${sampleValue}`;
    }).join(',\n  ');
    
    curlCommand += `\n  ${sampleParams}\n}'`;
  }
  
  // For GET with query params
  if (scraper.details.method === 'GET' && scraper.details.queryParams) {
    curlCommand += `?`;
    const params = scraper.details.inputParams.map(param => {
      const queryParam = scraper.details.queryParamMap?.[param.fieldName] || param.fieldName;
      return `${queryParam}=example`;
    }).join('&');
    curlCommand += params;
  }
  
  return {
    title: scraper.title,
    description: scraper.description,
    endpoint: scraper.details.endpoint,
    method: scraper.details.method,
    parameters,
    curl: curlCommand,
    responses: [
      {
        code: '200',
        description: 'Successful response',
        example: '{\n  "success": true,\n  "data": {...}\n}'
      },
      {
        code: '400',
        description: 'Bad request',
        example: '{\n  "success": false,\n  "error": "Missing required parameter"\n}'
      },
      {
        code: '401',
        description: 'Unauthorized',
        example: '{\n  "success": false,\n  "error": "Invalid API key"\n}'
      }
    ]
  };
}

/**
 * Convert a scraper endpoint to a node option for the first node
 */
export function convertScraperToNodeOption(scraper: ScraperEndpoint): NodeOption {
  // Convert scraper input params to input fields
  const inputs: InputField[] = scraper.details.inputParams.map(param => ({
    label: param.name,
    placeholder: `Enter ${param.name}`,
    type: param.type === 'number' ? 'number' : 'text',
    required: param.required,
    description: param.description
  }));
  
  return {
    id: scraper.tab,
    name: scraper.title,
    inputs
  };
}

/**
 * Create workflow nodes structure with scrapers as options in the first node
 */
export function createScraperWorkflowNodes(scrapers: ScraperEndpoint[]): WorkflowNode[] {
  // First node will be the Scraper selection
  const scraperOptions = scrapers.map(scraper => convertScraperToNodeOption(scraper));

  // Create some default follow-up nodes that might be used after scraping
  const nodes: WorkflowNode[] = [
    {
      node_id: 1,
      name: 'Data Scraper',
      desc: 'Select a scraper to extract data',
      options: scraperOptions
    },
    {
      node_id: 2,
      name: 'Data Processing',
      desc: 'Process the extracted data',
      options: [
        {
          id: 'filter',
          name: 'Filter Data',
          inputs: [
            {
              label: 'Filter Field',
              placeholder: 'Select field to filter on',
              type: 'dropdown',
              options: ['name', 'email', 'company', 'position'],
              required: true
            },
            {
              label: 'Filter Value',
              placeholder: 'Enter value to filter by',
              required: true
            }
          ]
        },
        {
          id: 'transform',
          name: 'Transform Data',
          inputs: [
            {
              label: 'Transformation Type',
              placeholder: 'Select transformation',
              type: 'dropdown',
              options: ['Format Names', 'Normalize Emails', 'Clean Text'],
              required: true
            }
          ]
        }
      ]
    },
    {
      node_id: 3,
      name: 'Data Export',
      desc: 'Export the processed data',
      options: [
        {
          id: 'csv',
          name: 'Export to CSV',
          inputs: [
            {
              label: 'Filename',
              placeholder: 'Enter filename',
              required: true
            }
          ]
        },
        {
          id: 'email',
          name: 'Send via Email',
          inputs: [
            {
              label: 'Email Address',
              placeholder: 'Enter recipient email',
              required: true
            },
            {
              label: 'Subject',
              placeholder: 'Enter email subject',
              required: true
            }
          ]
        }
      ]
    }
  ];
  
  return nodes;
}

/**
 * Get selected scraper from the tab ID
 */
export function getScraperByTabId(scrapers: ScraperEndpoint[], tabId: string): ScraperEndpoint | undefined {
  return scrapers.find(scraper => scraper.tab === tabId);
}