import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { toast } from 'sonner';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      inStock: true,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 299.99,
      originalPrice: 399.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      inStock: true,
    },
    {
      id: '3',
      name: 'Wireless Charger',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1591290621749-51169ab3e7b0?w=300&h=300&fit=crop',
      inStock: false,
    },
  ]);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
    toast.success('Removed from wishlist');
  };

  const addToCart = (item: any) => {
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Button variant="outline" className="gap-2 mb-4" asChild>
            <Link to="/products">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          <h1 className="text-4xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-2">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Heart className="h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Save items to your wishlist for later
          </p>
          <Button asChild size="lg">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-red-50 transition-colors"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                </div>
                <Badge className="mt-2">
                  {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                </Badge>
              </CardContent>
              <CardFooter className="p-4 gap-2">
                <Button
                  className="flex-1"
                  disabled={!item.inStock}
                  onClick={() => addToCart(item)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
