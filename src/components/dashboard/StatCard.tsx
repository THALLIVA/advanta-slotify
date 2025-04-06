
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/providers/CurrencyProvider";

interface StatCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
  className?: string;
  isMonetary?: boolean;
}

const StatCard = ({ title, value, valueColor, className, isMonetary = false }: StatCardProps) => {
  const { formatCurrency } = useCurrency();
  
  const displayValue = isMonetary ? formatCurrency(value) : value;
  
  return (
    <Card className={cn("border-none", className)}>
      <CardContent className="p-4 md:p-6">
        <h3 className="text-sm font-medium text-gray-500 dark:text-muted-foreground mb-2">{title}</h3>
        <p className={cn("text-xl md:text-2xl font-semibold", valueColor)}>{displayValue}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
