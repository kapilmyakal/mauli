import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Product } from '../lib/supabase';

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductCarousel({ products, onAddToCart }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, products.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  const currentProduct = products[currentIndex];

  return (
    <div className="relative max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="relative aspect-[16/9] bg-gradient-to-br from-orange-50 to-amber-50">
          <img
            src={currentProduct?.image_url}
            alt={currentProduct?.name}
            className="w-full h-full object-contain p-8"
          />

          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-orange-600 w-8'
                    : 'bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {currentProduct?.name}
              </h3>
              <p className="text-gray-600 mb-4">{currentProduct?.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-bold text-orange-600">
                  ₹{currentProduct?.price}
                </span>
                {/* <span className="text-sm text-gray-500">
                  {currentProduct?.stock > 0 ? `${currentProduct?.stock} in stock` : 'Out of stock'}
                </span> */}
              </div>
            </div>

            <button
              onClick={() => onAddToCart(currentProduct)}
              disabled={currentProduct?.stock === 0}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
