import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/HeroSection';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      <main className="flex-1 bg-gradient-subtle">
        <div className="container mx-auto px-4 py-12">
          <div id="products" className="mb-8 text-center animate-slide-up scroll-mt-20">
            <h2 className="text-4xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
              Discover Our Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Premium quality items for your lifestyle
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-square w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
