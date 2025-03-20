// components/enrichment/FormulaDetail.tsx
import React from "react";
import WorkflowStarter from "@/components/WorkflowStarter";
import { Formula } from "@/types/comps";
import { getApiInfo, getWorkflowNodes } from "@/data/enrichment";

interface FormulaDetailProps {
  formula: Formula;
  onBackClick: () => void;
}

const FormulaDetail: React.FC<FormulaDetailProps> = ({ formula, onBackClick }) => {
  const nodes = getWorkflowNodes(formula);
  const apiInfo = getApiInfo(formula);

  return (
    <WorkflowStarter
      apiInfo={apiInfo}
      nodes={nodes}
      handleBackClick={onBackClick}
    />
  );
};

export default FormulaDetail;