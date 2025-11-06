import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';

const slides = [
  {
    image: hero1,
    title: 'Premium Collection',
    subtitle: 'Discover Our Curated Selection',
    description: 'Elevate your lifestyle with handpicked premium products',
    cta: 'Shop Now',
  },
  {
    image: hero2,
    title: 'Tech & Lifestyle',
    subtitle: 'Innovation Meets Style',
    description: 'The latest in electronics and everyday essentials',
    cta: 'Explore',
  },
  {
    image: hero3,
    title: 'New Arrivals',
    subtitle: 'Fresh & Trending',
    description: 'Be the first to discover our newest additions',
    cta: 'See What\'s New',
  },
];

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = (index: number) => api?.scrollTo(index);

  return (
    <section className="relative w-full overflow-hidden bg-background">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
                
                <div className="relative h-full container mx-auto px-4 flex items-center">
                  <div className="max-w-2xl space-y-6 animate-fade-in">
                    <p className="text-sm font-semibold tracking-wider uppercase text-primary">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                      {slide.description}
                    </p>
                    <div className="flex gap-4 pt-4">
                      <Button size="lg" className="group" asChild>
                        <Link to="/#products">
                          {slide.cta}
                          <ShoppingBag className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link to="/cart">View Cart</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 h-12 w-12 border-2" />
        <CarouselNext className="right-4 h-12 w-12 border-2" />

        {/* Dots indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-primary/30 hover:bg-primary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default Hero;
