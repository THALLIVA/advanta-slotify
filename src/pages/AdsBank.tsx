
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Filter, Plus, Search } from "lucide-react";

const creativeAssets = [
  {
    title: "Summer Campaign Print",
    type: "Print",
    date: "22.03.2025",
    preview: "Print Ad Preview",
  },
  {
    title: "Radio Jingle 30s",
    type: "Radio",
    date: "10.03.2025",
    preview: "Radio Ad Audio",
  },
  {
    title: "TV Commercial 15s",
    type: "Television",
    date: "05.03.2025",
    preview: "TV Ad Preview",
  },
  {
    title: "Highway Billboard",
    type: "Outdoor",
    date: "15.03.2025",
    preview: "Billboard Preview",
  },
  {
    title: "Cinema Pre-roll 30s",
    type: "Cinema",
    date: "18.03.2025",
    preview: "Cinema Ad Preview",
  },
  {
    title: "Magazine Full Page",
    type: "Print",
    date: "20.03.2025",
    preview: "Newspaper Ad",
  },
  {
    title: "Traffic Time Radio",
    type: "Radio",
    date: "25.03.2025",
    preview: "FM Station Ad",
  },
];

const AdsBank = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Ads Bank</h1>
        <Button className="flex gap-1.5">
          <Plus size={18} />
          Upload New
        </Button>
      </div>

      <Tabs defaultValue="creative">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="creative">Creative Assets</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="rights">Rights Management</TabsTrigger>
          <TabsTrigger value="upload">Upload New</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creative" className="space-y-6">
          <div className="bg-white p-4 rounded-md shadow-sm flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search assets..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex gap-1.5">
              <Filter size={16} />
              Media Type
            </Button>
            <Button variant="outline" className="flex gap-1.5">
              <Filter size={16} />
              Date Range
            </Button>
            <Button>Filter</Button>
          </div>
          
          <h2 className="text-lg font-medium">Creative Asset Library</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creativeAssets.map((asset, index) => (
              <Card key={index} className="border-none overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-40 bg-advanta-gray flex items-center justify-center">
                    <span className="text-advanta-blue">{asset.preview}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{asset.title}</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {asset.type} | {asset.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="border-none overflow-hidden">
              <CardContent className="p-0">
                <div className="h-40 bg-advanta-gray flex items-center justify-center">
                  <div className="text-advanta-blue text-4xl font-light border-2 border-dashed border-advanta-blue rounded-full w-12 h-12 flex items-center justify-center">
                    +
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium">Add New Asset</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-12">
            <h3 className="text-xl font-medium mb-2">Templates Library</h3>
            <p className="text-gray-500 mb-6">Create and manage your media templates</p>
            <Button>Browse Templates</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="rights">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-12">
            <h3 className="text-xl font-medium mb-2">Rights Management</h3>
            <p className="text-gray-500 mb-6">Manage usage rights for your creative assets</p>
            <Button>Manage Rights</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="upload">
          <div className="flex flex-col items-center justify-center bg-white rounded-lg p-12">
            <h3 className="text-xl font-medium mb-2">Upload New Assets</h3>
            <p className="text-gray-500 mb-6">Add new creative assets to your library</p>
            <Button>Upload Files</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdsBank;
