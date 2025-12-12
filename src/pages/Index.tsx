/**
 * Página Principal
 * Catálogo de produtos
 */

import { useState, useMemo, useEffect } from 'react';
import { Sparkles, TreePineIcon } from 'lucide-react';
import Header from '@/components/Header';
import CategoryFilter from '@/components/CategoryFilter';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import CartModal from '@/components/CartModal';
import ChristmasDecoration from '@/components/ChristmasDecoration';
import { Product } from '@/data/products';
import { useProducts } from '@/contexts/ProductsContext';
import { LOJA } from '@/config';
import axios from 'axios';

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

interface categoriaApi {
  id: string;
  nome: string;
  ativo: boolean;
}

export default function Index() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState<produtosApi | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [produtosApi, setProdutosApi] = useState<produtosApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState<categoriaApi[]>([]);

  const urlDev = 'http://d400scgsso4kcsc0ko0g8408.217.15.170.97.sslip.io';

  const BASE_URL = urlDev;

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
  }, []);


  const fetchProdutos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/produto/findAll`);
      setProdutosApi(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchCategorias = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/categoria/findAll`);
      setCategorias(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // Filtra produtos pela categoria selecionada
  const filteredProducts = useMemo(() => {
    // Filtra apenas produtos ativos
    const ativos = produtosApi.filter(p => p.ativo === true);

    // Se categoria = todos → retorna somente os ativos
    if (selectedCategory === 'todos') return ativos;

    // Senão, retorna os ativos daquela categoria
    return ativos.filter(p => p.categoria_id === selectedCategory);
  }, [produtosApi, selectedCategory]);


  return (
    <div className="min-h-screen bg-background">
      <ChristmasDecoration />
      <Header onCartClick={() => setIsCartOpen(true)} />

      <main className="container mx-auto px-4 pb-8">
        {/* Seção Hero */}
        <section className="py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <TreePineIcon className="w-6 h-6 text-green-600 animate-sparkle" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Catálogo Especial de Natal
              <hr />
            </span>
            <Sparkles className="w-6 h-6 text-green-600 animate-sparkle" style={{ animationDelay: '0.5s' }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Doces que encantam
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Bolos, tortas e chocotones artesanais para tornar seu Natal ainda mais especial
          </p>
        </section>

        {/* Filtro de Categorias */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categorias={categorias}
        />

        {/* Grid de Produtos */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={setSelectedProduct}
              index={index}
            />
          ))}
        </section>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}
      </main>

      {/* Rodapé */}
      <footer className="py-8 text-center border-t border-border">
        <p className="text-sm text-muted-foreground">
          {LOJA.rodape}
        </p>
        <p className="text-sm text-muted-foreground">
          • Feito com ❤️ por <a href="https://www.softiun.com.br" target="_blank" rel="noopener noreferrer" className="text-primary">© Softiun</a>
        </p>
      </footer>

      {/* Modais */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {isCartOpen && (
        <CartModal onClose={() => setIsCartOpen(false)} />
      )}
    </div>
  );
}
