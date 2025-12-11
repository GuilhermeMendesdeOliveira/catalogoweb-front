/**
 * ==========================================
 * FUNÇÕES DE FORMATAÇÃO
 * ==========================================
 * 
 * Funções utilitárias para formatar dados.
 * Não precisa editar este arquivo.
 */

/**
 * Formata um número para o formato de moeda brasileira (R$)
 * Exemplo: 89.90 -> "R$ 89,90"
 */
export function formatarPreco(preco: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(preco);
}

/**
 * Gera um ID a partir de um texto
 * Exemplo: "Bolos Premium" -> "bolos-premium"
 */
export function gerarId(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/\s+/g, '-') // Espaços viram traços
    .replace(/[^a-z0-9-]/g, ''); // Remove caracteres especiais
}
