/**
 * ==========================================
 * DADOS DOS PRODUTOS - EDITE AQUI!
 * ==========================================
 * 
 * Adicione, edite ou remova produtos abaixo.
 * Cada produto deve ter os campos obrigatórios marcados com *.
 */

// Tipo do produto (não precisa editar)
export interface Product {
  id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
  peso: string;
  preco: number;
  url_foto: string;
  id_categoria: number;
  porcoes: string;
  observacoes: string;
}

// ============================================
// LISTA DE PRODUTOS
// ============================================
// Adicione novos produtos seguindo o mesmo formato

export const initialProducts: Product[] = [
  {
    id: 1,
    nome: "Bolo Red Velvet Natalino", 
    descricao: "Massa vermelha aveludada com cream cheese",
    id_categoria: 1,
    ativo: true,
    preco: 89.90,
    url_foto: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80",
    peso: "1.2kg",
    porcoes: "12-15 pessoas",
    observacoes: "Conservar refrigerado. Válido por 5 dias."
  },
  {
    id: 2,
    nome: "Chocotone Trufado Premium",
    descricao: "Recheio cremoso de chocolate belga",
    id_categoria: 2,
    ativo: true,
    preco: 79.90,
    url_foto: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80",  
    peso: "900g",
    porcoes: "8-10 pessoas",
    observacoes: "Produto artesanal. Encomendas com 48h de antecedência."
  },
  {
    id: 3,
    nome: "Torta de Nozes com Caramelo",
    descricao: "Nozes selecionadas e caramelo artesanal",
    id_categoria: 3,
    ativo: true,
    preco: 129.90,
    url_foto: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80",
    peso: "1.5kg",
    porcoes: "12-14 pessoas",
    observacoes: "Acompanha embalagem especial de Natal."
  },
  {
    id: 4,
    nome: "Bolo de Chocolate Intenso",
    descricao: "Três chocolates e ganache especial",
    id_categoria: 4,
    ativo: true,
    preco: 95.00,
    url_foto: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
    peso: "1.3kg",
    porcoes: "14-16 pessoas",
    observacoes: "Ideal para celebrações em família."
  },
  {
    id: 5,
    nome: "Torta de Frutas Vermelhas",
    descricao: "Mix de berries frescos e creme",
    id_categoria: 5,
    ativo: true,
    preco: 85.00,
    url_foto: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
    peso: "1.1kg",
    porcoes: "10-12 pessoas",
    observacoes: "Frutas frescas sazonais."
  },
  {
    id: 6,
    nome: "Bolo Floresta Negra Premium",
    descricao: "Cerejas e licor kirsch importado",
    id_categoria: 6,
    ativo: true,
    preco: 145.00,
    url_foto: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80",
    peso: "1.4kg",
    porcoes: "14-16 pessoas",
    observacoes: "Contém álcool. Produto artesanal premium."
  },
  {
    id: 7,
    nome: "Chocotone de Pistache",
    descricao: "Creme de pistache italiano",
    id_categoria: 2,
    ativo: true,
    preco: 99.90,
    url_foto: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80",
    peso: "850g",
    porcoes: "8-10 pessoas",
    observacoes: "Edição limitada de Natal."
  },
  {
    id: 8,
    nome: "Torta Limão Siciliano",
    descricao: "Curd de limão e merengue italiano",
    id_categoria: 3,
    ativo: true,
    preco: 75.00,
    url_foto: "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&q=80",
    peso: "1kg",
    porcoes: "10-12 pessoas",
    observacoes: "Ideal para quem prefere sobremesas menos doces."
  },
  {
    id: 9,
    nome: "Bolo Mil Folhas Premium",
    descricao: "Camadas de doce de leite argentino",
    id_categoria: 4,
    ativo: true,
    preco: 135.00,
    url_foto: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&q=80",
    peso: "1.2kg",
    porcoes: "12-14 pessoas",
    observacoes: "Textura crocante única."
  },
  {
    id: 10,
    nome: "Torta Banoffee Premium",
    descricao: "Banana, doce de leite e chantilly",
    id_categoria: 5,
    ativo: true,
    preco: 115.00,
    url_foto: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&q=80",
    peso: "1.3kg",
    porcoes: "12-14 pessoas",
    observacoes: "Sucesso absoluto nas festas de fim de ano."
  }
];
