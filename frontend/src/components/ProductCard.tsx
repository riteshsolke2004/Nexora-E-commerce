import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Check, Heart, Eye, Star, Zap, TrendingUp, Loader2 } from 'lucide-react';
import { Product } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext'; // ✅ Import wishlist hook
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // ✅ ALL HOOKS AT TOP LEVEL
  const { addToCart, isLoading } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist(); // ✅ Add wishlist hooks
  
  // ✅ ALL STATE AT TOP LEVEL
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculated values
  const rating = typeof product.rating === 'string' ? parseFloat(product.rating) : (product.rating || 4.5);
  const reviewCount = product.reviewCount || 0;
  const discount = product.discount || 0;
  const originalPrice = discount > 0 ? product.price / (1 - discount / 100) : null;
  const isNew = product.isNew || false;
  const isBestSeller = product.isBestSeller || false;
  const stock = typeof product.stock === 'string' ? parseInt(product.stock, 10) : (product.stock || 10);
  const isLowStock = stock > 0 && stock <= 5;
  const isOutOfStock = stock === 0;

  // ✅ Check if product is in wishlist
  const isWishlisted = isInWishlist(product.id);

  // ✅ Handle add to cart
  const handleAddToCart = async () => {
    if (isOutOfStock) {
      toast.error('Out of stock');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart(product.id, product.name, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  // ✅ Handle wishlist toggle
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: originalPrice || undefined,
      image: product.imageUrl || product.image,
      imageUrl: product.imageUrl || product.image,
      description: product.description,
      inStock: !isOutOfStock,
      stock: stock,
      discount: discount,
    });
  };

  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-2',
        isOutOfStock && 'opacity-60'
      )}
    >
      {/* Badges Container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge className="bg-blue-500 hover:bg-blue-600 shadow-lg">
            <Zap className="h-3 w-3 mr-1" />
            New
          </Badge>
        )}
        {isBestSeller && (
          <Badge className="bg-orange-500 hover:bg-orange-600 shadow-lg">
            <TrendingUp className="h-3 w-3 mr-1" />
            Best Seller
          </Badge>
        )}
        {discount > 0 && (
          <Badge className="bg-red-500 hover:bg-red-600 shadow-lg">
            -{discount}%
          </Badge>
        )}
      </div>

      {/* ✅ WISHLIST BUTTON - Connected to WishlistContext */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200',
          isWishlisted && 'text-red-500'
        )}
        onClick={handleToggleWishlist}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-all',
            isWishlisted && 'fill-current'
          )}
        />
      </Button>

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.imageUrl || product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'}
          alt={product.name}
          className={cn(
            'h-full w-full object-cover transition-transform duration-300 group-hover:scale-110',
            !imageLoaded && 'opacity-0'
          )}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500';
          }}
        />

        {/* Quick View Overlay */}
        {!isOutOfStock && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="shadow-lg">
                  <Eye className="h-4 w-4 mr-2" />
                  Quick View
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                  <DialogDescription>{product.description}</DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <img
                    src={product.imageUrl || product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'}
                    alt={product.name}
                    className="w-full rounded-lg object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500';
                    }}
                  />
                  <div className="space-y-4">
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-4 w-4',
                            i < Math.floor(rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          )}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground">
                        {rating.toFixed(1)} ({reviewCount} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">
                          ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
                        </span>
                        {originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      {discount > 0 && originalPrice && (
                        <p className="text-sm text-green-600 font-semibold">
                          Save ${(originalPrice - product.price).toFixed(2)} ({discount}%)
                        </p>
                      )}
                    </div>

                    {/* Stock Info */}
                    <div className="text-sm">
                      {isOutOfStock ? (
                        <p className="text-red-600 font-semibold">Out of Stock</p>
                      ) : isLowStock ? (
                        <p className="text-orange-600 font-semibold">Only {stock} items left!</p>
                      ) : (
                        <p className="text-green-600 font-semibold">In Stock</p>
                      )}
                    </div>

                    {/* Add to Cart & Wishlist in Modal */}
                    <div className="flex gap-2">
                      <Button
                        onClick={handleAddToCart}
                        disabled={isAdding || isLoading || isOutOfStock}
                        className="flex-1"
                        size="lg"
                      >
                        {isAdding || isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Adding...
                          </>
                        ) : isOutOfStock ? (
                          'Out of Stock'
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleToggleWishlist}
                        className={cn(isWishlisted && 'text-red-500')}
                      >
                        <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Stock Badge */}
        {isLowStock && !isOutOfStock && (
          <Badge className="absolute bottom-3 left-3 bg-orange-500 hover:bg-orange-600">
            Only {stock} left!
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        {/* Product Title */}
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 min-h-14 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-3 w-3',
                i < Math.floor(rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              )}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({reviewCount})
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
          {discount > 0 && (
            <Badge variant="destructive" className="ml-auto">
              {discount}% OFF
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || isLoading || isOutOfStock}
          className={cn(
            'flex-1 transition-all duration-200',
            justAdded && 'bg-green-600 hover:bg-green-700'
          )}
          variant={justAdded ? 'default' : 'default'}
        >
          {justAdded ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added!
            </>
          ) : isAdding || isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
