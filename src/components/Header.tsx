/**
 * Componente Header
 * Cabeçalho da loja com logo e carrinho
 */

import { ShoppingBag, Sparkles, TreePineIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { LOJA } from '@/config';

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl christmas-gradient flex items-center justify-center">
                <TreePineIcon className="w-7 h-7 text-green-300" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-widest">
                {LOJA.nome}
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                {LOJA.subtitulo}
              </p>
            </div>
          </div>

          {/* Botão do Carrinho */}
          <button
            onClick={onCartClick}
            className="relative p-3 rounded-2xl bg-secondary hover:bg-secondary/80 transition-all duration-300 active:scale-95"
          >
            <ShoppingBag className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
