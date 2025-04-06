
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
import { FileText, Filter } from "lucide-react";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useIsMobile } from "@/hooks/use-mobile";

const orders = [
  {
    id: "ORD-2567",
    campaign: "Summer 2025 Collection",
    mediaType: "Print",
    outlet: "Times of India",
    date: "15 May 2025",
    amount: "24500",
    status: "Completed",
  },
  {
    id: "ORD-2566",
    campaign: "Summer 2025 Collection",
    mediaType: "Radio",
    outlet: "Radio Mirchi",
    date: "20 May 2025",
    amount: "18000",
    status: "Pending",
  },
  {
    id: "ORD-2565",
    campaign: "Summer 2025 Collection",
    mediaType: "Outdoor",
    outlet: "MG Road Billboard",
    date: "01 June 2025",
    amount: "42000",
    status: "Completed",
  },
  {
    id: "ORD-2564",
    campaign: "Winter Collection",
    mediaType: "TV",
    outlet: "Star Plus",
    date: "15 Dec 2024",
    amount: "65000",
    status: "Completed",
  },
  {
    id: "ORD-2563",
    campaign: "Winter Collection",
    mediaType: "Cinema",
    outlet: "PVR Cinemas",
    date: "01 Jan 2025",
    amount: "38000",
    status: "Completed",
  },
  {
    id: "ORD-2562",
    campaign: "Diwali Festival",
    mediaType: "Print",
    outlet: "India Today",
    date: "20 Oct 2025",
    amount: "32000",
    status: "Scheduled",
  },
];

const Orders = () => {
  const { formatCurrency } = useCurrency();
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <Button variant="outline" className="flex gap-1.5">
          <Filter size={18} />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg md:text-xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Total Orders
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg md:text-xl text-green-600">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Completed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg md:text-xl text-amber-500">3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Pending
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg md:text-xl text-blue-500">1</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Scheduled
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle>Order History</CardTitle>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <FileText size={14} />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Order ID</TableHead>
                  {!isMobile && <TableHead>Campaign</TableHead>}
                  {!isMobile && <TableHead>Media Type</TableHead>}
                  <TableHead>Outlet</TableHead>
                  {!isMobile && <TableHead>Date</TableHead>}
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    {!isMobile && <TableCell>{order.campaign}</TableCell>}
                    {!isMobile && <TableCell>{order.mediaType}</TableCell>}
                    <TableCell>{order.outlet}</TableCell>
                    {!isMobile && <TableCell>{order.date}</TableCell>}
                    <TableCell>{formatCurrency(order.amount)}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "font-normal",
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/40"
                            : order.status === "Pending"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/40"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/40"
                        )}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
