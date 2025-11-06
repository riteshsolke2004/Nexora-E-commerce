import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShoppingBag, Star } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  textColor: string;
}

const HeroSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Hero slides data
  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      title: 'Winter Sale 2025',
      subtitle: 'Up to 70% Off',
      description: 'Get the best deals on fashion, electronics, and more',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=600&fit=crop',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      textColor: 'text-white',
    },
    {
      id: 2,
      title: 'New Arrivals',
      subtitle: 'Latest Collection',
      description: 'Discover the newest trends in fashion and lifestyle',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      buttonText: 'Explore Now',
      buttonLink: '/products',
      textColor: 'text-white',
    },
    {
      id: 3,
      title: 'Electronics Mega Sale',
      subtitle: 'Save Big on Tech',
      description: 'Premium gadgets at unbeatable prices',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop',
      buttonText: 'Shop Electronics',
      buttonLink: '/category/electronics',
      textColor: 'text-white',
    },
    {
      id: 4,
      title: 'Home & Living',
      subtitle: 'Transform Your Space',
      description: 'Beautiful furniture and decor for every room',
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200&h=600&fit=crop',
      buttonText: 'Discover More',
      buttonLink: '/category/home-kitchen',
      textColor: 'text-white',
    },
  ];

  // Auto-scroll configuration
  const plugin = Autoplay({ delay: 5000, stopOnInteraction: true });

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="relative w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin]}
        className="w-full"
        opts={{
          loop: true,
          align: 'start',
        }}
        onMouseEnter={plugin.stop}
        onMouseLeave={plugin.reset}
      >
        <CarouselContent>
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
                {/* Background Image Only (No Overlay) */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Optional: Add subtle dark overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Content */}
                <div className="relative container h-full flex items-center">
                  <div className="max-w-2xl space-y-4 md:space-y-6 animate-in fade-in slide-in-from-left duration-700">
                    {/* Subtitle */}
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className={`text-sm md:text-base font-semibold ${slide.textColor} uppercase tracking-wider`}>
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold ${slide.textColor} leading-tight drop-shadow-lg`}>
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className={`text-lg md:text-xl ${slide.textColor} opacity-90 max-w-xl drop-shadow-md`}>
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Button
                        asChild
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        <Link to={slide.buttonLink}>
                          <ShoppingBag className="mr-2 h-5 w-5" />
                          {slide.buttonText}
                          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-black hover:bg-white hover:text-gray-900 transition-all duration-300"
                      >
                        <Link to="/products">
                          View All Products
                        </Link>
                      </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap gap-6 pt-6">
                      <div className={`flex items-center gap-2 ${slide.textColor} opacity-90`}>
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-sm drop-shadow-md">Free Shipping</span>
                      </div>
                      <div className={`flex items-center gap-2 ${slide.textColor} opacity-90`}>
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-sm drop-shadow-md">Easy Returns</span>
                      </div>
                      <div className={`flex items-center gap-2 ${slide.textColor} opacity-90`}>
                        <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-sm font-bold">✓</span>
                        </div>
                        <span className="text-sm drop-shadow-md">Secure Payment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="left-4 md:left-8 h-12 w-12 bg-white/90 hover:bg-white border-none shadow-lg" />
        <CarouselNext className="right-4 md:right-8 h-12 w-12 bg-white/90 hover:bg-white border-none shadow-lg" />
      </Carousel>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
