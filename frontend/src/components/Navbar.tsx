import { ShoppingCart, Store, Search, User, Heart, Menu, ChevronDown, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useRef, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Categories for mega menu
  const categories = [
    {
      name: 'Electronics',
      subcategories: ['Mobiles', 'Laptops', 'Tablets', 'Cameras', 'Audio', 'Wearables']
    },
    {
      name: 'Fashion',
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Kids', 'Footwear', 'Accessories', 'Jewelry']
    },
    {
      name: 'Home & Kitchen',
      subcategories: ['Furniture', 'Home Decor', 'Kitchen Appliances', 'Bedding', 'Cookware']
    },
    {
      name: 'Beauty & Personal Care',
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Men\'s Grooming']
    },
    {
      name: 'Sports & Fitness',
      subcategories: ['Exercise Equipment', 'Sports Gear', 'Outdoor', 'Yoga', 'Nutrition']
    }
  ];

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search functionality with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.length > 2) {
        // Simulate search results - replace with actual API call
        setSearchResults([
          { id: 1, name: 'Sample Product 1', category: 'Electronics', price: 299 },
          { id: 2, name: 'Sample Product 2', category: 'Fashion', price: 149 },
        ]);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs">
        <div className="container py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 hover:text-blue-100 cursor-pointer transition-colors">
              <MapPin className="h-3 w-3" />
              <span>Deliver to Mumbai 400001</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-blue-100 cursor-pointer transition-colors">Sell on Vibe Commerce</span>
            <span className="hover:text-blue-100 cursor-pointer transition-colors">Customer Care</span>
            <span className="hover:text-blue-100 cursor-pointer transition-colors">Download App</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <Store className="h-7 w-7 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                Vibe Commerce
              </span>
            </Link>

            {/* Search Bar */}
            <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
              <div className={`relative transition-all duration-200 ${isSearchFocused ? 'shadow-lg' : ''}`}>
                <div className="relative flex">
                  <Input
                    type="text"
                    placeholder="Search for products, brands and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="pr-10 h-11 border-2 focus:border-blue-500 rounded-r-none"
                  />
                  <Button 
                    className="rounded-l-none h-11 px-6 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {/* Handle search */}}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {/* Search Dropdown */}
                {isSearchFocused && searchQuery.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                    {searchResults.length > 0 ? (
                      <>
                        <div className="p-2 text-xs text-gray-500 border-b">
                          Search Results
                        </div>
                        {searchResults.map((result) => (
                          <Link
                            key={result.id}
                            to={`/product/${result.id}`}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                            onClick={() => setIsSearchFocused(false)}
                          >
                            <Search className="h-4 w-4 text-gray-400" />
                            <div className="flex-1">
                              <div className="text-sm font-medium">{result.name}</div>
                              <div className="text-xs text-gray-500">{result.category}</div>
                            </div>
                            <div className="text-sm font-semibold text-blue-600">
                              ${result.price}
                            </div>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-500">
                        Type at least 3 characters to search
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* User Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="hidden lg:flex items-center gap-2 hover:bg-gray-100">
                    <User className="h-5 w-5" />
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">Account</span>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>Orders</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Wishlist</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <Heart className="h-5 w-5" />
                <span className="text-sm font-medium hidden xl:inline">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm font-medium hidden lg:inline">Cart</span>
                {totalItems > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500 hover:bg-orange-500"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="hidden lg:flex items-center gap-1 border-t py-2 overflow-x-auto">
            {categories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium hover:text-blue-600 hover:bg-blue-50">
                    {category.name}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {category.subcategories.map((sub) => (
                    <DropdownMenuItem key={sub} asChild>
                      <Link to={`/category/${sub.toLowerCase().replace(/\s+/g, '-')}`}>
                        {sub}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto animate-in slide-in-from-right">
          <div className="p-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <div className="font-semibold text-sm text-gray-500 mb-2">Categories</div>
              {categories.map((category) => (
                <details key={category.name} className="group">
                  <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-lg font-medium">
                    {category.name}
                    <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="pl-4 mt-2 space-y-1">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub}
                        to={`/category/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block p-2 text-sm hover:bg-gray-50 rounded"
                        onClick={() => setShowMobileMenu(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t space-y-2">
              <Link to="/account" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <User className="h-5 w-5" />
                <span>My Account</span>
              </Link>
              <Link to="/wishlist" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
              <Link to="/orders" className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <ShoppingCart className="h-5 w-5" />
                <span>My Orders</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
