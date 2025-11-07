import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import * as api from '@/lib/api';
import {
  MapPin,
  Package,
  CheckCircle,
  Truck,
  AlertCircle,
  Shield,
  ArrowLeft,
  Banknote,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import ReceiptModal, { CheckoutResponse } from '@/components/ReceiptModal';

const Checkout = () => {
  // ✅ CALL ALL HOOKS AT TOP LEVEL
  const { cart, clearCart, getSubtotal, getTax, getTotal, isLoading } = useCart();

  const [step, setStep] = useState<'shipping' | 'confirmation'>('shipping');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState<CheckoutResponse | null>(null);

  // Shipping Data
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
  });

  // Validation errors
  const [shippingErrors, setShippingErrors] = useState<Record<string, string>>({});

  // Validate shipping form
  const validateShipping = (): boolean => {
    const errors: Record<string, string> = {};

    if (!shippingData.firstName.trim()) errors.firstName = 'First name is required';
    if (!shippingData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shippingData.email.trim()) errors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.email))
      errors.email = 'Invalid email address';
    if (!shippingData.phone.trim()) errors.phone = 'Phone is required';
    if (!shippingData.street.trim()) errors.street = 'Street address is required';
    if (!shippingData.city.trim()) errors.city = 'City is required';
    if (!shippingData.state.trim()) errors.state = 'State is required';
    if (!shippingData.zipCode.trim()) errors.zipCode = 'Zip code is required';

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle shipping submit
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateShipping()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setStep('confirmation');
    toast.success('Shipping information saved');
  };

  // ✅ NOW USE clearCart FROM THE TOP-LEVEL HOOK
  const handlePlaceOrder = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validation
  if (!agreeTerms) {
    toast.error('Please agree to the terms and conditions');
    return;
  }

  if (cart.items.length === 0) {
    toast.error('Your cart is empty');
    return;
  }

  setIsProcessing(true);

  try {
    console.log('📦 Placing order...');

    // Get cart items
    const cartItems = cart.items || [];

    // Call checkout API
    const receipt = await api.checkoutAPI({
      name: `${shippingData.firstName} ${shippingData.lastName}`,
      email: shippingData.email,
      cartItems: cartItems,
    });

    console.log('✅ Order placed:', receipt);

    // ✅ SAVE EMAIL FOR ORDERS PAGE
    localStorage.setItem('userEmail', shippingData.email);

    // ✅ CLEAR CART AFTER SUCCESSFUL ORDER
    await clearCart();

    // ✅ SHOW SUCCESS MESSAGE
    toast.success('Order placed successfully!');

    // ✅ SHOW RECEIPT
    setReceiptData({
      orderId: receipt.receiptId,
      timestamp: receipt.timestamp,
      total: receipt.total,
    });
    setShowReceipt(true);

    // ✅ OPTIONAL: Reset form and step
    // setStep('shipping');
    // setShippingData({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   phone: '',
    //   street: '',
    //   city: '',
    //   state: '',
    //   zipCode: '',
    //   country: 'USA',
    // });
  } catch (error: any) {
    console.error('❌ Checkout failed:', error);
    toast.error(error.message || 'Failed to place order. Please try again.');
  } finally {
    setIsProcessing(false);
  }
};


  // Empty cart check
  if (cart.items.length === 0 && !showReceipt) {
    return (
      <div className="container py-16 min-h-screen">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          <Package className="h-24 w-24 text-muted-foreground" />
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground">
              Add some items to your cart before proceeding to checkout
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-8">
          <Button variant="outline" className="gap-2 mb-4" asChild>
            <Link to="/cart">
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-4xl font-bold">Checkout</h1>
          <p className="text-muted-foreground mt-2">
            Complete your purchase in just a few steps
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <Tabs value={step} className="w-full">
              {/* Tab Navigation - Only 2 steps now */}
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white p-1 border rounded-lg">
                <TabsTrigger
                  value="shipping"
                  className="gap-2"
                  disabled={step !== 'shipping'}
                >
                  <MapPin className="h-4 w-4 hidden sm:block" />
                  <span className="hidden sm:inline">Shipping</span>
                  <span className="sm:hidden">1</span>
                </TabsTrigger>
                <TabsTrigger
                  value="confirmation"
                  className="gap-2"
                  disabled={step !== 'confirmation'}
                >
                  <CheckCircle className="h-4 w-4 hidden sm:block" />
                  <span className="hidden sm:inline">Confirm</span>
                  <span className="sm:hidden">2</span>
                </TabsTrigger>
              </TabsList>

              {/* ============ SHIPPING STEP ============ */}
              <TabsContent value="shipping" className="space-y-4">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleShippingSubmit} className="space-y-6">
                      {/* Name Fields */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={shippingData.firstName}
                            onChange={(e) =>
                              setShippingData({
                                ...shippingData,
                                firstName: e.target.value,
                              })
                            }
                            className={
                              shippingErrors.firstName
                                ? 'border-red-500 focus:border-red-500'
                                : ''
                            }
                            placeholder="John"
                          />
                          {shippingErrors.firstName && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {shippingErrors.firstName}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={shippingData.lastName}
                            onChange={(e) =>
                              setShippingData({
                                ...shippingData,
                                lastName: e.target.value,
                              })
                            }
                            className={
                              shippingErrors.lastName
                                ? 'border-red-500 focus:border-red-500'
                                : ''
                            }
                            placeholder="Doe"
                          />
                          {shippingErrors.lastName && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {shippingErrors.lastName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Contact Fields */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingData.email}
                            onChange={(e) =>
                              setShippingData({
                                ...shippingData,
                                email: e.target.value,
                              })
                            }
                            className={
                              shippingErrors.email
                                ? 'border-red-500 focus:border-red-500'
                                : ''
                            }
                            placeholder="john@example.com"
                          />
                          {shippingErrors.email && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {shippingErrors.email}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={shippingData.phone}
                            onChange={(e) =>
                              setShippingData({
                                ...shippingData,
                                phone: e.target.value,
                              })
                            }
                            className={
                              shippingErrors.phone
                                ? 'border-red-500 focus:border-red-500'
                                : ''
                            }
                            placeholder="+1 (555) 123-4567"
                          />
                          {shippingErrors.phone && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {shippingErrors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address *</Label>
                        <Input
                          id="street"
                          value={shippingData.street}
                          onChange={(e) =>
                            setShippingData({
                              ...shippingData,
                              street: e.target.value,
                            })
                          }
                          className={
                            shippingErrors.street
                              ? 'border-red-500 focus:border-red-500'
                              : ''
                          }
                          placeholder="123 Main Street"
                        />
                        {shippingErrors.street && (
                          <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {shippingErrors.street}
                          </p>
                        )}
                      </div>

                      {/* City, State, Zip */}
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={shippingData.city}
                            onChange={(e) =>
                              setShippingData({
                                ...shippingData,
                                city: e.target.value,
                              })
                            }
                            className={
                              shippingErrors.city
                                ? 'border-red-500 focus:border-red-500'
                                : ''
                            }
                            placeholder="New York"
                          />
                          {shippingErrors.city && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {shippingErrors.city}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={shippingData.state}
                            onChange={(e) =>
                              setShippingData({
                                ...shippingData,
                                state: e.target.value,
                              })
                            }
                            className={
                              shippingErrors.state
                                ? 'border-red-500 focus:border-red-500'
                                : ''
                            }
                            placeholder="NY"
                          />
                          {shippingErrors.state && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {shippingErrors.state}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip Code *</Label>
                          <Input
                            id="zipCode"
                            value={shippingData.zipCode}
                            onChange={(e) =>
                              setShippingData({
                                ...shippingData,
                                zipCode: e.target.value,
                              })
                            }
                            className={
                              shippingErrors.zipCode
                                ? 'border-red-500 focus:border-red-500'
                                : ''
                            }
                            placeholder="10001"
                          />
                          {shippingErrors.zipCode && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {shippingErrors.zipCode}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Country */}
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <select
                          id="country"
                          value={shippingData.country}
                          onChange={(e) =>
                            setShippingData({
                              ...shippingData,
                              country: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="USA">United States</option>
                          <option value="CAN">Canada</option>
                          <option value="MEX">Mexico</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AUS">Australia</option>
                        </select>
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Continue to Confirmation
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* ============ CONFIRMATION STEP ============ */}
              <TabsContent value="confirmation">
                <Card>
                  <CardContent className="py-12 space-y-6">
                    {/* Delivery Information */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                          <Truck className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-blue-900 mb-2">
                            Delivery Details
                          </h3>
                          <p className="text-sm text-blue-800">
                            Your order will be delivered to:
                          </p>
                          <p className="text-sm font-medium text-blue-900 mt-2">
                            {shippingData.firstName} {shippingData.lastName}
                            <br />
                            {shippingData.street}
                            <br />
                            {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                            <br />
                            {shippingData.country}
                          </p>
                          <p className="text-sm text-blue-800 mt-3">
                            📞 {shippingData.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Payment Method - Cash on Delivery */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
                          <Banknote className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-green-900 mb-2">
                            Payment Method
                          </h3>
                          <p className="text-sm text-green-800 font-medium mb-3">
                            Cash on Delivery (COD)
                          </p>
                          <div className="bg-white p-3 rounded border border-green-200">
                            <p className="text-sm text-green-800">
                              ✓ Pay when the package arrives at your doorstep
                            </p>
                            <p className="text-sm text-green-800 mt-2">
                              ✓ No payment required now
                            </p>
                            <p className="text-sm text-green-800 mt-2">
                              ✓ Safe and secure delivery
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                      <h4 className="font-semibold text-lg">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Shipping</span>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            FREE
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tax (8%)</span>
                          <span className="font-medium">${getTax().toFixed(2)}</span>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-green-600">${getTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Terms Agreement */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="terms"
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        />
                        <label htmlFor="terms" className="text-sm leading-6 cursor-pointer">
                          I agree to the{' '}
                          <Link to="/terms" className="text-blue-600 hover:underline">
                            terms and conditions
                          </Link>
                          {' '}and{' '}
                          <Link to="/privacy" className="text-blue-600 hover:underline">
                            privacy policy
                          </Link>
                          . *
                        </label>
                      </div>
                    </div>

                    {/* Info Messages */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 bg-blue-50 p-3 rounded">
                        <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-blue-800">
                          <strong>Secure:</strong> Your personal information is protected
                        </p>
                      </div>
                      <div className="flex items-start gap-3 bg-green-50 p-3 rounded">
                        <Truck className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-green-800">
                          <strong>Delivery:</strong> 3-5 business days. Free shipping on all orders.
                        </p>
                      </div>
                      <div className="flex items-start gap-3 bg-purple-50 p-3 rounded">
                        <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-purple-800">
                          <strong>Guarantee:</strong> 30-day money-back guarantee
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={() => setStep('shipping')}
                      >
                        Back to Shipping
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={handlePlaceOrder}
                        disabled={isProcessing || isLoading}
                      >
                        {isProcessing || isLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Place Order'
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* ============ ORDER SUMMARY SIDEBAR ============ */}
          <div>
            <Card className="sticky top-24 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items List */}
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div
                      key={item.id || item.cartId}
                      className="flex justify-between text-sm pb-3 border-b last:border-b-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity || item.qty}
                        </p>
                      </div>
                      <p className="font-semibold text-right">
                        ${(item.price * (item.quantity || item.qty)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      FREE
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-medium">${getTax().toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-3" />

                {/* Total */}
                <div className="flex justify-between items-center text-lg font-bold bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                  <span>Total</span>
                  <span className="text-blue-600">${getTotal().toFixed(2)}</span>
                </div>

                {/* COD Info */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="h-4 w-4 text-green-600" />
                    <p className="font-semibold text-green-900 text-sm">Cash on Delivery</p>
                  </div>
                  <p className="text-xs text-green-800">
                    Pay ${getTotal().toFixed(2)} when you receive your order
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 p-2 rounded">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 p-2 rounded">
                    <Shield className="h-4 w-4" />
                    <span>Secure & encrypted data</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-purple-700 bg-purple-50 p-2 rounded">
                    <CheckCircle className="h-4 w-4" />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {receiptData && (
        <ReceiptModal
          isOpen={showReceipt}
          onClose={() => setShowReceipt(false)}
          receipt={receiptData}
          items={cart.items}
        />
      )}
    </div>
  );
};

export default Checkout;
