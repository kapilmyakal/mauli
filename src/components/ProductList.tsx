import { ShoppingCart } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Products</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="aspect-square bg-gradient-to-br from-orange-50 to-amber-50 p-6">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-orange-600">₹{product.price}</span>
                  {/* <p className="text-xs text-gray-500 mt-1">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p> */}
                </div>
                <button
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock === 0}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
