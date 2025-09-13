import { useState } from 'react';
import PageHeader from './PageHeader';
import StandardTable from './StandardTable';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  Target,
  Users,
  Calendar,
  Building2,
  DollarSign,
  Percent,
  Globe,
  Zap,
  Eye,
  Lock,
  Unlock,
  Gavel,
  Scale,
  BookOpen,
  ArrowUp,
  ArrowDown,
  Briefcase,
  Database,
  Plus
} from 'lucide-react';

interface DefenseCase {
  id: string;
  caseNumber: string;
  jurisdiction: string;
  status: 'active' | 'pending' | 'resolved' | 'escalated';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  taxAmount: number;
  penalty: number;
  description: string;
  assignedTo: string;
  dueDate: string;
  lastUpdated: string;
  confidenceLevel: number;
}

interface AuditActivity {
  id: string;
  type: 'inquiry' | 'audit' | 'assessment' | 'appeal';
  authority: string;
  entity: string;
  status: 'new' | 'in-progress' | 'waiting' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: string;
  description: string;
  progress: number;
}

interface ComplianceMetric {
  id: string;
  metric: string;
  value: number;
  target: number;
  status: 'above' | 'at' | 'below';
  trend: 'up' | 'down' | 'stable';
  unit: string;
  description: string;
}

export default function DefendPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock defense cases data
  const defenseCases: DefenseCase[] = [
    {
      id: '1',
      caseNumber: 'AUD-2024-001',
      jurisdiction: 'United States',
      status: 'active',
      riskLevel: 'high',
      taxAmount: 2500000,
      penalty: 375000,
      description: 'Transfer pricing audit on intercompany service agreements',
      assignedTo: 'Sarah Chen',
      dueDate: '2024-02-15',
      lastUpdated: '2024-01-08',
      confidenceLevel: 85
    },
    {
      id: '2',
      caseNumber: 'INQ-2024-002',
      jurisdiction: 'Germany',
      status: 'pending',
      riskLevel: 'medium',
      taxAmount: 1200000,
      penalty: 180000,
      description: 'Documentation request for IP licensing arrangements',
      assignedTo: 'Michael Rodriguez',
      dueDate: '2024-01-25',
      lastUpdated: '2024-01-10',
      confidenceLevel: 78
    },
    {
      id: '3',
      caseNumber: 'APL-2023-045',
      jurisdiction: 'United Kingdom',
      status: 'escalated',
      riskLevel: 'critical',
      taxAmount: 4200000,
      penalty: 840000,
      description: 'Appeal on cost-sharing arrangement assessment',
      assignedTo: 'Emma Thompson',
      dueDate: '2024-01-20',
      lastUpdated: '2024-01-11',
      confidenceLevel: 92
    }
  ];

  // Mock audit activities
  const auditActivities: AuditActivity[] = [
    {
      id: '1',
      type: 'audit',
      authority: 'IRS',
      entity: 'TechCorp US',
      status: 'in-progress',
      priority: 'high',
      deadline: '2024-02-01',
      description: 'Comprehensive transfer pricing audit',
      progress: 65
    },
    {
      id: '2',
      type: 'inquiry',
      authority: 'HMRC',
      entity: 'TechCorp UK',
      status: 'waiting',
      priority: 'medium',
      deadline: '2024-01-30',
      description: 'Documentation inquiry on R&D activities',
      progress: 30
    },
    {
      id: '3',
      type: 'assessment',
      authority: 'BZSt',
      entity: 'TechCorp DE',
      status: 'new',
      priority: 'urgent',
      deadline: '2024-01-18',
      description: 'Primary adjustment assessment notice',
      progress: 10
    }
  ];

  // Mock compliance metrics
  const complianceMetrics: ComplianceMetric[] = [
    {
      id: '1',
      metric: 'Documentation Coverage',
      value: 94,
      target: 95,
      status: 'below',
      trend: 'up',
      unit: '%',
      description: 'Percentage of transactions with complete documentation'
    },
    {
      id: '2',
      metric: 'Response Time',
      value: 12,
      target: 15,
      status: 'above',
      trend: 'down',
      unit: 'days',
      description: 'Average response time to authority inquiries'
    },
    {
      id: '3',
      metric: 'Risk Score',
      value: 2.3,
      target: 3.0,
      status: 'above',
      trend: 'stable',
      unit: '/5',
      description: 'Overall tax authority risk assessment'
    },
    {
      id: '4',
      metric: 'Success Rate',
      value: 87,
      target: 80,
      status: 'above',
      trend: 'up',
      unit: '%',
      description: 'Percentage of favorable audit outcomes'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'escalated':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'new':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      <PageHeader 
        title="Defense Shield"
        titleHighlight="Defense"
        module="defend"
        icon={Shield}
      />
      
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="cases" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Defense Cases
            </TabsTrigger>
            <TabsTrigger value="audits" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Audit Activities
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Compliance
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Active Cases</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-xs text-blue-600 flex items-center gap-1 mt-2">
                        <ArrowUp className="w-3 h-3" />
                        +2 this month
                      </p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Briefcase className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">87%</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                        <TrendingUp className="w-3 h-3" />
                        +5% improvement
                      </p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-lg">
                      <ShieldCheck className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">At Risk Amount</p>
                      <p className="text-2xl font-bold text-gray-900">$8.2M</p>
                      <p className="text-xs text-orange-600 flex items-center gap-1 mt-2">
                        <AlertTriangle className="w-3 h-3" />
                        Requires attention
                      </p>
                    </div>
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-100">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Response Time</p>
                      <p className="text-2xl font-bold text-gray-900">12 days</p>
                      <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                        <ArrowDown className="w-3 h-3" />
                        3 days faster
                      </p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Clock className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Critical Alerts & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    Critical Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">UK Appeal Deadline</p>
                      <p className="text-sm text-gray-600">Appeal response due in 7 days - $4.2M at risk</p>
                      <p className="text-xs text-gray-500 mt-1">Case: APL-2023-045</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                    <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Documentation Request</p>
                      <p className="text-sm text-gray-600">German BZSt requesting additional TP documentation</p>
                      <p className="text-xs text-gray-500 mt-1">Due: January 18, 2024</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <Eye className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">IRS Audit Progress</p>
                      <p className="text-sm text-gray-600">Audit at 65% completion - prepare for closing conference</p>
                      <p className="text-xs text-gray-500 mt-1">Next milestone: January 25, 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Alert className="border-blue-200 bg-blue-50">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Documentation Submitted:</strong> IRS audit response package completed and submitted.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Case Resolved:</strong> Singapore inquiry INQ-2023-089 closed favorably.
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-purple-200 bg-purple-50">
                    <Gavel className="h-4 w-4 text-purple-600" />
                    <AlertDescription className="text-purple-800">
                      <strong>Expert Engaged:</strong> External counsel assigned to UK appeal case.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Defense Cases Tab */}
          <TabsContent value="cases" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Defense Cases</h3>
                <p className="text-sm text-gray-600">Active and pending tax authority cases</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Plus className="w-4 h-4 mr-2" />
                  New Case
                </Button>
              </div>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <StandardTable
                  data={defenseCases.map(case_ => ({
                    ...case_,
                    caseNumber: (
                      <div>
                        <p className="font-medium text-gray-900">{case_.caseNumber}</p>
                        <p className="text-sm text-gray-500">{case_.jurisdiction}</p>
                      </div>
                    ),
                    status: (
                      <Badge className={`capitalize ${getStatusColor(case_.status)}`}>
                        {case_.status}
                      </Badge>
                    ),
                    riskLevel: (
                      <Badge className={`capitalize ${getRiskColor(case_.riskLevel)}`}>
                        {case_.riskLevel} risk
                      </Badge>
                    ),
                    taxAmount: (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900">
                          ${(case_.taxAmount / 1000000).toFixed(1)}M
                        </span>
                      </div>
                    ),
                    assignedTo: (
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{case_.assignedTo}</span>
                      </div>
                    ),
                    confidenceLevel: (
                      <div className="flex items-center gap-2">
                        <Progress value={case_.confidenceLevel} className="h-2 w-16" />
                        <span className="text-sm font-medium text-gray-900">{case_.confidenceLevel}%</span>
                      </div>
                    )
                  }))}
                  columns={[
                    { key: 'caseNumber', title: 'Case', sortable: true },
                    { key: 'status', title: 'Status', sortable: true },
                    { key: 'riskLevel', title: 'Risk Level', sortable: true },
                    { key: 'taxAmount', title: 'Tax Amount', sortable: true },
                    { key: 'assignedTo', title: 'Assigned To', sortable: true },
                    { key: 'confidenceLevel', title: 'Confidence', sortable: true }
                  ]}
                  searchable={true}
                  filterable={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Activities Tab */}
          <TabsContent value="audits" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Audit Activities</h3>
                <p className="text-sm text-gray-600">Current audit and inquiry activities</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <StandardTable
                  data={auditActivities.map(activity => ({
                    ...activity,
                    type: (
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        <span className="font-medium text-gray-900 capitalize">{activity.type}</span>
                      </div>
                    ),
                    authority: (
                      <div>
                        <p className="font-medium text-gray-900">{activity.authority}</p>
                        <p className="text-sm text-gray-500">{activity.entity}</p>
                      </div>
                    ),
                    status: (
                      <Badge className={`capitalize ${getStatusColor(activity.status)}`}>
                        {activity.status.replace('-', ' ')}
                      </Badge>
                    ),
                    priority: (
                      <Badge className={`capitalize ${getPriorityColor(activity.priority)}`}>
                        {activity.priority}
                      </Badge>
                    ),
                    progress: (
                      <div className="flex items-center gap-2">
                        <Progress value={activity.progress} className="h-2 w-16" />
                        <span className="text-sm font-medium text-gray-900">{activity.progress}%</span>
                      </div>
                    )
                  }))}
                  columns={[
                    { key: 'type', title: 'Type', sortable: true },
                    { key: 'authority', title: 'Authority', sortable: true },
                    { key: 'status', title: 'Status', sortable: true },
                    { key: 'priority', title: 'Priority', sortable: true },
                    { key: 'progress', title: 'Progress', sortable: true }
                  ]}
                  searchable={true}
                  filterable={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Compliance Metrics</h3>
                <p className="text-sm text-gray-600">Key performance indicators for defense readiness</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {complianceMetrics.map((metric) => (
                <Card key={metric.id} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900">{metric.metric}</h4>
                        <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="text-2xl font-bold text-gray-900">
                            {metric.value}{metric.unit}
                          </span>
                          {getTrendIcon(metric.trend)}
                          <Badge variant="outline" className={`capitalize ${
                            metric.status === 'above' 
                              ? 'border-green-200 text-green-800 bg-green-50'
                              : metric.status === 'at'
                              ? 'border-blue-200 text-blue-800 bg-blue-50'
                              : 'border-red-200 text-red-800 bg-red-50'
                          }`}>
                            {metric.status} target
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Target</span>
                        <span className="font-medium">{metric.target}{metric.unit}</span>
                      </div>
                      
                      <div className="relative">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                            style={{ 
                              width: `${Math.min((metric.value / metric.target) * 100, 100)}%`,
                              minWidth: '4px'
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t">
                        <span className="text-sm text-gray-600">
                          vs Target: {metric.value >= metric.target ? '+' : ''}
                          {((metric.value - metric.target) / metric.target * 100).toFixed(1)}%
                        </span>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}