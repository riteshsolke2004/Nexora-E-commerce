import { ShoppingCart, Search, User, Heart, Menu, ChevronDown, X, Loader2, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState, useRef, useEffect } from 'react';
import * as api from '@/lib/api';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout } = useAuth();

  const totalItems = getTotalItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchResults, setSearchResults] = useState<api.Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      name: 'Electronics',
      subcategories: ['Mobiles', 'Laptops', 'Tablets', 'Cameras', 'Audio', 'Wearables'],
    },
    {
      name: 'Fashion',
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Kids', 'Footwear', 'Accessories', 'Jewelry'],
    },
    {
      name: 'Home & Kitchen',
      subcategories: ['Furniture', 'Home Decor', 'Kitchen Appliances', 'Bedding', 'Cookware'],
    },
    {
      name: 'Beauty & Personal Care',
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Men\'s Grooming'],
    },
    {
      name: 'Sports & Fitness',
      subcategories: ['Exercise Equipment', 'Sports Gear', 'Outdoor', 'Yoga', 'Nutrition'],
    },
  ];

  // Click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search products from backend with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        try {
          const allProducts = await api.fetchProducts();

          const filteredProducts = allProducts.filter(
            (product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (product.description &&
                product.description
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())) ||
              (product.category &&
                product.category.toLowerCase().includes(searchQuery.toLowerCase()))
          );

          setSearchResults(filteredProducts.slice(0, 5));
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle search submit
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchFocused(false);
      setSearchQuery('');
    }
  };

  // Handle clicking on search result
  const handleResultClick = (productId: string) => {
    navigate(`/products`);
    setIsSearchFocused(false);
    setSearchQuery('');
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
    setShowMobileMenu(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
        <div className="container">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
            >
              <div className="h-10 w-10 relative">
                <img
                  src="/logo.png"
                  alt="Vibe Commerce Logo"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                E-Commerce
              </span>
            </Link>

            {/* Search Bar */}
            <div ref={searchRef} className="flex-1 max-w-2xl relative hidden md:block">
              <form onSubmit={handleSearchSubmit}>
                <div
                  className={`relative transition-all duration-200 ${
                    isSearchFocused ? 'shadow-lg' : ''
                  }`}
                >
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
                      type="submit"
                      className="rounded-l-none h-11 px-6 bg-blue-600 hover:bg-blue-700"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {/* Search Results Dropdown */}
                  {isSearchFocused && searchQuery.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                      {isSearching ? (
                        <div className="p-4 text-center">
                          <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-blue-600" />
                          <p className="text-sm text-gray-500">Searching...</p>
                        </div>
                      ) : searchResults.length > 0 ? (
                        <>
                          <div className="p-2 text-xs text-gray-500 border-b bg-gray-50">
                            {searchResults.length} result
                            {searchResults.length !== 1 ? 's' : ''} found
                          </div>
                          {searchResults.map((product) => (
                            <button
                              key={product.id}
                              onClick={() => handleResultClick(product.id)}
                              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors text-left"
                            >
                              <div className="h-12 w-12 bg-gray-100 rounded flex-shrink-0 overflow-hidden">
                                <img
                                  src={
                                    product.imageUrl ||
                                    product.image ||
                                    'https://via.placeholder.com/100'
                                  }
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      'https://via.placeholder.com/100';
                                  }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium line-clamp-1">
                                  {product.name}
                                </div>
                                <div className="text-xs text-gray-500 line-clamp-1">
                                  {product.category || 'General'}
                                </div>
                                {product.description && (
                                  <div className="text-xs text-gray-400 line-clamp-1 mt-1">
                                    {product.description}
                                  </div>
                                )}
                              </div>
                              <div className="text-sm font-semibold text-blue-600 flex-shrink-0">
                                $
                                {typeof product.price === 'string'
                                  ? parseFloat(product.price).toFixed(2)
                                  : product.price.toFixed(2)}
                              </div>
                            </button>
                          ))}
                          <button
                            onClick={handleSearchSubmit}
                            className="w-full p-3 text-center text-sm text-blue-600 hover:bg-blue-50 font-medium border-t"
                          >
                            View all results for "{searchQuery}"
                          </button>
                        </>
                      ) : searchQuery.length < 3 ? (
                        <div className="p-4 text-center text-sm text-gray-500">
                          Type at least 3 characters to search
                        </div>
                      ) : (
                        <div className="p-4 text-center">
                          <Search className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">No products found</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Try different keywords
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {isAuthenticated ? (
                <>
                  {/* LOGGED IN: User Account Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="hidden lg:flex items-center gap-2 hover:bg-gray-100">
                        <img
                          src={
                            user?.avatar ||
                            'https://ui-avatars.com/api/?name=User&background=random'
                          }
                          alt={user?.name}
                          className="h-5 w-5 rounded-full object-cover"
                        />
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium truncate max-w-[100px]">
                            {user?.name || 'Account'}
                          </span>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                      <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                        {user?.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/orders" className="cursor-pointer">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          <span>My Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/wishlist" className="cursor-pointer">
                          <Heart className="mr-2 h-4 w-4" />
                          <span>Wishlist</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* Wishlist Link */}
                  <Link
                    to="/wishlist"
                    className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors relative"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="text-sm font-medium hidden xl:inline">Wishlist</span>
                    {wishlistCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 hover:bg-red-500">
                        {wishlistCount}
                      </Badge>
                    )}
                  </Link>

                  {/* Cart Link */}
                  <Link
                    to="/cart"
                    className="relative flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="text-sm font-medium hidden lg:inline">Cart</span>
                    {totalItems > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500 hover:bg-orange-500">
                        {totalItems}
                      </Badge>
                    )}
                  </Link>
                </>
              ) : (
                <>
                  {/* NOT LOGGED IN: Login/Signup Buttons */}
                  <Button
                    variant="outline"
                    className="hidden lg:flex"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                  <Button
                    className="hidden lg:flex bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Categories Bar */}
          <div className="hidden lg:flex items-center gap-1 border-t py-2 overflow-x-auto">
            {categories.map((category) => (
              <DropdownMenu key={category.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium hover:text-blue-600 hover:bg-blue-50 whitespace-nowrap">
                    {category.name}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  {category.subcategories.map((sub) => (
                    <DropdownMenuItem key={sub} asChild>
                      <Link
                        to={`/category/${sub
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                      >
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
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <div className="p-4 space-y-4">
            {/* Mobile Search */}
            <div>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Search className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </form>
            </div>

            {isAuthenticated ? (
              <>
                {/* User Info Card */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={
                      user?.avatar ||
                      'https://ui-avatars.com/api/?name=User&background=random'
                    }
                    alt={user?.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                {/* Mobile Menu Links - Logged In */}
                <Link
                  to="/profile"
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <User className="h-5 w-5" />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/wishlist"
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg relative"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                  {wishlistCount > 0 && (
                    <Badge className="ml-auto bg-red-500">{wishlistCount}</Badge>
                  )}
                </Link>

                <Link
                  to="/orders"
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>My Orders</span>
                </Link>

                <Link
                  to="/cart"
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg relative"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart</span>
                  {totalItems > 0 && (
                    <Badge className="ml-auto bg-orange-500">{totalItems}</Badge>
                  )}
                </Link>

                <Separator className="my-2" />

                {/* Categories */}
                <div className="space-y-2 mb-4">
                  <div className="font-semibold text-sm text-gray-500">Categories</div>
                  {categories.map((category) => (
                    <details key={category.name} className="group">
                      <summary className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 rounded font-medium text-sm">
                        {category.name}
                        <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="pl-4 mt-2 space-y-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            to={`/category/${sub
                              .toLowerCase()
                              .replace(/\s+/g, '-')}`}
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

                <Separator className="my-2" />

                {/* Logout Button */}
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/* Mobile Menu Links - Not Logged In */}
                <div className="space-y-2 mb-6">
                  <div className="font-semibold text-sm text-gray-500 mb-2">Categories</div>
                  {categories.map((category) => (
                    <details key={category.name} className="group">
                      <summary className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-50 rounded font-medium text-sm">
                        {category.name}
                        <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="pl-4 mt-2 space-y-1">
                        {category.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            to={`/category/${sub
                              .toLowerCase()
                              .replace(/\s+/g, '-')}`}
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

                <Separator className="my-4" />

                {/* Login/Signup Buttons - Mobile */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigate('/login');
                    setShowMobileMenu(false);
                  }}
                >
                  Login
                </Button>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    navigate('/signup');
                    setShowMobileMenu(false);
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
