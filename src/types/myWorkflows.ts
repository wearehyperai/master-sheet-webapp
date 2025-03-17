export type WorkflowStatus = 'draft' | 'completed' | 'all';

export interface ApiCall {
  id: string;
  endpoint: string;
  method: string;
  status: 'success' | 'failed';
  timestamp: string;
  duration: number; // in ms
  creditsConsumed: number;
}

export interface WorkflowResponse {
  id: string;
  data: Record<string, unknown>[];
  timestamp: string;
}

export interface Workflow {
  id: string;
  name: string;
  status: 'draft' | 'completed';
  createdAt: string;
  lastRunAt: string | null;
  apiCalls: ApiCall[];
  successfulRuns: number;
  failedRuns: number;
  totalCreditsConsumed: number;
  response: WorkflowResponse | null;
  description?: string;
}