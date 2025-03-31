
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MediaCard from "@/components/dashboard/MediaCard";
import { Search } from "lucide-react";

const mediaOptions = [
  {
    title: "Times of India",
    description: "Front Page, National",
    price: "₹85,000",
  },
  {
    title: "India Today",
    description: "Full Page, National",
    price: "₹65,000",
  },
  {
    title: "Star Plus",
    description: "Prime Time, 30 sec",
    price: "₹95,000",
  },
  {
    title: "Radio City",
    description: "Morning Show, 30 sec",
    price: "₹12,000",
  },
  {
    title: "PVR Cinemas",
    description: "Pre-movie, 30 sec",
    price: "₹35,000",
  },
  {
    title: "Mumbai Metro",
    description: "Station Branding",
    price: "₹75,000",
  },
];

const MediaSearch = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Media Search</h1>
      </div>
      
      <div className="bg-white p-6 rounded-md shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search media outlets..." 
                className="pl-10"
              />
            </div>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Media Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="print">Print</SelectItem>
              <SelectItem value="tv">TV</SelectItem>
              <SelectItem value="radio">Radio</SelectItem>
              <SelectItem value="outdoor">Outdoor</SelectItem>
              <SelectItem value="digital">Digital</SelectItem>
              <SelectItem value="cinema">Cinema</SelectItem>
            </SelectContent>
          </Select>
          <Button>Search</Button>
        </div>
        <div className="flex gap-2 text-sm">
          <Button variant="outline" size="sm">
            Delhi NCR
          </Button>
          <Button variant="outline" size="sm">
            Premium Outlets
          </Button>
          <Button variant="outline" size="sm">
            Weekend
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mediaOptions.map((media, index) => (
          <MediaCard
            key={index}
            title={media.title}
            description={media.description}
            price={media.price}
          />
        ))}
      </div>
    </div>
  );
};

export default MediaSearch;
