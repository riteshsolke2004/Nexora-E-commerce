import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Wind, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

const Fragrances = () => {
  const brands = ['Chanel', 'Dior', 'Gucci', 'Calvin Klein', 'Armani', 'Versace'];
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const products = Array.from({ length: 16 }, (_, i) => ({
    id: `fragrance-${i + 1}`,
    name: `Fragrance ${i + 1}`,
    description: 'Luxury fragrances and perfumes',
    price: Math.floor(Math.random() * 200) + 40,
    image: `https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop&q=${80 + i}`,
    category: 'Beauty & Personal Care',
    brand: brands[Math.floor(Math.random() * brands.length)],
    rating: Math.round((Math.random() * 2 + 4) * 10) / 10,
    reviewCount: Math.floor(Math.random() * 900),
    discount: Math.floor(Math.random() * 35),
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 mb-8">
        <div className="container">
          <Link to="/category/beauty-personal-care" className="flex items-center gap-2 text-purple-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Beauty & Personal Care
          </Link>
          <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
            <Wind className="h-10 w-10" />
            Fragrances
          </h1>
          <p className="text-purple-100">Luxury perfumes and colognes</p>
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
                  ? 'bg-indigo-600 text-white'
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
                    ? 'bg-indigo-600 text-white'
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
              {selectedBrand ? `${selectedBrand} Fragrances` : "All Fragrances"}
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

export default Fragrances;
