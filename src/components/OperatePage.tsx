import { useState, useRef } from "react";
import PageHeader from "./PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import RulesSettingCalculator from "./RulesSettingCalculator";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  XCircle,
  Search,
  Filter,
  ArrowRight,
  Edit3,
  Trash2,
  Download,
  Eye,
  Settings,
  RefreshCw,
  Zap,
  Calculator,
  PieChart,
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Percent,
  Target,
  Shield,
  FileCheck,
  PlayCircle,
  ChevronRight,
  ChevronLeft,
  Info,
  Plus,
  MousePointer,
  Layers,
  GitBranch,
  Activity,
} from "lucide-react";
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
} from "recharts";

interface OperateStep {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  isActive: boolean;
  hasAccent?: boolean;
}

interface FileUpload {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "processed" | "error" | "pending";
  uploadDate: string;
  errors?: string[];
}

interface ValidationError {
  id: string;
  field: string;
  value: string;
  error: string;
  severity: "high" | "medium" | "low";
  suggestion: string;
}

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  type: string;
  status: "mapped" | "unmapped" | "review";
}

interface AllocationMethod {
  id: string;
  name: string;
  description: string;
  percentage: number;
  entities: { name: string; allocation: number }[];
}

interface ComplianceControl {
  id: string;
  name: string;
  description: string;
  status: "complete" | "pending" | "in-review";
  required: boolean;
}

export default function OperatePage() {
  const [activeStep, setActiveStep] = useState("data-ingestion");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [validationFilter, setValidationFilter] = useState("all");
  const [issueFilter, setIssueFilter] = useState("all");
  const [selectedAllocation, setSelectedAllocation] = useState("sales");
  const [markupRate, setMarkupRate] = useState(5);
  const [royaltyRate, setRoyaltyRate] = useState(3);
  const [managementFeeRate, setManagementFeeRate] = useState(2);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const operateSteps: OperateStep[] = [
    {
      id: "data-ingestion",
      title: "Data Ingestion",
      subtitle: "Upload and validate data files...",
      icon: Upload,
      isActive: activeStep === "data-ingestion",
      hasAccent: activeStep === "data-ingestion",
    },
    {
      id: "data-validation",
      title: "Data Validation",
      subtitle: "Review and clean data quality...",
      icon: FileCheck,
      isActive: activeStep === "data-validation",
    },
    {
      id: "error-resolution",
      title: "Error Resolution",
      subtitle: "Resolve flagged data issues...",
      icon: AlertTriangle,
      isActive: activeStep === "error-resolution",
    },
    {
      id: "transaction-mapping",
      title: "Transaction Mapping",
      subtitle: "Map intercompany transactions...",
      icon: GitBranch,
      isActive: activeStep === "transaction-mapping",
    },
    {
      id: "cost-allocation",
      title: "Compliance Check",
      subtitle: "Configure allocation methods...",
      icon: PieChart,
      isActive: activeStep === "cost-allocation",
    },
    {
      id: "ic-charges",
      title: "Adjustment Mechanism",
      subtitle: "Calculate charges and adjustments...",
      icon: Calculator,
      isActive: activeStep === "ic-charges",
    },
    {
      id: "reporting-dashboard",
      title: "Reporting & Dashboard",
      subtitle: "Generate final reports and export...",
      icon: BarChart3,
      isActive: activeStep === "reporting-dashboard",
    },
  ];

  // Mock data
  const uploadedFiles: FileUpload[] = [
    {
      id: "1",
      name: "financial_data_2024.xlsx",
      size: "2.4 MB",
      type: "Excel",
      status: "processed",
      uploadDate: "2024-01-15 14:30",
    },
    {
      id: "2",
      name: "intercompany_transactions.csv",
      size: "1.8 MB",
      type: "CSV",
      status: "error",
      uploadDate: "2024-01-15 14:32",
      errors: [
        "Missing entity codes in rows 145-167",
        "Invalid date format in column C",
      ],
    },
    {
      id: "3",
      name: "entity_master_data.json",
      size: "0.9 MB",
      type: "JSON",
      status: "pending",
      uploadDate: "2024-01-15 14:35",
    },
  ];

  const validationErrors: ValidationError[] = [
    {
      id: "1",
      field: "Misc Column",
      value: "RESOLVED",
      error: "Previous data integrity issues resolved",
      severity: "low",
      suggestion: "Misc column data cleaned and redistributed",
    },
    {
      id: "2",
      field: "Cross-Entity Validation",
      value: "Japan Opex",
      error: "Minor allocation variance detected",
      severity: "low",
      suggestion: "Verify cost allocation method consistency",
    },
    {
      id: "3",
      field: "Currency Standardization",
      value: "All Entities",
      error: "Currency conversion completed",
      severity: "low",
      suggestion: "Exchange rates applied for fiscal period",
    },
    {
      id: "4",
      field: "Data Completeness",
      value: "100%",
      error: "All required fields populated",
      severity: "low",
      suggestion: "Data validation passed - ready for processing",
    },
  ];

  const flaggedIssues = [
    {
      id: "1",
      title: "Duplicate Transaction Records",
      description: "Found 23 potential duplicate transactions",
      severity: "high",
      status: "open",
      affectedRecords: 23,
    },
    {
      id: "2",
      title: "Missing Functional Currency",
      description: "Entity records missing functional currency data",
      severity: "medium",
      status: "resolved",
      affectedRecords: 8,
    },
    {
      id: "3",
      title: "Inconsistent Date Formats",
      description: "Mixed date formats across transaction files",
      severity: "low",
      status: "ignored",
      affectedRecords: 156,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      from: "US HQ",
      to: "Ireland IP Co",
      amount: 2500000,
      type: "Royalty Payment",
      status: "mapped",
    },
    {
      id: "2",
      from: "Ireland IP Co",
      to: "Singapore MfgCo",
      amount: 1800000,
      type: "License Fee",
      status: "mapped",
    },
    {
      id: "3",
      from: "Singapore MfgCo",
      to: "Germany Distributor",
      amount: 3200000,
      type: "Product Sale",
      status: "review",
    },
    {
      id: "4",
      from: "Germany Distributor",
      to: "US HQ",
      amount: 890000,
      type: "Management Fee",
      status: "unmapped",
    },
  ];

  const allocationMethods: AllocationMethod[] = [
    {
      id: "sales",
      name: "Sales Revenue",
      description: "Allocate based on revenue contribution",
      percentage: 100,
      entities: [
        { name: "US HQ", allocation: 35 },
        { name: "Germany", allocation: 28 },
        { name: "Ireland", allocation: 20 },
        { name: "Singapore", allocation: 17 },
      ],
    },
    {
      id: "headcount",
      name: "Employee Headcount",
      description: "Allocate based on number of employees",
      percentage: 100,
      entities: [
        { name: "US HQ", allocation: 45 },
        { name: "Germany", allocation: 25 },
        { name: "Ireland", allocation: 15 },
        { name: "Singapore", allocation: 15 },
      ],
    },
    {
      id: "assets",
      name: "Asset Base",
      description: "Allocate based on asset values",
      percentage: 100,
      entities: [
        { name: "US HQ", allocation: 40 },
        { name: "Germany", allocation: 30 },
        { name: "Ireland", allocation: 18 },
        { name: "Singapore", allocation: 12 },
      ],
    },
  ];

  const complianceControls: ComplianceControl[] = [
    {
      id: "1",
      name: "Master File Documentation",
      description: "Ensure all required master file sections are complete",
      status: "complete",
      required: true,
    },
    {
      id: "2",
      name: "Local File Requirements",
      description: "Verify local file compliance for all jurisdictions",
      status: "pending",
      required: true,
    },
    {
      id: "3",
      name: "Economic Analysis Validation",
      description: "Validate economic analysis methodologies",
      status: "in-review",
      required: true,
    },
    {
      id: "4",
      name: "Benchmarking Study Updates",
      description: "Ensure benchmarking studies are current",
      status: "complete",
      required: false,
    },
    {
      id: "5",
      name: "Supporting Documentation",
      description: "Collect and organize supporting documents",
      status: "pending",
      required: true,
    },
  ];

  const dashboardData = {
    etrSummary: [
      { entity: "US HQ", etr: 21.5, target: 22.0, status: "good" },
      { entity: "Ireland IP", etr: 12.3, target: 12.5, status: "good" },
      { entity: "Singapore Mfg", etr: 17.8, target: 17.0, status: "warning" },
      { entity: "Germany Dist", etr: 28.5, target: 30.0, status: "good" },
    ],
    netProfitAllocation: [
      { entity: "US HQ", profit: 45.2, percentage: 35 },
      { entity: "Ireland IP", profit: 32.8, percentage: 25 },
      { entity: "Singapore Mfg", profit: 28.1, percentage: 22 },
      { entity: "Germany Dist", profit: 23.4, percentage: 18 },
    ],
    documentationStatus: [
      { name: "Complete", value: 68, color: "#10b981" },
      { name: "In Progress", value: 25, color: "#f59e0b" },
      { name: "Not Started", value: 7, color: "#ef4444" },
    ],
  };

  const handleStepChange = (stepId: string) => {
    setActiveStep(stepId);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const getFileStatusColor = (status: string) => {
    switch (status) {
      case "processed":
        return "bg-green-100 text-green-800 border-green-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleFileUpload = () => {
    // Navigate to Data Validation step
    setActiveStep("data-validation");
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case "data-ingestion":
        return (
          <div className="space-y-6">
            {/* File Upload Card */}
            <Card className="border-2 border-dashed border-blue-200 bg-blue-50/30 hover:border-blue-300 transition-colors">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 bg-blue-100 rounded-full">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Upload Data Files
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Drag and drop your files here or click to browse.
                      Supported formats: Excel, CSV, JSON
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Button onClick={handleFileUpload} variant="login">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".xlsx,.xls,.csv,.json"
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Files List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Uploaded Files</span>
                  <Badge variant="outline">{uploadedFiles.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {file.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {file.type} • {file.size} • {file.uploadDate}
                          </div>
                          {file.errors && (
                            <div className="text-sm text-red-600 mt-1">
                              {file.errors.map((error, idx) => (
                                <div key={idx}>• {error}</div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getFileStatusColor(file.status)}>
                          {file.status === "processed" && (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          )}
                          {file.status === "error" && (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {file.status === "pending" && (
                            <Clock className="w-3 h-3 mr-1" />
                          )}
                          {file.status}
                        </Badge>
                        {file.status === "error" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Fix
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "data-validation":
        return (
          <div className="space-y-6">
            {/* Validation Controls */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Data Validation Results
                </h3>
                <p className="text-sm text-gray-600">
                  Review and resolve data quality issues
                </p>
              </div>
              <Button
                variant="login"
                onClick={() => handleStepChange("error-resolution")}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Resolve Errors
              </Button>
            </div>

            {/* Data Ingested - Financial Summary Table */}
            <Card className="border-0 shadow-sm bg-white">
              <CardHeader className="pb-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-900">
                        Data Ingested - Financial Summary
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Comprehensive financial data across all entities (USD
                        millions)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Processed
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-orange-600 border-orange-200"
                    >
                      <AlertTriangle className="w-3 h-3 mr-1" />4 Issues
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="text-left py-4 px-6 font-medium text-gray-900 min-w-[200px]">
                          Financial Line Items
                        </th>
                        <th className="text-center py-4 px-4 font-medium text-gray-900 min-w-[110px]">
                          <div className="flex flex-col items-center">
                            <span>USA</span>
                            <span className="text-xs text-gray-500 font-normal">
                              USD
                            </span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-4 font-medium text-gray-900 min-w-[110px]">
                          <div className="flex flex-col items-center">
                            <span>Ireland</span>
                            <span className="text-xs text-gray-500 font-normal">
                              EUR
                            </span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-4 font-medium text-gray-900 min-w-[110px]">
                          <div className="flex flex-col items-center">
                            <span>China</span>
                            <span className="text-xs text-gray-500 font-normal">
                              CNY
                            </span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-4 font-medium text-gray-900 min-w-[110px]">
                          <div className="flex flex-col items-center">
                            <span>Singapore</span>
                            <span className="text-xs text-gray-500 font-normal">
                              SGD
                            </span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-4 font-medium text-gray-900 min-w-[110px]">
                          <div className="flex flex-col items-center">
                            <span>Australia</span>
                            <span className="text-xs text-gray-500 font-normal">
                              AUD
                            </span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-4 font-medium text-gray-900 min-w-[110px]">
                          <div className="flex flex-col items-center">
                            <span>UK</span>
                            <span className="text-xs text-gray-500 font-normal">
                              GBP
                            </span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-4 font-medium text-gray-900 min-w-[110px]">
                          <div className="flex flex-col items-center">
                            <span>Japan</span>
                            <span className="text-xs text-gray-500 font-normal">
                              JPY
                            </span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-4 font-medium text-orange-700 min-w-[110px] bg-orange-50 border-l border-orange-200">
                          <div className="flex flex-col items-center">
                            <span className="flex items-center">
                              Misc
                              <AlertTriangle className="w-3 h-3 ml-1 text-orange-600" />
                            </span>
                            <span className="text-xs text-orange-600 font-normal">
                              Issues
                            </span>
                          </div>
                        </th>
                        <th className="text-center py-4 px-4 font-medium text-blue-900 min-w-[120px] bg-blue-50 border-l border-blue-200">
                          <div className="flex flex-col items-center">
                            <span>Total</span>
                            <span className="text-xs text-blue-600 font-normal">
                              USD (M)
                            </span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {/* Sales / Income Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50/30">
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                            Sales / Income
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          5.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          8.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          82.5
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          82.5
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          100.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          100.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          100.0
                        </td>
                        <td className="py-4 px-4 text-center bg-orange-50 border-l border-orange-200">
                          <div className="flex items-center justify-center">
                            <span className="text-orange-700 font-medium">
                              50.0
                            </span>
                            <AlertTriangle className="w-3 h-3 ml-1 text-orange-600" />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-blue-900 bg-blue-50 border-l border-blue-200">
                          478.0
                        </td>
                      </tr>

                      {/* Management Fees Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors bg-gray-50/20">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50/30">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 text-blue-600 mr-2" />
                            Management Fees
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          105.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400 bg-orange-50 border-l border-orange-200">
                          —
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-blue-900 bg-blue-50 border-l border-blue-200">
                          105.0
                        </td>
                      </tr>

                      {/* Cost of Goods Sold Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50/30">
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 text-red-600 mr-2" />
                            Cost of Goods Sold
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          -30.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          -30.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          -55.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          -55.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          -55.0
                        </td>
                        <td className="py-4 px-4 text-center bg-orange-50 border-l border-orange-200">
                          <div className="flex items-center justify-center">
                            <span className="text-orange-700 font-medium">
                              -50.0
                            </span>
                            <AlertTriangle className="w-3 h-3 ml-1 text-orange-600" />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-blue-900 bg-blue-50 border-l border-blue-200">
                          -225.0
                        </td>
                      </tr>

                      {/* Gross Profit Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors bg-green-50/30 border-l-4 border-green-500">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-green-50/50">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 text-green-600 mr-2" />
                            Gross Profit
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          110.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          8.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          52.5
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          52.5
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          45.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          45.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          45.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400 bg-orange-50 border-l border-orange-200">
                          —
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-green-700 bg-green-100 border-l border-green-200">
                          358.0
                        </td>
                      </tr>

                      {/* Management Fees (Operating) Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50/30">
                          <div className="flex items-center">
                            <Settings className="w-4 h-4 text-blue-600 mr-2" />
                            Management Fees (Operating)
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          100.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          21.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          21.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          21.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          21.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          21.0
                        </td>
                        <td className="py-4 px-4 text-center bg-orange-50 border-l border-orange-200">
                          <div className="flex items-center justify-center">
                            <span className="text-orange-700 font-medium">
                              40.0
                            </span>
                            <AlertTriangle className="w-3 h-3 ml-1 text-orange-600" />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-blue-900 bg-blue-50 border-l border-blue-200">
                          245.0
                        </td>
                      </tr>

                      {/* License Fees Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors bg-gray-50/20">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50/30">
                          <div className="flex items-center">
                            <FileCheck className="w-4 h-4 text-purple-600 mr-2" />
                            License Fees
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          5.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          4.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          4.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400 bg-orange-50 border-l border-orange-200">
                          —
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-blue-900 bg-blue-50 border-l border-blue-200">
                          13.0
                        </td>
                      </tr>

                      {/* Operating Expenses Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50/30">
                          <div className="flex items-center">
                            <Activity className="w-4 h-4 text-orange-600 mr-2" />
                            Operating Expenses
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          20.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          20.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          21.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          21.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          21.0
                        </td>
                        <td className="py-4 px-4 text-center bg-orange-50 border-l border-orange-200">
                          <div className="flex items-center justify-center">
                            <span className="text-orange-700 font-medium">
                              -40.0
                            </span>
                            <AlertTriangle className="w-3 h-3 ml-1 text-orange-600" />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-blue-900 bg-blue-50 border-l border-blue-200">
                          63.0
                        </td>
                      </tr>

                      {/* Net Profit Before Tax Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors bg-blue-50/30 border-l-4 border-blue-500">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-blue-50/50">
                          <div className="flex items-center">
                            <Target className="w-4 h-4 text-blue-600 mr-2" />
                            Net Profit Before Tax
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          10.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          3.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          7.5
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          7.5
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          3.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          3.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900 font-medium">
                          3.0
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400 bg-orange-50 border-l border-orange-200">
                          —
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-blue-700 bg-blue-100 border-l border-blue-200">
                          37.0
                        </td>
                      </tr>

                      {/* Tax Rate Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors bg-gray-50/20">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50/30">
                          <div className="flex items-center">
                            <Percent className="w-4 h-4 text-gray-600 mr-2" />
                            Tax Rate
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          21.0%
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          12.5%
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          25.0%
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          17.0%
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          30.0%
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          25.0%
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          30.0%
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400 bg-orange-50 border-l border-orange-200">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400 bg-blue-50 border-l border-blue-200">
                          —
                        </td>
                      </tr>

                      {/* Net Profit After Tax Row */}
                      <tr className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-900 bg-gray-50/30">
                          <div className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                            Net Profit After Tax
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          2.1
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          0.4
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          1.9
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          1.3
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          0.9
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          0.8
                        </td>
                        <td className="py-4 px-4 text-center text-gray-900">
                          0.9
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400 bg-orange-50 border-l border-orange-200">
                          —
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-blue-900 bg-blue-50 border-l border-blue-200">
                          8.2
                        </td>
                      </tr>

                      {/* ETR Row */}
                      <tr className="bg-gray-100/50 border-t-2 border-gray-200">
                        <td className="py-4 px-6 font-bold text-gray-900 bg-gray-100">
                          <div className="flex items-center">
                            <Calculator className="w-4 h-4 text-indigo-600 mr-2" />
                            Effective Tax Rate (ETR)
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400">
                          —
                        </td>
                        <td className="py-4 px-4 text-center text-gray-400 bg-orange-50 border-l border-orange-200">
                          —
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-indigo-900 bg-indigo-100 border-l border-indigo-200">
                          22.1%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Summary Statistics */}
                <div className="border-t border-gray-200 bg-gray-50 p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Total Revenue</div>
                      <div className="text-lg font-bold text-blue-600">
                        $478.0M
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Gross Profit</div>
                      <div className="text-lg font-bold text-green-600">
                        $358.0M
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Net Profit</div>
                      <div className="text-lg font-bold text-blue-600">
                        $8.2M
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Data Issues</div>
                      <div className="text-lg font-bold text-orange-600">
                        4 Items
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resolution Status */}
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Step 2 Errors Resolved:</strong> Previous Misc column
                inconsistencies have been successfully cleaned and
                redistributed. Data integrity restored with 100% validation pass
                rate.
              </AlertDescription>
            </Alert>
          </div>
        );

      case "error-resolution":
        return (
          <div className="space-y-6">
            {/* Resolution Status Alert */}
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Previous Issues Resolved:</strong> Misc column data
                inconsistencies and validation errors from previous steps have
                been successfully addressed. System integrity maintained at
                98.5% compliance.
              </AlertDescription>
            </Alert>

            {/* Resolution Detail */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Active Resolution Details
              </h3>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span>System Resolution Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-sm text-green-800 mb-2">
                        <strong>Success:</strong> Previous data validation
                        errors have been automatically resolved
                      </div>
                      <div className="text-sm text-green-700">
                        • Misc column data redistributed correctly • Currency
                        standardization completed • Entity code formatting
                        applied
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-medium text-gray-900">
                        Resolution Methods Applied:
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center p-2 bg-gray-50 rounded text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                          <span>
                            Auto-fix Entity Codes: 23 records standardized
                          </span>
                        </div>
                        <div className="flex items-center p-2 bg-gray-50 rounded text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                          <span>
                            Currency Standardization: All amounts converted to
                            USD
                          </span>
                        </div>
                        <div className="flex items-center p-2 bg-gray-50 rounded text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mr-2" />
                          <span>
                            Data Validation: Missing functional currency
                            populated
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-sm text-blue-800 mb-2">
                        <strong>Next Steps:</strong> Ready to proceed to
                        Transaction Mapping
                      </div>
                      <div className="text-sm text-blue-700">
                        All data quality issues resolved. System ready for
                        intercompany transaction processing.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-2">
                <Button className="bg-green-600 hover:bg-green-700" disabled>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  All Issues Resolved
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Resolution Report
                </Button>
              </div>
            </div>

            {/* Resolved Financial Data Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  <span>Error Resolution - Corrected Financial Data</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Resolved
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900 min-w-[180px]">
                          Particulars
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          USA
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Ireland
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          China
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Singapore
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Australia
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          UK
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Japan
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Sales / Income
                        </td>
                        <td className="p-4 text-right text-gray-900">5</td>
                        <td className="p-4 text-right text-gray-900">8</td>
                        <td className="p-4 text-right text-gray-900">82.5</td>
                        <td className="p-4 text-right text-gray-900">82.5</td>
                        <td className="p-4 text-right text-gray-900">100</td>
                        <td className="p-4 text-right text-gray-900">100</td>
                        <td className="p-4 text-right text-gray-900">100</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          478
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Management Fees
                        </td>
                        <td className="p-4 text-right text-gray-900">105</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          105
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Cost of Goods Sold
                        </td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-900">-30</td>
                        <td className="p-4 text-right text-gray-900">-30</td>
                        <td className="p-4 text-right text-gray-900">-55</td>
                        <td className="p-4 text-right text-gray-900">-55</td>
                        <td className="p-4 text-right text-gray-900">-55</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          -225
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Gross Profit
                        </td>
                        <td className="p-4 text-right text-gray-900">110</td>
                        <td className="p-4 text-right text-gray-900">8</td>
                        <td className="p-4 text-right text-gray-900">52.5</td>
                        <td className="p-4 text-right text-gray-900">52.5</td>
                        <td className="p-4 text-right text-gray-900">45</td>
                        <td className="p-4 text-right text-gray-900">45</td>
                        <td className="p-4 text-right text-gray-900">45</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          358
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Management Fees
                        </td>
                        <td className="p-4 text-right text-gray-900">100</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          205
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          License Fees
                        </td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-900">5</td>
                        <td className="p-4 text-right text-gray-900">4</td>
                        <td className="p-4 text-right text-gray-900">4</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          13
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">Opex</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-900">20</td>
                        <td className="p-4 text-right text-gray-900">20</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          103
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Net Profit Before Tax
                        </td>
                        <td className="p-4 text-right text-gray-900">10</td>
                        <td className="p-4 text-right text-gray-900">3</td>
                        <td className="p-4 text-right text-gray-900">7.5</td>
                        <td className="p-4 text-right text-gray-900">7.5</td>
                        <td className="p-4 text-right text-gray-900">3</td>
                        <td className="p-4 text-right text-gray-900">3</td>
                        <td className="p-4 text-right text-gray-900">3</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          37
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Tax Rate
                        </td>
                        <td className="p-4 text-right text-gray-900">21%</td>
                        <td className="p-4 text-right text-gray-900">12.5%</td>
                        <td className="p-4 text-right text-gray-900">25%</td>
                        <td className="p-4 text-right text-gray-900">17%</td>
                        <td className="p-4 text-right text-gray-900">30%</td>
                        <td className="p-4 text-right text-gray-900">25%</td>
                        <td className="p-4 text-right text-gray-900">30%</td>
                        <td className="p-4 text-right text-gray-400"></td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Net Profit After Tax
                        </td>
                        <td className="p-4 text-right text-gray-900">2.1</td>
                        <td className="p-4 text-right text-gray-900">0.375</td>
                        <td className="p-4 text-right text-gray-900">1.875</td>
                        <td className="p-4 text-right text-gray-900">1.275</td>
                        <td className="p-4 text-right text-gray-900">0.9</td>
                        <td className="p-4 text-right text-gray-900">0.75</td>
                        <td className="p-4 text-right text-gray-900">0.9</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          8.175
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">ETR</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          22.1%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "transaction-mapping":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Transaction Mapping
                </h3>
                <p className="text-sm text-gray-600">
                  Map intercompany transactions between entities
                </p>
              </div>
              <Button variant="login">
                <Plus className="w-4 h-4 mr-2" />
                Add Mapping
              </Button>
            </div>

            {/* Transfer Pricing Rules Calculator */}
            <RulesSettingCalculator />
          </div>
        );

      case "cost-allocation":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Compliance Check
              </h3>
              <p className="text-sm text-gray-600">
                Compliance analysis with transfer pricing recommendations
              </p>
            </div>

            {/* Compliance Check Table */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Compliance Check Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 relative">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900 min-w-[180px]">
                          Particulars
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          USA
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Ireland
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          China
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Singapore
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Australia
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          UK
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Japan
                        </th>
                        <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Sales / Income
                        </td>
                        <td className="p-4 text-right text-gray-900">5</td>
                        <td className="p-4 text-right text-gray-900">8</td>
                        <td className="p-4 text-right text-gray-900">82.5</td>
                        <td className="p-4 text-right text-gray-900">82.5</td>
                        <td className="p-4 text-right text-gray-900">100</td>
                        <td className="p-4 text-right text-gray-900">100</td>
                        <td className="p-4 text-right text-gray-900">100</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          478
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Management Fees
                        </td>
                        <td className="p-4 text-right text-gray-900">105</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          105
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Cost of Goods Sold
                        </td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-900">-30</td>
                        <td className="p-4 text-right text-gray-900">-30</td>
                        <td className="p-4 text-right text-gray-900">-55</td>
                        <td className="p-4 text-right text-gray-900">-55</td>
                        <td className="p-4 text-right text-gray-900">-55</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          -225
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Gross Profit
                        </td>
                        <td className="p-4 text-right text-gray-900">110</td>
                        <td className="p-4 text-right text-gray-900">8</td>
                        <td className="p-4 text-right text-gray-900">52.5</td>
                        <td className="p-4 text-right text-gray-900">52.5</td>
                        <td className="p-4 text-right text-gray-900">45</td>
                        <td className="p-4 text-right text-gray-900">45</td>
                        <td className="p-4 text-right text-gray-900">45</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          358
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Management Fees
                        </td>
                        <td className="p-4 text-right text-gray-900">100</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-red-600 bg-red-50">
                          21
                        </td>
                        <td className="p-4 text-right text-red-600 bg-red-50">
                          21
                        </td>
                        <td className="p-4 text-right text-red-600 bg-red-50">
                          21
                        </td>
                        <td className="p-4 text-right text-red-600 bg-red-50">
                          21
                        </td>
                        <td className="p-4 text-right text-red-600 bg-red-50">
                          21
                        </td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          205
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          License Fees
                        </td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-900">5</td>
                        <td className="p-4 text-right text-gray-900">4</td>
                        <td className="p-4 text-right text-gray-900">4</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          13
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">Opex</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-900">20</td>
                        <td className="p-4 text-right text-gray-900">20</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right text-gray-900">21</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          103
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Net Profit Before Tax
                        </td>
                        <td className="p-4 text-right text-gray-900">10</td>
                        <td className="p-4 text-right text-gray-900">3</td>
                        <td className="p-4 text-right text-gray-900">7.5</td>
                        <td className="p-4 text-right text-gray-900">7.5</td>
                        <td className="p-4 text-right text-red-600 bg-red-50">
                          3
                        </td>
                        <td className="p-4 text-right text-red-600 bg-red-50">
                          3
                        </td>
                        <td className="p-4 text-right text-red-600 bg-red-50">
                          3
                        </td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          37
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Tax Rate
                        </td>
                        <td className="p-4 text-right text-gray-900">21%</td>
                        <td className="p-4 text-right text-gray-900">12.5%</td>
                        <td className="p-4 text-right text-gray-900">25%</td>
                        <td className="p-4 text-right text-gray-900">17%</td>
                        <td className="p-4 text-right text-gray-900">30%</td>
                        <td className="p-4 text-right text-gray-900">25%</td>
                        <td className="p-4 text-right text-gray-900">30%</td>
                        <td className="p-4 text-right text-gray-400"></td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">
                          Net Profit After Tax
                        </td>
                        <td className="p-4 text-right text-gray-900">2.1</td>
                        <td className="p-4 text-right text-gray-900">0.375</td>
                        <td className="p-4 text-right text-gray-900">1.875</td>
                        <td className="p-4 text-right text-gray-900">1.275</td>
                        <td className="p-4 text-right text-gray-900">0.9</td>
                        <td className="p-4 text-right text-gray-900">0.75</td>
                        <td className="p-4 text-right text-gray-900">0.9</td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          8.175
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">ETR</td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right text-gray-400"></td>
                        <td className="p-4 text-right font-bold text-gray-900">
                          22.1%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Recommendations Section */}
                <div className="border-t border-gray-200 bg-green-50 p-6">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Recommendations
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-green-100">
                        <tr>
                          <th className="text-left p-3 font-medium text-gray-900 min-w-[180px]">
                            Particulars
                          </th>
                          <th className="text-right p-3 font-medium text-gray-900 min-w-[100px]">
                            USA
                          </th>
                          <th className="text-right p-3 font-medium text-gray-900 min-w-[100px]">
                            Ireland
                          </th>
                          <th className="text-right p-3 font-medium text-gray-900 min-w-[100px]">
                            China
                          </th>
                          <th className="text-right p-3 font-medium text-gray-900 min-w-[100px]">
                            Singapore
                          </th>
                          <th className="text-right p-3 font-medium text-gray-900 min-w-[100px]">
                            Australia
                          </th>
                          <th className="text-right p-3 font-medium text-gray-900 min-w-[100px]">
                            UK
                          </th>
                          <th className="text-right p-3 font-medium text-gray-900 min-w-[100px]">
                            Japan
                          </th>
                          <th className="text-right p-3 font-medium text-gray-900 min-w-[100px]">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-3 font-medium text-gray-900">
                            Management Fees
                          </td>
                          <td className="p-3 text-right text-gray-400"></td>
                          <td className="p-3 text-right text-gray-400"></td>
                          <td className="p-3 text-right text-green-600 font-medium">
                            +21
                          </td>
                          <td className="p-3 text-right text-green-600 font-medium">
                            -84
                          </td>
                          <td className="p-3 text-right text-green-600 font-medium">
                            +21
                          </td>
                          <td className="p-3 text-right text-green-600 font-medium">
                            +21
                          </td>
                          <td className="p-3 text-right text-green-600 font-medium">
                            +21
                          </td>
                          <td className="p-3 text-right text-gray-400"></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-gray-900">
                            Net Profit Before Tax
                          </td>
                          <td className="p-3 text-right text-gray-400"></td>
                          <td className="p-3 text-right text-gray-400"></td>
                          <td className="p-3 text-right text-gray-400"></td>
                          <td className="p-3 text-right text-gray-400"></td>
                          <td className="p-3 text-right text-green-600 font-medium">
                            -1
                          </td>
                          <td className="p-3 text-right text-green-600 font-medium">
                            -1
                          </td>
                          <td className="p-3 text-right text-green-600 font-medium">
                            -1
                          </td>
                          <td className="p-3 text-right text-gray-400"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                <span className="text-sm text-gray-700">
                  Non-compliant values requiring adjustment
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                <span className="text-sm text-gray-700">
                  Recommended adjustments
                </span>
              </div>
            </div>
          </div>
        );

      case "ic-charges":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Adjustment Mechanism
              </h3>
              <p className="text-sm text-gray-600">
                Comprehensive P&L analysis with transfer pricing recommendations
              </p>
            </div>

            {/* Wide Data Table with Sticky Headers */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <span>Adjustment Mechanism Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative overflow-auto max-h-[600px]">
                  <table className="w-full min-w-[1200px]">
                    {/* Sticky Header */}
                    <thead className="bg-white sticky top-0 z-20 shadow-sm">
                      <tr className="border-b">
                        <th className="sticky left-0 z-30 bg-white text-left p-3 font-medium text-gray-900 min-w-[180px] border-r">
                          Particulars
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          USA
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          Ireland
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          China
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          Singapore
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          Australia
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          UK
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          Japan
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px] border-l-2 border-blue-200">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* P&L Rows */}
                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Sales / Income
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          6.93
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          11.55
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          78.75
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          231
                        </td>
                        <td className="p-3 text-right text-gray-900">100</td>
                        <td className="p-3 text-right text-gray-900">100</td>
                        <td className="p-3 text-right text-gray-900">100</td>
                        <td className="p-3 text-right font-bold text-gray-900 border-l-2 border-blue-200">
                          628.23
                        </td>
                      </tr>

                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-medium text-gray-900 border-r">
                          Management Fees
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          105
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          105
                        </td>
                      </tr>

                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Cost of Goods Sold
                        </td>
                        <td className="p-3 text-right text-gray-400"></td>
                        <td className="p-3 text-right text-gray-400"></td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          -75
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          -78.75
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          -77
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          -77
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          -77
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900 border-l-2 border-blue-200">
                          -384.75
                        </td>
                      </tr>

                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25 font-medium">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-bold text-gray-900 border-r">
                          Gross Profit
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          111.93
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          3.75
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          152.25
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          23
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          23
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          23
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          336.93
                        </td>
                      </tr>

                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Management Fees
                        </td>
                        <td className="p-3 text-right text-gray-900">100</td>
                        <td className="p-3 text-right text-gray-400"></td>
                        <td className="p-3 text-right text-gray-900">21</td>
                        <td className="p-3 text-right text-gray-900">21</td>
                        <td className="p-3 text-right text-gray-900">21</td>
                        <td className="p-3 text-right text-gray-900">21</td>
                        <td className="p-3 text-right text-gray-900">21</td>
                        <td className="p-3 text-right font-bold text-gray-900 border-l-2 border-blue-200">
                          18.48
                        </td>
                      </tr>

                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-medium text-gray-900 border-r">
                          License Fees
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 bg-green-100 font-medium">
                          6.93
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 bg-green-100 font-medium">
                          11.55
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25"></td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          0
                        </td>
                      </tr>

                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Opex
                        </td>
                        <td className="p-3 text-right text-gray-400"></td>
                        <td className="p-3 text-right text-gray-400"></td>
                        <td className="p-3 text-right text-gray-400"></td>
                        <td className="p-3 text-right text-gray-900">25</td>
                        <td className="p-3 text-right text-gray-900">21</td>
                        <td className="p-3 text-right text-gray-900">21</td>
                        <td className="p-3 text-right text-gray-900">21</td>
                        <td className="p-3 text-right font-bold text-gray-900 border-l-2 border-blue-200">
                          88
                        </td>
                      </tr>

                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25 font-medium">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-bold text-gray-900 border-r">
                          Net Profit Before Tax
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          11.93
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          4.62
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          3.75
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          10.7
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          2
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          2
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium bg-green-100">
                          2
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          37
                        </td>
                      </tr>

                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Tax Rate
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          25%
                        </td>
                        <td className="p-3 text-right text-gray-900">12.5%</td>
                        <td className="p-3 text-right text-gray-900">25%</td>
                        <td className="p-3 text-right text-gray-900 bg-green-100 font-medium">
                          5%
                        </td>
                        <td className="p-3 text-right text-gray-900">30%</td>
                        <td className="p-3 text-right text-gray-900">25%</td>
                        <td className="p-3 text-right text-gray-900">30%</td>
                        <td className="p-3 text-right text-gray-400 border-l-2 border-blue-200"></td>
                      </tr>

                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-medium text-gray-900 border-r">
                          Net Profit After Tax
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 bg-green-100 font-medium">
                          2.9825
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 bg-green-100 font-medium">
                          0.5775
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 bg-green-100 font-medium">
                          0.9375
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 bg-green-100 font-medium">
                          0.535
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 bg-green-100 font-medium">
                          0.6
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 bg-green-100 font-medium">
                          0.5
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 bg-green-100 font-medium">
                          0.6
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          6.7325
                        </td>
                      </tr>

                      {/* ETR Row with special highlighting */}
                      <tr className="h-10 border-b hover:bg-gray-50 bg-orange-50">
                        <td className="sticky left-0 z-10 bg-orange-50 p-3 font-bold text-gray-900 border-r">
                          <span>ETR</span>
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-orange-50"></td>
                        <td className="p-3 text-right text-gray-400 bg-orange-50"></td>
                        <td className="p-3 text-right text-gray-400 bg-orange-50"></td>
                        <td className="p-3 text-right text-gray-400 bg-orange-50"></td>
                        <td className="p-3 text-right text-gray-400 bg-orange-50"></td>
                        <td className="p-3 text-right text-gray-400 bg-orange-50"></td>
                        <td className="p-3 text-right text-gray-400 bg-orange-50"></td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-orange-50 border-l-2 border-blue-200">
                          18.2%
                        </td>
                      </tr>

                      {/* Recommended TP Adjustment Rows */}
                      <tr
                        className="h-10 border-b hover:bg-blue-50 bg-blue-25 cursor-pointer group"
                        onClick={() =>
                          setExpandedRow(
                            expandedRow === "mfg-fee" ? null : "mfg-fee"
                          )
                        }
                      >
                        <td className="sticky left-0 z-10 bg-blue-25 p-3 font-bold text-blue-800 border-r">
                          <div className="flex items-center space-x-2">
                            <span>Recommended TP Adj – Mfg Fee</span>
                            <ChevronRight
                              className={`w-4 h-4 text-blue-600 transition-transform ${
                                expandedRow === "mfg-fee" ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </td>
                        <td className="p-3 text-right bg-blue-25 text-red-600 font-medium">
                          <div className="flex items-center justify-end space-x-1">
                            <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                            <span>-12</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-blue-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-blue-25 text-green-600 font-medium">
                          <div className="flex items-center justify-end space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span>+8</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-blue-25 text-green-600 font-medium">
                          <div className="flex items-center justify-end space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span>+21</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-blue-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-blue-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-blue-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-blue-25 font-bold text-blue-800 border-l-2 border-blue-200">
                          +17
                        </td>
                      </tr>

                      {expandedRow === "mfg-fee" && (
                        <tr className="bg-blue-50 border-b">
                          <td colSpan={9} className="p-4">
                            <div className="text-sm text-blue-800">
                              <p className="font-medium mb-2">
                                Manufacturing Fee Adjustment Details:
                              </p>
                              <ul className="list-disc list-inside space-y-1 text-blue-700">
                                <li>
                                  USA: Reduce by $12M to align with benchmark
                                  range of 8-12%
                                </li>
                                <li>
                                  China: Increase by $8M to meet minimum
                                  profitability requirements
                                </li>
                                <li>
                                  Singapore: Increase by $21M to optimize global
                                  ETR while maintaining compliance
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}

                      <tr
                        className="h-10 border-b hover:bg-yellow-50 bg-yellow-25 cursor-pointer group"
                        onClick={() =>
                          setExpandedRow(
                            expandedRow === "distribution"
                              ? null
                              : "distribution"
                          )
                        }
                      >
                        <td className="sticky left-0 z-10 bg-yellow-25 p-3 font-bold text-yellow-800 border-r">
                          <div className="flex items-center space-x-2">
                            <span>Recommended TP Adj �� Distribution</span>
                            <ChevronRight
                              className={`w-4 h-4 text-yellow-600 transition-transform ${
                                expandedRow === "distribution"
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </div>
                        </td>
                        <td className="p-3 text-right bg-yellow-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-yellow-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-yellow-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-yellow-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-yellow-25 text-green-600 font-medium">
                          <div className="flex items-center justify-end space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span>+5</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-yellow-25 text-green-600 font-medium">
                          <div className="flex items-center justify-end space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span>+7</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-yellow-25 text-green-600 font-medium">
                          <div className="flex items-center justify-end space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span>+3</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-yellow-25 font-bold text-yellow-800 border-l-2 border-blue-200">
                          +15
                        </td>
                      </tr>

                      <tr
                        className="h-10 hover:bg-green-50 bg-green-25 cursor-pointer group"
                        onClick={() =>
                          setExpandedRow(expandedRow === "mfg" ? null : "mfg")
                        }
                      >
                        <td className="sticky left-0 z-10 bg-green-25 p-3 font-bold text-green-800 border-r">
                          <div className="flex items-center space-x-2">
                            <span>Recommended TP Adj – Mfg</span>
                            <ChevronRight
                              className={`w-4 h-4 text-green-600 transition-transform ${
                                expandedRow === "mfg" ? "rotate-90" : ""
                              }`}
                            />
                          </div>
                        </td>
                        <td className="p-3 text-right bg-green-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-green-25 text-red-600 font-medium">
                          <div className="flex items-center justify-end space-x-1">
                            <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                            <span>-3</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-green-25 text-green-600 font-medium">
                          <div className="flex items-center justify-end space-x-1">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span>+15</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-green-25 text-red-600 font-medium">
                          <div className="flex items-center justify-end space-x-1">
                            <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                            <span>-8</span>
                          </div>
                        </td>
                        <td className="p-3 text-right bg-green-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-green-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-green-25 text-gray-400">
                          -
                        </td>
                        <td className="p-3 text-right bg-green-25 font-bold text-green-800 border-l-2 border-blue-200">
                          +4
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Adjustments
                </Button>
                <Button variant="login">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Apply Recommendations
                </Button>
              </div>
            </div>
          </div>
        );

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Compliance & Controls
              </h3>
              <p className="text-sm text-gray-600">
                Financial data analysis and ETR compliance review
              </p>
            </div>

            {/* Financial Data Table */}
            <Card className="relative">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Financial Data Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative overflow-auto max-h-[600px]">
                  <table className="w-full min-w-[1200px]">
                    {/* Sticky Header */}
                    <thead className="bg-white sticky top-0 z-20 shadow-sm">
                      <tr className="border-b">
                        <th className="sticky left-0 z-30 bg-white text-left p-3 font-medium text-gray-900 min-w-[180px] border-r">
                          Particulars
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          USA
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          Ireland
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          China
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          Singapore
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          Australia
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          UK
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px]">
                          Japan
                        </th>
                        <th className="text-right p-3 font-medium text-gray-900 min-w-[120px] border-l-2 border-blue-200">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Sales/Income */}
                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Sales/Income
                        </td>
                        <td className="p-3 text-right text-gray-900">6.93</td>
                        <td className="p-3 text-right text-gray-900">11.55</td>
                        <td className="p-3 text-right text-gray-900">78.75</td>
                        <td className="p-3 text-right text-gray-900">231</td>
                        <td className="p-3 text-right text-gray-900">100</td>
                        <td className="p-3 text-right text-gray-900">100</td>
                        <td className="p-3 text-right text-gray-900">100</td>
                        <td className="p-3 text-right font-bold text-gray-900 border-l-2 border-blue-200">
                          628.23
                        </td>
                      </tr>

                      {/* Management fees */}
                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-medium text-gray-900 border-r">
                          Management fees
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          105
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          105
                        </td>
                      </tr>

                      {/* Cost of Goods Sold */}
                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Cost of Goods Sold
                        </td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right text-gray-900">-75</td>
                        <td className="p-3 text-right text-gray-900">-78.75</td>
                        <td className="p-3 text-right text-gray-900">-77</td>
                        <td className="p-3 text-right text-gray-900">-77</td>
                        <td className="p-3 text-right text-gray-900">-77</td>
                        <td className="p-3 text-right font-bold text-gray-900 border-l-2 border-blue-200">
                          -384.75
                        </td>
                      </tr>

                      {/* Gross Profit */}
                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25 font-medium">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-bold text-gray-900 border-r">
                          Gross Profit
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          111.93
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          3.75
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          152.25
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          23
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          23
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          23
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          336.93
                        </td>
                      </tr>

                      {/* Mgmt fee costs */}
                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Mgmt fee costs
                        </td>
                        <td className="p-3 text-right text-gray-900">-100</td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right text-gray-900">-105</td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right font-bold text-gray-900 border-l-2 border-blue-200">
                          -205
                        </td>
                      </tr>

                      {/* License Fees */}
                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-medium text-gray-900 border-r">
                          License Fees
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          6.93
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          11.55
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-gray-25">
                          -
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          18.48
                        </td>
                      </tr>

                      {/* Opex */}
                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Opex
                        </td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right text-gray-400">-</td>
                        <td className="p-3 text-right text-gray-900">-25</td>
                        <td className="p-3 text-right text-gray-900">-21</td>
                        <td className="p-3 text-right text-gray-900">-21</td>
                        <td className="p-3 text-right text-gray-900">-21</td>
                        <td className="p-3 text-right font-bold text-gray-900 border-l-2 border-blue-200">
                          -88
                        </td>
                      </tr>

                      {/* Net Profit before tax */}
                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25 font-medium">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-bold text-gray-900 border-r">
                          Net Profit before tax
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          11.93
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          4.62
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          3.75
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          10.7
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          2
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          2
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25 font-medium">
                          2
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          37
                        </td>
                      </tr>

                      {/* Tax rate */}
                      <tr className="h-10 border-b hover:bg-gray-50">
                        <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray-900 border-r">
                          Tax rate
                        </td>
                        <td className="p-3 text-right text-gray-900">25%</td>
                        <td className="p-3 text-right text-gray-900">12.5%</td>
                        <td className="p-3 text-right text-gray-900">25%</td>
                        <td className="p-3 text-right text-gray-900">5%</td>
                        <td className="p-3 text-right text-gray-900">30%</td>
                        <td className="p-3 text-right text-gray-900">25%</td>
                        <td className="p-3 text-right text-gray-900">30%</td>
                        <td className="p-3 text-right text-gray-400 border-l-2 border-blue-200">
                          -
                        </td>
                      </tr>

                      {/* Net profit after tax */}
                      <tr className="h-10 border-b hover:bg-gray-50 bg-gray-25">
                        <td className="sticky left-0 z-10 bg-gray-25 p-3 font-medium text-gray-900 border-r">
                          Net profit after tax
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          2.9825
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          0.5775
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          0.9375
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          0.535
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          0.6
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          0.5
                        </td>
                        <td className="p-3 text-right text-gray-900 bg-gray-25">
                          0.6
                        </td>
                        <td className="p-3 text-right font-bold text-gray-900 bg-gray-25 border-l-2 border-blue-200">
                          6.7325
                        </td>
                      </tr>

                      {/* ETR Row with special highlighting */}
                      <tr className="h-10 border-b hover:bg-gray-50 bg-green-50">
                        <td className="sticky left-0 z-10 bg-green-50 p-3 font-bold text-gray-900 border-r">
                          <div className="flex items-center space-x-2">
                            <span>ETR</span>
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          </div>
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-green-50">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-green-50">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-green-50">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-green-50">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-green-50">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-green-50">
                          -
                        </td>
                        <td className="p-3 text-right text-gray-400 bg-green-50">
                          -
                        </td>
                        <td className="p-3 text-right bg-green-50 border-l-2 border-blue-200">
                          <div className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 border border-green-300">
                            <CheckCircle2 className="w-3 h-3 text-green-600 mr-1" />
                            <span className="font-bold text-green-800">
                              18.2%
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "reporting-dashboard":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Reporting & Dashboard
                </h3>
                <p className="text-sm text-gray-600">
                  Final summary and export options
                </p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Excel
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button variant="login">
                  <Download className="w-4 h-4 mr-2" />
                  PPT
                </Button>
              </div>
            </div>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-600 mb-1">Avg ETR</div>
                      <div className="text-2xl font-bold text-blue-900">
                        19.8%
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-600 mb-1">
                        Total Profit
                      </div>
                      <div className="text-2xl font-bold text-green-900">
                        $129.7M
                      </div>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-purple-600 mb-1">
                        Entities
                      </div>
                      <div className="text-2xl font-bold text-purple-900">
                        4
                      </div>
                    </div>
                    <Building2 className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-orange-600 mb-1">
                        Compliance
                      </div>
                      <div className="text-2xl font-bold text-orange-900">
                        94%
                      </div>
                    </div>
                    <Shield className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ETR Summary Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>ETR Summary by Entity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboardData.etrSummary}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="entity" />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <RechartsTooltip
                          formatter={(value) => [`${value}%`, "ETR"]}
                        />
                        <Bar dataKey="etr" fill="#3b82f6" />
                        <Bar dataKey="target" fill="#11b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Documentation Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Documentation Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={dashboardData.documentationStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {dashboardData.documentationStatus.map(
                            (entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            )
                          )}
                        </Pie>
                        <RechartsTooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Net Profit Allocation Table */}
            <Card>
              <CardHeader>
                <CardTitle>Net Profit Allocation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Entity
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Profit ($M)
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          Percentage
                        </th>
                        <th className="text-left p-4 font-medium text-gray-900">
                          ETR
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboardData.netProfitAllocation.map((item, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">
                            {item.entity}
                          </td>
                          <td className="p-4 text-gray-900">${item.profit}M</td>
                          <td className="p-4 text-gray-900">
                            {item.percentage}%
                          </td>
                          <td className="p-4 text-gray-900">
                            {
                              dashboardData.etrSummary.find(
                                (e) => e.entity === item.entity
                              )?.etr
                            }
                            %
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Risk Heatmap Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-600">
                    Risk assessment visualization will appear here
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Select a step to begin</div>;
    }
  };

  return (
    <div className="flex h-full">
      {/* Left Stepper Panel */}
      <div
        className={`${
          isSidebarCollapsed ? "w-16" : "w-[320px]"
        } bg-white border-r border-gray-100 h-screen flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <div
          className={`${
            isSidebarCollapsed ? "p-2" : "p-6"
          } border-b border-gray-50 flex items-center justify-between`}
        >
          {!isSidebarCollapsed && (
            <div>
              <div className="font-semibold text-gray-900 mb-1">
                OTP Engine Process
              </div>
              <div className="text-sm text-gray-600">
                Step {operateSteps.findIndex((s) => s.id === activeStep) + 1} of{" "}
                {operateSteps.length}
              </div>
            </div>
          )}
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          >
            {isSidebarCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        {!isSidebarCollapsed && (
          <div className="px-6 py-4 border-b border-gray-50">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>
                {Math.round(
                  ((operateSteps.findIndex((s) => s.id === activeStep) + 1) /
                    operateSteps.length) *
                    100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-500 ease-out"
                style={{
                  background: 'linear-gradient(90deg, #32c7db, #28a3b3)',
                  width: `${
                    ((operateSteps.findIndex((s) => s.id === activeStep) + 1) /
                      operateSteps.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Stepper Steps */}
        <div
          className={`flex-1 ${
            isSidebarCollapsed ? "p-2" : "p-6"
          } overflow-y-auto`}
        >
          <div className="relative">
            {/* Vertical connecting line */}
            {!isSidebarCollapsed && (
              <div className="absolute left-6 top-6 bottom-0 w-0.5 bg-gray-200"></div>
            )}

            <div className="space-y-6">
              {operateSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isActive = activeStep === step.id;
                const isCompleted =
                  operateSteps.findIndex((s) => s.id === activeStep) > index;
                const isUpcoming =
                  operateSteps.findIndex((s) => s.id === activeStep) < index;

                return (
                  <div
                    key={step.id}
                    onClick={() => handleStepChange(step.id)}
                    className={`relative flex items-start cursor-pointer transition-all duration-200 ${
                      isSidebarCollapsed ? "justify-center" : "space-x-4"
                    }`}
                    title={isSidebarCollapsed ? step.title : undefined}
                  >
                    {/* Step Number/Icon Circle */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                          isCompleted
                            ? "bg-green-500 border-green-500 text-white"
                            : isActive
                            ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/25 circle-login-gradient"
                            : "bg-white border-gray-300 text-gray-400 hover:border-blue-300"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : isActive ? (
                          <Activity className="w-5 h-5 btn-login-gradient" />
                        ) : (
                          <span className="text-sm font-semibold">
                            {index + 1}
                          </span>
                        )}
                      </div>

                      {/* Step status indicator */}
                      {isActive && !isSidebarCollapsed && (
                        <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full border-2 border-white" style={{ background: 'linear-gradient(135deg, #32c7db, #28a3b3)' }}>
                          <div className="w-full h-full bg-blue-500 rounded-full animate-pulse" style={{ background: 'linear-gradient(135deg, #32c7db, #28a3b3)' }}></div>
                        </div>
                      )}
                    </div>

                    {/* Step Content - only show when not collapsed */}
                    {!isSidebarCollapsed && (
                      <div className="flex-1 min-w-0 pb-2">
                        <div
                          className={`font-semibold text-sm leading-tight mb-1 transition-colors text-gray-700`}
                        >
                          {step.title}
                        </div>
                        <div
                          className={`text-xs leading-tight transition-colors text-gray-500`}
                        >
                          {step.subtitle}
                        </div>

                        {/* Step status badge */}
                        <div className="mt-2">
                          {isCompleted && (
                            <Badge className="text-xs bg-green-100 text-green-700 border-green-200">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {isActive && (
                            <Badge className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                              <Activity className="w-3 h-3 mr-1" />
                              In Progress
                            </Badge>
                          )}
                          {isUpcoming && (
                            <Badge
                              variant="outline"
                              className="text-xs text-gray-500 border-gray-200"
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        {!isSidebarCollapsed && (
          <div className="p-6 border-t border-gray-50">
            <div className="flex justify-between space-x-3">
              <Button
                variant="outline"
                size="sm"
                disabled={
                  operateSteps.findIndex((s) => s.id === activeStep) === 0
                }
                onClick={() => {
                  const currentIndex = operateSteps.findIndex(
                    (s) => s.id === activeStep
                  );
                  if (currentIndex > 0) {
                    handleStepChange(operateSteps[currentIndex - 1].id);
                  }
                }}
                className="flex-1"
              >
                Previous
              </Button>
              <Button
                size="sm"
                disabled={
                  operateSteps.findIndex((s) => s.id === activeStep) ===
                  operateSteps.length - 1
                }
                onClick={() => {
                  const currentIndex = operateSteps.findIndex(
                    (s) => s.id === activeStep
                  );
                  if (currentIndex < operateSteps.length - 1) {
                    handleStepChange(operateSteps[currentIndex + 1].id);
                  }
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {operateSteps.findIndex((s) => s.id === activeStep) ===
                operateSteps.length - 1
                  ? "Complete"
                  : "Next"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Page Header */}
        <PageHeader
          title="OTP Engine"
          titleHighlight="OTP"
          module="operate"
          icon={Settings}
        />

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{renderStepContent()}</div>
      </div>
    </div>
  );
}
