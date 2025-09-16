import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Plus,
  Package,
  DollarSign,
  Calendar,
  Eye,
  User,
  FileText,
  AlertCircle,
  History,
  ShoppingCart
} from "lucide-react";

type Customer = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  address: string;
  location: string;
  coordinates: { lat: number; lng: number };
  lastVisit: string;
  lastVisitedBy: string;
  visitNotes?: string;
  status: "active" | "pending" | "inactive";
  priority: "high" | "medium" | "low";
  pendingOrders: number;
  pendingIssues: string[];
};

type Order = {
  id: string;
  customerId: string;
  customerName: string;
  product: string;
  quantity: number;
  price: number;
  total: number;
  notes?: string;
  status: "pending" | "delivered" | "cancelled";
  date: string;
};

interface CustomerDetailsProps {
  customer: Customer;
  orders: Order[];
  onBack: () => void;
  onNewOrder: () => void;
}

export function CustomerDetails({ customer, orders, onBack, onNewOrder }: CustomerDetailsProps) {
  const statusColors = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    inactive: "bg-gray-100 text-gray-700"
  };

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700"
  };

  const orderStatusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700"
  };

  const totalOrderValue = orders.reduce((sum, order) => sum + order.total, 0);

  const handleCall = () => {
    console.log(`Calling ${customer.name} at ${customer.phone}`);
  };

  const handleEmail = () => {
    console.log(`Emailing ${customer.name} at ${customer.email}`);
  };

  const handleViewOrder = (orderId: string) => {
    console.log(`Viewing order ${orderId}`);
  };

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="font-medium">Customer Details</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Customer Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback className="text-lg">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h2 className="font-medium mb-1">{customer.name}</h2>
                <p className="text-muted-foreground mb-2">{customer.company}</p>
                <div className="flex gap-2 mb-2">
                  <Badge 
                    variant="outline"
                    className={statusColors[customer.status]}
                  >
                    {customer.status}
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={priorityColors[customer.priority]}
                  >
                    {customer.priority} priority
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Last visited by {customer.lastVisitedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{customer.lastVisit}</span>
                  </div>
                  {customer.visitNotes && (
                    <div className="mt-2 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
                      <div className="flex items-center gap-1 mb-1">
                        <FileText className="h-3 w-3" />
                        <span className="font-medium">Visit Notes:</span>
                      </div>
                      <p>{customer.visitNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{customer.address}</span>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleCall}
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button
                variant="outline"
                onClick={handleEmail}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-medium">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Total Orders</p>
              </div>
              <div>
                <p className="text-lg font-medium text-green-600">${totalOrderValue.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
              <div>
                <p className="text-lg font-medium">{orders.filter(o => o.status === "pending").length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Orders & Issues */}
        {(customer.pendingOrders > 0 || customer.pendingIssues.length > 0) && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <AlertCircle className="h-5 w-5" />
                Attention Required
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {customer.pendingOrders > 0 && (
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    {customer.pendingOrders} pending orders requiring follow-up
                  </span>
                </div>
              )}
              {customer.pendingIssues.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Issues to address:</span>
                  </div>
                  {customer.pendingIssues.map((issue, index) => (
                    <p key={index} className="text-sm text-yellow-700 ml-6">• {issue}</p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* New Order Button */}
        <Button
          onClick={onNewOrder}
          className="w-full h-12 bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Order
        </Button>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Recent Orders
              </div>
              {orders.length > 0 && (
                <Badge variant="secondary">{orders.length} orders</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {orders.length > 0 ? (
              orders.slice(0, 5).map((order) => (
                <Card key={order.id} className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{order.id}</h4>
                        <Badge 
                          variant="outline"
                          className={orderStatusColors[order.status]}
                        >
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{order.product}</p>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Package className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Qty: {order.quantity}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{order.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-3">
                      <p className="font-medium text-green-600">${order.total.toLocaleString()}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOrder(order.id)}
                        className="h-8 px-2"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="mb-2">No orders yet</p>
                <p className="text-sm">Create the first order for this customer</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}