import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2 } from 'lucide-react';
import { CheckoutResponse, CartItem } from '@/lib/api';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt: CheckoutResponse;
  items: CartItem[];
}

const ReceiptModal = ({ isOpen, onClose, receipt, items }: ReceiptModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md animate-scale-in">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-primary animate-scale-in" />
          </div>
          <DialogTitle className="text-2xl">Order Confirmed!</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="text-center text-muted-foreground">
            <p>Order ID: <span className="font-mono font-semibold text-foreground">{receipt.orderId}</span></p>
            <p className="text-sm mt-1">
              {new Date(receipt.timestamp).toLocaleString()}
            </p>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-semibold">Items Purchased:</h3>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <Separator />

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
            <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ${receipt.total.toFixed(2)}
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg text-sm text-center">
            <p>Thank you for your purchase!</p>
            <p className="text-muted-foreground mt-1">
              A confirmation email has been sent.
            </p>
          </div>

          <Button onClick={onClose} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptModal;
