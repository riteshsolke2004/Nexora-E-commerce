import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProducts, Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  SlidersHorizontal,
  Package,
  X,
  Filter,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Productss = () => {
  const { categoryName } = useParams();
  const [productss, setProductss] = useState<Product[]>([]);
  const [filteredProductss, setFilteredProductss] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryName ? [categoryName] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStock, setInStock] = useState(false);

  // Sample data
  const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports'];
  const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas'];
  const ratings = [5, 4, 3, 2, 1];

  // Load products immediately without loader
  useEffect(() => {
    const loadProductss = async () => {
      try {
        // Show instant mock data while fetching
        const mockData: Product[] = Array.from({ length: 20 }, (_, i) => ({
          id: `product-${i + 1}`,
          name: `Product ${i + 1}`,
          description: `High-quality product with excellent features`,
          price: Math.floor(Math.random() * 5000) + 100,
          image: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=${80 + i}`,
          category: categories[Math.floor(Math.random() * categories.length)],
          brand: brands[Math.floor(Math.random() * brands.length)],
          rating: (Math.random() * 2 + 3).toFixed(1) as any,
          reviewCount: Math.floor(Math.random() * 500) + 50,
          discount: Math.floor(Math.random() * 40),
          isNew: Math.random() > 0.7,
          isBestSeller: Math.random() > 0.8,
          stock: Math.floor(Math.random() * 50),
          inStock: Math.random() > 0.2,
        }));

        setProductss(mockData);

        // Try to fetch real data in background
        try {
          const data = await fetchProducts();
          setProductss(data);
        } catch (error) {
          console.log('Using mock data');
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };

    loadProductss();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...productss];

    // Search
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category || ''));
    }

    // Brands
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand || ''));
    }

    // Ratings
    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);
      result = result.filter((p) => (p.rating || 0) >= minRating);
    }

    // Stock
    if (inStock) {
      result = result.filter((p) => p.inStock !== false);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.reverse();
        break;
      case 'popular':
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
    }

    setFilteredProductss(result);
  }, [
    productss,
    searchQuery,
    priceRange,
    selectedCategories,
    selectedBrands,
    selectedRatings,
    inStock,
    sortBy,
  ]);

  // Calculate active filters count
  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    selectedCategories.length +
    selectedBrands.length +
    selectedRatings.length +
    (inStock ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 5000 ? 1 : 0);

  const clearAllFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 5000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setInStock(false);
    setSortBy('featured');
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="font-semibold">Price Range</Label>
          <span className="text-sm text-muted-foreground">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </div>
        <Slider
          min={0}
          max={5000}
          step={50}
          value={priceRange}
          onValueChange={(value) => setPriceRange([value[0], value[1]])}
        />
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-3">
        <Label className="font-semibold">Categories</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <label
                htmlFor={`cat-${category}`}
                className="text-sm cursor-pointer hover:text-blue-600 transition-colors"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-3">
        <Label className="font-semibold">Brands</Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm cursor-pointer hover:text-blue-600 transition-colors"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Ratings */}
      <div className="space-y-3">
        <Label className="font-semibold">Rating</Label>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onCheckedChange={() => toggleRating(rating)}
              />
              <label
                htmlFor={`rating-${rating}`}
                className="text-sm cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <span key={i} className="text-gray-300">★</span>
                ))}
                <span className="ml-1">& Up</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={inStock}
          onCheckedChange={(checked) => setInStock(checked as boolean)}
        />
        <label
          htmlFor="in-stock"
          className="text-sm cursor-pointer hover:text-blue-600 transition-colors"
        >
          In Stock Only
        </label>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-subtle">
      {/* Header Section */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container py-6">
          <div className="space-y-4">
            {/* Title & Count */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                  {categoryName
                    ? categoryName.replace(/-/g, ' ').toUpperCase()
                    : 'All Products'}
                </h1>
                <p className="text-muted-foreground">
                  Showing {filteredProductss.length} of {productss.length} productss
                </p>
              </div>
            </div>

            {/* Search & Filters Bar */}
            <div className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden relative">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your product search</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                    {activeFiltersCount > 0 && (
                      <Button variant="outline" className="w-full mt-4" onClick={clearAllFilters}>
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Active Filters Tags */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t">
                <span className="text-sm font-medium">Active:</span>
                {selectedCategories.map((cat) => (
                  <Badge key={cat} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleCategory(cat)}>
                    {cat} <X className="h-3 w-3" />
                  </Badge>
                ))}
                {selectedBrands.map((brand) => (
                  <Badge key={brand} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleBrand(brand)}>
                    {brand} <X className="h-3 w-3" />
                  </Badge>
                ))}
                {inStock && (
                  <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => setInStock(false)}>
                    In Stock <X className="h-3 w-3" />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearAllFilters} className="ml-auto">
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex gap-6">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden md:block w-64 flex-shrink-0">
              <div className="sticky top-48 bg-white p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters
                  </h3>
                  {activeFiltersCount > 0 && <Badge>{activeFiltersCount}</Badge>}
                </div>
                <FilterContent />
                {activeFiltersCount > 0 && (
                  <>
                    <Separator className="my-4" />
                    <Button variant="outline" className="w-full" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  </>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {productss.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Package className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Loading products...</h3>
                  <p className="text-muted-foreground mb-6">
                    Please wait while we fetch the products
                  </p>
                </div>
              ) : filteredProductss.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Package className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearAllFilters}>Clear All Filters</Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProductss.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Productss;
