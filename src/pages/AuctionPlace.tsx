
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Gavel, Clock, TrendingUp, AlertTriangle, CheckCircle, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types for auction slots
type BidStatus = "Active" | "Won" | "Lost" | "Outbid" | "Pending";

interface AuctionSlot {
  id: string;
  title: string;
  publisher: string;
  adFormat: string;
  placement: string;
  startingBid: number;
  currentBid: number;
  myBid?: number;
  bidStatus?: BidStatus;
  expiresAt: Date;
  impressions: number;
  audience: string;
}

const AuctionPlace = () => {
  // Mock data for available auction slots
  const [availableSlots, setAvailableSlots] = useState<AuctionSlot[]>([
    {
      id: "as-001",
      title: "Prime Time News Sponsor",
      publisher: "Channel 7 News",
      adFormat: "30-Second TV Spot",
      placement: "Evening News Program",
      startingBid: 5000,
      currentBid: 6200,
      expiresAt: new Date(Date.now() + 86400000 * 2), // 2 days from now
      impressions: 250000,
      audience: "Adults 25-54",
    },
    {
      id: "as-002",
      title: "Weekend Sports Banner",
      publisher: "SportsDaily",
      adFormat: "Billboard Banner",
      placement: "Stadium Sideline",
      startingBid: 3500,
      currentBid: 4100,
      expiresAt: new Date(Date.now() + 86400000 * 1), // 1 day from now
      impressions: 180000,
      audience: "Males 18-49",
    },
    {
      id: "as-003",
      title: "Morning Drive Radio Spot",
      publisher: "CityFM Radio",
      adFormat: "60-Second Audio",
      placement: "Morning Commute Slot",
      startingBid: 2000,
      currentBid: 2350,
      expiresAt: new Date(Date.now() + 86400000 * 3), // 3 days from now
      impressions: 120000,
      audience: "Commuters 20-45",
    },
    {
      id: "as-004",
      title: "Business Magazine Full Page",
      publisher: "Business Weekly",
      adFormat: "Full Page Print",
      placement: "Inside Front Cover",
      startingBid: 4500,
      currentBid: 4500,
      expiresAt: new Date(Date.now() + 86400000 * 5), // 5 days from now
      impressions: 75000,
      audience: "Business Professionals",
    },
    {
      id: "as-005",
      title: "Lifestyle Blog Sponsorship",
      publisher: "Modern Living",
      adFormat: "Native Content",
      placement: "Homepage Feature",
      startingBid: 1800,
      currentBid: 2200,
      expiresAt: new Date(Date.now() + 86400000 * 2.5), // 2.5 days from now
      impressions: 95000,
      audience: "Women 25-40",
    },
  ]);

  // Mock data for my bids
  const [myBids, setMyBids] = useState<AuctionSlot[]>([
    {
      id: "as-006",
      title: "Evening Entertainment Show",
      publisher: "Network One",
      adFormat: "15-Second TV Spot",
      placement: "Prime Time Slot",
      startingBid: 3800,
      currentBid: 4500,
      myBid: 4200,
      bidStatus: "Outbid",
      expiresAt: new Date(Date.now() + 86400000 * 1.5), // 1.5 days from now
      impressions: 210000,
      audience: "General 18-49",
    },
    {
      id: "as-007",
      title: "Financial News Podcast",
      publisher: "MoneyTalk",
      adFormat: "Audio Sponsorship",
      placement: "Mid-episode Placement",
      startingBid: 1500,
      currentBid: 1800,
      myBid: 1800,
      bidStatus: "Won",
      expiresAt: new Date(Date.now() - 86400000 * 0.5), // 0.5 days ago
      impressions: 65000,
      audience: "Investors 30-60",
    },
    {
      id: "as-008",
      title: "Tech Conference Booth",
      publisher: "TechExpo",
      adFormat: "Physical Display",
      placement: "Main Hall Entrance",
      startingBid: 6000,
      currentBid: 7500,
      myBid: 6800,
      bidStatus: "Lost",
      expiresAt: new Date(Date.now() - 86400000 * 1), // 1 day ago
      impressions: 15000,
      audience: "Tech Professionals",
    },
    {
      id: "as-009",
      title: "Sports App Banner",
      publisher: "ScoreTracker",
      adFormat: "Mobile Banner",
      placement: "In-App Premium Position",
      startingBid: 2200,
      currentBid: 2700,
      myBid: 2700,
      bidStatus: "Active",
      expiresAt: new Date(Date.now() + 86400000 * 2), // 2 days from now
      impressions: 150000,
      audience: "Sports Fans 18-35",
    },
  ]);

  // State for bid amounts
  const [bidAmounts, setBidAmounts] = useState<Record<string, number>>({});

  // Function to format date in a readable format
  const formatExpiryDate = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffTime < 0) {
      return "Expired";
    }
    
    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h`;
    }
    
    return `${diffHours}h`;
  };

  // Function to handle placing a bid
  const handlePlaceBid = (slot: AuctionSlot) => {
    const bidAmount = bidAmounts[slot.id];
    
    if (!bidAmount) {
      toast({
        title: "Bid Error",
        description: "Please enter a bid amount.",
        variant: "destructive",
      });
      return;
    }
    
    if (bidAmount <= slot.currentBid) {
      toast({
        title: "Bid Error",
        description: "Your bid must be higher than the current bid.",
        variant: "destructive",
      });
      return;
    }
    
    // Update available slots with new current bid
    setAvailableSlots(
      availableSlots.map((s) => 
        s.id === slot.id ? { ...s, currentBid: bidAmount } : s
      )
    );
    
    // Add to my bids if not already there
    if (!myBids.some((bid) => bid.id === slot.id)) {
      setMyBids([
        ...myBids,
        {
          ...slot,
          myBid: bidAmount,
          currentBid: bidAmount,
          bidStatus: "Active",
        },
      ]);
    } else {
      // Update existing bid
      setMyBids(
        myBids.map((bid) =>
          bid.id === slot.id
            ? { ...bid, myBid: bidAmount, currentBid: bidAmount, bidStatus: "Active" }
            : bid
        )
      );
    }
    
    // Clear bid amount
    setBidAmounts({ ...bidAmounts, [slot.id]: 0 });
    
    toast({
      title: "Bid Placed",
      description: `Your bid of ₹${bidAmount.toLocaleString()} for "${slot.title}" has been placed.`,
    });
  };

  // Function to handle bid higher action
  const handleBidHigher = (slot: AuctionSlot) => {
    const newBid = (slot.currentBid || 0) + 100;
    
    setMyBids(
      myBids.map((bid) =>
        bid.id === slot.id
          ? { ...bid, myBid: newBid, currentBid: newBid, bidStatus: "Active" }
          : bid
      )
    );
    
    toast({
      title: "Bid Increased",
      description: `Your bid has been increased to ₹${newBid.toLocaleString()}.`,
    });
  };

  // Function to render bid status badge
  const renderBidStatusBadge = (status: BidStatus) => {
    switch (status) {
      case "Won":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">
            <CheckCircle className="h-3 w-3 mr-1" /> Won
          </Badge>
        );
      case "Lost":
        return (
          <Badge variant="destructive">
            <X className="h-3 w-3 mr-1" /> Lost
          </Badge>
        );
      case "Outbid":
        return (
          <Badge variant="outline" className="border-amber-500 text-amber-500">
            <AlertTriangle className="h-3 w-3 mr-1" /> Outbid
          </Badge>
        );
      case "Active":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700">
            <TrendingUp className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Auction Place</h1>
          <p className="text-muted-foreground">
            Browse and bid on premium advertising slots
          </p>
        </div>
      </div>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="available">Available Slots</TabsTrigger>
          <TabsTrigger value="mybids">My Bids</TabsTrigger>
        </TabsList>
        
        <TabsContent value="available" className="mt-6">
          <div className="space-y-4">
            {availableSlots.map((slot) => (
              <Card key={slot.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{slot.title}</CardTitle>
                      <CardDescription>{slot.publisher}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-amber-600 font-semibold">
                        <Clock className="h-4 w-4" />
                        <span>{formatExpiryDate(slot.expiresAt)}</span>
                      </div>
                      <CardDescription>Until auction closes</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Format</p>
                      <p className="font-medium">{slot.adFormat}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Placement</p>
                      <p className="font-medium">{slot.placement}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Audience</p>
                      <p className="font-medium">{slot.audience}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Est. Impressions</p>
                      <p className="font-medium">{slot.impressions.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Bid</p>
                      <p className="text-xl font-bold">₹{slot.currentBid.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex gap-2 w-full md:w-auto">
                      <Input
                        type="number"
                        placeholder="Your bid amount"
                        className="w-full md:w-36"
                        min={slot.currentBid + 1}
                        value={bidAmounts[slot.id] || ""}
                        onChange={(e) => 
                          setBidAmounts({
                            ...bidAmounts,
                            [slot.id]: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                      <Button 
                        onClick={() => handlePlaceBid(slot)}
                        disabled={!bidAmounts[slot.id] || bidAmounts[slot.id] <= slot.currentBid}
                      >
                        <Gavel className="h-4 w-4 mr-2" />
                        Place Bid
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="mybids" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Auction Bids</CardTitle>
              <CardDescription>
                Track all your bids and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Slot Details</TableHead>
                    <TableHead>My Bid</TableHead>
                    <TableHead>Current Bid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myBids.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell>
                        <div className="font-medium">{bid.title}</div>
                        <div className="text-sm text-muted-foreground">{bid.publisher}</div>
                      </TableCell>
                      <TableCell>₹{bid.myBid?.toLocaleString()}</TableCell>
                      <TableCell>
                        {bid.myBid !== bid.currentBid ? (
                          <span className="text-red-500 font-medium">${bid.currentBid.toLocaleString()}</span>
                        ) : (
                          <span>₹{bid.currentBid.toLocaleString()}</span>
                        )}
                      </TableCell>
                      <TableCell>{renderBidStatusBadge(bid.bidStatus || "Pending")}</TableCell>
                      <TableCell>{formatExpiryDate(bid.expiresAt)}</TableCell>
                      <TableCell>
                        {(bid.bidStatus === "Active" || bid.bidStatus === "Outbid") && 
                          new Date() < bid.expiresAt && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleBidHigher(bid)}
                              >
                                <TrendingUp className="h-3 w-3 mr-1" /> Bid Higher
                              </Button>
                            </div>
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuctionPlace;
