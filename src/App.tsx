import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { supabase, Product } from './lib/supabase';
import HorizontalImageList from './components/HorizontalImageList';
import Logo from './components/Logo';
import ProductCarousel from './components/ProductCarousel';
import ProductList from './components/ProductList';
import Cart, { CartItem } from './components/Cart';
import { sendOrderToWhatsApp } from './utils/whatsapp';
import MauliVideos from './components/MauliVideos';
import Location from './components/Location';
import SocialButtons from './components/SocialButtons';

// 🖼 Images
import A1 from './img/A1.jpeg';
import A2 from './img/A2.jpeg';
import A3 from './img/A3.jpeg';
import A4 from './img/A4.jpeg';
import A5 from './img/A5.jpeg';
import A6 from './img/A6.jpeg';
import A7 from './img/A7.jpeg'
import A8 from './img/A8.jpeg'
import A9 from './img/A9.jpeg';
import A10 from './img/A10.jpeg';
import A11 from './img/A11.jpeg';
import A12 from './img/A12.jpeg';
import A13 from './img/A13.jpeg';
import A14 from './img/A14.jpeg';
import A15 from './img/'
import A22 from './img/A22.jpeg';
import A26 from './img/A26.jpeg';
import A27 from './img/A27.jpeg';
import A28 from './img/A28.jpeg';

import eco from './img/whyus/eco.webp';
import packaging from './img/whyus/packaging.webp';
import shipping from './img/whyus/shipping.webp';
import moq from './img/whyus/moq.webp';
import personalization from './img/whyus/personalization.webp';
import quality from './img/whyus/quality.webp';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const productImages = [
    { src: eco, label: 'Eco Friendly' },
    { src: packaging, label: 'Premium Packaging' },
    { src: shipping, label: 'Fast Shipping' },
    { src: moq, label: 'Low MOQ' },
    { src: personalization, label: 'Personalization' },
    { src: quality, label: 'High Quality' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const data = [
        { id: 'a1', name: 'A1', price: 40, image_url: A1, description: 'Napkin Quantity: 1 | Size: 10″ × 10″', stock: 100 },
        { id: 'a2', name: 'A2', price: 50, image_url: A2, description: 'Napkin Quantity: 1 | Size: 12″ × 12″', stock: 100 },
        { id: 'a3', name: 'A3', price: 50, image_url: A3, description: 'Napkin Quantity: 1 | Size: 12″ × 12″', stock: 50 },
        { id: 'a4', name: 'A4', price: 100, image_url: A4, description: 'Napkin Quantity: 2 | Size: 12″ × 12″', stock: 100 },
        { id: 'a5', name: 'A5', price: 100, image_url: A5, description: 'Napkin Quantity: 2 | Size: 12″ × 12″', stock: 100 },
        { id: 'a6', name: 'A6', price: 150, image_url: A6, description: 'Napkin Quantity: 3 | Size: 12″ × 12″', stock: 100 },
        { id: 'a7', name: 'A7', price: 160, image_url: A7, description: 'Napkin Quantity: 5 | Size: 10″ × 10″', stock: 100 },
        { id: 'a8', name: 'A8', price: 220, image_url: A8, description: 'Napkin Quantity: 5 | Size: 12″ × 12″', stock: 100 },
        { id: 'a9', name: 'A9', price: 300, image_url: A9, description: 'Napkin Quantity: 5 | Size: 12″ × 12″', stock: 100 },
        { id: 'a10', name: 'A10', price: 400, image_url: A10, description: 'Napkin Quantity: 10 | Size: 12″ × 12″', stock: 100 },
        { id: 'A11', name: 'A11', price: 360, image_url: A11, description: 'Napkin Quantity: 5 | Size: 12″ × 12″', stock: 100 },
        { id: 'A12', name: 'A12', price: 380, image_url: A12, description: 'Napkin Quantity: 6 | Size: 12″ × 12″', stock: 100 },
        { id: 'A13', name: 'A13', price: 420, image_url: A13, description: 'Napkin Quantity: 5 | Size: 12″ × 12″', stock: 100 },
        { id: 'A13', name: 'A14', price: 420, image_url: A14, description: 'Napkin Quantity: 8 | Size: 12″ × 12″', stock: 100 },
        { id: 'A22', name: 'A22', price: 250, image_url: A22, description: 'Napkin Quantity: 7 | Size: 10″ × 10″', stock: 100 },
        { id: 'A26', name: 'A26', price: 270, image_url: A26, description: 'Napkin Quantity: 4 | Size: 12″ × 12″', stock: 100 },
        { id: 'A27', name: 'A27', price: 200, image_url: A27, description: 'Napkin Quantity: 4 | Size: 10″ × 10″', stock: 100 },
        { id: 'A28', name: 'A28', price: 400, image_url: A28, description: 'Napkin Quantity: 9 | Size: 10″ × 10″', stock: 100 },

      ];
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    setCartItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.product.id !== productId)
        : prev.map((i) =>
            i.product.id === productId
              ? { ...i, quantity: Math.min(quantity, i.product.stock) }
              : i
          )
    );
  }

  function handleCheckout() {
    if (cartItems.length > 0) {
      sendOrderToWhatsApp(cartItems);
      setCartItems([]);
      setIsCartOpen(false);
    }
  }

  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center py-1">
          <Logo />
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero / Carousel */}
      <section className="py-10 sm:py-14">
        {products.length > 0 && <ProductCarousel products={products} onAddToCart={addToCart} />}
      </section>

      {/* Product List */}
      <ProductList products={products} onAddToCart={addToCart} />

      {/* Cart Drawer */}
      <Cart
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={(id) =>
          setCartItems((prev) => prev.filter((i) => i.product.id !== id))
        }
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Videos */}
      <section className="px-4 py-4 sm:px-4">
        <MauliVideos video1="mXJEQYfO2qI" video2="2BsVOm2tGAA" linkVideoId="Ecv-Gy1iEIg" />
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-4 sm:px-4">
        <HorizontalImageList items={productImages} />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-10 pb-8 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
          <Location />
          <SocialButtons />
          <div>
            {/* <h2 className="text-lg font-semibold">Mauli Mart</h2> */}
            <p className="text-gray-400 text-sm">Your Trusted Store for Quality Products</p>
            <p className="text-gray-500 text-xs mt-4">© 2025 Mauli Mart. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {!isCartOpen && <FloatingWhatsApp />}

    </div>
  );
}

export default App;