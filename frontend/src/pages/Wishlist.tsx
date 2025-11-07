import { Heart, ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { useState } from 'react';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (item: any) => {
    setAddingToCart(item.productId);
    try {
      await addToCart(item.productId, item.name, 1);
      // Optionally remove from wishlist after adding to cart
      // removeFromWishlist(item.productId);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div className="container py-12 min-h-screen">
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

        {wishlistItems.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            Clear All
          </Button>
        )}
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
            <Card key={item.productId} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl || item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'}
                  alt={item.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500';
                  }}
                />
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">Out of Stock</span>
                  </div>
                )}
                <button
                  onClick={() => removeFromWishlist(item.productId)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-red-50 transition-colors shadow-lg"
                >
                  <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                </button>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2">{item.name}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-blue-600">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {item.discount && item.discount > 0 && (
                  <Badge className="bg-red-100 text-red-800">
                    {item.discount}% OFF
                  </Badge>
                )}
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button
                  className="flex-1"
                  disabled={!item.inStock || addingToCart === item.productId}
                  onClick={() => handleAddToCart(item)}
                >
                  {addingToCart === item.productId ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => removeFromWishlist(item.productId)}
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
