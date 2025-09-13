import { useState } from "react";
import {
  TrendingUp,
  Shield,
  FileCheck,
  Activity,
  ExternalLink,
  Globe,
  BarChart3,
  Filter,
  MoreHorizontal,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  PieChart as lucidePieChart,
} from "lucide-react";
import PageHeader from "./PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

// Main Dashboard Metrics Data
const mainMetrics = [
  {
    title: "Group Profit",
    value: 478,
    unit: "M",
    change: 12.3,
    trend: "up",
    icon: TrendingUp,
    color: "blue",
  },
  {
    title: "Operating Margin",
    value: 7.7,
    unit: "%",
    change: -0.8,
    trend: "down",
    icon: BarChart3,
    color: "green",
  },
  {
    title: "Company ETR",
    value: 22.1,
    unit: "%",
    change: -1.2,
    trend: "down",
    icon: FileCheck,
    color: "purple",
  },
  {
    title: "Peer Group ETR",
    value: 18.0,
    unit: "%",
    change: 0.5,
    trend: "up",
    icon: Globe,
    color: "orange",
  },
];

// Group Profit by Region Data
const groupProfitByRegion = [
  { region: "North America", profit: 165, color: "#6366f1" },
  { region: "Europe", profit: 142, color: "#8b5cf6" },
  { region: "Asia Pacific", profit: 108, color: "#06b6d4" },
  { region: "Latin America", profit: 35, color: "#10b981" },
  { region: "Other", profit: 28, color: "#f59e0b" },
];

// ETR by Region Data
const etrByRegion = [
  { region: "North America", etr: 24.5, color: "#6366f1" },
  { region: "Europe", etr: 19.2, color: "#8b5cf6" },
  { region: "Asia Pacific", etr: 21.8, color: "#06b6d4" },
  { region: "Latin America", etr: 26.3, color: "#10b981" },
  { region: "Other", etr: 22.1, color: "#f59e0b" },
];

// Operational Status Distribution
const operationalDistribution = [
  { name: "Manufacturing", value: 374.82, color: "#6366f1" },
  { name: "Distribution", value: 241.6, color: "#8b5cf6" },
  { name: "IP Licensing", value: 213.42, color: "#06b6d4" },
];

// TP Status Integration-style Data
const tpStatusList = [
  {
    name: "Transfer Pricing Compliance",
    type: "High Priority",
    rate: 82,
    profit: 650.0,
    icon: "⚠️",
    color: "#f59e0b",
  },
  {
    name: "Defense Cases",
    type: "Active Monitoring",
    rate: 68,
    profit: 820.5,
    icon: "🛡️",
    color: "#6366f1",
  },
  {
    name: "APA Management",
    type: "Renewal Required",
    rate: 45,
    profit: 432.25,
    icon: "📋",
    color: "#10b981",
  },
];

// Weekly TP Activity Data
const weeklyActivity = [
  { day: "Sun", value: 0 },
  { day: "Mon", value: 2150 },
  { day: "Tue", value: 3874 },
  { day: "Wed", value: 1820 },
  { day: "Thu", value: 2940 },
  { day: "Fri", value: 3200 },
  { day: "Sat", value: 1100 },
];

function formatCurrency(value: number, compact = true): string {
  if (compact && value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(1)}B`;
  } else if (compact && value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  return `$${value.toLocaleString()}`;
}

interface DashboardProps {
  onNavigate?: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const [timeframe, setTimeframe] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);

  const getIconColor = (color: string) => {
    const colorMap = {
      blue: "text-blue-600 bg-blue-50",
      green: "text-green-600 bg-green-50",
      purple: "text-purple-600 bg-purple-50",
      orange: "text-orange-600 bg-orange-50",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      <PageHeader
        title="TP Executive Dashboard"
        module="dashboard"
        icon={lucidePieChart}
        rightComponent={
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Oct 18 - Nov 18</span>
            </div>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-28 h-9 bg-white border-gray-200 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="h-9 bg-white border-gray-200 rounded-xl"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 bg-white border-gray-200 rounded-xl"
            >
              Export
            </Button>
          </div>
        }
      />

      <div className="px-6 py-6 space-y-6 max-w-7xl mx-auto">
        {/* Main Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card
                key={index}
                className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconColor(
                        metric.color
                      )}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 font-medium">
                      {metric.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {metric.unit === "M"
                          ? `$${metric.value}${metric.unit}`
                          : `${metric.value}${metric.unit}`}
                      </span>
                      <div
                        className={`flex items-center text-sm font-medium ${
                          metric.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {metric.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 mr-1" />
                        )}
                        {Math.abs(metric.change)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Group Profit Overview */}
          <Card className="lg:col-span-2 bg-white border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                  Group Profit Overview
                </CardTitle>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-gray-900">
                    $478.51M
                  </span>
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    12.8% ↗ +$54.30 increased
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-white border-gray-200"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-white border-gray-200"
                >
                  Sort
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={groupProfitByRegion}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="region"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis hide />
                  <Bar dataKey="profit" radius={[4, 4, 0, 0]} barSize={40}>
                    {groupProfitByRegion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                {groupProfitByRegion.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-xs text-gray-600">
                      {item.region.split(" ")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* TP Activity */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gray-600" />
                  TP Activity
                </CardTitle>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl font-bold text-gray-900">
                    24,473
                  </span>
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    8.3% ↗ +749 increased
                  </span>
                </div>
              </div>
              <Select defaultValue="weekly">
                <SelectTrigger className="w-20 h-8 bg-white border-gray-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Week</SelectItem>
                  <SelectItem value="monthly">Month</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="pt-2">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={weeklyActivity}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <Bar dataKey="value" radius={[3, 3, 0, 0]} fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                {weeklyActivity.map((day, index) => (
                  <span key={index}>{day.day}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Operational Distribution */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
              <div>
                <CardTitle className="text-xl text-gray-900">
                  Operational Distribution
                </CardTitle>
              </div>
              <Select defaultValue="month">
                <SelectTrigger className="w-20 h-9 bg-white border-gray-200 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="quarter">Quarter</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {/* Values Row */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">
                    Manufacturing
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    $374.82
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Distribution</div>
                  <div className="text-2xl font-bold text-gray-900">$241.6</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">IP Licensing</div>
                  <div className="text-2xl font-bold text-gray-900">
                    $213.42
                  </div>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="flex justify-center">
                <div className="relative w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={operationalDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={75}
                        startAngle={90}
                        endAngle={450}
                        dataKey="value"
                        stroke="none"
                      >
                        <Cell fill="url(#gradient1)" />
                        <Cell fill="#8B5CF6" />
                        <Cell fill="#06B6D4" />
                      </Pie>
                      <defs>
                        <linearGradient
                          id="gradient1"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#6366F1" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TP Status List */}
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg text-gray-900">
                  TP Status Overview
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-blue-green hover:text-primary-blue-green/80"
              >
                See All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4 text-xs text-gray-500 font-medium uppercase tracking-wider pb-2 border-b border-gray-100">
                  <span>Application</span>
                  <span>Type</span>
                  <span>Rate</span>
                  <span>Profit</span>
                </div>
                {tpStatusList.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 items-center py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <span className="text-sm">{item.icon}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{item.type}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.rate}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.rate}%
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ${item.profit}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Intelligence Section */}
        <Card className="bg-white border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">
              Strategic Intelligence
            </CardTitle>
            <p className="text-sm text-gray-600">
              Key insights and trend analysis
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                onClick={() => onNavigate?.("defend")}
              >
                <FileCheck className="w-6 h-6" />
                <span className="font-medium">Pepsi Australia Case</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                onClick={() => onNavigate?.("research")}
              >
                <TrendingUp className="w-6 h-6" />
                <span className="font-medium">Audit Trends</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Button>
              <Button
                variant="outline"
                className="h-20 flex flex-col gap-2 bg-orange-50 hover:bg-orange-100 border-orange-200 text-orange-700"
                onClick={() => onNavigate?.("research")}
              >
                <Shield className="w-6 h-6" />
                <span className="font-medium">APA Trends</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
