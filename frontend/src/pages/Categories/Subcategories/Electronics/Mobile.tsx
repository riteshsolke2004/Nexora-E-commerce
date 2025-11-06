import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Smartphone, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const Mobiles = () => {
  const brands = ['Apple', 'Samsung', 'Xiaomi', 'OnePlus', 'Google', 'Realme'];
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const products = Array.from({ length: 16 }, (_, i) => ({
    id: `mobile-${i + 1}`,
    name: `Smartphone ${i + 1}`,
    description: 'Latest flagship smartphone with advanced features',
    price: Math.floor(Math.random() * 1500) + 200,
    image: `https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop&q=${80 + i}`,
    category: 'Electronics',
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: Math.round((Math.random() * 2 + 3.5) * 10) / 10, // Fixed: now a number
    reviewCount: Math.floor(Math.random() * 1000),
    discount: Math.floor(Math.random() * 40),
    isNew: true,
    isBestSeller: Math.random() > 0.6,
    stock: Math.floor(Math.random() * 100),
    inStock: true,
  }));

  const filteredProducts = selectedBrand
    ? products.filter((p) => p.brand === selectedBrand)
    : products;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 mb-8">
        <div className="container">
          <Link to="/category/electronics" className="flex items-center gap-2 text-blue-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Electronics
          </Link>
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            <Smartphone className="h-10 w-10" />
            Mobiles & Smartphones
          </h1>
          <p className="text-blue-100">Latest mobile phones with best prices</p>
        </div>
      </div>

      <div className="container py-12">
        {/* Brand Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Filter by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedBrand(null)}
              className={`p-4 rounded-lg font-medium transition-all ${
                selectedBrand === null
                  ? 'bg-blue-600 text-white'
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
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border hover:shadow-md'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">
              {selectedBrand ? `${selectedBrand} Mobiles` : 'All Mobiles'}
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

export default Mobiles;
