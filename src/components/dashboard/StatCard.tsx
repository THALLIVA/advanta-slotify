
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
  className?: string;
}

const StatCard = ({ title, value, valueColor, className }: StatCardProps) => {
  return (
    <Card className={cn("border-none", className)}>
      <CardContent className="p-6">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <p className={cn("text-2xl font-semibold", valueColor)}>{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
