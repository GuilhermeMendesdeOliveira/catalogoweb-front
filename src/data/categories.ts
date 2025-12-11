/**
 * ==========================================
 * CATEGORIAS - EDITE AQUI!
 * ==========================================
 * 
 * Adicione, edite ou remova categorias abaixo.
 * O "id" deve ser único e sem espaços (use traços).
 * O "label" é o nome que aparece para o cliente.
 */

export interface Category {
  id: string;    // ID único (ex: "bolos-premium")
  label: string; // Nome exibido (ex: "Bolos Premium")
}

// ============================================
// LISTA DE CATEGORIAS
// ============================================

export const initialCategories: Category[] = [
  { id: "bolos", label: "Bolos" },
  { id: "tortas", label: "Tortas" },
  { id: "bolos-premium", label: "Bolos Premium" },
  { id: "tortas-premium", label: "Tortas Premium" },
  { id: "chocotone", label: "Chocotone" },
];
