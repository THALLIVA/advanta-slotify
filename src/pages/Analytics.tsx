
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { ArrowUp, ArrowDown, TrendingUp, BarChart as BarChartIcon, PieChart as PieChartIcon } from "lucide-react";

// Dummy data for competitive intelligence
const competitiveData = [
  { name: 'Your Company', tv: 78, radio: 65, print: 82, digital: 90 },
  { name: 'Industry Avg', tv: 65, radio: 59, print: 70, digital: 85 },
  { name: 'Top Competitor', tv: 72, radio: 68, print: 75, digital: 92 },
];

// Dummy data for trend analysis
const trendData = [
  { month: 'Jan', spend: 4000, impressions: 2400, engagement: 2400 },
  { month: 'Feb', spend: 3000, impressions: 1398, engagement: 2210 },
  { month: 'Mar', spend: 2000, impressions: 9800, engagement: 2290 },
  { month: 'Apr', spend: 2780, impressions: 3908, engagement: 2000 },
  { month: 'May', spend: 1890, impressions: 4800, engagement: 2181 },
  { month: 'Jun', spend: 2390, impressions: 3800, engagement: 2500 },
  { month: 'Jul', spend: 3490, impressions: 4300, engagement: 2100 },
];

// Dummy data for sales integration
const salesData = [
  { name: 'TV', value: 4000, percentage: 40 },
  { name: 'Radio', value: 3000, percentage: 30 },
  { name: 'Print', value: 2000, percentage: 20 },
  { name: 'Digital', value: 1000, percentage: 10 },
];

// Dummy data for campaign performance
const campaignData = [
  { id: 1, campaign: "Summer Sale TV", spend: "₹45,000", roi: "3.2x", status: "High Performer" },
  { id: 2, campaign: "Radio Promo", spend: "₹12,000", roi: "1.8x", status: "Average" },
  { id: 3, campaign: "Holiday Print", spend: "₹28,000", roi: "2.1x", status: "Average" },
  { id: 4, campaign: "Digital Q2", spend: "₹35,000", roi: "4.5x", status: "Top Performer" },
  { id: 5, campaign: "Brand Awareness", spend: "₹65,000", roi: "1.2x", status: "Underperforming" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics & Insights</h1>
      
      {/* Competitive Intelligence */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChartIcon size={20} />
          Competitive Intelligence
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Industry Benchmark Comparison</CardTitle>
            <CardDescription>How your media performance compares to industry averages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={competitiveData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="tv" name="TV Ads" fill="#8884d8" />
                  <Bar dataKey="radio" name="Radio" fill="#82ca9d" />
                  <Bar dataKey="print" name="Print" fill="#ffc658" />
                  <Bar dataKey="digital" name="Digital" fill="#ff7300" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Trend Analysis */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Trend Analysis
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Media Spend Trends</CardTitle>
              <CardDescription>6-month spending pattern analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="spend" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance</CardTitle>
              <CardDescription>Breakdown of performance by media type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {salesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Sales Data Integration */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <PieChartIcon size={20} />
          Sales Integration Analysis
        </h2>
        <Card>
          <CardHeader>
            <CardTitle>Media Spend vs. Business Outcomes</CardTitle>
            <CardDescription>Connecting advertising investments to sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Media Spend</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignData.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.campaign}</TableCell>
                    <TableCell>{campaign.spend}</TableCell>
                    <TableCell>{campaign.roi}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {campaign.status === "Top Performer" && (
                          <span className="text-green-600 flex items-center">
                            <ArrowUp size={16} /> {campaign.status}
                          </span>
                        )}
                        {campaign.status === "High Performer" && (
                          <span className="text-green-500 flex items-center">
                            <ArrowUp size={16} /> {campaign.status}
                          </span>
                        )}
                        {campaign.status === "Average" && (
                          <span className="text-yellow-500">
                            {campaign.status}
                          </span>
                        )}
                        {campaign.status === "Underperforming" && (
                          <span className="text-red-500 flex items-center">
                            <ArrowDown size={16} /> {campaign.status}
                          </span>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
