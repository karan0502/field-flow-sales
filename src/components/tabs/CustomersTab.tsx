import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Search, Phone, Eye, MapPin, Clock } from "lucide-react";

interface CustomersTabProps {
  onCustomerSelect: (customer: any) => void;
}

export function CustomersTab({ onCustomerSelect }: CustomersTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const customers = [
    {
      id: "1",
      name: "John Smith",
      company: "TechCorp Solutions",
      phone: "+1 (555) 123-4567",
      email: "john.smith@techcorp.com",
      address: "123 Business Ave, Downtown, New York, NY 10001",
      location: "New York, NY",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      lastVisit: "2 days ago",
      lastVisitedBy: "Sarah Wilson",
      visitNotes: "Discussed expansion plans, very interested in our premium package. Follow up needed on budget approval.",
      status: "active" as const,
      priority: "high" as const,
      pendingOrders: 1,
      pendingIssues: ["Budget approval pending for premium package"]
    },
    {
      id: "2",
      name: "Maria Garcia",
      company: "Global Industries",
      phone: "+1 (555) 987-6543",
      email: "maria.garcia@global.com",
      address: "456 Commerce St, Midtown, San Francisco, CA 94105",
      location: "San Francisco, CA",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      lastVisit: "1 week ago",
      lastVisitedBy: "Mike Johnson",
      visitNotes: "Order #ORD-002 delivery delayed. Customer requested expedited shipping for next order.",
      status: "pending" as const,
      priority: "medium" as const,
      pendingOrders: 1,
      pendingIssues: ["Delivery delay on order #ORD-002", "Expedited shipping request"]
    },
    {
      id: "3",
      name: "David Chen",
      company: "Innovation Labs",
      phone: "+1 (555) 456-7890",
      email: "david.chen@innovlabs.com",
      address: "789 Tech Park, North Side, Chicago, IL 60601",
      location: "Chicago, IL",
      coordinates: { lat: 40.7614, lng: -73.9776 },
      lastVisit: "3 days ago",
      lastVisitedBy: "David Chen",
      visitNotes: "New contact established, potential for large order. Scheduling technical demo for next week.",
      status: "active" as const,
      priority: "high" as const,
      pendingOrders: 0,
      pendingIssues: []
    },
    {
      id: "4",
      name: "Sarah Johnson",
      company: "Metro Consulting",
      phone: "+1 (555) 234-5678",
      email: "sarah.johnson@metro.com",
      address: "321 Professional Way, Austin, TX 78701",
      location: "Austin, TX",
      coordinates: { lat: 40.7300, lng: -73.9950 },
      lastVisit: "5 days ago",
      lastVisitedBy: "Lisa Martinez",
      visitNotes: "Client showed interest in maintenance packages. Need to provide detailed pricing.",
      status: "inactive" as const,
      priority: "low" as const,
      pendingOrders: 0,
      pendingIssues: ["Pricing details needed for maintenance packages"]
    },
    {
      id: "5",
      name: "Michael Brown",
      company: "Future Systems",
      phone: "+1 (555) 345-6789",
      email: "michael.brown@futuresys.com",
      address: "654 Innovation Dr, Seattle, WA 98101",
      location: "Seattle, WA",
      coordinates: { lat: 40.7400, lng: -73.9800 },
      lastVisit: "1 day ago",
      lastVisitedBy: "Tom Rodriguez",
      visitNotes: "Excellent meeting, customer ready to place large order. Contract review in progress.",
      status: "active" as const,
      priority: "medium" as const,
      pendingOrders: 0,
      pendingIssues: []
    },
    {
      id: "6",
      name: "Lisa Wilson",
      company: "Digital Dynamics",
      phone: "+1 (555) 567-8901",
      email: "lisa.wilson@digitaldyn.com",
      address: "987 Ocean View Blvd, Miami, FL 33101",
      location: "Miami, FL",
      coordinates: { lat: 40.7200, lng: -74.0000 },
      lastVisit: "2 weeks ago",
      lastVisitedBy: "Jennifer Park",
      visitNotes: "Customer had technical issues with last delivery. Support team resolved. Relationship back on track.",
      status: "pending" as const,
      priority: "high" as const,
      pendingOrders: 2,
      pendingIssues: ["Follow-up on technical issues resolution", "Two pending orders need confirmation"]
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
    low: "bg-green-100 text-green-700"
  };

  const statusColors = {
    active: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    inactive: "bg-gray-100 text-gray-700"
  };

  const handleCall = (customerName: string, phone: string) => {
    console.log(`Calling ${customerName} at ${phone}`);
  };

  const handleViewDetails = (customerName: string) => {
    console.log(`Viewing details for ${customerName}`);
  };

  return (
    <div className="pb-20 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Customer Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredCustomers.length} customers found
        </p>
        <Badge variant="secondary">
          {customers.filter(c => c.status === "active").length} active
        </Badge>
      </div>

      {/* Customer List */}
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-3">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{customer.name}</h3>
                      <Badge 
                        variant="outline"
                        className={priorityColors[customer.priority as keyof typeof priorityColors]}
                      >
                        {customer.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{customer.company}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{customer.location}</span>
                    </div>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={statusColors[customer.status as keyof typeof statusColors]}
                  >
                    {customer.status}
                  </Badge>
                </div>

                {/* Last Visit */}
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Last visit: {customer.lastVisit}</span>
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{customer.phone}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCall(customer.name, customer.phone)}
                    className="flex items-center gap-1 flex-1"
                  >
                    <Phone className="h-4 w-4" />
                    Contact
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => onCustomerSelect(customer)}
                    className="flex items-center gap-1 flex-1"
                  >
                    <Eye className="h-4 w-4" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No customers found matching your search.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}