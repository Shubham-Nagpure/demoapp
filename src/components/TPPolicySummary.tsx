import { Users, FileText, Factory, TrendingUp, ArrowUpRight, BarChart3, Shield, Clock, ExternalLink, Download } from 'lucide-react';
import PageHeader from "./PageHeader";
import { Progress } from './ui/progress';
import { Button } from './ui/button';

const currentStateCards = [
  {
    id: 'management-fees-current',
    title: 'Management Fees',
    metric: '5%',
    subMetric: 'of Total Costs',
    description: 'Management services provided between intercompany entities',
    icon: Users,
    bgColor: 'bg-gray-500',
    progressVariant: 'gray',
    percentage: 72,
    trend: '+2.1%'
  },
  {
    id: 'license-fees-current',
    title: 'License Fees',
    metric: '3%',
    subMetric: 'of Sales',
    description: 'Intellectual property licensing arrangements',
    icon: FileText,
    bgColor: 'bg-gray-500',
    progressVariant: 'gray',
    percentage: 68,
    trend: '+1.8%'
  },
  {
    id: 'manufacturing-current',
    title: 'Manufacturing',
    metric: '10%',
    subMetric: 'Cost Plus Markup',
    description: 'Contract manufacturing and production services',
    icon: Factory,
    bgColor: 'bg-gray-500',
    progressVariant: 'gray',
    percentage: 75,
    trend: '+0.5%'
  },
  {
    id: 'distribution-current',
    title: 'Distribution',
    metric: '3%',
    subMetric: 'Net Operating Margin',
    description: 'Distribution and marketing functions',
    icon: TrendingUp,
    bgColor: 'bg-gray-500',
    progressVariant: 'gray',
    percentage: 60,
    trend: '+3.2%'
  }
];

const futureStateCards = [
  {
    id: 'management-fees-future',
    title: 'Management Fees',
    metric: '5%',
    subMetric: 'of Total Costs',
    description: 'Management services provided between intercompany entities',
    icon: Users,
    bgColor: 'bg-blue-500',
    progressVariant: 'blue',
    percentage: 92,
    trend: '+15.2%'
  },
  {
    id: 'license-fees-future',
    title: 'License Fees',
    metric: '3%',
    subMetric: 'of Sales',
    description: 'Intellectual property licensing arrangements',
    icon: FileText,
    bgColor: 'bg-purple-500',
    progressVariant: 'purple',
    percentage: 88,
    trend: '+18.8%'
  },
  {
    id: 'manufacturing-future',
    title: 'Manufacturing',
    metric: '10%',
    subMetric: 'Cost Plus Markup',
    description: 'Contract manufacturing and production services',
    icon: Factory,
    bgColor: 'bg-emerald-500',
    progressVariant: 'green',
    percentage: 95,
    trend: '+20.5%'
  },
  {
    id: 'distribution-future',
    title: 'Distribution',
    metric: '3%',
    subMetric: 'Net Operating Margin',
    description: 'Distribution and marketing functions',
    icon: TrendingUp,
    bgColor: 'bg-orange-500',
    progressVariant: 'orange',
    percentage: 85,
    trend: '+25.2%'
  }
];

const complianceMetrics = [
  {
    title: 'Documentation Status',
    value: '92%',
    subtitle: 'Complete',
    icon: Shield,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  {
    title: 'Compliance Score',
    value: '4.8',
    subtitle: 'out of 5.0',
    icon: BarChart3,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Next Review',
    value: '45',
    subtitle: 'days remaining',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

export default function TPPolicySummary() {
  const handlePolicyDownload = () => {
    // Simulate PDF download - in a real app, this would link to an actual PDF
    const link = document.createElement('a');
    link.href = '/documents/group-tp-policy-manual.pdf';
    link.download = 'Group-TP-Policy-Manual.pdf';
    link.click();
  };

  const handlePolicyOpenNewTab = () => {
    // Open PDF in new tab - in a real app, this would link to an actual PDF
    window.open('/documents/group-tp-policy-manual.pdf', '_blank');
  };

  return (
    <div className="h-full overflow-auto bg-white">
      <PageHeader 
        title="TP Policy Status"
        module="plan"
        tool="tp-policy"
      />
      
      <div className="bg-gray-50/30 min-h-[calc(100vh-120px)]">
        <div className="p-8 max-w-7xl mx-auto">

        {/* Compliance Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {complianceMetrics.map((metric) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={metric.title}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${metric.bgColor}`}>
                    <IconComponent size={20} className={metric.color} strokeWidth={2} />
                  </div>
                  <ArrowUpRight size={16} className="text-gray-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                  <p className="text-xs text-gray-500">{metric.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current vs Future State Comparison */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Current State - Left Side */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Current State</h2>
                <p className="text-sm text-gray-600">Current compliance rates and performance</p>
              </div>
              
              {currentStateCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.bgColor} shadow-lg`}>
                          <IconComponent size={20} className="text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                          <p className="text-xs text-gray-500">{card.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Metric Display */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">{card.metric}</span>
                          <span className="text-xs text-gray-500 ml-2">{card.subMetric}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                          <span className="text-xs font-medium">{card.trend}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Compliance Rate</span>
                          <span className="font-medium text-gray-900">{card.percentage}%</span>
                        </div>
                        <Progress 
                          value={card.percentage} 
                          variant="default"
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Future State - Right Side */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Future State</h2>
                <p className="text-sm text-gray-600">Target compliance rates and improved performance</p>
              </div>
              
              {futureStateCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.id}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${card.bgColor} shadow-lg`}>
                          <IconComponent size={20} className="text-white" strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{card.title}</h3>
                          <p className="text-xs text-gray-500">{card.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {/* Metric Display */}
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">{card.metric}</span>
                          <span className="text-xs text-gray-500 ml-2">{card.subMetric}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          <ArrowUpRight size={12} />
                          <span className="text-xs font-medium">{card.trend}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Improved Compliance Rate</span>
                          <span className="font-medium text-gray-900">{card.percentage}%</span>
                        </div>
                        <Progress 
                          value={card.percentage} 
                          variant={card.progressVariant as any}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Group TP Policy Manual Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <FileText size={20} className="text-white" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Group TP Policy Manual</h2>
                <p className="text-gray-600">
                  Comprehensive transfer pricing policy guidelines and procedures
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={handlePolicyDownload}
                variant="login"
              >
                <Download size={16} />
                <span>Download PDF</span>
              </Button>
              <Button 
                onClick={handlePolicyOpenNewTab}
                variant="outline"
              >
                <ExternalLink size={16} />
                <span>Open in New Tab</span>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}