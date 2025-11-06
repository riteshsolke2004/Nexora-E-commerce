import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Armchair, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const Furniture = () => {
  const brands = ['IKEA', 'West Elm', 'Wayfair', 'Ashley', 'Rooms to Go', 'Article'];
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const products = Array.from({ length: 16 }, (_, i) => ({
    id: `furniture-${i + 1}`,
    name: `Furniture Item ${i + 1}`,
    description: 'Premium quality furniture for your home',
    price: Math.floor(Math.random() * 2000) + 200,
    image: `https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop&q=${80 + i}`,
    category: 'Home & Kitchen',
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: Math.round((Math.random() * 2 + 3.6) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 800),
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
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12 mb-8">
        <div className="container">
          <Link to="/category/home-kitchen" className="flex items-center gap-2 text-orange-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Home & Kitchen
          </Link>
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            <Armchair className="h-10 w-10" />
            Furniture
          </h1>
          <p className="text-orange-100">Beautiful and comfortable furniture for your home</p>
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
              {selectedBrand ? `${selectedBrand} Furniture` : "All Furniture"}
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

export default Furniture;
