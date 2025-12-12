/**
 * Componente CartModal
 * Modal do carrinho de compras
 */

import { X, Minus, Plus, Trash2, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatarPreco } from '@/utils/formatters';
import { LOJA, MENSAGEM_WHATSAPP } from '@/config';
import { toast } from 'sonner';

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { items, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      toast.error('Seu carrinho está vazio!');
      return;
    }

    // Monta a lista de produtos
    const itemsList = items
      .map(item => `- ${item.product.nome} (${item.quantity} und) — ${formatarPreco(item.product.preco * item.quantity)}`)
      .join('\n');

    // Monta a mensagem completa
    const message = encodeURIComponent(
      `${MENSAGEM_WHATSAPP}\n\nProdutos selecionados:\n${itemsList}\n\nTotal: ${formatarPreco(totalPrice)}`
    );

    // Abre o WhatsApp
    window.open(`https://wa.me/${LOJA.whatsapp}?text=${message}`, '_blank');
    
    toast.success('Redirecionando para o WhatsApp...');
    clearCart();
    onClose();
  };

  const backendUrl = "http://d400scgsso4kcsc0ko0g8408.217.15.170.97.sslip.io";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
        <div 
          className="modal-content w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col rounded-t-3xl sm:rounded-3xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Barra móvel */}
          <div className="sm:hidden flex justify-center pt-3 pb-2">
            <div className="w-10 h-1 bg-muted rounded-full" />
          </div>

          {/* Cabeçalho */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Seu Carrinho</h2>
                <p className="text-sm text-muted-foreground">
                  {items.length} {items.length === 1 ? 'item' : 'itens'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 bg-secondary rounded-full mb-4">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  Carrinho vazio
                </h3>
                <p className="text-muted-foreground text-sm">
                  Adicione delícias natalinas ao seu pedido!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 bg-secondary/50 rounded-2xl animate-fade-in"
                  >
                    <img
                      src={`${backendUrl}${item.product.url_foto}`}
                      alt={item.product.nome}
                      className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
                        {item.product.nome}
                      </h3>
                      <p className="text-primary font-bold">
                        {formatarPreco(item.product.preco * item.quantity)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-card rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center font-semibold text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rodapé com Total */}
          {items.length > 0 && (
            <div className="p-6 pt-4 border-t border-border bg-card">
              <div className="flex items-center justify-between mb-4">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">
                  {formatarPreco(totalPrice)}
                </span>
              </div>
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 py-4 christmas-green-gradient text-accent-foreground rounded-2xl font-bold transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5" />
                Finalizar via WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
