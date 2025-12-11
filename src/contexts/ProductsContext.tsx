/**
 * Contexto de Produtos
 * Gerencia os produtos da loja
 */

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product, initialProducts } from '@/data/products';

interface ProductsContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    setProducts(prev => {
      const maxId = Math.max(...prev.map(p => p.id), 0);
      return [...prev, { ...product, id: maxId + 1 }];
    });
  }, []);

  const updateProduct = useCallback((id: number, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(product => (product.id === id ? { ...product, ...updates } : product))
    );
  }, []);

  const deleteProduct = useCallback((id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de ProductsProvider');
  }
  return context;
}
