import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { FloatingActionButton } from "../FloatingActionButton";
import { ScrollArea } from "../ui/scroll-area";
import { Search, Package, Calendar, DollarSign, User, Plus } from "lucide-react";

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

interface OrdersTabProps {
  orders: Order[];
  onNewOrder: () => void;
}

export function OrdersTab({ orders, onNewOrder }: OrdersTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  


  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    delivered: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200"
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    delivered: orders.filter(o => o.status === "delivered").length,
    totalValue: orders.reduce((sum, order) => sum + order.total, 0)
  };



  const handleViewOrder = (orderId: string) => {
    console.log("Viewing order:", orderId);
  };

  return (
    <div className="pb-20 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 text-center">
          <p className="text-lg font-medium">{orderStats.pending}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-lg font-medium">{orderStats.delivered}</p>
          <p className="text-xs text-muted-foreground">Delivered</p>
        </Card>
      </div>

      {/* Total Value */}
      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <p className="text-xl font-medium">${orderStats.totalValue.toLocaleString()}</p>
          </div>
          <p className="text-sm text-muted-foreground">Total Orders Value</p>
        </CardContent>
      </Card>

      {/* Order List */}
      <ScrollArea className="h-[calc(100vh-320px)]">
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{order.id}</h3>
                      <Badge 
                        variant="outline"
                        className={statusColors[order.status as keyof typeof statusColors]}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <User className="h-3 w-3" />
                      <span className="truncate">{order.customerName}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">${order.total.toLocaleString()}</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{order.quantity} items</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewOrder(order.id)}
                  className="w-full"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No orders found matching your search.</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* New Order FAB */}
      <FloatingActionButton 
        onClick={onNewOrder}
        className="bg-green-600 hover:bg-green-700"
      >
        <Plus className="h-5 w-5" />
      </FloatingActionButton>
    </div>
  );
}