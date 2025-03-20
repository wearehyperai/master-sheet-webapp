// components/enrichment/FormulaList.tsx
import React from "react";
import FormulaCard from "./FormulaCard";
import { Formula } from "@/types/comps";

interface FormulaListProps {
  formulaList: Formula[] | null;
  onFormulaClick: (formula: Formula) => void;
}

const FormulaList: React.FC<FormulaListProps> = ({ formulaList, onFormulaClick }) => {
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
        <FormulaCard
          key={formula.id}
          formula={formula}
          onClick={onFormulaClick}
        />
      ))}
    </div>
  );
};

export default FormulaList;