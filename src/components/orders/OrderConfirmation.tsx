import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  CheckCircle, 
  Package, 
  User, 
  Hash,
  Calendar,
  DollarSign,
  Home,
  Eye,
  Clock,
  CreditCard,
  Truck
} from "lucide-react";

type Order = {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  notes?: string;
  paymentMethod?: "cash" | "credit" | "check" | "invoice";
  invoicePhoto?: string;
  status: "pending" | "delivered" | "cancelled";
  date: string;
  deliveryETA?: string;
};

interface OrderConfirmationProps {
  order: Order;
  onComplete: () => void;
}

export function OrderConfirmation({ order, onComplete }: OrderConfirmationProps) {
  const handleViewOrders = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 text-center">
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-xl font-medium mb-2">Order Created!</h1>
        <p className="text-green-100">Your order has been successfully submitted</p>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Order Details */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="font-medium mb-2">Order Confirmation</h2>
              <p className="text-muted-foreground text-sm">
                Order has been created and is now pending processing
              </p>
            </div>

            {/* Order ID */}
            <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-muted/50 rounded-lg">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">{order.id}</span>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                Pending
              </Badge>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Customer</p>
                  <p className="text-sm text-muted-foreground">{order.customerName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Product</p>
                  <p className="text-sm text-muted-foreground">{order.product}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs font-medium">#</span>
                  </div>
                  <div>
                    <p className="font-medium">Quantity</p>
                    <p className="text-sm text-muted-foreground">{order.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              </div>

              {order.notes && (
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium mb-1">Notes</p>
                  <p className="text-sm text-muted-foreground">{order.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Total Amount */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="h-6 w-6 text-green-600" />
              <p className="text-2xl font-medium text-green-900">${order.total.toLocaleString()}</p>
            </div>
            <p className="text-sm text-green-700">
              {order.quantity} × ${order.price} each
            </p>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">What happens next?</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <p className="text-muted-foreground">
                  Order will be reviewed and processed by the fulfillment team
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <p className="text-muted-foreground">
                  You'll receive updates on order status and delivery timeline
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <p className="text-muted-foreground">
                  Customer will be notified about the order confirmation
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleViewOrders}
            className="w-full h-12"
          >
            <Eye className="h-5 w-5 mr-2" />
            View All Orders
          </Button>
          
          <Button
            variant="outline"
            onClick={onComplete}
            className="w-full"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground pb-4">
          Order created at {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}