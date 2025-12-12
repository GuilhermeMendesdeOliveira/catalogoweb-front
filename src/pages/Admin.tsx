// ============================================
// Página Admin – Gerenciar Produtos & Categorias
// ============================================

import { useState, useEffect } from "react";
import {
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  X,
  Tags,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ADMIN_SENHA } from "@/config";
import axios from "axios";

// ============================================
// INTERFACES
// ============================================

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  ativo: boolean;
  peso: number;
  preco: number;
  url_foto: string | null;
  categoria_id: number;
}

interface Categoria {
  id: number;
  nome: string;
}

interface ProductFormData {
  id?: number;
  nome: string;
  descricao: string;
  ativo: boolean;
  peso: string;
  preco: string;
  url_foto: string;
  categoria_id: string;
}

const emptyForm: ProductFormData = {
  nome: "",
  descricao: "",
  ativo: true,
  peso: "",
  preco: "",
  url_foto: "",
  categoria_id: "",
};

export default function Admin() {
  const backendUrl = "http://d400scgsso4kcsc0ko0g8408.217.15.170.97.sslip.io";

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // Dados
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Product Modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(emptyForm);

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Categoria modal
  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false);
  const [novaCategoria, setNovaCategoria] = useState("");

  // Tabs
  const [tab, setTab] = useState<"produtos" | "categorias">("produtos");

  // ============================================
  // LOGIN
  // ============================================

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_SENHA) {
      setIsAuthenticated(true);
      toast.success("Bem-vindo ao painel Admin!");
    } else {
      toast.error("Senha incorreta!");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  // ============================================
  // API
  // ============================================

  const fetchCategorias = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/categoria/findAll`);
      const payload = res.data?.data ?? res.data ?? [];
      setCategorias(payload);
    } catch (e) {
      toast.error("Erro ao carregar categorias");
    }
  };

  const fetchProdutos = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/api/produto/findAll`);
      const payload = res.data?.data ?? res.data ?? [];
      setProdutos(payload);
    } catch (err) {
      toast.error("Erro ao carregar produtos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategorias();
      fetchProdutos();
    }
  }, [isAuthenticated]);

  // ATIVAR/DESATIVAR PRODUTO
  const toggleAtivo = async (produto: Produto) => {
    try {
      const novoValor = !produto.ativo;

      await axios.put(`${backendUrl}/api/produto/changeAtivo/${produto.id}`);

      toast.success(`Produto ${novoValor ? "ativado" : "desativado"}!`);
      fetchProdutos();
    } catch (err) {
      toast.error("Erro ao alterar status do produto");
    }
  };


  // DELETE produto
  const deleteProduto = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;

    try {
      const res = await fetch(`${backendUrl}/api/produto/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      toast.success("Produto removido!");
      fetchProdutos();
    } catch (err) {
      toast.error("Erro ao excluir produto");
    }
  };

  // DELETE categoria
  const deleteCategoria = async (id: number) => {
    if (!confirm("Excluir categoria? Produtos vinculados podem ser afetados.")) return;

    try {
      await axios.delete(`${backendUrl}/api/categoria/delete/${id}`);
      toast.success("Categoria removida!");
      fetchCategorias();
    } catch {
      toast.error("Erro ao excluir categoria");
    }
  };

  // ============================================
  // FORM DE PRODUTO
  // ============================================

  const openForm = (product?: Produto) => {
    setFile(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }

    if (product) {
      setEditingProduct(product);
      setFormData({
        id: product.id,
        nome: product.nome,
        descricao: product.descricao,
        ativo: product.ativo,
        peso: product.peso.toString(),
        preco: product.preco.toString(),
        url_foto: product.url_foto ?? "",
        categoria_id: String(product.categoria_id),
      });
    } else {
      setEditingProduct(null);
      setFormData(emptyForm);
    }

    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setFormData(emptyForm);
    setFile(null);

    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;

    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }

    setFile(f);
    if (f) {
      const preview = URL.createObjectURL(f);
      setFilePreview(preview);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim()) return toast.error("Nome é obrigatório");
    if (!formData.categoria_id) return toast.error("Selecione uma categoria!");

    setIsSubmitting(true);

    try {
      const fd = new FormData();

      fd.append("nome", formData.nome);
      fd.append("descricao", formData.descricao);
      fd.append("ativo", String(formData.ativo));
      fd.append("peso", formData.peso);
      fd.append("preco", formData.preco);
      fd.append("categoria_id", formData.categoria_id);
      fd.append("url_foto", formData.url_foto || "");

      if (file) fd.append("file", file);

      if (editingProduct) {
        await axios.put(
          `${backendUrl}/api/produto/update/${editingProduct.id}`,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Produto atualizado!");
      } else {
        await axios.post(`${backendUrl}/api/produto/create`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Produto criado!");
      }

      fetchProdutos();
      closeForm();
    } catch (err) {
      toast.error("Erro ao salvar produto");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================
  // TELA DE LOGIN
  // ============================================

  if (!isAuthenticated)
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-card p-6 rounded-2xl shadow-lg"
        >
          <div className="text-center mb-6">
            <Lock className="w-10 h-10 mx-auto text-primary" />
            <h1 className="text-xl font-bold mt-2">Área Admin</h1>
          </div>

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-secondary mb-4 outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold"
          >
            Entrar
          </button>

          <Link
            to="/"
            className="block text-center mt-6 text-sm text-muted-foreground"
          >
            <ArrowLeft className="inline w-4 h-4 mr-1" />
            Voltar ao site
          </Link>
        </form>
      </div>
    );

  // ============================================
  // COMPONENTE PRINCIPAL
  // ============================================

  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-bold">Painel Admin</h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-muted-foreground"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </header>

      <main className="p-6 max-w-3xl mx-auto">
        {/* =========================
            TABS
        ========================== */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setTab("produtos")}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 ${tab === "produtos"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground"
              }`}
          >
            <Package className="w-4 h-4" />
            Produtos
          </button>

          <button
            onClick={() => setTab("categorias")}
            className={`px-4 py-2 flex items-center gap-2 border-b-2 ${tab === "categorias"
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-muted-foreground"
              }`}
          >
            <Tags className="w-4 h-4" />
            Categorias
          </button>
        </div>

        {/* =========================
            TAB: PRODUTOS
        ========================== */}
        {tab === "produtos" && (
          <>
            <button
              onClick={() => openForm()}
              className="w-full py-4 border border-dashed rounded-xl flex justify-center items-center gap-2 mb-6"
            >
              <Plus className="w-5 h-5" /> Novo Produto
            </button>

            {isLoading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : produtos.length === 0 ? (
              <div className="text-center py-8">Nenhum produto cadastrado.</div>
            ) : (
              <div className="space-y-4">
                {produtos.map((p) => (
                  <div key={p.id} className="flex items-center bg-card p-4 rounded-xl shadow">
                    <img
                      src={`${backendUrl}${p.url_foto}`}
                      className="w-20 h-20 rounded-lg object-cover mr-4"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{p.nome}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{p.descricao}</p>

                      <p className="text-sm mt-1">
                        Categoria: <b>{categorias.find((c) => c.id === p.categoria_id)?.nome}</b>
                      </p>

                      <p className="font-bold mt-1">R$ {p.preco.toFixed(2).replace(".", ",")}</p>

                      {/* Status visual */}
                      <p
                        className={`text-xs mt-1 font-bold ${p.ativo ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {p.ativo ? "ATIVO" : "INATIVO"}
                      </p>
                    </div>

                    {/* BOTÃO ATIVAR/DESATIVAR */}
                    <button
                      onClick={() => toggleAtivo(p)}
                      className={`p-2 rounded-xl mr-2 ${p.ativo ? "bg-yellow-100 hover:bg-yellow-200" : "bg-green-100 hover:bg-green-200"
                        }`}
                    >
                      {p.ativo ? (
                        <span className="text-yellow-700 text-xs font-semibold">Desativar</span>
                      ) : (
                        <span className="text-green-700 text-xs font-semibold">Ativar</span>
                      )}
                    </button>

                    <button
                      onClick={() => openForm(p)}
                      className="p-2 rounded-xl hover:bg-secondary"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => deleteProduto(p.id)}
                      className="p-2 rounded-xl hover:bg-red-100 ml-2"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>

                ))}
              </div>
            )}
          </>
        )}

        {/* =========================
            TAB: CATEGORIAS
        ========================== */}
        {tab === "categorias" && (
          <>
            <button
              onClick={() => setIsCategoriaModalOpen(true)}
              className="w-full py-4 border border-dashed rounded-xl flex justify-center items-center gap-2 mb-6"
            >
              <Plus className="w-5 h-5" /> Nova Categoria
            </button>

            {categorias.length === 0 ? (
              <div className="text-center py-8">Nenhuma categoria cadastrada.</div>
            ) : (
              <div className="space-y-3">
                {categorias.map((c) => (
                  <div
                    key={c.id}
                    className="flex justify-between items-center bg-card p-4 rounded-xl shadow"
                  >
                    <span className="font-medium">{c.nome}</span>

                    <button
                      onClick={() => deleteCategoria(c.id)}
                      className="p-2 hover:bg-red-100 rounded-xl"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* =========================
          MODAL PRODUTO
      ========================== */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-card p-6 rounded-2xl w-full max-w-lg shadow-xl relative h-[95vh] overflow-y-auto">
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Editar Produto" : "Novo Produto"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <div>
                <label className="text-sm font-medium">Nome *</label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-3 bg-secondary rounded-xl"
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="text-sm font-medium">Categoria *</label>
                <select
                  required
                  value={formData.categoria_id}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria_id: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-3 bg-secondary rounded-xl"
                >
                  <option value="">Selecione...</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Descrição */}
              <div>
                <label className="text-sm font-medium">Descrição *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  className="w-full mt-1 px-4 py-3 bg-secondary rounded-xl"
                />
              </div>

              {/* Peso e preço */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-sm font-medium">Peso *</label>
                  <input
                    type="number"
                    required
                    value={formData.peso}
                    onChange={(e) =>
                      setFormData({ ...formData, peso: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-3 bg-secondary rounded-xl"
                  />
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium">Preço *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.preco}
                    onChange={(e) =>
                      setFormData({ ...formData, preco: e.target.value })
                    }
                    className="w-full mt-1 px-4 py-3 bg-secondary rounded-xl"
                  />
                </div>
              </div>

              {/* Imagem */}
              <div>
                <label className="text-sm font-medium">Imagem do Produto</label>

                <div className="flex items-center gap-4 mt-2">
                  <div className="w-32 h-32 bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
                    {filePreview ? (
                      <img
                        src={filePreview}
                        className="w-full h-full object-cover"
                      />
                    ) : formData.url_foto ? (
                      <img
                        src={
                          formData.url_foto.startsWith("http")
                            ? formData.url_foto
                            : `${formData.url_foto}`
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-xs text-muted-foreground text-center">
                        Sem imagem
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full mt-1"
                    />

                    <p className="text-xs text-muted-foreground mt-2">
                      Se você não escolher uma imagem nova, a atual será mantida.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ativo */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.ativo}
                  onChange={(e) =>
                    setFormData({ ...formData, ativo: e.target.checked })
                  }
                />
                <label>Produto ativo</label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold disabled:opacity-60"
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          MODAL NOVA CATEGORIA
      ========================== */}
      {isCategoriaModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center p-4 z-50">
          <div className="bg-card p-6 rounded-2xl w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setIsCategoriaModalOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-secondary rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold mb-4">Nova Categoria</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome da categoria"
                value={novaCategoria}
                onChange={(e) => setNovaCategoria(e.target.value)}
                className="w-full px-4 py-3 bg-secondary rounded-xl"
              />

              <button
                onClick={async () => {
                  if (!novaCategoria.trim()) {
                    toast.error("Digite um nome");
                    return;
                  }

                  try {
                    await axios.post(`${backendUrl}/api/categoria/create`, {
                      nome: novaCategoria,
                    });

                    toast.success("Categoria criada!");
                    setNovaCategoria("");
                    setIsCategoriaModalOpen(false);
                    fetchCategorias();
                  } catch {
                    toast.error("Erro ao criar categoria");
                  }
                }}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
