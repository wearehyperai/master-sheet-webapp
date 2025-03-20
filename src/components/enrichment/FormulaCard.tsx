// components/enrichment/FormulaCard.tsx
import React from "react";
import { Zap } from "lucide-react";
import { Formula } from "@/types/comps";

interface FormulaCardProps {
  formula: Formula;
  onClick: (formula: Formula) => void;
}

const FormulaCard: React.FC<FormulaCardProps> = ({ formula, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm p-5 mb-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(formula)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {formula.icon}
          <div>
            <h3 className="font-medium">{formula.title}</h3>
            <p className="text-gray-600 text-sm">{formula.description}</p>
          </div>
        </div>
        <div className="flex items-center text-purple-600 px-3 py-1 bg-purple-50 rounded-md">
          <Zap size={16} className="mr-1" />
          <span>{formula.credits}</span>
        </div>
      </div>
    </div>
  );
};

export default FormulaCard;