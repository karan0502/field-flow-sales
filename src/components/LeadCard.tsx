import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Phone, Mail, MapPin, DollarSign, Calendar } from "lucide-react";

interface LeadCardProps {
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  dealValue: string;
  stage: string;
  lastContact: string;
  avatarUrl?: string;
  priority: "hot" | "warm" | "cold";
  onCall?: () => void;
  onEmail?: () => void;
  onViewDetails?: () => void;
}

const priorityColors = {
  hot: "bg-red-100 text-red-700 border-red-200",
  warm: "bg-yellow-100 text-yellow-700 border-yellow-200",
  cold: "bg-blue-100 text-blue-700 border-blue-200"
};

const stageColors = {
  "New Lead": "bg-gray-100 text-gray-700",
  "Qualified": "bg-blue-100 text-blue-700",
  "Proposal": "bg-yellow-100 text-yellow-700",
  "Negotiation": "bg-orange-100 text-orange-700",
  "Closed Won": "bg-green-100 text-green-700",
  "Closed Lost": "bg-red-100 text-red-700"
};

export function LeadCard({
  name,
  company,
  email,
  phone,
  location,
  dealValue,
  stage,
  lastContact,
  avatarUrl,
  priority,
  onCall,
  onEmail,
  onViewDetails
}: LeadCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium truncate">{name}</h3>
              <Badge className={priorityColors[priority]} variant="outline">
                {priority.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">{company}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>

        {/* Deal Info */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">{dealValue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{lastContact}</span>
          </div>
        </div>

        {/* Stage */}
        <div className="mb-3">
          <Badge 
            className={stageColors[stage as keyof typeof stageColors] || "bg-gray-100 text-gray-700"}
            variant="secondary"
          >
            {stage}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="truncate text-muted-foreground">{email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{phone}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCall}
            className="flex items-center gap-1 flex-1"
          >
            <Phone className="h-4 w-4" />
            Call
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onEmail}
            className="flex items-center gap-1 flex-1"
          >
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button
            size="sm"
            onClick={onViewDetails}
            className="flex-1"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}