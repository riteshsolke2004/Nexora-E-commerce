import { useEffect, useState } from 'react';
import { ShoppingBag, ChevronDown, Download, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import * as api from '@/lib/api';
import { toast } from 'sonner';

interface OrderItem {
  cartId?: string;
  productId: string;
  name: string;
  price: number;
  qty?: number;
  quantity?: number;
}

interface Order {
  receiptId: string;
  id?: string;
  name: string;
  email: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  timestamp: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'completed';
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Get user email from localStorage or session
  useEffect(() => {
    const getEmail = async () => {
      // Option 1: Get from localStorage if saved during checkout
      const savedEmail = localStorage.getItem('userEmail');
      
      if (savedEmail) {
        setUserEmail(savedEmail);
        await fetchOrders(savedEmail);
      } else {
        // Option 2: Prompt user to enter email
        const email = prompt('Enter your email to view orders:');
        if (email) {
          localStorage.setItem('userEmail', email);
          setUserEmail(email);
          await fetchOrders(email);
        } else {
          setIsLoading(false);
        }
      }
    };

    getEmail();
  }, []);

  const fetchOrders = async (email: string) => {
    setIsLoading(true);
    try {
      const fetchedOrders = await api.getOrdersByEmail(email);
      
      // Transform API response to UI format
      const transformedOrders = fetchedOrders.map(order => ({
        receiptId: order.receiptId,
        id: order.receiptId,
        name: order.name,
        email: order.email,
        items: order.items.map(item => ({
          ...item,
          quantity: item.quantity || item.qty,
        })),
        subtotal: order.subtotal,
        tax: order.tax,
        total: order.total,
        timestamp: order.timestamp,
        status: mapStatus(order.status || 'processing'),
      }));

      setOrders(transformedOrders);
      console.log('✅ Orders loaded:', transformedOrders);
    } catch (error: any) {
      console.error('❌ Failed to fetch orders:', error);
      toast.error('Failed to load orders. Please try again.');
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Map backend status to UI status
  const mapStatus = (status: string): 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'completed' => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'delivered';
      case 'shipped':
        return 'shipped';
      case 'processing':
        return 'processing';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'processing';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return '✓';
      case 'shipped':
        return '📦';
      case 'processing':
        return '⏳';
      case 'cancelled':
        return '✕';
      default:
        return '';
    }
  };

  const downloadInvoice = (order: Order) => {
    // Create invoice content
    const invoiceContent = `
INVOICE
Order ID: ${order.receiptId}
Customer: ${order.name}
Email: ${order.email}
Date: ${new Date(order.timestamp).toLocaleDateString()}

ITEMS:
${order.items.map(item => `${item.name} x${item.quantity || item.qty} - $${(item.price * (item.quantity || item.qty)).toFixed(2)}`).join('\n')}

SUMMARY:
Subtotal: $${order.subtotal.toFixed(2)}
Tax: $${order.tax.toFixed(2)}
Total: $${order.total.toFixed(2)}

Status: ${order.status.toUpperCase()}
    `.trim();

    // Create blob and download
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${order.receiptId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast.success('Invoice downloaded!');
  };

  const handleChangeEmail = () => {
    const newEmail = prompt('Enter your email:');
    if (newEmail) {
      localStorage.setItem('userEmail', newEmail);
      setUserEmail(newEmail);
      fetchOrders(newEmail);
      toast.success('Email updated! Loading your orders...');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage all your orders
          </p>
          {userEmail && (
            <p className="text-sm text-muted-foreground mt-2">
              Showing orders for: <strong>{userEmail}</strong>
              <button
                onClick={handleChangeEmail}
                className="ml-2 text-blue-600 hover:underline text-xs"
              >
                Change
              </button>
            </p>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            Start shopping and your orders will appear here
          </p>
          <Button asChild size="lg">
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Collapsible key={order.receiptId} defaultOpen={false}>
              <Card>
                <CollapsibleTrigger asChild>
                  <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{order.receiptId}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}{' '}
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ordered on {new Date(order.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {order.name} • {order.email}
                      </p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="font-semibold text-lg">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <Separator />
                  <CardContent className="p-6 space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      <h4 className="font-semibold">Order Items</h4>
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between pb-2 border-b last:border-b-0"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity || item.qty}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ${(item.price * (item.quantity || item.qty)).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${order.tax.toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-blue-600">${order.total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Order Actions */}
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => downloadInvoice(order)}
                      >
                        <Download className="h-4 w-4" />
                        Invoice
                      </Button>
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm" className="gap-2">
                          <RotateCcw className="h-4 w-4" />
                          Return Order
                        </Button>
                      )}
                      {order.status === 'shipped' && (
                        <Button variant="outline" size="sm">
                          📍 Track Order
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
