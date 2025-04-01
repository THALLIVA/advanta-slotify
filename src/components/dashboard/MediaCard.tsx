
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface MediaCardProps {
  title: string;
  description: string;
  price: string;
}

const MediaCard = ({ title, description, price }: MediaCardProps) => {
  return (
    <Card className="border-none overflow-hidden">
      <CardContent className="p-0">
        <div className="h-36 bg-advanta-gray dark:bg-muted/20 flex items-center justify-center">
          <span className="text-advanta-blue dark:text-primary text-xs">Media Preview</span>
        </div>
        <div className="p-4">
          <h3 className="font-medium dark:text-foreground">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-advanta-lightgray dark:bg-card/80 p-4 border-t dark:border-border">
        <span className="text-advanta-blue dark:text-primary font-medium">{price}</span>
      </CardFooter>
    </Card>
  );
};

export default MediaCard;
