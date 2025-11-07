import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from '@/contexts/WishlistContext';

import Navbar from "@/components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";  
import Orders from "./pages/Orders";
import Productss from "./pages/Productss";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Mobiles from './pages/Categories/Subcategories/Electronics/Mobile';
import Laptops from './pages/Categories/Subcategories/Electronics/Laptops';
import Tablets from './pages/Categories/Subcategories/Electronics/Tablets';
import Cameras from './pages/Categories/Subcategories/Electronics/Cameras';
import Audio from './pages/Categories/Subcategories/Electronics/Audio';
import Wearables from './pages/Categories/Subcategories/Electronics/Wearables';
import MensClothing from './pages/Categories/Subcategories/Fashion/MensClothing';
import WomensClothing from './pages/Categories/Subcategories/Fashion/WomensClothing';
import Kids from './pages/Categories/Subcategories/Fashion/Kids';
import Footwear from './pages/Categories/Subcategories/Fashion/Footwear';
import Accessories from './pages/Categories/Subcategories/Fashion/Accessories';
import Jewelry from './pages/Categories/Subcategories/Fashion/Jewelry';
import Furniture from './pages/Categories/Subcategories/HomeKitchen/Furniture';
import HomeDecor from './pages/Categories/Subcategories/HomeKitchen/HomeDecor';
import KitchenAppliances from './pages/Categories/Subcategories/HomeKitchen/KitchenAppliances';
import Bedding from './pages/Categories/Subcategories/HomeKitchen/Bedding';
import Cookware from './pages/Categories/Subcategories/HomeKitchen/Cookware';
import Skincare from './pages/Categories/Subcategories/BeautyPersonalCare/Skincare';
import Makeup from './pages/Categories/Subcategories/BeautyPersonalCare/Makeup';
import HairCare from './pages/Categories/Subcategories/BeautyPersonalCare/HairCare';
import Fragrances from './pages/Categories/Subcategories/BeautyPersonalCare/Fragrances';
import MensGrooming from './pages/Categories/Subcategories/BeautyPersonalCare/MensGrooming';
import ExerciseEquipment from './pages/Categories/Subcategories/SportsFitness/ExerciseEquipment';
import SportsGear from './pages/Categories/Subcategories/SportsFitness/SportsGear';
import Outdoor from './pages/Categories/Subcategories/SportsFitness/Outdoor';
import Yoga from './pages/Categories/Subcategories/SportsFitness/Yoga';
import Nutrition from './pages/Categories/Subcategories/SportsFitness/Nutrition';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import CookiePolicy from './pages/CookiePolicy';
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
      <WishlistProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Productss />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/category/mobiles" element={<Mobiles />} />
            <Route path="/category/laptops" element={<Laptops />} />
            <Route path="/category/tablets" element={<Tablets />} />
            <Route path="/category/cameras" element={<Cameras />} />
            <Route path="/category/audio" element={<Audio />} />
            <Route path="/category/wearables" element={<Wearables />} />

            <Route path="/category/men's-clothing" element={<MensClothing />} />
            <Route path="/category/women's-clothing" element={<WomensClothing />} />
            <Route path="/category/kids" element={<Kids />} />
            <Route path="/category/footwear" element={<Footwear />} />
            <Route path="/category/accessories" element={<Accessories />} />
            <Route path="/category/jewelry" element={<Jewelry />} />

            <Route path="/category/furniture" element={<Furniture />} />
            <Route path="/category/home-decor" element={<HomeDecor />} />
            <Route path="/category/kitchen-appliances" element={<KitchenAppliances />} />
            <Route path="/category/bedding" element={<Bedding />} />
            <Route path="/category/cookware" element={<Cookware />} />

            <Route path="/category/skincare" element={<Skincare />} />
            <Route path="/category/makeup" element={<Makeup />} />
            <Route path="/category/hair-care" element={<HairCare />} />
            <Route path="/category/fragrances" element={<Fragrances />} />
            <Route path="/category/men's-grooming" element={<MensGrooming />} />

            <Route path="/category/exercise-equipment" element={<ExerciseEquipment />} />
            <Route path="/category/sports-gear" element={<SportsGear />} />
            <Route path="/category/outdoor" element={<Outdoor />} />
            <Route path="/category/yoga" element={<Yoga />} />
            <Route path="/category/nutrition" element={<Nutrition />} />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </WishlistProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default App;


