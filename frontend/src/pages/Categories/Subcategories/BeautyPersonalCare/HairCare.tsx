import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const HairCare = () => {
  const brands = ['Pantene', 'Garnier', 'L\'Oreal', 'Redken', 'SheaMoisture', 'Schwarzkopf'];
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const products = Array.from({ length: 16 }, (_, i) => ({
    id: `hair-care-${i + 1}`,
    name: `Hair Care Product ${i + 1}`,
    description: 'Professional hair care products',
    price: Math.floor(Math.random() * 80) + 10,
    image: `https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&q=${80 + i}`,
    category: 'Beauty & Personal Care',
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: Math.round((Math.random() * 2 + 3.8) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 1100),
    discount: Math.floor(Math.random() * 40),
    isNew: true,
    isBestSeller: Math.random() > 0.55,
    stock: Math.floor(Math.random() * 280),
    inStock: true,
  }));

  const filteredProducts = selectedBrand
    ? products.filter((p) => p.brand === selectedBrand)
    : products;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-12 mb-8">
        <div className="container">
          <Link to="/category/beauty-personal-care" className="flex items-center gap-2 text-yellow-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Beauty & Personal Care
          </Link>
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            <Sparkles className="h-10 w-10" />
            Hair Care
          </h1>
          <p className="text-yellow-100">Premium hair care products for beautiful hair</p>
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
                  ? 'bg-amber-600 text-white'
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
                    ? 'bg-amber-600 text-white'
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
              {selectedBrand ? `${selectedBrand} Hair Care` : "All Hair Care"}
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

export default HairCare;
