import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Mountain, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const Outdoor = () => {
  const brands = ['The North Face', 'Patagonia', 'Columbia', 'Salomon', 'Merrell', 'KEEN'];
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const products = Array.from({ length: 16 }, (_, i) => ({
    id: `outdoor-${i + 1}`,
    name: `Outdoor Gear ${i + 1}`,
    description: 'Adventure and outdoor equipment',
    price: Math.floor(Math.random() * 800) + 50,
    image: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&q=${80 + i}`,
    category: 'Sports & Fitness',
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: Math.round((Math.random() * 2 + 3.8) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 750),
    discount: Math.floor(Math.random() * 30),
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
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 mb-8">
        <div className="container">
          <Link to="/category/sports-fitness" className="flex items-center gap-2 text-red-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Sports & Fitness
          </Link>
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            <Mountain className="h-10 w-10" />
            Outdoor Gear
          </h1>
          <p className="text-red-100">Adventure gear for outdoor enthusiasts</p>
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
                  ? 'bg-orange-600 text-white'
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
                    ? 'bg-orange-600 text-white'
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
              {selectedBrand ? `${selectedBrand} Outdoor` : "All Outdoor Gear"}
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

export default Outdoor;
