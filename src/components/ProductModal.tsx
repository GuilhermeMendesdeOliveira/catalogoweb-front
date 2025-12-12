/**
 * Componente ProductModal
 * Modal de detalhes do produto
 */

import { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, Scale, Users, Info } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { formatarPreco } from '@/utils/formatters';
import { toast } from 'sonner';

interface produtosApi {
  id: number;
  ativo: boolean;
  nome: string;
  descricao: string;
  preco: number;
  peso: number;
  url_foto: string;
  categoria_id: string;
  categoria: {
    id: number;
    nome: string;
  }
}

interface ProductModalProps {
  product: produtosApi;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${product.nome} adicionado ao carrinho!`, {
      description: `${quantity} ${quantity > 1 ? 'unidades' : 'unidade'}`,
    });
    onClose();
  };

  const backendUrl = "http://d400scgsso4kcsc0ko0g8408.217.15.170.97.sslip.io";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
        <div 
          className="modal-content w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col rounded-t-3xl sm:rounded-3xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Barra móvel */}
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-muted rounded-full" />
          </div>

          {/* Botão Fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>

          {/* Imagem */}
          <div className="relative aspect-video sm:aspect-[16/10] overflow-hidden flex-shrink-0">
            <img
              src={`${backendUrl}${product.url_foto}`}
              alt={product.nome}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent" />
          </div>

          {/* Conteúdo */}
          <div className="p-6 overflow-y-auto flex-1">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-3 capitalize">
              {product.categoria.nome}
            </span>

            <h2 className="text-2xl font-bold text-foreground mb-2">
              {product.nome}
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.descricao}
            </p>

            {/* Informações */}
            <div className="flex flex-wrap gap-3 mb-6">
              {product.peso && (
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl">
                  <Scale className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{product.peso} Kg</span>
                </div>
              )}
              {/* {product.porcoes && (
                <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{product.porcoes}</span>
                </div>
              )} */}
            </div>

            {/* {product.observacoes && (
              <div className="flex items-start gap-2 p-4 bg-accent/10 rounded-2xl mb-6">
                <Info className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground/80">{product.observacoes}</p>
              </div>
            )} */}

            {/* Preço */}
            <div className="text-3xl font-bold text-primary mb-6">
              {formatarPreco(product.preco)}
            </div>

            {/* Quantidade e Adicionar */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-secondary rounded-2xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 rounded-xl hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-4 christmas-gradient text-primary-foreground rounded-2xl font-bold transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              >
                <ShoppingBag className="w-5 h-5" />
                Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
