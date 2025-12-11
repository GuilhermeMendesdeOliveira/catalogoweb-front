/**
 * Contexto de Categorias
 * Gerencia as categorias de produtos da loja
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Category, initialCategories } from '@/data/categories';
import { gerarId } from '@/utils/formatters';

// Re-exporta o tipo Category para uso em outros arquivos
export type { Category };

interface CategoriesContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function CategoriesProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const id = gerarId(category.label);
    setCategories(prev => [...prev, { id, label: category.label }]);
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories(prev =>
      prev.map(cat => (cat.id === id ? { ...cat, ...updates } : cat))
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories deve ser usado dentro de CategoriesProvider');
  }
  return context;
}
