import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Shirt, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const MensClothing = () => {
  const brands = ['Nike', 'Adidas', 'Tommy Hilfiger', 'Calvin Klein', 'Ralph Lauren', 'Zara'];
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const products = Array.from({ length: 16 }, (_, i) => ({
    id: `mens-clothing-${i + 1}`,
    name: `Men's Clothing Item ${i + 1}`,
    description: 'Premium quality mens apparel',
    price: Math.floor(Math.random() * 200) + 30,
    image: `https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&q=${80 + i}`,
    category: 'Fashion',
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 1000),
    discount: Math.floor(Math.random() * 50),
    isNew: true,
    isBestSeller: Math.random() > 0.6,
    stock: Math.floor(Math.random() * 200),
    inStock: true,
  }));

  const filteredProducts = selectedBrand
    ? products.filter((p) => p.brand === selectedBrand)
    : products;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white py-12 mb-8">
        <div className="container">
          <Link to="/category/fashion" className="flex items-center gap-2 text-red-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Fashion
          </Link>
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            <Shirt className="h-10 w-10" />
            Men's Clothing
          </h1>
          <p className="text-red-100">Premium mens fashion collection</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Filter by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedBrand(null)}
              className={`p-4 rounded-lg font-medium transition-all ${
                selectedBrand === null
                  ? 'bg-pink-600 text-white'
                  : 'bg-white border hover:shadow-md'
              }`}
            >
              All Brands
            </button>
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`p-4 rounded-lg font-medium transition-all ${
                  selectedBrand === brand
                    ? 'bg-pink-600 text-white'
                    : 'bg-white border hover:shadow-md'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {selectedBrand ? `${selectedBrand} Men's Clothing` : "All Men's Clothing"}
            </h2>
            <Badge>{filteredProducts.length} Products</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensClothing;
