
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BarChart, FileText, Plus } from "lucide-react";

const campaigns = [
  {
    id: "CAM-001",
    name: "Summer 2025 Collection",
    startDate: "01 May 2025",
    endDate: "30 Jun 2025",
    budget: "₹250,000",
    spent: "₹75,000",
    status: "Active",
  },
  {
    id: "CAM-002",
    name: "Diwali Festival",
    startDate: "15 Oct 2025",
    endDate: "15 Nov 2025",
    budget: "₹350,000",
    spent: "₹0",
    status: "Scheduled",
  },
  {
    id: "CAM-003",
    name: "Winter Collection",
    startDate: "01 Dec 2024",
    endDate: "31 Jan 2025",
    budget: "₹200,000",
    spent: "₹175,000",
    status: "Active",
  },
  {
    id: "CAM-004",
    name: "Brand Awareness",
    startDate: "01 Mar 2025",
    endDate: "30 Apr 2025",
    budget: "₹150,000",
    spent: "₹150,000",
    status: "Completed",
  },
];

const Campaigns = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Campaigns</h1>
        <Button className="flex gap-1.5">
          <Plus size={18} />
          New Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">5</CardTitle>
            <CardDescription>Total Campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              3 active, 1 scheduled, 1 completed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">₹950,000</CardTitle>
            <CardDescription>Total Budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              ₹400,000 remaining
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">15</CardTitle>
            <CardDescription>Media Bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              4 pending approvals
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle>Campaign List</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <FileText size={14} />
              Export
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <BarChart size={14} />
              Analytics
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.id}</TableCell>
                  <TableCell>{campaign.name}</TableCell>
                  <TableCell>
                    {campaign.startDate} - {campaign.endDate}
                  </TableCell>
                  <TableCell>{campaign.budget}</TableCell>
                  <TableCell>{campaign.spent}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "font-normal",
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : campaign.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      )}
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Campaigns;
