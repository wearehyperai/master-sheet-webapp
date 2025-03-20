// components/enrichment/FormulaTabs.tsx
import React from "react";
import { User, Building, ArrowLeft } from "lucide-react";
import { TabType, ViewType } from "@/types/comps";

interface FormulaTabsProps {
  activeTab: TabType;
  view: ViewType;
  handleTabChange: (tab: TabType) => void;
  handleBackClick: () => void;
}

const FormulaTabs: React.FC<FormulaTabsProps> = ({
  activeTab,
  view,
  handleTabChange,
  handleBackClick,
}) => {
  if (view === "details") return null;

  return (
    <div className="mb-6 border-b border-gray-200">
      <div className="flex">
        {/* Back button */}
        {view !== "categories" && (
          <button
            onClick={handleBackClick}
            className="flex items-center text-blue-500 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
          </button>
        )}
        <button
          className={`py-2 px-4 ${
            activeTab === "personal"
              ? "border-b-2 border-emerald-500 text-black font-medium"
              : "text-gray-500"
          }`}
          onClick={() => handleTabChange("personal")}
        >
          <div className="flex items-center">
            <User size={18} className="mr-2" />
            <span>Personal Info</span>
          </div>
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "company"
              ? "border-b-2 border-emerald-500 text-black font-medium"
              : "text-gray-500"
          }`}
          onClick={() => handleTabChange("company")}
        >
          <div className="flex items-center">
            <Building size={18} className="mr-2" />
            <span>Company Info</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FormulaTabs;