import { FileText, ShoppingCart, Shield, AlertTriangle, Scale, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">
            Last Updated: November 7, 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              Welcome to <strong>Vibe Commerce</strong>. By accessing and using our website, you agree to be bound by 
              these Terms and Conditions. Please read them carefully before making any purchase.
            </p>
          </CardContent>
        </Card>

        {/* Acceptance of Terms */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-blue-600" />
              Acceptance of Terms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              By accessing this website, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Be at least 18 years of age</li>
              <li>Provide accurate and complete information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Use the website for lawful purposes only</li>
            </ul>
          </CardContent>
        </Card>

        {/* Orders and Payments */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-blue-600" />
              Orders and Payments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Order Acceptance</h3>
              <p className="text-muted-foreground">
                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any 
                order for any reason, including product availability, errors in pricing, or suspected fraud.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Pricing</h3>
              <p className="text-muted-foreground">
                All prices are in USD and include applicable taxes. We reserve the right to change prices at any time 
                without prior notice. Prices at the time of order placement will apply.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Payment Methods</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Cash on Delivery (COD)</li>
                <li>Credit/Debit Cards (Visa, MasterCard, American Express)</li>
                <li>PayPal</li>
                <li>Bank Transfer</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Shipping and Delivery */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Shipping and Delivery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Shipping Time</h3>
              <p className="text-muted-foreground">
                Orders are typically processed within 1-2 business days. Standard delivery takes 3-5 business days. 
                Express shipping options are available at checkout.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Shipping Costs</h3>
              <p className="text-muted-foreground">
                Free shipping on all orders over $50. Standard shipping rates apply to orders under $50.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">International Shipping</h3>
              <p className="text-muted-foreground">
                We ship to select countries worldwide. International shipping fees and delivery times vary by location. 
                Customs duties and import taxes are the responsibility of the customer.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Returns and Refunds */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              Returns and Refunds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">30-Day Return Policy</h3>
              <p className="text-muted-foreground mb-2">
                We offer a 30-day money-back guarantee on most items. To be eligible for a return:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Items must be unused and in original packaging</li>
                <li>Return must be initiated within 30 days of delivery</li>
                <li>Proof of purchase is required</li>
                <li>Some items (e.g., perishables, custom products) are non-returnable</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Refund Process</h3>
              <p className="text-muted-foreground">
                Refunds are processed within 5-10 business days after we receive the returned item. The refund will be 
                issued to the original payment method.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Return Shipping</h3>
              <p className="text-muted-foreground">
                Return shipping costs are the responsibility of the customer unless the item is defective or we shipped 
                the wrong product.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Product Warranties */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Product Warranties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Products are sold with manufacturer warranties where applicable. We do not provide additional warranties 
              beyond those offered by manufacturers.
            </p>
            <p className="text-muted-foreground">
              Products are described as accurately as possible. However, we do not guarantee that descriptions, colors, 
              or other content are error-free or complete.
            </p>
          </CardContent>
        </Card>

        {/* Limitation of Liability */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To the fullest extent permitted by law, Vibe Commerce shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages arising from your use of the website or any products purchased.
            </p>
          </CardContent>
        </Card>

        {/* Intellectual Property */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All content on this website, including text, images, logos, and graphics, is the property of Vibe Commerce 
              or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not 
              reproduce, distribute, or create derivative works without our prior written consent.
            </p>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your use of our website is also governed by our{' '}
              <a href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
              . Please review it to understand how we collect and use your information.
            </p>
          </CardContent>
        </Card>

        {/* Governing Law */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Governing Law</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              These Terms and Conditions are governed by the laws of the United States and the State of New York. Any 
              disputes shall be resolved in the courts located in New York, NY.
            </p>
          </CardContent>
        </Card>

        {/* Changes to Terms */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately 
              upon posting. Your continued use of the website constitutes acceptance of the modified terms.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms and Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="font-medium">Vibe Commerce</p>
              <p className="text-sm text-muted-foreground">Email: legal@vibecommerce.com</p>
              <p className="text-sm text-muted-foreground">Phone: +1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground">Address: 123 Commerce Street, New York, NY 10001</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsConditions;
