import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LeadCard } from "../LeadCard";
import { FloatingActionButton } from "../FloatingActionButton";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { 
  Search, 
  Filter, 
  Users, 
  TrendingUp, 
  DollarSign,
  Plus
} from "lucide-react";

export function LeadsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leads] = useState([
    {
      id: 1,
      name: "John Smith",
      company: "Acme Corporation",
      email: "john.smith@acme.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      dealValue: "$25,000",
      stage: "Qualified",
      lastContact: "2 days ago",
      priority: "hot" as const,
      avatarUrl: ""
    },
    {
      id: 2,
      name: "Maria Garcia",
      company: "Tech Solutions Inc",
      email: "maria@techsolutions.com",
      phone: "+1 (555) 987-6543",
      location: "San Francisco, CA",
      dealValue: "$45,000",
      stage: "Proposal",
      lastContact: "1 day ago",
      priority: "hot" as const,
      avatarUrl: ""
    },
    {
      id: 3,
      name: "David Chen",
      company: "Global Enterprises",
      email: "david.chen@global.com",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      dealValue: "$15,000",
      stage: "New Lead",
      lastContact: "1 week ago",
      priority: "warm" as const,
      avatarUrl: ""
    },
    {
      id: 4,
      name: "Sarah Johnson",
      company: "Innovation Labs",
      email: "sarah@innovationlabs.com",
      phone: "+1 (555) 234-5678",
      location: "Austin, TX",
      dealValue: "$35,000",
      stage: "Negotiation",
      lastContact: "3 days ago",
      priority: "hot" as const,
      avatarUrl: ""
    },
    {
      id: 5,
      name: "Michael Brown",
      company: "Future Systems",
      email: "michael@futuresys.com",
      phone: "+1 (555) 345-6789",
      location: "Seattle, WA",
      dealValue: "$8,000",
      stage: "Qualified",
      lastContact: "5 days ago",
      priority: "cold" as const,
      avatarUrl: ""
    }
  ]);

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pipelineStats = [
    { label: "Total Leads", value: leads.length, color: "text-blue-600" },
    { label: "Hot Leads", value: leads.filter(l => l.priority === "hot").length, color: "text-red-600" },
    { label: "Pipeline Value", value: "$128K", color: "text-green-600" }
  ];

  const handleCall = (leadName: string) => {
    console.log('Calling:', leadName);
  };

  const handleEmail = (leadName: string) => {
    console.log('Emailing:', leadName);
  };

  const handleViewDetails = (leadName: string) => {
    console.log('Viewing details for:', leadName);
  };

  const handleAddLead = () => {
    console.log('Adding new lead');
  };

  return (
    <div className="pb-20">
      {/* Pipeline Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {pipelineStats.map((stat, index) => (
          <Card key={index} className="p-3 text-center">
            <p className={`font-medium ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm" className="px-3">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads List */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-3">
          {filteredLeads.map((lead) => (
            <LeadCard
              key={lead.id}
              name={lead.name}
              company={lead.company}
              email={lead.email}
              phone={lead.phone}
              location={lead.location}
              dealValue={lead.dealValue}
              stage={lead.stage}
              lastContact={lead.lastContact}
              priority={lead.priority}
              avatarUrl={lead.avatarUrl}
              onCall={() => handleCall(lead.name)}
              onEmail={() => handleEmail(lead.name)}
              onViewDetails={() => handleViewDetails(lead.name)}
            />
          ))}
          
          {filteredLeads.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No leads found matching your search.</p>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Add Lead FAB */}
      <FloatingActionButton 
        onClick={handleAddLead}
        className="bg-blue-600 hover:bg-blue-700"
      />
    </div>
  );
}