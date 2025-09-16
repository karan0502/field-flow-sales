import { useState } from "react";
import { OnboardingWelcome } from "./components/onboarding/OnboardingWelcome";
import { NotificationPermission } from "./components/onboarding/NotificationPermission";
import { LocationPermission } from "./components/onboarding/LocationPermission";
import { MobileHeader } from "./components/MobileHeader";
import { BottomNavigation } from "./components/BottomNavigation";
import { DashboardTab } from "./components/tabs/DashboardTab";
import { CustomersTab } from "./components/tabs/CustomersTab";
import { OrdersTab } from "./components/tabs/OrdersTab";
import { RouteTab } from "./components/tabs/RouteTab";
import { ProfileTab } from "./components/tabs/ProfileTab";
import { CustomerDetails } from "./components/customers/CustomerDetails";
import { NewOrderForm } from "./components/orders/NewOrderForm";
import { OrderConfirmation } from "./components/orders/OrderConfirmation";
import { StartRoute } from "./components/route/StartRoute";
import { ActiveRoute } from "./components/route/ActiveRoute";
import { EndRoute } from "./components/route/EndRoute";
import { RouteSummary } from "./components/route/RouteSummary";

type AppFlow = 
  | "welcome" 
  | "notification-permission" 
  | "location-permission" 
  | "main-app"
  | "customer-details"
  | "new-order"
  | "order-confirmation"
  | "start-route"
  | "active-route" 
  | "end-route"
  | "route-summary";

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
  paymentMethod?: "cash" | "credit" | "check" | "invoice";
  invoicePhoto?: string;
  status: "pending" | "delivered" | "cancelled";
  date: string;
  deliveryETA?: string;
};

type RouteData = {
  startOdometer: number;
  startOdometerPhoto?: string;
  endOdometer: number;
  endOdometerPhoto?: string;
  startTime: Date;
  endTime?: Date;
  shareLocation: boolean;
  gpsDistance: number;
  odometerDistance: number;
  timeElapsed: number;
  currentPosition: { lat: number; lng: number };
  routePath: { lat: number; lng: number }[];
  visits: {
    customerId: string;
    customerName: string;
    address: string;
    coordinates: { lat: number; lng: number };
    distanceFromCurrent: number;
    status: "pending" | "visited" | "skipped";
    visitTime?: Date;
    lastVisit?: {
      agent: string;
      date: string;
      notes: string;
    };
  }[];
};

export default function App() {
  const [currentFlow, setCurrentFlow] = useState<AppFlow>("welcome");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [permissions, setPermissions] = useState({
    notifications: false,
    location: false,
    camera: false
  });
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [newOrder, setNewOrder] = useState<Partial<Order> | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "#ORD-001",
      customerId: "1",
      customerName: "TechCorp Solutions",
      product: "Software License",
      quantity: 5,
      price: 500,
      total: 2500,
      status: "delivered",
      date: "2024-01-15",
      notes: "Urgent delivery required"
    },
    {
      id: "#ORD-002",
      customerId: "2", 
      customerName: "Global Industries",
      product: "Hardware Kit",
      quantity: 3,
      price: 616.67,
      total: 1850,
      status: "pending",
      date: "2024-01-14"
    }
  ]);

  const handleWelcomeComplete = () => {
    setCurrentFlow("notification-permission");
  };

  const handleNotificationPermission = (granted: boolean) => {
    setPermissions(prev => ({ ...prev, notifications: granted }));
    setCurrentFlow("location-permission");
  };

  const handleLocationPermission = (granted: boolean) => {
    setPermissions(prev => ({ ...prev, location: granted, camera: true }));
    setCurrentFlow("main-app");
  };

  const handleStartRoute = (data: { startOdometer: number; startOdometerPhoto: string; shareLocation: boolean }) => {
    const newRouteData: RouteData = {
      startOdometer: data.startOdometer,
      startOdometerPhoto: data.startOdometerPhoto,
      endOdometer: 0,
      startTime: new Date(),
      shareLocation: data.shareLocation,
      gpsDistance: 0,
      odometerDistance: 0,
      timeElapsed: 0,
      currentPosition: { lat: 40.7128, lng: -74.0060 },
      routePath: [{ lat: 40.7128, lng: -74.0060 }],
      visits: [
        { 
          customerId: "1", 
          customerName: "TechCorp Solutions", 
          address: "123 Business Ave, Downtown, New York, NY 10001",
          coordinates: { lat: 40.7589, lng: -73.9851 },
          distanceFromCurrent: 2.1,
          status: "pending",
          lastVisit: {
            agent: "Sarah Wilson",
            date: "3 days ago", 
            notes: "Discussed expansion plans, very interested in our premium package"
          }
        },
        { 
          customerId: "2", 
          customerName: "Global Industries", 
          address: "456 Commerce St, Midtown, San Francisco, CA 94105",
          coordinates: { lat: 40.7505, lng: -73.9934 },
          distanceFromCurrent: 1.8,
          status: "pending",
          lastVisit: {
            agent: "Mike Johnson",
            date: "1 week ago",
            notes: "Follow up needed on pending order #ORD-002"
          }
        },
        { 
          customerId: "3", 
          customerName: "Innovation Labs", 
          address: "789 Tech Park, North Side, Chicago, IL 60601",
          coordinates: { lat: 40.7614, lng: -73.9776 },
          distanceFromCurrent: 3.2,
          status: "pending",
          lastVisit: {
            agent: "David Chen",
            date: "5 days ago",
            notes: "New contact established, potential for large order"
          }
        }
      ]
    };
    setRouteData(newRouteData);
    setCurrentFlow("active-route");
  };

  const handleEndRoute = () => {
    setCurrentFlow("end-route");
  };

  const handleSubmitEndRoute = (data: { endOdometer: number; endOdometerPhoto: string }) => {
    if (routeData) {
      setRouteData(prev => prev ? {
        ...prev,
        endOdometer: data.endOdometer,
        endOdometerPhoto: data.endOdometerPhoto,
        endTime: new Date()
      } : null);
    }
    setCurrentFlow("route-summary");
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentFlow("customer-details");
  };

  const handleNewOrder = (customerId?: string) => {
    if (customerId && selectedCustomer) {
      setNewOrder({ customerId, customerName: selectedCustomer.name });
    } else {
      setNewOrder({});
    }
    setCurrentFlow("new-order");
  };

  const handleOrderSubmit = (orderData: Partial<Order>) => {
    const order: Order = {
      id: `#ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customerId: orderData.customerId || '',
      customerName: orderData.customerName || '',
      product: orderData.product || '',
      quantity: orderData.quantity || 0,
      price: orderData.price || 0,
      total: (orderData.quantity || 0) * (orderData.price || 0),
      notes: orderData.notes,
      status: "pending",
      date: new Date().toISOString().split('T')[0]
    };
    
    setOrders(prev => [order, ...prev]);
    setNewOrder(order);
    setCurrentFlow("order-confirmation");
  };

  const handleOrderConfirmationComplete = () => {
    setNewOrder(null);
    setCurrentFlow("main-app");
    setActiveTab("orders");
  };

  const handleFinishRoute = () => {
    setRouteData(null);
    setCurrentFlow("main-app");
    setActiveTab("dashboard");
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab 
          onStartRoute={() => setCurrentFlow("start-route")} 
          onNewOrder={() => handleNewOrder()}
        />;
      case "customers":
        return <CustomersTab onCustomerSelect={handleCustomerSelect} />;
      case "orders":
        return <OrdersTab orders={orders} onNewOrder={() => handleNewOrder()} />;
      case "route":
        return <RouteTab onStartRoute={() => setCurrentFlow("start-route")} />;
      case "profile":
        return <ProfileTab permissions={permissions} />;
      default:
        return <DashboardTab 
          onStartRoute={() => setCurrentFlow("start-route")} 
          onNewOrder={() => handleNewOrder()}
        />;
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "Sales Dashboard";
      case "customers":
        return "Customers";
      case "orders":
        return "Orders";
      case "route":
        return "Route Planning";
      case "profile":
        return "Profile";
      default:
        return "SalesForce Mobile";
    }
  };

  // Onboarding Flow
  if (currentFlow === "welcome") {
    return <OnboardingWelcome onComplete={handleWelcomeComplete} />;
  }

  if (currentFlow === "notification-permission") {
    return <NotificationPermission onComplete={handleNotificationPermission} />;
  }

  if (currentFlow === "location-permission") {
    return <LocationPermission onComplete={handleLocationPermission} />;
  }

  // Route Flow
  if (currentFlow === "start-route") {
    return <StartRoute onStartRoute={handleStartRoute} onBack={() => setCurrentFlow("main-app")} />;
  }

  if (currentFlow === "active-route" && routeData) {
    return <ActiveRoute routeData={routeData} onEndRoute={handleEndRoute} />;
  }

  if (currentFlow === "end-route") {
    return <EndRoute onSubmit={handleSubmitEndRoute} onBack={() => setCurrentFlow("active-route")} />;
  }

  if (currentFlow === "route-summary" && routeData) {
    return <RouteSummary routeData={routeData} onFinish={handleFinishRoute} />;
  }

  // Customer Details
  if (currentFlow === "customer-details" && selectedCustomer) {
    return <CustomerDetails 
      customer={selectedCustomer} 
      orders={orders.filter(o => o.customerId === selectedCustomer.id)}
      onBack={() => {
        setSelectedCustomer(null);
        setCurrentFlow("main-app");
        setActiveTab("customers");
      }}
      onNewOrder={() => handleNewOrder(selectedCustomer.id)}
    />;
  }

  // New Order Flow
  if (currentFlow === "new-order") {
    return <NewOrderForm 
      initialOrder={newOrder || {}}
      customerOrders={selectedCustomer ? orders.filter(o => o.customerId === selectedCustomer.id) : []}
      onSubmit={handleOrderSubmit}
      onBack={() => {
        setNewOrder(null);
        if (selectedCustomer) {
          setCurrentFlow("customer-details");
        } else {
          setCurrentFlow("main-app");
        }
      }}
    />;
  }

  if (currentFlow === "order-confirmation" && newOrder) {
    return <OrderConfirmation 
      order={newOrder as Order}
      onComplete={handleOrderConfirmationComplete}
    />;
  }

  // Main App
  return (
    <div className="min-h-screen bg-background max-w-sm mx-auto relative">
      {/* Mobile Header */}
      <MobileHeader
        title={getHeaderTitle()}
        showSearch={activeTab === "customers" || activeTab === "orders"}
        showNotifications={activeTab === "dashboard"}
      />

      {/* Main Content */}
      <main className="px-4 pt-4">
        {getTabContent()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}