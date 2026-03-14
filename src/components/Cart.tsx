import { ShoppingCart, X, Plus, Minus, Send } from 'lucide-react';
import { Product } from '../lib/supabase';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemoveItem, onCheckout, isOpen, onClose }: CartProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain rounded-lg bg-gradient-to-br from-orange-50 to-amber-50"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="text-orange-600 font-bold mb-3">₹{item.product.price}</p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="font-bold text-gray-900">₹{item.product.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Items ({totalItems})</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-900">
                <span>Total</span>
                <span className="text-orange-600">₹{totalPrice}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <Send className="w-5 h-5" />
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
