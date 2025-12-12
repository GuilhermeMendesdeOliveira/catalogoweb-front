/**
 * ==========================================
 * CONFIGURAÇÕES DO CATÁLOGO - EDITE AQUI!
 * ==========================================
 * 
 * Este arquivo contém todas as configurações da loja.
 * Você pode editar os valores abaixo sem precisar
 * mexer no resto do código.
 */

// ============================================
// INFORMAÇÕES DA LOJA
// ============================================

const currentYear = new Date().getFullYear();

export const LOJA = {
  // Nome da sua loja (aparece no header)
  nome: "Camafeu",
  
  // Subtítulo da loja
  subtitulo: "Doceria e Cafeteria",
  
  // Número do WhatsApp para receber pedidos
  // Formato: código do país + DDD + número (sem espaços ou traços)
  // Exemplo: 5511999999999
  whatsapp: "5541987855234",
  
  // Texto do rodapé
  rodape: `© ${currentYear} Camafeu Cafeteria - Todos os Direitos Reservados`,
};

// ============================================
// SENHA DO ADMIN
// ============================================

// Senha para acessar o painel administrativo
// Mude para uma senha segura!
export const ADMIN_SENHA = "natal2025";

// ============================================
// MENSAGEM DO WHATSAPP
// ============================================

// Mensagem inicial que será enviada pelo WhatsApp
// Os produtos serão listados automaticamente após esta mensagem
export const MENSAGEM_WHATSAPP = "Olá! Gostaria de fazer meu pedido de Natal 🎄✨";
