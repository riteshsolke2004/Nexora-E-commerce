import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Smile, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const MensGrooming = () => {
  const brands = ['Gillette', 'Braun', 'Dollar Shave Club', 'Jack Black', 'Kiehl\'s', 'Clinique For Men'];
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const products = Array.from({ length: 16 }, (_, i) => ({
    id: `mens-grooming-${i + 1}`,
    name: `Men's Grooming Product ${i + 1}`,
    description: 'Complete grooming solutions for men',
    price: Math.floor(Math.random() * 100) + 15,
    image: `https://images.unsplash.com/photo-1597318972826-ec16ba549c73?w=500&h=500&fit=crop&q=${80 + i}`,
    category: 'Beauty & Personal Care',
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: Math.round((Math.random() * 2 + 3.7) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 950),
    discount: Math.floor(Math.random() * 40),
    isNew: true,
    isBestSeller: Math.random() > 0.6,
    stock: Math.floor(Math.random() * 250),
    inStock: true,
  }));

  const filteredProducts = selectedBrand
    ? products.filter((p) => p.brand === selectedBrand)
    : products;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="bg-gradient-to-r from-slate-700 to-gray-700 text-white py-12 mb-8">
        <div className="container">
          <Link to="/category/beauty-personal-care" className="flex items-center gap-2 text-gray-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Beauty & Personal Care
          </Link>
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            <Smile className="h-10 w-10" />
            Men's Grooming
          </h1>
          <p className="text-gray-100">Professional men's grooming and personal care</p>
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
                  ? 'bg-slate-700 text-white'
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
                    ? 'bg-slate-700 text-white'
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
              {selectedBrand ? `${selectedBrand} Grooming` : "All Men's Grooming"}
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

export default MensGrooming;
