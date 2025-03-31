
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

interface Order {
  id: string;
  mediaType: string;
  outlet: string;
  amount: string;
  status: "Completed" | "Pending";
}

interface RecentOrdersTableProps {
  orders: Order[];
}

const RecentOrdersTable = ({ orders }: RecentOrdersTableProps) => {
  return (
    <div className="bg-white rounded-md shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">Recent Orders</h2>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Media Type</TableHead>
              <TableHead>Outlet</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.mediaType}</TableCell>
                <TableCell>{order.outlet}</TableCell>
                <TableCell>₹{order.amount}</TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "font-normal",
                      order.status === "Completed"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-amber-100 text-amber-800 hover:bg-amber-100"
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
    </div>
  );
};

export default RecentOrdersTable;
