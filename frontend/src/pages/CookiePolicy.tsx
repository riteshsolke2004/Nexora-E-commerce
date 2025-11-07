import { Cookie, Settings, Eye, Target, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
            <Cookie className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">
            Last Updated: November 7, 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              <strong>Vibe Commerce</strong> uses cookies and similar tracking technologies to improve your browsing 
              experience, analyze site traffic, and personalize content. This Cookie Policy explains what cookies are, 
              how we use them, and how you can control them.
            </p>
          </CardContent>
        </Card>

        {/* What Are Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-amber-600" />
              What Are Cookies?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Cookies are small text files stored on your device (computer, smartphone, tablet) when you visit a website. 
              They help websites remember your preferences and provide a better user experience.
            </p>
          </CardContent>
        </Card>

        {/* Types of Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Types of Cookies We Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Essential Cookies */}
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Essential Cookies</h3>
                <Badge className="bg-blue-100 text-blue-800">Required</Badge>
              </div>
              <p className="text-muted-foreground mb-2">
                These cookies are necessary for the website to function properly. They enable core functionality such as:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>User authentication and security</li>
                <li>Shopping cart functionality</li>
                <li>Session management</li>
                <li>Load balancing</li>
              </ul>
            </div>

            {/* Analytics Cookies */}
            <div className="border-l-4 border-green-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Analytics Cookies</h3>
                <Badge className="bg-green-100 text-green-800">Optional</Badge>
              </div>
              <p className="text-muted-foreground mb-2">
                These cookies help us understand how visitors interact with our website:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Google Analytics (traffic analysis)</li>
                <li>Page views and session duration</li>
                <li>User behavior patterns</li>
                <li>Website performance metrics</li>
              </ul>
            </div>

            {/* Functional Cookies */}
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold">Functional Cookies</h3>
                <Badge className="bg-purple-100 text-purple-800">Optional</Badge>
              </div>
              <p className="text-muted-foreground mb-2">
                These cookies enhance your experience by remembering your preferences:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Language and region preferences</li>
                <li>Display settings (theme, layout)</li>
                <li>Previously viewed products</li>
                <li>Wishlist items</li>
              </ul>
            </div>

            {/* Marketing Cookies */}
            <div className="border-l-4 border-orange-500 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-orange-600" />
                <h3 className="font-semibold">Marketing/Advertising Cookies</h3>
                <Badge className="bg-orange-100 text-orange-800">Optional</Badge>
              </div>
              <p className="text-muted-foreground mb-2">
                These cookies are used to deliver relevant advertisements:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Facebook Pixel</li>
                <li>Google Ads</li>
                <li>Retargeting campaigns</li>
                <li>Personalized product recommendations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Third-Party Cookies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We use third-party services that may set cookies on your device:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Google Analytics</h4>
                <p className="text-sm text-muted-foreground">Website analytics and reporting</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Facebook Pixel</h4>
                <p className="text-sm text-muted-foreground">Advertising and conversion tracking</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Google Ads</h4>
                <p className="text-sm text-muted-foreground">Display advertising</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Payment Providers</h4>
                <p className="text-sm text-muted-foreground">Secure payment processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Managing Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              How to Manage Cookies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Browser Settings</h3>
              <p className="text-muted-foreground mb-2">
                You can control cookies through your browser settings:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data
                </li>
                <li>
                  <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                </li>
                <li>
                  <strong>Safari:</strong> Preferences → Privacy → Cookies and website data
                </li>
                <li>
                  <strong>Edge:</strong> Settings → Cookies and site permissions
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Note:</strong> Blocking or deleting cookies may affect your ability to use certain features of 
                our website, such as staying logged in or maintaining items in your shopping cart.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Opt-Out Options</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  Google Analytics:{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
                <li>
                  Advertising:{' '}
                  <a
                    href="http://www.aboutads.info/choices/"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital Advertising Alliance
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Consent */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cookie Consent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              When you first visit our website, you'll see a cookie consent banner. You can choose to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
              <li>Accept all cookies</li>
              <li>Accept only essential cookies</li>
              <li>Customize your cookie preferences</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You can change your cookie preferences at any time through the cookie settings link in our website footer.
            </p>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Updates to This Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Cookie Policy periodically to reflect changes in our practices or legal requirements. 
              We encourage you to review this page regularly for the latest information.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="font-medium">Vibe Commerce</p>
              <p className="text-sm text-muted-foreground">Email: privacy@vibecommerce.com</p>
              <p className="text-sm text-muted-foreground">Phone: +1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground">Address: 123 Commerce Street, New York, NY 10001</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookiePolicy;
