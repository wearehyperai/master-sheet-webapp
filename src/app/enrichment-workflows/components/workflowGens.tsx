// utils/workflowUtils.tsx
import React from 'react';
import { Table, SquareArrowUpRight, Mail, Share2, Cog } from 'lucide-react';
import { EWorkflow } from '@/types/workflow';
import { workflows } from '@/data/workflow';

// Utility functions for workflow components
export const getNodeIcon = (nodeName: string) => {
  if (nodeName.includes('Scrape')) return <Table className="h-4 w-4" />;
  if (nodeName.includes('LinkedIn')) return <SquareArrowUpRight className="h-4 w-4" />;
  if (nodeName.includes('Email') || nodeName.includes('email')) return <Mail className="h-4 w-4" />;
  if (nodeName.includes('Push')) return <Share2 className="h-4 w-4" />;
  return <Cog className="h-4 w-4" />;
};

export const filterWorkflows = (activeTab: string): EWorkflow[] => {
  return activeTab === 'all' 
    ? workflows 
    : workflows.filter(w => w.type === activeTab);
};

export const findWorkflowById = (id: number): EWorkflow | undefined => {
  return workflows.find(w => w.id === id);
};