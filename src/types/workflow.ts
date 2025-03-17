// Types for the workflow components

export interface InputField {
    label: string;
    placeholder?: string;
    type?: string;
    options?: string[];
    required?: boolean;
    description?: string;
  }
  
  export interface NodeOption {
    id: string;
    name: string;
    inputs: InputField[];
  }
  
  export interface WorkflowNode {
    node_id: number;
    name: string;
    desc: string;
    options: NodeOption[];
  }
  
  export interface ApiParameter {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }
  
  export interface ApiResponse {
    code: string;
    description: string;
    example: string;
  }
  
  export interface ApiInfo {
    title: string;
    description: string;
    endpoint: string;
    method: string;
    parameters: ApiParameter[];
    curl: string;
    responses: ApiResponse[];
  }
  
  export interface WorkflowConfig {
    isScraperMode?: boolean;
    initialScraperId?: string;
    allowFileUpload?: boolean;
    showSheetConfig?: boolean;
  }
  
  export interface ScraperEndpoint {
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