import React from "react";
import CategoryCard from "./CategoryCard";
import { CategoryList  as CategoryListProps} from "@/types/comps";
import { companyCards, personalCards } from "@/data/enrichment";

const CategoryList: React.FC<CategoryListProps> = ({ activeTab, onCategoryClick }) => {
  const cards = activeTab === "personal" ? personalCards : companyCards;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <CategoryCard
          key={card.id}
          card={card}
          onClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

export default CategoryList;