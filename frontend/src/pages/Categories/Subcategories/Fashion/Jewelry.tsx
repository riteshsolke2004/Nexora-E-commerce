import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const Jewelry = () => {
  const brands = ['Pandora', 'Swarovski', 'Fossil', 'Guess', 'Anne Klein', 'Citizen'];
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const products = Array.from({ length: 16 }, (_, i) => ({
    id: `jewelry-${i + 1}`,
    name: `Jewelry Item ${i + 1}`,
    description: 'Elegant and sophisticated jewelry',
    price: Math.floor(Math.random() * 500) + 50,
    image: `https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&q=${80 + i}`,
    category: 'Fashion',
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: Math.round((Math.random() * 2 + 4) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 700),
    discount: Math.floor(Math.random() * 35),
    isNew: true,
    isBestSeller: Math.random() > 0.65,
    stock: Math.floor(Math.random() * 100),
    inStock: true,
  }));

  const filteredProducts = selectedBrand
    ? products.filter((p) => p.brand === selectedBrand)
    : products;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-12 mb-8">
        <div className="container">
          <Link to="/category/fashion" className="flex items-center gap-2 text-pink-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Fashion
          </Link>
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            <Sparkles className="h-10 w-10" />
            Jewelry
          </h1>
          <p className="text-pink-100">Premium jewelry and accessories</p>
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
                  ? 'bg-rose-600 text-white'
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
                    ? 'bg-rose-600 text-white'
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
              {selectedBrand ? `${selectedBrand} Jewelry` : "All Jewelry"}
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

export default Jewelry;
 