import { InputField, WorkflowConfig, WorkflowNode } from "./workflow";

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

export interface ApiDocumentationProps {
  apiInfo: ApiInfo;
  copied: boolean;
  onCopy: () => void;
}

export interface BuildTabProps {
  nodes: WorkflowNode[];
  currentNode: number;
  selectedOptions: (string | null)[];
  completedNodes: boolean[];
  isScraperMode?: boolean;
  initialScraperId?: string;
  onSelectOption: (nodeIndex: number, optionId: string | null) => void;
  onPreviousNode: () => void;
  onNextNode: () => void;
  onProceedToRun: () => void;
}


export interface InputParam {
    name: string;
    fieldName?: string;
    type: string;
    required: boolean;
    description: string;
}
  
export interface OutputParam {
    name: string;
    fieldName?: string;
    type: string;
    description: string;
}
  
export interface FormulaDetails {
    usage: string;
    inputParams: InputParam[];
    outputParams: OutputParam[];
    example: string;
}
  
export interface Formula {
    id: number;
    icon: React.ReactNode;
    title: string;
    description: string;
    credits: number;
    node_id: number;
    details: FormulaDetails;
}
  

export interface CategoryCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  color?: string;
}

export interface CategoryList {
  activeTab: TabType;
  onCategoryClick: (categoryId: string) => void;
}

export interface ApiInfo {
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

export interface EnWorkflowNodeOption {
    id: string;
    name: string;
    inputs: {
      label: string;
      placeholder: string;
      type?: string;
      options?: string[];
    }[];
}
  
export interface EnWorkflowNode {
    node_id: number;
    name: string;
    desc: string;
    options: EnWorkflowNodeOption[];
} 

export interface ProgressDataType {
    progress: number;
    receivedSize: number;
}

export interface FileUploadProps {
    userId: string;
    isUploading: boolean;
    setIsUploading: (isUploading: boolean) => void;
    progressData: ProgressDataType | null;
}

export interface InputRowProps {
  input: InputField;
  value: string;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export interface ProgressBarProps {
    progress: number;
    received: number;
    totalSize: number;
    showPercentage?: boolean;
    animate?: boolean;
}

export interface RunTabProps {
  nodes: WorkflowNode[];
  currentNode: number;
  selectedOptions: (string | null)[];
  completedNodes: boolean[];
  isScraperMode?: boolean;
  showFileUpload?: boolean;
  inputValues: Record<string, string[]>;
  inputRowsCount: number;
  onUpdateInputValue: (fieldName: string, index: number, value: string) => void;
  onAddInputRow: () => void;
  onRemoveInputRow: (index: number) => void;
  onPreviousNode: () => void;
  onNextNode: () => void;
  onSubmit: () => void;
}

export interface SidebarItemProps {
    icon: React.ReactNode;
    title: string;
    path: string;
    isActive?: boolean;
}
  
export interface SidebarCategoryProps {
    title: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    initialOpen?: boolean;
    id: string;
    isVisible: boolean;
}

export interface NestedSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    id: string;
    isVisible: boolean;
  }
  
export  interface SidebarItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    path: string;
  }
  
export interface NestedSectionData {
    id: string;
    title: string;
    items: SidebarItem[];
  }
  
export  interface CategoryData {
    id: string;
    title: string;
    icon: React.ReactNode;
    items?: SidebarItem[];
    nested?: NestedSectionData[];
  }
  
export  interface FilteredSections {
    [key: string]: boolean;
}

export interface WorkflowStarterProps {
  apiInfo: ApiInfo;
  nodes: WorkflowNode[];
  handleBackClick?: () => void;
  config?: WorkflowConfig;
}

export type TabType = "personal" | "company";
export type ViewType = "categories" | "formulas" | "details";