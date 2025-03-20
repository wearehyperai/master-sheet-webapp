// components/enrichment/CategoryCard.tsx
import React from "react";
import { CategoryCard as CategoryCardType } from "@/types/comps";

interface CategoryCardProps {
  card: CategoryCardType;
  onClick: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ card, onClick }) => {
  return (
    <div
      onClick={() => onClick(card.id)}
      className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-all flex"
    >
      {card.icon}
      <div className="ml-4">{card.title}</div>
    </div>
  );
};

export default CategoryCard;