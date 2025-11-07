import { Shield, Lock, Eye, Database, Mail, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last Updated: November 7, 2025
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              At <strong>Vibe Commerce</strong>, we respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you visit our website 
              or make a purchase.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Name and contact details (email, phone number, address)</li>
                <li>Payment information (processed securely by our payment providers)</li>
                <li>Order history and preferences</li>
                <li>Account credentials (username and encrypted password)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Automatically Collected Information</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>IP address and browser type</li>
                <li>Device information and operating system</li>
                <li>Cookies and usage data</li>
                <li>Pages visited and time spent on site</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-600" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Process and fulfill your orders</li>
              <li>Communicate about your orders and account</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Improve our website and customer service</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </CardContent>
        </Card>

        {/* Data Security */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              Data Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure payment processing through trusted providers</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and authentication</li>
              <li>Data backup and recovery systems</li>
            </ul>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </CardContent>
        </Card>

        {/* Cookies */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We use cookies to enhance your browsing experience. You can control cookies through your browser settings. 
              For more information, please see our{' '}
              <a href="/cookie-policy" className="text-blue-600 hover:underline">
                Cookie Policy
              </a>
              .
            </p>
          </CardContent>
        </Card>

        {/* Third-Party Sharing */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Third-Party Sharing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We do not sell your personal data. We may share information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Payment processors (for order fulfillment)</li>
              <li>Shipping partners (for delivery)</li>
              <li>Analytics providers (to improve our service)</li>
              <li>Legal authorities (when required by law)</li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="font-medium">Vibe Commerce</p>
              <p className="text-sm text-muted-foreground">Email: privacy@vibecommerce.com</p>
              <p className="text-sm text-muted-foreground">Phone: +1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground">Address: 123 Commerce Street, New York, NY 10001</p>
            </div>
          </CardContent>
        </Card>

        {/* Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Policy Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. The updated version will be indicated by an updated 
              "Last Updated" date. We encourage you to review this Privacy Policy periodically to stay informed about 
              how we protect your information.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
