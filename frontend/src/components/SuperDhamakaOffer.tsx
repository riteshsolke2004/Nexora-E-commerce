import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Clock, ShoppingCart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


interface Deal {
  id: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  image: string;
  category: string;
  rating: number;
}


const SuperDhamakaOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  const [scrollPosition, setScrollPosition] = useState(0);


  // ✅ Sample deals data
  const deals: Deal[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      originalPrice: 1199.99,
      discountedPrice: 899.99,
      discount: 25,
      image: 'https://m.media-amazon.com/images/I/71d7rfSl0wL.jpg',
      category: 'Electronics',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Samsung Galaxy Watch',
      originalPrice: 399.99,
      discountedPrice: 249.99,
      discount: 38,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      category: 'Wearables',
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Sony Headphones',
      originalPrice: 349.99,
      discountedPrice: 179.99,
      discount: 49,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: 'Audio',
      rating: 4.7,
    },
    {
      id: '4',
      name: 'MacBook Air M3',
      originalPrice: 1299.99,
      discountedPrice: 999.99,
      discount: 23,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      category: 'Laptops',
      rating: 4.9,
    },
    {
      id: '5',
      name: 'iPad Pro',
      originalPrice: 1099.99,
      discountedPrice: 799.99,
      discount: 27,
      image: 'https://goodmockups.com/wp-content/uploads/2024/04/Free-Floating-iPad-Pro-2024-Mockup-PSD-2.jpg',
      category: 'Tablets',
      rating: 4.8,
    },
    {
      id: '6',
      name: 'Canon Camera',
      originalPrice: 899.99,
      discountedPrice: 599.99,
      discount: 33,
      image: 'https://rukminim2.flixcart.com/image/480/480/jgwkzgw0/dslr-camera/6/a/n/80d-dslr-camera-body-with-single-lens-18-135-is-usm-16-gb-sd-original-imaf5fgyws9ehf5c.jpeg?q=90',
      category: 'Cameras',
      rating: 4.7,
    },
  ];


  // ✅ Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      tomorrow.setHours(0, 0, 0, 0);


      const difference = tomorrow.getTime() - now.getTime();


      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);


      setTimeLeft({ hours, minutes, seconds });
    }, 1000);


    return () => clearInterval(timer);
  }, []);


  // ✅ Auto-scroll carousel
  const handleScroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('deals-carousel');
    if (container) {
      const scrollAmount = 320; // Card width + gap
      if (direction === 'right') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };


  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t-4 border-gray-300">
      <div className="container">
        {/* ✅ Header with Countdown */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Flame className="h-10 w-10 text-gray-700 animate-pulse" />
              <div className="absolute top-0 right-0 h-3 w-3 bg-gray-500 rounded-full animate-ping" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Super Dhamaka Offers
              </h2>
              <p className="text-gray-600 text-sm">Massive discounts up to 50% OFF</p>
            </div>
          </div>


          {/* ✅ Countdown Timer */}
          <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow-md border-2 border-gray-300">
            <Clock className="h-5 w-5 text-gray-700" />
            <div className="flex gap-2 font-bold text-lg">
              <span className="bg-gray-100 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-gray-700">:</span>
              <span className="bg-gray-100 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-gray-700">:</span>
              <span className="bg-gray-100 px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>
          </div>
        </div>


        {/* ✅ Carousel Container */}
        <div className="relative">
          <div
            id="deals-carousel"
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {deals.map((deal) => (
              <Link key={deal.id} to={`/products`} className="flex-shrink-0">
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group w-72 cursor-pointer transform hover:scale-105">
                  {/* ✅ Image Container */}
                  <div className="relative overflow-hidden h-64 bg-gray-100">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />


                    {/* ✅ Discount Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gray-800 text-white px-3 py-1 text-lg font-bold rounded-full shadow-lg">
                        -{deal.discount}%
                      </Badge>
                    </div>


                    {/* ✅ Flash Deal Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded-full animate-pulse">
                        <Flame className="h-3 w-3" />
                        <span className="text-xs font-bold">Flash Deal</span>
                      </div>
                    </div>


                    {/* ✅ Category */}
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {deal.category}
                      </Badge>
                    </div>
                  </div>


                  {/* ✅ Content */}
                  <div className="p-4">
                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 h-14">
                      {deal.name}
                    </h3>


                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.round(deal.rating)
                                ? 'text-gray-600'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({deal.rating})</span>
                    </div>


                    {/* Price */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-gray-800">
                        ₹{deal.discountedPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ₹{deal.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>


                    {/* Add to Cart Button */}
                    <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold group/btn">
                      <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:animate-bounce" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>


          {/* ✅ Navigation Arrows */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl hover:bg-gray-100 transition z-10 border border-gray-300"
          >
            <ChevronRight className="h-5 w-5 rotate-180 text-gray-700" />
          </button>


          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl hover:bg-gray-100 transition z-10 border border-gray-300"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>


        {/* ✅ View All Button */}
        <div className="text-center mt-8">
          <Link to="/products">
            <Button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-6 text-lg">
              View All Deals
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};


export default SuperDhamakaOffer;
