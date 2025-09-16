import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { 
  ArrowLeft, 
  Package, 
  DollarSign, 
  Calculator, 
  Camera,
  CheckCircle,
  History,
  TrendingUp,
  CreditCard,
  Star,
  Clock
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

interface NewOrderFormProps {
  initialOrder: Partial<Order>;
  customerOrders?: Order[];
  onSubmit: (order: Partial<Order>) => void;
  onBack: () => void;
}

const products = [
  { id: "software-license", name: "Software License", price: 500, category: "software" },
  { id: "hardware-kit", name: "Hardware Kit", price: 750, category: "hardware" },
  { id: "support-package", name: "Support Package", price: 200, category: "services" },
  { id: "training-course", name: "Training Course", price: 300, category: "services" },
  { id: "consulting-hours", name: "Consulting Hours", price: 150, category: "services" },
  { id: "maintenance-plan", name: "Maintenance Plan", price: 400, category: "services" },
  { id: "security-suite", name: "Security Suite", price: 800, category: "software" },
  { id: "server-hardware", name: "Server Hardware", price: 2500, category: "hardware" },
  { id: "cloud-storage", name: "Cloud Storage", price: 100, category: "services" },
  { id: "backup-solution", name: "Backup Solution", price: 350, category: "software" }
];

const customers = [
  { id: "1", name: "TechCorp Solutions" },
  { id: "2", name: "Global Industries" },
  { id: "3", name: "Innovation Labs" },
  { id: "4", name: "Metro Consulting" },
  { id: "5", name: "Future Systems" },
  { id: "6", name: "Digital Dynamics" }
];

export function NewOrderForm({ initialOrder, customerOrders = [], onSubmit, onBack }: NewOrderFormProps) {
  const [formData, setFormData] = useState({
    customerId: initialOrder.customerId || "",
    customerName: initialOrder.customerName || "",
    product: initialOrder.product || "",
    quantity: initialOrder.quantity || 1,
    price: initialOrder.price || 0,
    notes: initialOrder.notes || "",
    paymentMethod: initialOrder.paymentMethod || "invoice" as const
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [invoicePhoto, setInvoicePhoto] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (formData.customerId && !formData.customerName) {
      const customer = customers.find(c => c.id === formData.customerId);
      if (customer) {
        setFormData(prev => ({ ...prev, customerName: customer.name }));
      }
    }
  }, [formData.customerId]);

  const handleProductChange = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setFormData(prev => ({
        ...prev,
        product: product.name,
        price: product.price
      }));
    }
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        customerId,
        customerName: customer.name
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerId) {
      newErrors.customerId = "Please select a customer";
    }
    if (!formData.product) {
      newErrors.product = "Please select a product";
    }
    if (formData.quantity < 1) {
      newErrors.quantity = "Quantity must be at least 1";
    }
    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get recent orders for this customer (last 3)
  const recentOrders = customerOrders.slice(0, 3);

  // Get suggested products based on order history
  const getSuggestedProducts = () => {
    const productCounts = customerOrders.reduce((acc, order) => {
      acc[order.product] = (acc[order.product] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return Object.entries(productCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([product]) => product);
  };

  const suggestedProducts = getSuggestedProducts();

  const handleCapturePhoto = () => {
    // Mock photo capture
    const mockPhoto = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";
    setInvoicePhoto(mockPhoto);
  };

  const handleSuggestedProductClick = (productName: string) => {
    const product = products.find(p => p.name === productName);
    if (product) {
      setFormData(prev => ({
        ...prev,
        product: product.name,
        price: product.price
      }));
      setShowSuggestions(false);
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        ...formData,
        invoicePhoto,
        total: formData.quantity * formData.price,
        deliveryETA: getDeliveryETA()
      });
    }
  };

  const getDeliveryETA = () => {
    const days = Math.floor(Math.random() * 5) + 2; // 2-7 days
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const total = formData.quantity * formData.price;

  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="font-medium">New Order</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Customer Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Customer */}
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Select
                value={formData.customerId}
                onValueChange={handleCustomerChange}
                disabled={!!initialOrder.customerId}
              >
                <SelectTrigger className={errors.customerId ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customerId && (
                <p className="text-sm text-red-500">{errors.customerId}</p>
              )}
            </div>

            {/* Product */}
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select
                value={products.find(p => p.name === formData.product)?.id || ""}
                onValueChange={handleProductChange}
              >
                <SelectTrigger className={errors.product ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      <div className="flex justify-between items-center w-full">
                        <span>{product.name}</span>
                        <span className="text-muted-foreground ml-2">${product.price}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.product && (
                <p className="text-sm text-red-500">{errors.product}</p>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  quantity: parseInt(e.target.value) || 0 
                }))}
                className={errors.quantity ? "border-red-500" : ""}
              />
              {errors.quantity && (
                <p className="text-sm text-red-500">{errors.quantity}</p>
              )}
            </div>

            {/* Unit Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Unit Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  price: parseFloat(e.target.value) || 0 
                }))}
                className={errors.price ? "border-red-500" : ""}
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        {recentOrders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Orders ({recentOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">{order.product}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">${order.total}</p>
                      <p className="text-xs text-muted-foreground">Qty: {order.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Suggested Products */}
        {showSuggestions && suggestedProducts.length > 0 && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <TrendingUp className="h-5 w-5" />
                Frequently Ordered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {suggestedProducts.map((productName) => {
                  const product = products.find(p => p.name === productName);
                  return product ? (
                    <Button
                      key={product.id}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedProductClick(productName)}
                      className="border-green-300 text-green-700 hover:bg-green-100"
                    >
                      <Star className="h-3 w-3 mr-1" />
                      {product.name} - ${product.price}
                    </Button>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value: any) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
            >
              <SelectTrigger className={errors.paymentMethod ? "border-red-500" : ""}>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="invoice">Invoice (Net 30)</SelectItem>
              </SelectContent>
            </Select>
            {errors.paymentMethod && (
              <p className="text-sm text-red-500 mt-1">{errors.paymentMethod}</p>
            )}
          </CardContent>
        </Card>

        {/* Invoice Photo */}
        {(formData.paymentMethod === "cash" || formData.paymentMethod === "check") && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Signed Invoice/Receipt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted rounded-lg p-4">
                {invoicePhoto ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="text-sm font-medium">Photo captured</span>
                    </div>
                    <img 
                      src={invoicePhoto} 
                      alt="Signed invoice" 
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCapturePhoto}
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Retake Photo
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-3">
                      Capture signed invoice or receipt
                    </p>
                    <Button
                      onClick={handleCapturePhoto}
                      className="w-full"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Total */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Order Total</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-medium text-blue-900">${total.toLocaleString()}</p>
                <p className="text-sm text-blue-700">
                  {formData.quantity} × ${formData.price} each
                </p>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>ETA: {getDeliveryETA()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any special instructions or notes for this order..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer:</span>
                <span>{formData.customerName || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product:</span>
                <span>{formData.product || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantity:</span>
                <span>{formData.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Unit Price:</span>
                <span>${formData.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment:</span>
                <span className="capitalize">{formData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery ETA:</span>
                <span>{getDeliveryETA()}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span>Total Amount:</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full h-12 bg-green-600 hover:bg-green-700"
          disabled={!formData.customerId || !formData.product || formData.quantity < 1 || formData.price <= 0 || !formData.paymentMethod || ((formData.paymentMethod === "cash" || formData.paymentMethod === "check") && !invoicePhoto)}
        >
          <DollarSign className="h-5 w-5 mr-2" />
          Create Order
        </Button>
      </div>
    </div>
  );
}