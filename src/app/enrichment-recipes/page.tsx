"use client";

import EnrichmentFormulas from '@/components/EnrichmentFormulas';
import React from 'react';

function EnrichmentRecipes() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Enrichment Recipes</h1>
      <EnrichmentFormulas />
    </div>
  );
}

export default EnrichmentRecipes;