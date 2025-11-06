import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Download, Home, Mail, Truck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CheckoutResponse {
  orderId: string;
  timestamp: string;
  total: number;
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: CheckoutResponse;
  items: CartItem[];
}

const ReceiptModal = ({ isOpen, onClose, receipt, items }: ReceiptModalProps) => {
  const handleDownloadReceipt = () => {
    const receiptContent = `
╔════════════════════════════════════════════════════╗
║            VIBE COMMERCE - ORDER RECEIPT           ║
╚════════════════════════════════════════════════════╝

Order ID: ${receipt.orderId}
Date & Time: ${new Date(receipt.timestamp).toLocaleString()}

────────────────────────────────────────────────────

ITEMS PURCHASED:
${items
  .map(
    (item) =>
      `  ${item.name}
  Quantity: ${item.quantity} × $${item.price.toFixed(2)} = $${(item.price * item.quantity).toFixed(2)}`
  )
  .join('\n\n')}

────────────────────────────────────────────────────

Subtotal:          $${items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
Shipping:          FREE
Tax (8%):          $${(items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.08).toFixed(2)}

╔════════════════════════════════════════════════════╗
║ TOTAL:                              $${receipt.total.toFixed(2).padStart(10)}
╚════════════════════════════════════════════════════╝

DELIVERY INFORMATION:
• Estimated Delivery: 3-5 business days
• Free Shipping included
• Real-time tracking available

POLICY INFORMATION:
• 30-day money-back guarantee
• Easy returns & exchanges
• 24/7 customer support

────────────────────────────────────────────────────
Thank you for your purchase!
Vibe Commerce - Your trusted online store
www.vibecommerce.com | support@vibecommerce.com
════════════════════════════════════════════════════
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt-${receipt.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md md:max-w-lg">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-pulse scale-110"></div>
              <CheckCircle2 className="h-16 w-16 text-green-600 relative animate-in zoom-in-50 duration-500" />
            </div>
          </div>
          <DialogTitle className="text-3xl">Order Confirmed!</DialogTitle>
          <DialogDescription className="text-base mt-2">
            Your order has been placed successfully
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Order Details Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-blue-200">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Order ID</p>
                <p className="font-mono font-bold text-blue-600">{receipt.orderId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Confirmation Email</p>
                <p className="text-sm font-medium">Sent to your email address</p>
              </div>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Items Purchased ({items.length})</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-50 p-3 rounded-lg">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm pb-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Total Amount */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Amount Paid</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${receipt.total.toFixed(2)}
            </p>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-green-900">What's Next?</p>
            <ul className="text-sm text-green-800 space-y-1">
              <li className="flex items-center gap-2">
                <span>✓</span>
                <span>Order confirmation sent to your email</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span>
                <span>Order will be processed within 24 hours</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span>
                <span>Track delivery in 3-5 business days</span>
              </li>
            </ul>
          </div>

          {/* Delivery Promise */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Truck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Free Delivery Included</p>
              <p>Your order qualifies for free shipping</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="w-full gap-2"
              size="lg"
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" size="lg">
                <Link to="/orders" className="gap-2">
                  <span>View Orders</span>
                </Link>
              </Button>
              <Button asChild size="lg">
                <Link to="/" className="gap-2">
                  <Home className="h-4 w-4" />
                  <span>Go Home</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Support Info */}
          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>Need help? Contact our support team</p>
            <p className="font-medium text-foreground mt-1">
              support@vibecommerce.com | +1 (555) 123-4567
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
