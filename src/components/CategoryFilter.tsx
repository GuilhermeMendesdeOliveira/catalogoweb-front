/**
 * Componente CategoryFilter
 * Filtros de categoria em formato de "pills"
 */

import { useCategories } from '@/contexts/CategoriesContext';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface categoriaApi {
  id: string;
  nome: string;
  ativo: boolean;
}

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categorias: categoriaApi[];
}

export default function CategoryFilter({ selectedCategory, onCategoryChange, categorias }: CategoryFilterProps) { 
  const { categories } = useCategories();
  const [isLoading, setIsLoading] = useState(false);
  
  // Adiciona "Todos" no início da lista
  const allCategories = [{ id: 'todos', nome: 'Todos', ativo: true }, ...categorias];

  return (
    <div className="py-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {allCategories.map((categoria) => (
          <button
            key={categoria.id}
            onClick={() => onCategoryChange(categoria.id)}
            className={cn(
              "pill-tag whitespace-nowrap flex-shrink-0",
              selectedCategory === categoria.id && "pill-tag-active"
            )}
          >
            {categoria.nome}
          </button>
        ))}
      </div>
    </div>
  );
}
