"use client";

import React, { useState } from "react";
import WorkflowStarter from "@/components/WorkflowStarter";
import FormulaTabs from "@/components/enrichment/FormulaTabs";
import CategoryList from "@/components/enrichment/CategoryList";
import FormulaList from "@/components/enrichment/FormulaList";
import { Formula, TabType, ViewType } from "@/types/comps";
import { getApiInfo, getWorkflowNodes, initializedFormulas } from "@/data/enrichment";

const EnrichmentFormulas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [formulaList, setFormulaList] = useState<Formula[] | null>(null);
  const [selectedFormula, setSelectedFormula] = useState<Formula | null>(null);
  const [view, setView] = useState<ViewType>("categories");

  console.log({selectedCategory})

  // Handle tab change
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedCategory(null);
    setFormulaList(null);
    setSelectedFormula(null);
    setView("categories");
  };

  // Handle category card click
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setFormulaList(initializedFormulas[categoryId]);
    setSelectedFormula(null);
    setView("formulas");
  };

  // Handle formula click
  const handleFormulaClick = (formula: Formula) => {
    setSelectedFormula(formula);
    setView("details");
  };

  // Handle back button click
  const handleBackClick = () => {
    if (view === "details") {
      setView("formulas");
      setSelectedFormula(null);
    } else if (view === "formulas") {
      setView("categories");
      setSelectedCategory(null);
      setFormulaList(null);
    }
  };

  // Render formula detail view with workflow starter
  const renderFormulaDetail = () => {
    if (!selectedFormula) return null;

    const nodes = getWorkflowNodes(selectedFormula);
    const apiInfo = getApiInfo(selectedFormula);

    return (
      <WorkflowStarter
        apiInfo={apiInfo}
        nodes={nodes}
        handleBackClick={handleBackClick}
      />
    );
  };

  // Render content based on current view
  const renderContent = () => {
    if (view === "categories") {
      return <CategoryList activeTab={activeTab} onCategoryClick={handleCategoryClick} />;
    } else if (view === "formulas") {
      return <FormulaList formulaList={formulaList} onFormulaClick={handleFormulaClick} />;
    } else if (view === "details") {
      return renderFormulaDetail();
    }
    
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 h-[calc(100vh-49px)] overflow-y-auto">
      {/* Tabs navigation */}
      <FormulaTabs
        activeTab={activeTab}
        view={view}
        handleTabChange={handleTabChange}
        handleBackClick={handleBackClick}
      />

      {/* Content Container */}
      {renderContent()}
    </div>
  );
};

export default EnrichmentFormulas;