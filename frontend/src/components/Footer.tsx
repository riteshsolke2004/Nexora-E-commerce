import { Link } from 'react-router-dom';
import {
  Store,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Headphones,
  ChevronRight,
  ArrowUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { toast } from 'sonner';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    aboutUs: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Corporate Information', href: '/corporate' },
    ],
    helpSupport: [
      { name: 'Payments', href: '/help/payments' },
      { name: 'Shipping', href: '/help/shipping' },
      { name: 'Cancellation & Returns', href: '/help/returns' },
      { name: 'FAQ', href: '/help/faq' },
      { name: 'Report Infringement', href: '/report' },
    ],
    policy: [
      { name: 'Return Policy', href: '/policy/returns' },
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Security', href: '/security' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
    socialMedia: [
      { name: 'Become a Seller', href: '/seller' },
      { name: 'Advertise', href: '/advertise' },
      { name: 'Gift Cards', href: '/gift-cards' },
      { name: 'Help Center', href: '/help' },
    ],
    popularCategories: [
      { name: 'Electronics', href: '/category/electronics' },
      { name: 'Fashion', href: '/category/fashion' },
      { name: 'Home & Kitchen', href: '/category/home-kitchen' },
      { name: 'Beauty & Personal Care', href: '/category/beauty' },
      { name: 'Sports & Fitness', href: '/category/sports' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Back to Top Button */}
      <div
        className="bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer py-4"
        onClick={scrollToTop}
      >
        <div className="container flex items-center justify-center gap-2 text-white font-medium">
          <span>Back to Top</span>
          <ArrowUp className="h-4 w-4" />
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-blue-100">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white text-gray-900 border-0"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* About Us */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm">About</h4>
            <ul className="space-y-2">
              {footerLinks.aboutUs.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm">Help</h4>
            <ul className="space-y-2">
              {footerLinks.helpSupport.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm">Policy</h4>
            <ul className="space-y-2">
              {footerLinks.policy.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm">Social</h4>
            <ul className="space-y-2">
              {footerLinks.socialMedia.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.popularCategories.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>123 Commerce Street, Mumbai, India 400001</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <a href="tel:+911234567890" className="hover:text-white transition-colors">
                  +91 1234567890
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <a
                  href="mailto:support@e-commerce.com"
                  className="hover:text-white transition-colors"
                >
                  support@e-commerce.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Features Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0">
              <Truck className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h5 className="text-white font-semibold text-sm">Free Shipping</h5>
              <p className="text-xs text-gray-400">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h5 className="text-white font-semibold text-sm">Secure Payment</h5>
              <p className="text-xs text-gray-400">100% Protected</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
              <Headphones className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h5 className="text-white font-semibold text-sm">24/7 Support</h5>
              <p className="text-xs text-gray-400">Dedicated support</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-orange-600/20 flex items-center justify-center flex-shrink-0">
              <CreditCard className="h-6 w-6 text-orange-400" />
            </div>
            <div>
              <h5 className="text-white font-semibold text-sm">Easy Returns</h5>
              <p className="text-xs text-gray-400">30-day return policy</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Social Media & Payment Methods */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Media Icons */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-white">Follow Us:</span>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors group"
              >
                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-pink-600 flex items-center justify-center transition-colors group"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-blue-400 flex items-center justify-center transition-colors group"
              >
                <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-red-600 flex items-center justify-center transition-colors group"
              >
                <Youtube className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-gray-800 hover:bg-blue-700 flex items-center justify-center transition-colors group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white">We Accept:</span>
            <div className="flex gap-2">
              <div className="h-8 px-3 bg-white rounded flex items-center">
                <span className="text-blue-600 font-bold text-xs">VISA</span>
              </div>
              <div className="h-8 px-3 bg-white rounded flex items-center">
                <span className="text-orange-600 font-bold text-xs">MASTER</span>
              </div>
              <div className="h-8 px-3 bg-white rounded flex items-center">
                <span className="text-blue-700 font-bold text-xs">PayPal</span>
              </div>
              <div className="h-8 px-3 bg-white rounded flex items-center">
                <span className="text-purple-600 font-bold text-xs">UPI</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo & Copyright */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
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
              
            </Link>
              <div>
                <p className="text-white font-bold">E-Commerce</p>
                <p className="text-xs text-gray-500">
                  © 2025 E-Commerce. All rights reserved.
                </p>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 text-xs">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
