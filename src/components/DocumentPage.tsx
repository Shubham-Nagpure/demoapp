import { useState } from "react";
import {
  FileText,
  Globe,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Building2,
  Target,
  Eye,
  Bell,
  User,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Download,
  Users,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Cloud,
  Sun,
  Shield,
  Folder,
  UserCheck,
  AlertCircleIcon,
} from "lucide-react";
import PageHeader from "./PageHeader";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  PieChart as RechartsPieChart,
  Cell,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import AnnualDocumentationCalendar from "./AnnualDocumentationCalendar";
import React from "react";
import { cn } from "./ui/utils";

// Entity data for the 6 main jurisdictions
const entityData = [
  {
    country: "USA",
    completion: 92,
    documents: 45,
    overdue: 2,
    status: "On Track",
    revenue: "$1.2B",
    taxRate: "21%",
    risk: "Low",
    position: { top: "33%", left: "21%" },
    color: "#FF5733",
    flows: ["Ireland", "Singapore"],
    tooltipPosition: "bottom", // 👈 New field
  },
  {
    country: "Ireland",
    completion: 67,
    documents: 38,
    overdue: 8,
    status: "Delayed",
    revenue: "$450M",
    taxRate: "12.5%",
    risk: "Medium",
    position: { top: "17%", left: "43%" },
    color: "#33FF57",
    flows: ["UK", "Singapore"],
    tooltipPosition: "bottom",
  },
  {
    country: "Singapore",
    completion: 34,
    documents: 28,
    overdue: 12,
    status: "At Risk",
    revenue: "$280M",
    taxRate: "17%",
    risk: "High",
    position: { top: "62%", left: "73%" },
    color: "#FF33A8",
    flows: ["Japan", "Australia"],
    tooltipPosition: "top",
  },
  {
    country: "Japan",
    completion: 78,
    documents: 32,
    overdue: 4,
    status: "On Track",
    revenue: "$320M",
    taxRate: "23.2%",
    risk: "Low",
    position: { top: "34%", left: "82%" },
    color: "#33A8FF",
    flows: ["USA"],
    tooltipPosition: "bottom",
  },
  {
    country: "Australia",
    completion: 88,
    documents: 25,
    overdue: 3,
    status: "On Track",
    revenue: "$180M",
    taxRate: "30%",
    risk: "Low",
    position: { top: "82%", left: "80%" },
    color: "#FFCC00",
    flows: ["Singapore"],
    tooltipPosition: "top", // 👈 Tooltip should appear on top for Australia
  },
  {
    country: "UK",
    completion: 55,
    documents: 41,
    overdue: 9,
    status: "At Risk",
    revenue: "$220M",
    taxRate: "19%",
    risk: "High",
    position: { top: "18%", left: "47%" },
    color: "#8E33FF",
    flows: ["Ireland"],
    tooltipPosition: "bottom",
  },
];

// Documentation progress over time
const monthlyProgressData = [
  {
    month: "Jan",
    USA: 85,
    Ireland: 45,
    Singapore: 20,
    Japan: 65,
    Australia: 75,
    UK: 40,
  },
  {
    month: "Feb",
    USA: 87,
    Ireland: 52,
    Singapore: 25,
    Japan: 68,
    Australia: 78,
    UK: 42,
  },
  {
    month: "Mar",
    USA: 89,
    Ireland: 58,
    Singapore: 28,
    Japan: 72,
    Australia: 82,
    UK: 45,
  },
  {
    month: "Apr",
    USA: 90,
    Ireland: 62,
    Singapore: 30,
    Japan: 74,
    Australia: 84,
    UK: 48,
  },
  {
    month: "May",
    USA: 91,
    Ireland: 65,
    Singapore: 32,
    Japan: 76,
    Australia: 86,
    UK: 52,
  },
  {
    month: "Jun",
    USA: 92,
    Ireland: 67,
    Singapore: 34,
    Japan: 78,
    Australia: 88,
    UK: 55,
  },
];

// Document type distribution
const documentTypeData = [
  { name: "Master File", value: 35, color: "#3b82f6", count: 73 },
  { name: "Local File", value: 28, color: "#10b981", count: 58 },
  { name: "CbCR", value: 20, color: "#f59e0b", count: 42 },
  { name: "Supporting Docs", value: 17, color: "#8b5cf6", count: 35 },
];

// Risk assessment breakdown
const riskBreakdownData = [
  { risk: "Low Risk", count: 3, percentage: 50, color: "#10b981" },
  { risk: "Medium Risk", count: 1, percentage: 17, color: "#f59e0b" },
  { risk: "High Risk", count: 2, percentage: 33, color: "#ef4444" },
];

// Compliance metrics by document type
const complianceMetrics = [
  {
    type: "Master File",
    USA: 95,
    Ireland: 85,
    Singapore: 40,
    Japan: 90,
    Australia: 95,
    UK: 70,
  },
  {
    type: "Local File",
    USA: 90,
    Ireland: 60,
    Singapore: 30,
    Japan: 75,
    Australia: 85,
    UK: 50,
  },
  {
    type: "CbCR",
    USA: 92,
    Ireland: 70,
    Singapore: 35,
    Japan: 80,
    Australia: 90,
    UK: 60,
  },
];

// Risk trend analysis data
const riskTrendData = [
  { month: "Oct", risk: 25 },
  { month: "Nov", risk: 29 },
  { month: "Dec", risk: 32 },
  { month: "Jan", risk: 35 },
  { month: "Feb", risk: 32 },
];

// Document repository categories
const documentCategories = [
  { name: "Master File", count: 6, status: "Complete", color: "#3b82f6" },
  { name: "Local Files", count: 12, status: "Complete", color: "#10b981" },
  { name: "CbCR Reports", count: 6, status: "Complete", color: "#06b6d4" },
  {
    name: "Benchmarking Analysis",
    count: 8,
    status: "Complete",
    color: "#8b5cf6",
  },
];

// Document repository table data
const documentTableData = [
  {
    entity: "US Operations Inc.",
    year: 2023,
    jurisdiction: "United States",
    documentType: "Master File",
    status: "Approved",
    owner: "John Smith",
  },
  {
    entity: "IE Holdings Ltd.",
    year: 2023,
    jurisdiction: "Ireland",
    documentType: "Local File",
    status: "Draft",
    owner: "Priya Patel",
  },
  {
    entity: "SG Services Pte.",
    year: 2023,
    jurisdiction: "Singapore",
    documentType: "CbCR",
    status: "Pending",
    owner: "Alex Chen",
  },
];

// Responsibility matrix data
const responsibilityMatrix = [
  { task: "Master File", john: true, priya: false, alex: false },
  { task: "Local File", john: false, priya: true, alex: false },
  { task: "CbCR", john: false, priya: false, alex: true },
  { task: "Benchmarking", john: true, priya: true, alex: false },
];

// Risk factors data
const riskFactors = [
  {
    icon: AlertTriangle,
    text: "Missing local documentation (2 entities)",
    color: "text-red-600",
  },
  {
    icon: Clock,
    text: "Approaching deadlines (4 filings)",
    color: "text-orange-600",
  },
  {
    icon: FileText,
    text: "Pending regulatory approvals (1 entity)",
    color: "text-blue-600",
  },
];

// Recommended actions
const recommendedActions = [
  "Prioritize UK and Ireland documentation",
  "Schedule Japan local counsel meeting",
  "Review resource allocation for Q1 deadlines",
];

// Key performance indicators
const kpiData = [
  {
    title: "Total Documentation",
    value: "69%",
    change: "+5.2%",
    trend: "up",
    icon: FileText,
    description: "Overall completion rate",
    color: "blue",
  },
  {
    title: "Active Entities",
    value: "6",
    change: "0",
    trend: "stable",
    icon: Building2,
    description: "Major jurisdictions",
    color: "emerald",
  },
  {
    title: "Documents Overdue",
    value: "38",
    change: "-12%",
    trend: "down",
    icon: Clock,
    description: "Pending submissions",
    color: "orange",
  },
  {
    title: "High Risk Entities",
    value: "2",
    change: "-1",
    trend: "down",
    icon: AlertTriangle,
    description: "Requiring attention",
    color: "red",
  },
];

// Annual calendar important dates - Comprehensive tax document deadlines
const importantDates = [
  // January
  {
    date: "2024-01-15",
    title: "US Master File Due",
    type: "deadline",
    country: "USA",
    urgency: "high",
    description: "Form 8975 Master File submission",
  },
  {
    date: "2024-01-31",
    title: "Ireland CbCR Filing",
    type: "deadline",
    country: "Ireland",
    urgency: "high",
    description: "Country-by-Country Report submission",
  },

  // February
  {
    date: "2024-02-15",
    title: "Singapore TP Documentation",
    type: "deadline",
    country: "Singapore",
    urgency: "medium",
    description: "Transfer Pricing documentation due",
  },
  {
    date: "2024-02-28",
    title: "UK Advance Pricing Agreement",
    type: "review",
    country: "UK",
    urgency: "medium",
    description: "APA annual review meeting",
  },

  // March
  {
    date: "2024-03-15",
    title: "Japan Local File Submission",
    type: "deadline",
    country: "Japan",
    urgency: "high",
    description: "Local File documentation filing",
  },
  {
    date: "2024-03-31",
    title: "Australia Tax Return Filing",
    type: "deadline",
    country: "Australia",
    urgency: "high",
    description: "Corporate income tax return",
  },
  {
    date: "2024-03-31",
    title: "UK Corporate Tax Return",
    type: "deadline",
    country: "UK",
    urgency: "high",
    description: "CT600 filing deadline",
  },

  // April
  {
    date: "2024-04-15",
    title: "US Tax Return Extension",
    type: "deadline",
    country: "USA",
    urgency: "medium",
    description: "Form 7004 extension filing",
  },
  {
    date: "2024-04-30",
    title: "Ireland Master File Update",
    type: "update",
    country: "Ireland",
    urgency: "medium",
    description: "Annual master file refresh",
  },

  // May
  {
    date: "2024-05-15",
    title: "Singapore CbCR Notification",
    type: "deadline",
    country: "Singapore",
    urgency: "high",
    description: "CbCR notification form submission",
  },
  {
    date: "2024-05-31",
    title: "Japan Transfer Pricing Study",
    type: "review",
    country: "Japan",
    urgency: "medium",
    description: "Annual TP study review",
  },

  // June
  {
    date: "2024-06-15",
    title: "US Federal Tax Return",
    type: "deadline",
    country: "USA",
    urgency: "high",
    description: "Form 1120 corporate return filing",
  },
  {
    date: "2024-06-30",
    title: "Australia TP Documentation",
    type: "deadline",
    country: "Australia",
    urgency: "medium",
    description: "Transfer pricing documentation",
  },
  {
    date: "2024-06-30",
    title: "Global BEPS Action 13",
    type: "deadline",
    country: "Global",
    urgency: "high",
    description: "Master File and Local File submissions",
  },

  // July
  {
    date: "2024-07-15",
    title: "Ireland Local File Due",
    type: "deadline",
    country: "Ireland",
    urgency: "high",
    description: "Local File documentation submission",
  },
  {
    date: "2024-07-31",
    title: "UK TP Documentation",
    type: "deadline",
    country: "UK",
    urgency: "medium",
    description: "Transfer pricing documentation filing",
  },

  // August
  {
    date: "2024-08-15",
    title: "Singapore Substance Review",
    type: "review",
    country: "Singapore",
    urgency: "low",
    description: "Economic substance compliance review",
  },
  {
    date: "2024-08-31",
    title: "Japan CbCR Filing",
    type: "deadline",
    country: "Japan",
    urgency: "high",
    description: "Country-by-Country Report submission",
  },

  // September
  {
    date: "2024-09-15",
    title: "US State Tax Returns",
    type: "deadline",
    country: "USA",
    urgency: "medium",
    description: "Multiple state tax return filings",
  },
  {
    date: "2024-09-30",
    title: "Australia Annual Compliance",
    type: "deadline",
    country: "Australia",
    urgency: "high",
    description: "Annual compliance statement",
  },

  // October
  {
    date: "2024-10-15",
    title: "UK CbCR Filing",
    type: "deadline",
    country: "UK",
    urgency: "high",
    description: "Country-by-Country Report submission",
  },
  {
    date: "2024-10-31",
    title: "Ireland Substance Reporting",
    type: "deadline",
    country: "Ireland",
    urgency: "medium",
    description: "Economic substance reporting",
  },

  // November
  {
    date: "2024-11-15",
    title: "Japan Master File Review",
    type: "review",
    country: "Japan",
    urgency: "medium",
    description: "Master File annual review",
  },
  {
    date: "2024-11-30",
    title: "Singapore Annual Return",
    type: "deadline",
    country: "Singapore",
    urgency: "high",
    description: "Corporate annual return filing",
  },

  // December
  {
    date: "2024-12-15",
    title: "Global TP Policy Update",
    type: "update",
    country: "Global",
    urgency: "medium",
    description: "Transfer pricing policy refresh",
  },
  {
    date: "2024-12-31",
    title: "Year-End Documentation",
    type: "deadline",
    country: "Global",
    urgency: "high",
    description: "Year-end compliance documentation",
  },

  // Additional quarterly deadlines
  {
    date: "2024-03-31",
    title: "Q1 Intercompany Agreements",
    type: "review",
    country: "Global",
    urgency: "medium",
    description: "Quarterly agreement review",
  },
  {
    date: "2024-06-30",
    title: "Q2 TP Benchmarking",
    type: "review",
    country: "Global",
    urgency: "medium",
    description: "Semi-annual benchmarking update",
  },
  {
    date: "2024-09-30",
    title: "Q3 Compliance Check",
    type: "review",
    country: "Global",
    urgency: "medium",
    description: "Third quarter compliance review",
  },
  {
    date: "2024-12-31",
    title: "Q4 Annual Finalization",
    type: "deadline",
    country: "Global",
    urgency: "high",
    description: "Annual documentation finalization",
  },
];

// Upcoming deadlines (next 30 days)
const getUpcomingDeadlines = () => {
  const today = new Date();
  const thirtyDaysFromNow = new Date(today);
  thirtyDaysFromNow.setDate(today.getDate() + 30);

  return importantDates
    .filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= today && itemDate <= thirtyDaysFromNow;
    })
    .map((item) => ({
      ...item,
      daysLeft: Math.ceil(
        (new Date(item.date).getTime() - today.getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft);
};

export default function DocumentPage() {
  const [selectedEntity, setSelectedEntity] = useState("all");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState("Month");

  const upcomingDeadlines = getUpcomingDeadlines();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-800 border-green-200";
      case "Delayed":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "At Risk":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-500";
      case "Medium":
        return "bg-orange-500";
      case "High":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case "down":
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-400"></div>;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deadline":
        return <AlertCircle className="w-4 h-4" />;
      case "review":
        return <Eye className="w-4 h-4" />;
      case "update":
        return <Activity className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const yearDropdown = (
    <Select value={selectedYear} onValueChange={setSelectedYear}>
      <SelectTrigger className="w-20 h-8 text-sm border-gray-300 bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="2024">2024</SelectItem>
        <SelectItem value="2023">2023</SelectItem>
        <SelectItem value="2022">2022</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className="h-full overflow-auto bg-gray-50">
      <PageHeader
        title="Cloud Documents"
        titleHighlight="Cloud"
        module="document"
        icon={FileText}
        rightComponent={yearDropdown}
      />

      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const IconComponent = kpi.icon;
            const getIconColor = (color: string) => {
              switch (color) {
                case "blue":
                  return "bg-blue-100 text-blue-600";
                case "emerald":
                  return "bg-emerald-100 text-emerald-600";
                case "orange":
                  return "bg-orange-100 text-orange-600";
                case "red":
                  return "bg-red-100 text-red-600";
                default:
                  return "bg-gray-100 text-gray-600";
              }
            };

            return (
              <Card
                key={index}
                className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconColor(
                        kpi.color
                      )} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div
                      className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                        kpi.trend === "up"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : kpi.trend === "down"
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "bg-gray-50 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {getTrendIcon(kpi.trend)}
                      <span className="font-semibold">{kpi.change}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm text-gray-600 font-medium">
                      {kpi.title}
                    </h3>
                    <p className="text-2xl text-gray-900 font-bold">
                      {kpi.value}
                    </p>
                    <p className="text-xs text-gray-500">{kpi.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Risk Assessment Summary and Risk Trend Analysis */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Risk Assessment Summary */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <span>Risk Assessment Summary</span>
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Current risk status across entities
              </p>
            </CardHeader>
            <CardContent>
              {/* Risk level indicators */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-red-50 rounded-lg border border-red-100">
                  <div className="text-2xl font-bold text-red-600 mb-1">2</div>
                  <div className="text-xs text-red-600">High Risk</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    1
                  </div>
                  <div className="text-xs text-orange-600">Medium Risk</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    3
                  </div>
                  <div className="text-xs text-green-600">Low Risk</div>
                </div>
              </div>

              {/* Key Risk Factors */}
              <div className="space-y-3">
                {riskFactors.map((factor, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <factor.icon className={`w-4 h-4 ${factor.color}`} />
                    <span className="text-gray-700">{factor.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Trend Analysis */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span>Risk Trend Analysis</span>
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Monthly risk trend indicators
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={riskTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                      domain={[0, 40]}
                    />
                    <RechartsTooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
                              <p className="text-sm font-medium text-gray-900">
                                {label}
                              </p>
                              <p className="text-sm text-blue-600">
                                Risk:{" "}
                                <span className="font-bold">
                                  {payload[0].value}
                                </span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: "#3b82f6" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500">
                  Trending down since December peak
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Repository & Team Responsibilities */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Document Repository */}
          <Card className="xl:col-span-2 bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
                <Folder className="w-5 h-5 text-purple-600" />
                <span>Document Repository</span>
              </CardTitle>
              <p className="text-gray-600 text-sm">
                Comprehensive document tracking and status
              </p>
            </CardHeader>
            <CardContent>
              {/* Document Categories */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {documentCategories.map((category, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg text-center"
                  >
                    <FileText
                      className="w-4 h-4 mx-auto mb-1"
                      style={{ color: category.color }}
                    />
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      {category.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {category.count} files
                    </div>
                  </div>
                ))}
              </div>

              {/* Document Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left pb-3 font-medium text-gray-700">
                        Entity
                      </th>
                      <th className="text-left pb-3 font-medium text-gray-700">
                        Type
                      </th>
                      <th className="text-left pb-3 font-medium text-gray-700">
                        Status
                      </th>
                      <th className="text-left pb-3 font-medium text-gray-700">
                        Owner
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentTableData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 text-gray-900">{row.entity}</td>
                        <td className="py-3 text-gray-600">
                          {row.documentType}
                        </td>
                        <td className="py-3">
                          <Badge
                            className={`text-xs ${
                              row.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : row.status === "Draft"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {row.status}
                          </Badge>
                        </td>
                        <td className="py-3 text-gray-600">{row.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Responsibility Matrix */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-indigo-600" />
                <span>Team Responsibilities</span>
              </CardTitle>
              <p className="text-gray-600 text-sm">Task ownership matrix</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Team Members */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mb-1">
                      <span className="text-xs font-bold text-blue-600">
                        JS
                      </span>
                    </div>
                    <span className="text-gray-600">John</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mb-1">
                      <span className="text-xs font-bold text-purple-600">
                        PP
                      </span>
                    </div>
                    <span className="text-gray-600">Priya</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mb-1">
                      <span className="text-xs font-bold text-green-600">
                        AC
                      </span>
                    </div>
                    <span className="text-gray-600">Alex</span>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="space-y-3">
                  {responsibilityMatrix.map((row, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-gray-100"
                    >
                      <span className="text-sm font-medium text-gray-900">
                        {row.task}
                      </span>
                      <div className="flex space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            row.john ? "bg-blue-500" : "bg-gray-200"
                          }`}
                        ></div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            row.priya ? "bg-purple-500" : "bg-gray-200"
                          }`}
                        ></div>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            row.alex ? "bg-green-500" : "bg-gray-200"
                          }`}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Global Entity Documentation Map */}
        <Card
          className="bg-white border-0 shadow-sm"
          style={{ height: "700px" }}
        >
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-gray-900 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <span>Global Entity Documentation Status</span>
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Interactive map showing compliance status across jurisdictions
            </p>
          </CardHeader>
          <CardContent style={{ height: "574px" }}>
            <div
              className="relative rounded-xl h-96 overflow-hidden mb-6 bg-white"
              style={{ height: "550px" }}
            >
              {/* World map background */}
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    backgroundImage: `url("src/assets/blue-map-world-with-word-world-it.jpg")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>

              {/* Risk-based entity bubbles positioned on map */}
              {entityData.map((entity) => {
                const bubbleSize = "w-16 h-16"; // Optional: make dynamic based on completion or risk

                return (
                  <div
                    key={entity.country}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{
                      top: entity.position.top,
                      left: entity.position.left,
                      zIndex: 10,
                    }}
                  >
                    {/* Bubble with completion and country */}
                    <div className="flex flex-col items-center space-y-2">
                      {/* Completion % */}
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-white/20">
                        <span className="text-sm font-semibold text-gray-800">
                          {entity.completion}%
                        </span>
                      </div>

                      {/* Country Bubble */}
                      <div
                        className={`${bubbleSize} rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative backdrop-blur-sm`}
                        style={{
                          backgroundColor: entity.color,
                          border: "4px solid white",
                          boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)`,
                          opacity: 0.92,
                        }}
                      >
                        <span className="text-white text-lg font-semibold">
                          {entity.country.slice(0, 2).toUpperCase()}
                        </span>

                        {/* Pulse Ring */}
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-15"
                          style={{
                            backgroundColor: entity.color,
                            animationDuration: "4s",
                            animationIterationCount: "infinite",
                          }}
                        />
                      </div>

                      {/* Country Label */}
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm border border-white/20">
                        <span className="text-xs font-medium text-gray-700">
                          {entity.country}
                        </span>
                      </div>
                    </div>

                    {/* Hover Tooltip */}
                    <div
                      className={cn(
                        "absolute left-1/2 transform -translate-x-1/2 mb-2 z-99 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                        entity.tooltipPosition === "bottom"
                          ? "top-full"
                          : "bottom-full"
                      )}
                      style={{ marginTop: "7px", zIndex: "999"}}
                    >
                      <div className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-3 rounded-lg shadow-xl border border-gray-200 text-sm whitespace-nowrap min-w-[200px]">
                        <div className="font-semibold text-gray-900 mb-1">
                          {entity.country}
                        </div>

                        <div className="text-xs text-gray-600 mb-2">
                          Status:{" "}
                          <span className="font-medium">{entity.status}</span> •
                          Risk:{" "}
                          <span className="font-medium">{entity.risk}</span>
                        </div>

                        <div className="text-xs space-y-1">
                          <div>
                            Documents:{" "}
                            <span className="font-medium">
                              {entity.documents}
                            </span>{" "}
                          </div>
                          <div>
                            Completion:{" "}
                            <span className="text-green-600">
                              {entity.completion}%
                            </span>
                          </div>
                          <div>
                            Overdue:{" "}
                            <span className="font-medium text-red-600">
                              {entity.overdue}
                            </span>
                          </div>
                        </div>

                        {/* Tooltip arrow */}
                        <div
                          className={cn(
                            "absolute left-1/2 transform -translate-x-1/2",
                            entity.tooltipPosition === "bottom"
                              ? "bottom-full"
                              : "top-full"
                          )}
                        >
                          <div className="border-4 border-transparent border-t-white/95"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Entity Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entityData.map((entity, index) => (
            <Card
              key={entity.country}
              className="relative overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <CardContent className="p-6">
                {/* Header with country and status/risk badge */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {entity.country}
                  </h3>
                  <Badge
                    className={`text-xs px-3 py-1 rounded-full border flex items-center space-x-1 ${getStatusColor(
                      entity.status
                    )}`}
                  >
                    {entity.status === "On Track" && (
                      <CheckCircle className="w-3 h-3" />
                    )}
                    {entity.status === "Delayed" && (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    {entity.status === "At Risk" && (
                      <AlertTriangle className="w-3 h-3" />
                    )}
                    <span>{entity.risk} Risk</span>
                  </Badge>
                </div>

                {/* Completion Progress */}
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-1">Completion</div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="h-2 rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${entity.completion}%`,
                          backgroundColor: entity.color,
                        }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-900">
                      {entity.completion}%
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Revenue</div>
                    <div className="font-bold text-gray-900">
                      {entity.revenue}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Tax Rate</div>
                    <div className="font-bold text-gray-900">
                      {entity.taxRate}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Documents</div>
                    <div className="font-bold text-gray-900">
                      {entity.documents}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-1">Overdue</div>
                    <div
                      className={`font-bold ${
                        entity.overdue > 5 ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {entity.overdue}
                    </div>
                  </div>
                </div>

                {/* Subtle gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${entity.color}20 0%, transparent 50%)`,
                  }}
                ></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Annual Documentation Calendar */}
        <AnnualDocumentationCalendar />
      </div>
    </div>
  );
}
