/**
 * Componente ProductCard
 * Card de produto exibido na listagem
 */

import { ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';
import { formatarPreco } from '@/utils/formatters';

interface produtoApi {
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
  };
}

interface ProductCardProps {
  product: produtoApi;
  onViewDetails: (product: produtoApi) => void;
  index: number;
}

export default function ProductCard({ product, onViewDetails, index }: ProductCardProps) {
  const backendUrl = "http://d400scgsso4kcsc0ko0g8408.217.15.170.97.sslip.io";
  return (
    <article
      className="product-card card-hover animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Imagem */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`${backendUrl}${product.url_foto}`}
          alt={product.nome}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-semibold bg-card/90 backdrop-blur-sm rounded-full text-foreground capitalize">
            {product.categoria.nome}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">
          {product.nome}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {product.descricao}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatarPreco(product.preco)}
          </span>
          <button
            onClick={() => onViewDetails(product)}
            className="flex items-center gap-1 px-4 py-2.5 bg-foreground text-background rounded-xl font-semibold text-sm transition-all duration-300 hover:bg-foreground/90 active:scale-95"
          >
            Ver detalhes
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
