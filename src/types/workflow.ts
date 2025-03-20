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
    options?: NodeOption[];
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
  
export interface EWorkflowNode {
    node_id: number;
    name: string;
    desc: string;
    input: string[];
}
  
export interface EWorkflow {
    id: number;
    name: string;
    desc: string;
    type: string;
    input: string[];
    output: string;
    nodes: EWorkflowNode[];
}
  
export interface CustomWorkflowOption {
    name: string;
    inputs: {
      label: string;
      placeholder: string;
      type?: string;
      options?: string[];
    }[];
}
  
export  interface CustomWorkflowNode {
    node_id: number;
    name: string;
    desc: string;
    isDropdown: boolean;
    options: CustomWorkflowOption[];
}

export interface WorkflowInput {
  label: string;
  placeholder: string;
  type?: string;
  options?: string[];
}
  

export interface WorkflowListProps {
  activeTab: string;
  onViewWorkflow: (id: number) => void;
  onCreateCustom: () => void;
}

export type WorkflowView = 'cards' | 'detail' | 'custom';
export type WorkflowTab = 'all' | 'email' | 'linkedin' | 'website';
