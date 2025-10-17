import {
  Search,
  Filter,
  User,
  TrendingUp,
  Target,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  CreditCard,
  Eye,
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "@/components/AppHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const customers = [
  {
    id: 1,
    name: "Jane Doe",
    account: "ACC-2024-001234",
    products: ["Savings", "Loan"],
    balance: "₵60K",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "jane.doe@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Downtown",
    riskLevel: "Low",
    profitability: "₵2K/year",
    engagement: "85/100",
    lastActivity: "2024-01-15",
    joinDate: "2022-03-10",
    segment: "Premium",
    transactions: [
      {
        date: "2024-01-15",
        type: "Deposit",
        amount: "+₵2,500",
        description: "Salary Deposit",
      },
      {
        date: "2024-01-10",
        type: "Withdrawal",
        amount: "-₵500",
        description: "ATM Withdrawal",
      },
      {
        date: "2024-01-05",
        type: "Transfer",
        amount: "+₵1,200",
        description: "Transfer from Savings",
      },
    ],
  },
  {
    id: 2,
    name: "John Smith",
    account: "ACC-2024-005678",
    products: ["Checking", "Credit Card"],
    balance: "₵45K",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "john.smith@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Midtown",
    riskLevel: "Medium",
    profitability: "₵1.5K/year",
    engagement: "72/100",
    lastActivity: "2024-01-14",
    joinDate: "2021-08-22",
    segment: "Standard",
    transactions: [
      {
        date: "2024-01-14",
        type: "Payment",
        amount: "-₵150",
        description: "Credit Card Payment",
      },
      {
        date: "2024-01-12",
        type: "Deposit",
        amount: "+₵3,200",
        description: "Direct Deposit",
      },
      {
        date: "2024-01-08",
        type: "Purchase",
        amount: "-₵89",
        description: "Online Purchase",
      },
    ],
  },
  {
    id: 3,
    name: "Sarah Wilson",
    account: "ACC-2024-009012",
    products: ["Savings", "Investment"],
    balance: "₵120K",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "sarah.wilson@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Uptown",
    riskLevel: "Low",
    profitability: "₵5K/year",
    engagement: "92/100",
    lastActivity: "2024-01-16",
    joinDate: "2020-11-05",
    segment: "Premium",
    transactions: [
      {
        date: "2024-01-16",
        type: "Investment",
        amount: "+₵5,000",
        description: "Mutual Fund Purchase",
      },
      {
        date: "2024-01-13",
        type: "Transfer",
        amount: "+₵2,000",
        description: "Savings Transfer",
      },
      {
        date: "2024-01-09",
        type: "Dividend",
        amount: "+₵450",
        description: "Investment Dividend",
      },
    ],
  },
  {
    id: 4,
    name: "Michael Johnson",
    account: "ACC-2024-003456",
    products: ["Checking", "Savings"],
    balance: "₵35K",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "michael.johnson@email.com",
    phone: "+1 (555) 234-5678",
    address: "321 Elm St, Riverside",
    riskLevel: "Low",
    profitability: "₵1.8K/year",
    engagement: "78/100",
    lastActivity: "2024-01-13",
    joinDate: "2021-05-15",
    segment: "Standard",
    transactions: [
      {
        date: "2024-01-13",
        type: "Deposit",
        amount: "+₵1,800",
        description: "Salary Deposit",
      },
      {
        date: "2024-01-10",
        type: "Transfer",
        amount: "-₵300",
        description: "Bill Payment",
      },
      {
        date: "2024-01-07",
        type: "Deposit",
        amount: "+₵500",
        description: "Bonus",
      },
    ],
  },
  {
    id: 5,
    name: "Emily Davis",
    account: "ACC-2024-007890",
    products: ["Credit Card", "Loan"],
    balance: "₵28K",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    address: "654 Maple Ave, Hillside",
    riskLevel: "Medium",
    profitability: "₵1.2K/year",
    engagement: "65/100",
    lastActivity: "2024-01-12",
    joinDate: "2022-01-20",
    segment: "Standard",
    transactions: [
      {
        date: "2024-01-12",
        type: "Payment",
        amount: "-₵200",
        description: "Credit Card Payment",
      },
      {
        date: "2024-01-09",
        type: "Purchase",
        amount: "-₵150",
        description: "Grocery Shopping",
      },
      {
        date: "2024-01-06",
        type: "Deposit",
        amount: "+₵2,100",
        description: "Direct Deposit",
      },
    ],
  },
  {
    id: 6,
    name: "David Brown",
    account: "ACC-2024-001122",
    products: ["Investment", "Savings"],
    balance: "₵95K",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "david.brown@email.com",
    phone: "+1 (555) 456-7891",
    address: "987 Cedar Ln, Valley",
    riskLevel: "Low",
    profitability: "₵4.2K/year",
    engagement: "88/100",
    lastActivity: "2024-01-16",
    joinDate: "2019-09-12",
    segment: "Premium",
    transactions: [
      {
        date: "2024-01-16",
        type: "Investment",
        amount: "+₵3,500",
        description: "Stock Purchase",
      },
      {
        date: "2024-01-14",
        type: "Dividend",
        amount: "+₵320",
        description: "Quarterly Dividend",
      },
      {
        date: "2024-01-11",
        type: "Transfer",
        amount: "+₵1,000",
        description: "Savings Transfer",
      },
    ],
  },
  {
    id: 7,
    name: "Lisa Garcia",
    account: "ACC-2024-003344",
    products: ["Checking", "Credit Card", "Loan"],
    balance: "₵52K",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "lisa.garcia@email.com",
    phone: "+1 (555) 567-8901",
    address: "147 Birch St, Lakeside",
    riskLevel: "Low",
    profitability: "₵2.8K/year",
    engagement: "82/100",
    lastActivity: "2024-01-15",
    joinDate: "2020-07-08",
    segment: "Premium",
    transactions: [
      {
        date: "2024-01-15",
        type: "Deposit",
        amount: "+₵2,800",
        description: "Salary Deposit",
      },
      {
        date: "2024-01-13",
        type: "Payment",
        amount: "-₵180",
        description: "Loan Payment",
      },
      {
        date: "2024-01-10",
        type: "Purchase",
        amount: "-₵95",
        description: "Restaurant",
      },
    ],
  },
  {
    id: 8,
    name: "Robert Miller",
    account: "ACC-2024-005566",
    products: ["Savings"],
    balance: "₵18K",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "robert.miller@email.com",
    phone: "+1 (555) 678-9012",
    address: "258 Spruce Ave, Mountain",
    riskLevel: "High",
    profitability: "₵800/year",
    engagement: "45/100",
    lastActivity: "2024-01-08",
    joinDate: "2023-02-14",
    segment: "Standard",
    transactions: [
      {
        date: "2024-01-08",
        type: "Deposit",
        amount: "+₵1,200",
        description: "Part-time Income",
      },
      {
        date: "2024-01-05",
        type: "Withdrawal",
        amount: "-₵200",
        description: "Cash Withdrawal",
      },
      {
        date: "2024-01-02",
        type: "Deposit",
        amount: "+₵800",
        description: "Gift",
      },
    ],
  },
  {
    id: 9,
    name: "Jennifer Martinez",
    account: "ACC-2024-007788",
    products: ["Checking", "Savings", "Investment"],
    balance: "₵78K",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "jennifer.martinez@email.com",
    phone: "+1 (555) 789-0123",
    address: "369 Willow Dr, Garden",
    riskLevel: "Low",
    profitability: "₵3.5K/year",
    engagement: "90/100",
    lastActivity: "2024-01-16",
    joinDate: "2018-11-25",
    segment: "Premium",
    transactions: [
      {
        date: "2024-01-16",
        type: "Investment",
        amount: "+₵2,000",
        description: "ETF Purchase",
      },
      {
        date: "2024-01-14",
        type: "Deposit",
        amount: "+₵3,500",
        description: "Salary Deposit",
      },
      {
        date: "2024-01-12",
        type: "Transfer",
        amount: "-₵500",
        description: "Investment Transfer",
      },
    ],
  },
  {
    id: 10,
    name: "Christopher Lee",
    account: "ACC-2024-009900",
    products: ["Credit Card"],
    balance: "₵12K",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "christopher.lee@email.com",
    phone: "+1 (555) 890-1234",
    address: "741 Oakwood Ln, Forest",
    riskLevel: "High",
    profitability: "₵600/year",
    engagement: "38/100",
    lastActivity: "2024-01-07",
    joinDate: "2023-06-30",
    segment: "Standard",
    transactions: [
      {
        date: "2024-01-07",
        type: "Payment",
        amount: "-₵100",
        description: "Minimum Payment",
      },
      {
        date: "2024-01-04",
        type: "Purchase",
        amount: "-₵75",
        description: "Gas Station",
      },
      {
        date: "2024-01-01",
        type: "Purchase",
        amount: "-₵120",
        description: "Online Shopping",
      },
    ],
  },
  {
    id: 11,
    name: "Amanda Taylor",
    account: "****-****-****-1123",
    products: ["Savings", "Loan", "Credit Card"],
    balance: "₵67K",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "amanda.taylor@email.com",
    phone: "+1 (555) 901-2345",
    address: "852 Pinecrest Rd, Summit",
    riskLevel: "Low",
    profitability: "₵3.1K/year",
    engagement: "86/100",
    lastActivity: "2024-01-15",
    joinDate: "2020-03-18",
    segment: "Premium",
    transactions: [
      {
        date: "2024-01-15",
        type: "Deposit",
        amount: "+₵3,100",
        description: "Salary Deposit",
      },
      {
        date: "2024-01-13",
        type: "Payment",
        amount: "-₵250",
        description: "Loan Payment",
      },
      {
        date: "2024-01-10",
        type: "Purchase",
        amount: "-₵85",
        description: "Coffee Shop",
      },
    ],
  },
  {
    id: 12,
    name: "Daniel Anderson",
    account: "****-****-****-4455",
    products: ["Checking", "Investment"],
    balance: "₵89K",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "daniel.anderson@email.com",
    phone: "+1 (555) 012-3456",
    address: "963 Redwood Blvd, Canyon",
    riskLevel: "Low",
    profitability: "₵4.0K/year",
    engagement: "87/100",
    lastActivity: "2024-01-14",
    joinDate: "2019-12-05",
    segment: "Premium",
    transactions: [
      {
        date: "2024-01-14",
        type: "Investment",
        amount: "+₵4,000",
        description: "Bond Purchase",
      },
      {
        date: "2024-01-12",
        type: "Deposit",
        amount: "+₵3,800",
        description: "Salary Deposit",
      },
      {
        date: "2024-01-09",
        type: "Dividend",
        amount: "+₵280",
        description: "Monthly Dividend",
      },
    ],
  },
  {
    id: 13,
    name: "Rachel White",
    account: "****-****-****-6677",
    products: ["Savings", "Credit Card"],
    balance: "₵41K",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "rachel.white@email.com",
    phone: "+1 (555) 123-4568",
    address: "159 Aspen Way, Meadow",
    riskLevel: "Medium",
    profitability: "₵1.9K/year",
    engagement: "74/100",
    lastActivity: "2024-01-13",
    joinDate: "2021-10-12",
    segment: "Standard",
    transactions: [
      {
        date: "2024-01-13",
        type: "Deposit",
        amount: "+₵1,900",
        description: "Salary Deposit",
      },
      {
        date: "2024-01-10",
        type: "Purchase",
        amount: "-₵65",
        description: "Pharmacy",
      },
      {
        date: "2024-01-07",
        type: "Payment",
        amount: "-₵120",
        description: "Credit Card Payment",
      },
    ],
  },
  {
    id: 14,
    name: "Kevin Thompson",
    account: "****-****-****-8899",
    products: ["Checking", "Savings", "Loan"],
    balance: "₵55K",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "kevin.thompson@email.com",
    phone: "+1 (555) 234-5679",
    address: "357 Cypress Ct, Grove",
    riskLevel: "Low",
    profitability: "₵2.5K/year",
    engagement: "81/100",
    lastActivity: "2024-01-15",
    joinDate: "2020-08-20",
    segment: "Premium",
    transactions: [
      {
        date: "2024-01-15",
        type: "Deposit",
        amount: "+₵2,500",
        description: "Salary Deposit",
      },
      {
        date: "2024-01-12",
        type: "Payment",
        amount: "-₵220",
        description: "Loan Payment",
      },
      {
        date: "2024-01-09",
        type: "Transfer",
        amount: "+₵800",
        description: "Savings Transfer",
      },
    ],
  },
  {
    id: 15,
    name: "Michelle Clark",
    account: "****-****-****-0011",
    products: ["Investment", "Credit Card"],
    balance: "₵73K",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
    email: "michelle.clark@email.com",
    phone: "+1 (555) 345-6780",
    address: "468 Magnolia Dr, Park",
    riskLevel: "Low",
    profitability: "₵3.3K/year",
    engagement: "89/100",
    lastActivity: "2024-01-16",
    joinDate: "2019-04-15",
    segment: "Premium",
    transactions: [
      {
        date: "2024-01-16",
        type: "Investment",
        amount: "+₵3,300",
        description: "Index Fund Purchase",
      },
      {
        date: "2024-01-14",
        type: "Purchase",
        amount: "-₵45",
        description: "Bookstore",
      },
      {
        date: "2024-01-11",
        type: "Dividend",
        amount: "+₵195",
        description: "Quarterly Dividend",
      },
    ],
  },
];

const opportunities = [
  {
    customer: "John Smith",
    opportunity: "Cross-Sell: Mutual Fund",
    status: "Open",
    nextAction: "Call on Oct 7",
  },
  {
    customer: "Jane Doe",
    opportunity: "Upsell: Premium Credit Card",
    status: "In Progress",
    nextAction: "Send proposal",
  },
  {
    customer: "Sarah Wilson",
    opportunity: "Loan Refinancing",
    status: "Open",
    nextAction: "Schedule meeting",
  },
  {
    customer: "Michael Johnson",
    opportunity: "Investment Account Setup",
    status: "Open",
    nextAction: "Initial consultation",
  },
  {
    customer: "Emily Davis",
    opportunity: "Debt Consolidation",
    status: "In Progress",
    nextAction: "Review application",
  },
  {
    customer: "David Brown",
    opportunity: "Portfolio Review",
    status: "Open",
    nextAction: "Schedule review call",
  },
  {
    customer: "Lisa Garcia",
    opportunity: "Home Equity Loan",
    status: "Open",
    nextAction: "Property assessment",
  },
  {
    customer: "Robert Miller",
    opportunity: "Financial Planning",
    status: "Open",
    nextAction: "Needs assessment",
  },
  {
    customer: "Jennifer Martinez",
    opportunity: "Retirement Planning",
    status: "In Progress",
    nextAction: "Present options",
  },
  {
    customer: "Christopher Lee",
    opportunity: "Credit Improvement",
    status: "Open",
    nextAction: "Credit counseling",
  },
  {
    customer: "Amanda Taylor",
    opportunity: "Business Loan",
    status: "Open",
    nextAction: "Business plan review",
  },
  {
    customer: "Daniel Anderson",
    opportunity: "Tax Optimization",
    status: "In Progress",
    nextAction: "Tax strategy meeting",
  },
  {
    customer: "Rachel White",
    opportunity: "Emergency Fund Setup",
    status: "Open",
    nextAction: "Savings plan discussion",
  },
  {
    customer: "Kevin Thompson",
    opportunity: "Insurance Review",
    status: "Open",
    nextAction: "Coverage assessment",
  },
  {
    customer: "Michelle Clark",
    opportunity: "Estate Planning",
    status: "In Progress",
    nextAction: "Will and trust setup",
  },
];

const CustomerManagement = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<
    (typeof customers)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [leadsFilter, setLeadsFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [customerTypeFilter, setCustomerTypeFilter] = useState("all");

  const openCustomerModal = (customer: (typeof customers)[0]) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleSearch = () => {
    // Search is handled in real-time, but this could trigger additional search logic if needed
  };

  const handleClear = () => {
    setSearchTerm("");
    setLeadsFilter("all");
    setServiceFilter("all");
    setCustomerTypeFilter("all");
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLeads = leadsFilter === "all" || 
      (leadsFilter === "active" && customer.engagement.split("/")[0] > "80") ||
      (leadsFilter === "inactive" && customer.engagement.split("/")[0] <= "80");

    const matchesService = serviceFilter === "all" ||
      (serviceFilter === "banking" && customer.products.some(product => 
        ["Checking", "Savings"].includes(product))) ||
      (serviceFilter === "investment" && customer.products.some(product => 
        ["Investment", "Loan"].includes(product))) ||
      (serviceFilter === "credit" && customer.products.includes("Credit Card"));

    const matchesCustomerType = customerTypeFilter === "all" ||
      (customerTypeFilter === "premium" && customer.segment === "Premium") ||
      (customerTypeFilter === "standard" && customer.segment === "Standard") ||
      (customerTypeFilter === "high-risk" && customer.riskLevel === "High") ||
      (customerTypeFilter === "low-risk" && customer.riskLevel === "Low");

    return matchesSearch && matchesLeads && matchesService && matchesCustomerType;
  });

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <AppHeader>
            <SidebarTrigger />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-bold truncate">Customer Management</h1>
              <p className="text-xs md:text-sm text-muted-foreground truncate">
                Manage customer interactions and opportunities
              </p>
            </div>
          </AppHeader>

          {/* Content */}
          <div className="flex-1 p-3 md:p-6 space-y-4 md:space-y-6">
            {/* Search & Filter Section */}
            <Card className="shadow-lg border-2">
              <CardHeader className="pb-3 md:pb-4">
                <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                  <Search className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                  <span className="truncate">Customer Search & Filter</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-0">
                  {/* Search Input - Full width on mobile */}
                  <Input
                    placeholder="Search by name, phone, account..."
                    className="w-full h-10 md:h-11 text-sm md:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  
                  {/* Filters - Stack on mobile, flex on desktop */}
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                    <Select
                      value={leadsFilter}
                      onValueChange={setLeadsFilter}
                    >
                      <SelectTrigger className="w-full sm:w-32 md:w-40 h-10 md:h-11 text-sm md:text-base">
                        <SelectValue placeholder="All Leads" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Leads</SelectItem>
                        <SelectItem value="active">Active Leads</SelectItem>
                        <SelectItem value="inactive">Inactive Leads</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={serviceFilter}
                      onValueChange={setServiceFilter}
                    >
                      <SelectTrigger className="w-full sm:w-32 md:w-40 h-10 md:h-11 text-sm md:text-base">
                        <SelectValue placeholder="All Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Service</SelectItem>
                        <SelectItem value="banking">Banking</SelectItem>
                        <SelectItem value="investment">Investment</SelectItem>
                        <SelectItem value="credit">Credit Cards</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={customerTypeFilter}
                      onValueChange={setCustomerTypeFilter}
                    >
                      <SelectTrigger className="w-full sm:w-36 md:w-48 h-10 md:h-11 text-sm md:text-base">
                        <SelectValue placeholder="Customer Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="high-risk">High Risk</SelectItem>
                        <SelectItem value="low-risk">Low Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Action Buttons - Stack on mobile */}
                  <div className="flex flex-col sm:flex-row gap-2 md:gap-3 pt-2 md:pt-0">
                    <Button 
                      className="w-full sm:w-auto h-10 md:h-11 px-4 md:px-8 text-sm md:text-base" 
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto h-10 md:h-11 px-4 md:px-8 text-sm md:text-base"
                      onClick={handleClear}
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Cards */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-lg md:text-xl font-semibold">
                  Customers ({filteredCustomers.length})
                </h2>
                {filteredCustomers.length !== customers.length && (
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Showing {filteredCustomers.length} of {customers.length}{" "}
                    customers
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredCustomers.map((customer) => (
                  <Card
                    key={customer.id}
                    className="cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-2 hover:border-primary/50"
                    onClick={() => openCustomerModal(customer)}
                  >
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <Avatar className="h-12 w-12 md:h-16 md:w-16 border-2 border-primary/20 flex-shrink-0">
                          <AvatarImage src={customer.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-sm md:text-base">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="font-bold text-base md:text-lg truncate">
                                {customer.name}
                              </h3>
                              <p className="text-xs md:text-sm text-muted-foreground truncate">
                                {customer.account}
                              </p>
                            </div>
                            <Eye className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground hover:text-primary transition-colors flex-shrink-0 ml-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  customer.segment === "Premium"
                                    ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                                    : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
                                }`}
                              >
                                {customer.segment}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`text-xs ${
                                  customer.riskLevel === "Low"
                                    ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                                    : customer.riskLevel === "Medium"
                                    ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                                    : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                                }`}
                              >
                                {customer.riskLevel} Risk
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs md:text-sm">
                              <span className="text-muted-foreground">
                                Balance:
                              </span>
                              <span className="font-bold text-sm md:text-lg">
                                {customer.balance}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {customer.products.map((product, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {product}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Customer Detail Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
                <DialogHeader className="space-y-2 md:space-y-3">
                  <DialogTitle className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 self-start">
                      <AvatarImage src={selectedCustomer?.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold text-sm md:text-base">
                        {selectedCustomer?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h2 className="text-lg md:text-2xl font-bold truncate">
                        {selectedCustomer?.name}
                      </h2>
                      <p className="text-sm md:text-base text-muted-foreground truncate">
                        {selectedCustomer?.account}
                      </p>
                    </div>
                  </DialogTitle>
                  <DialogDescription className="text-sm md:text-base">
                    Complete customer profile and transaction history
                  </DialogDescription>
                </DialogHeader>

                {selectedCustomer && (
                  <div className="space-y-4 md:space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                      <Card>
                        <CardHeader className="pb-3 md:pb-4">
                          <CardTitle className="text-base md:text-lg flex items-center gap-2">
                            <User className="h-4 w-4 md:h-5 md:w-5" />
                            Personal Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 md:space-y-3">
                          <div className="flex items-center gap-2 md:gap-3">
                            <Mail className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs md:text-sm break-all">
                              {selectedCustomer.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3">
                            <Phone className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs md:text-sm">
                              {selectedCustomer.phone}
                            </span>
                          </div>
                          <div className="flex items-start gap-2 md:gap-3">
                            <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span className="text-xs md:text-sm">
                              {selectedCustomer.address}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 md:gap-3">
                            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-xs md:text-sm">
                              Joined:{" "}
                              {new Date(
                                selectedCustomer.joinDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3 md:pb-4">
                          <CardTitle className="text-base md:text-lg flex items-center gap-2">
                            <DollarSign className="h-4 w-4 md:h-5 md:w-5" />
                            Financial Overview
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 md:space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs md:text-sm text-muted-foreground">
                              Current Balance:
                            </span>
                            <span className="font-bold text-base md:text-lg">
                              {selectedCustomer.balance}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs md:text-sm text-muted-foreground">
                              Profitability:
                            </span>
                            <span className="font-semibold text-sm md:text-base">
                              {selectedCustomer.profitability}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs md:text-sm text-muted-foreground">
                              Engagement:
                            </span>
                            <span className="font-semibold text-sm md:text-base">
                              {selectedCustomer.engagement}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs md:text-sm text-muted-foreground">
                              Risk Level:
                            </span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                selectedCustomer.riskLevel === "Low"
                                  ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                                  : selectedCustomer.riskLevel === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                                  : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                              }`}
                            >
                              {selectedCustomer.riskLevel}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Products */}
                    <Card>
                      <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <CreditCard className="h-4 w-4 md:h-5 md:w-5" />
                          Active Products
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {selectedCustomer.products.map((product, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="px-2 py-1 md:px-3 text-xs md:text-sm"
                            >
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Customer Insights */}
                    <Card>
                      <CardHeader className="pb-3 md:pb-4">
                        <CardTitle className="text-base md:text-lg flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
                          Customer Insights
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 md:space-y-4">
                        <div className="p-3 md:p-4 rounded-lg border bg-muted/30">
                          <p className="text-xs md:text-sm">
                            <span className="font-bold">Risk Level:</span>{" "}
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                selectedCustomer.riskLevel === "Low"
                                  ? "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
                                  : selectedCustomer.riskLevel === "Medium"
                                  ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                                  : "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
                              }`}
                            >
                              {selectedCustomer.riskLevel}
                            </Badge>
                            {", "}
                            Profitability:{" "}
                            <span className="font-semibold">
                              {selectedCustomer.profitability}
                            </span>
                            , Engagement:{" "}
                            <span className="font-semibold">
                              {selectedCustomer.engagement}
                            </span>
                          </p>
                        </div>
                        <div className="p-3 md:p-4 rounded-lg border bg-muted/30">
                          <p className="text-xs md:text-sm">
                            <span className="font-bold">Last Activity:</span>{" "}
                            {new Date(
                              selectedCustomer.lastActivity
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="p-3 md:p-4 rounded-lg border bg-muted/30">
                          <p className="text-xs md:text-sm">
                            <span className="font-bold">Customer Segment:</span>{" "}
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                selectedCustomer.segment === "Premium"
                                  ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20"
                                  : "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
                              }`}
                            >
                              {selectedCustomer.segment}
                            </Badge>
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Lead & Opportunity Tracker */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Opportunities & Leads
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {opportunities
                            .filter(
                              (opp) => opp.customer === selectedCustomer.name
                            )
                            .map((opp, index) => (
                              <Card
                                key={index}
                                className="hover:shadow-md transition-all cursor-pointer border-2 hover:border-primary/50"
                              >
                                <CardContent className="p-4">
                                  <div className="space-y-3">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <h4 className="font-semibold text-sm mb-1">
                                          {opp.opportunity}
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                          {opp.customer}
                                        </p>
                                      </div>
                                      <Badge
                                        variant={
                                          opp.status === "Open"
                                            ? "default"
                                            : "secondary"
                                        }
                                        className="text-xs"
                                      >
                                        {opp.status}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <Calendar className="h-3 w-3" />
                                      <span>{opp.nextAction}</span>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          {opportunities.filter(
                            (opp) => opp.customer === selectedCustomer.name
                          ).length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <Target className="h-12 w-12 mx-auto mb-2 opacity-50" />
                              <p>No active opportunities for this customer</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CustomerManagement;
