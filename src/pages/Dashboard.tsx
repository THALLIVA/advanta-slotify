
import StatCard from "@/components/dashboard/StatCard";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
import MediaCard from "@/components/dashboard/MediaCard";
import { useIsMobile } from "@/hooks/use-mobile";

const recentOrders = [
  {
    id: "ORD-2567",
    mediaType: "Print",
    outlet: "Times of India",
    amount: "24500",
    status: "Completed" as const,
  },
  {
    id: "ORD-2566",
    mediaType: "Radio",
    outlet: "Radio Mirchi",
    amount: "18000",
    status: "Pending" as const,
  },
  {
    id: "ORD-2565",
    mediaType: "Outdoor",
    outlet: "MG Road Billboard",
    amount: "42000",
    status: "Completed" as const,
  },
];

const recommendedMedia = [
  {
    title: "Hindustan Times",
    description: "Front Page, Delhi Edition",
    price: "36000",
  },
  {
    title: "Zee TV",
    description: "Prime Time, 30 sec",
    price: "55000",
  },
  {
    title: "Inox Cinemas",
    description: "Pre-show, Weekend",
    price: "28500",
  },
];

const Dashboard = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <StatCard 
          title="Active Campaigns" 
          value="5" 
          valueColor="text-advanta-blue"
        />
        <StatCard 
          title="Pending Orders" 
          value="3" 
          valueColor="text-amber-500"
        />
        <StatCard 
          title="Total Media Spend" 
          value="125500" 
          valueColor="text-green-600"
          isMonetary={true}
        />
      </div>
      
      <RecentOrdersTable orders={recentOrders} />
      
      <div>
        <h2 className="text-lg font-medium mb-4">Recommended Media</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {recommendedMedia.map((media, index) => (
            <MediaCard
              key={index}
              title={media.title}
              description={media.description}
              price={media.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
