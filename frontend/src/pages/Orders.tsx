import { ShoppingBag, ChevronDown, Download, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useState } from 'react';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

const Orders = () => {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2025-11-05',
      total: 599.99,
      status: 'delivered',
      items: [
        { id: '1', name: 'Wireless Headphones', quantity: 1, price: 199.99 },
        { id: '2', name: 'Phone Case', quantity: 2, price: 25.00 },
      ],
    },
    {
      id: 'ORD-002',
      date: '2025-10-28',
      total: 149.99,
      status: 'delivered',
      items: [
        { id: '3', name: 'Screen Protector', quantity: 3, price: 49.99 },
      ],
    },
    {
      id: 'ORD-003',
      date: '2025-10-15',
      total: 799.99,
      status: 'shipped',
      items: [
        { id: '4', name: 'Laptop Stand', quantity: 1, price: 799.99 },
      ],
    },
  ]);

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

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          Track and manage all your orders
        </p>
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
            <Collapsible key={order.id} defaultOpen={false}>
              <Card>
                <CollapsibleTrigger asChild>
                  <div className="p-6 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ordered on {new Date(order.date).toLocaleDateString()}
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
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between pb-2 border-b last:border-b-0">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Order Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Invoice
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <RotateCcw className="h-4 w-4" />
                        Return Order
                      </Button>
                      <Button variant="outline" size="sm">
                        Track Order
                      </Button>
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
