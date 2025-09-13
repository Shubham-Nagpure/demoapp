import { Calendar, CheckCircle, AlertTriangle, Clock, FileText, Globe } from 'lucide-react';
import PageHeader from "./PageHeader";
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const statsData = [
  {
    title: "Total Deadlines",
    value: "14",
    subtitle: "Across 7 jurisdictions",
    icon: Calendar,
    iconColor: "text-gray-500",
    bgColor: "bg-gray-50"
  },
  {
    title: "Completed",
    value: "9",
    subtitle: "64% completion rate",
    icon: CheckCircle,
    iconColor: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    title: "Delayed",
    value: "2",
    subtitle: "Require immediate attention",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    title: "In Progress",
    value: "3",
    subtitle: "On track for completion",
    icon: Clock,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50"
  }
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const transferPricingData = [
  { country: 'United States', deadline: 'Apr', deadlineDate: '30-Apr', status: 'completed', filingType: 'TP Documentation' },
  { country: 'Ireland', deadline: 'Sep', deadlineDate: '30-Sep', status: 'completed', filingType: 'TP Documentation' },
  { country: 'Singapore', deadline: 'Nov', deadlineDate: '30-Nov', status: 'in-progress', filingType: 'TP Documentation' },
  { country: 'China', deadline: 'Jun', deadlineDate: '30-Jun', status: 'delayed', filingType: 'TP Documentation' },
  { country: 'United Kingdom', deadline: 'Dec', deadlineDate: '31-Dec', status: 'in-progress', filingType: 'TP Documentation' },
  { country: 'Australia', deadline: 'Jul', deadlineDate: '31-Jul', status: 'completed', filingType: 'TP Documentation' },
  { country: 'Japan', deadline: 'Feb', deadlineDate: '28-Feb', status: 'completed', filingType: 'TP Documentation' }
];

const countryReportingData = [
  { 
    country: 'United States', 
    deadlines: [
      { deadline: 'Dec', deadlineDate: '31-Dec', status: 'in-progress', filingType: 'CbC Reporting', isOriginal: true }
    ]
  },
  { 
    country: 'Ireland', 
    deadlines: [
      { deadline: 'Dec', deadlineDate: '31-Dec', status: 'completed', filingType: 'CbC Reporting', isOriginal: true }
    ]
  },
  { 
    country: 'Singapore', 
    deadlines: [
      { deadline: 'Dec', deadlineDate: '31-Dec', status: 'in-progress', filingType: 'CbC Reporting', isOriginal: true }
    ]
  },
  { 
    country: 'China', 
    deadlines: [
      { deadline: 'Dec', deadlineDate: '31-Dec', status: 'delayed', filingType: 'CbC Reporting', isOriginal: true }
    ]
  },
  { 
    country: 'United Kingdom', 
    deadlines: [
      { deadline: 'Dec', deadlineDate: '31-Dec', status: 'completed', filingType: 'CbC Reporting', isOriginal: true }
    ]
  },
  { 
    country: 'Australia', 
    deadlines: [
      { deadline: 'Dec', deadlineDate: '31-Dec', status: 'completed', filingType: 'CbC Reporting', isOriginal: true }
    ]
  },
  { 
    country: 'Japan', 
    deadlines: [
      { deadline: 'Dec', deadlineDate: '31-Dec', status: 'in-progress', filingType: 'CbC Reporting', isOriginal: true }
    ]
  }
];

function TimelineTable({ title, subtitle, data, icon: IconComponent }: {
  title: string;
  subtitle: string;
  data: Array<{ 
    country: string; 
    deadline?: string; 
    deadlineDate?: string; 
    status?: string; 
    filingType?: string;
    deadlines?: Array<{ deadline: string; deadlineDate: string; status: string; filingType: string; isOriginal: boolean }>
  }>;
  icon: any;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'delayed': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'delayed': return 'Delayed';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <IconComponent size={20} className="text-blue-600" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>

      {/* Timeline Grid */}
      <div className="p-6 overflow-x-auto">
        <div className="min-w-[900px]">
          {/* Month headers */}
          <div className="flex gap-4 mb-4 pb-3 border-b-2 border-gray-200">
            <div className="w-32 font-medium text-xs text-gray-700 flex-shrink-0">Country/Entity</div>
            <div className="flex-1 flex justify-between">
              {months.map((month, monthIndex) => (
                <div key={month} className={`text-center flex-1 ${monthIndex !== months.length - 1 ? 'border-r border-gray-100' : ''}`}>
                  <span className="text-xs font-medium text-gray-600">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Country rows */}
          <div className="space-y-0">
            {data.map((item, index) => (
              <div key={index} className={`flex gap-4 items-center py-3 ${index % 2 === 1 ? 'bg-gray-25/30' : ''} ${index !== data.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="w-32 text-sm font-medium text-gray-900 flex-shrink-0">
                  {item.country}
                </div>
                <div className="flex-1 flex justify-between">
                  {months.map((month, monthIndex) => {
                    // Handle both old and new data structures
                    const itemDeadlines = item.deadlines || (item.deadline ? [{ deadline: item.deadline, deadlineDate: item.deadlineDate, status: item.status, filingType: item.filingType, isOriginal: true }] : []);
                    const monthDeadlines = itemDeadlines.filter(d => d.deadline === month);
                    
                    return (
                      <div key={month} className={`flex justify-center items-center gap-1 flex-1 ${monthIndex !== months.length - 1 ? 'border-r border-gray-50' : ''}`}>
                        {monthDeadlines.map((deadline, deadlineIndex) => (
                          <div key={deadlineIndex} className="group relative">
                            <div 
                              className={`w-3 h-3 rounded-full ${getStatusColor(deadline.status)} shadow-sm hover:scale-125 transition-all duration-200 cursor-pointer`}
                            />
                            {/* Custom Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                              <div className="bg-white text-gray-900 rounded-xl px-4 py-3 text-sm shadow-lg border border-gray-200 min-w-[200px]">
                                <div className="space-y-1">
                                  <div className="font-semibold text-gray-900">{item.country}</div>
                                  <div className="text-gray-600">Deadline: {deadline.deadlineDate}</div>
                                  <div className={`font-medium ${
                                    deadline.status === 'delayed' ? 'text-red-600' : 
                                    deadline.status === 'in-progress' ? 'text-yellow-600' : 
                                    'text-green-600'
                                  }`}>
                                    Status: {getStatusText(deadline.status)}
                                  </div>
                                  <div className="text-gray-500 text-xs">Filing type: {deadline.filingType}</div>
                                </div>
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TPComplianceTracker() {
  return (
    <div className="h-full overflow-auto bg-white">
      <PageHeader 
        title="Transfer Pricing Compliance Tracker"
        titleHighlight="Transfer Pricing"
        module="plan"
        tool="compliance"
      />
      
      <div className="bg-gray-50/30 min-h-[calc(100vh-120px)]">
        <div className="p-8 max-w-7xl mx-auto">
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                      <IconComponent size={24} className={stat.iconColor} strokeWidth={2} />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                    </div>
                    <h3 className="font-semibold text-gray-700 text-sm">{stat.title}</h3>
                    <p className="text-xs text-gray-500">{stat.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upcoming Deadlines Section - Moved to Top */}
          <div className="mb-8">
            <div className="group relative bg-gradient-to-br from-white via-white to-orange-50/20 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl shadow-sm">
                      <Calendar size={22} className="text-orange-600" strokeWidth={2} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Upcoming Deadlines</h3>
                      <p className="text-gray-500 text-xs mt-0.5">Next 90 days</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    5 Active
                  </div>
                </div>

                <div className="mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>Progress to Next Quarter</span>
                    <span>72% Complete</span>
                  </div>
                  <Progress value={72} variant="orange" className="h-2" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {[
                    { country: 'United Kingdom', deadline: 'Dec 15, 2024', type: 'TP Documentation', priority: 'high' },
                    { country: 'China', deadline: 'Jun 30, 2024', type: 'CbC Reporting', priority: 'urgent' },
                    { country: 'Singapore', deadline: 'Apr 30, 2024', type: 'Local File', priority: 'medium' }
                  ].map((item, index) => (
                    <div key={index} className="group/item relative p-3 rounded-xl hover:bg-white/60 transition-all duration-200 border border-transparent hover:border-orange-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-semibold text-orange-700">
                                {item.country.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 text-sm">{item.country}</span>
                            <div className="text-xs text-gray-500 mt-0.5">{item.deadline} • {item.type}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            item.priority === 'urgent' ? 'bg-red-500 animate-pulse' :
                            item.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                          }`} />
                          <Badge variant="outline" className={`text-xs font-medium shadow-sm ${
                            item.priority === 'urgent' ? 'bg-gradient-to-r from-red-50 to-red-50 text-red-700 border-red-200' :
                            item.priority === 'high' ? 'bg-gradient-to-r from-orange-50 to-orange-50 text-orange-700 border-orange-200' :
                            'bg-gradient-to-r from-yellow-50 to-yellow-50 text-yellow-700 border-yellow-200'
                          }`}>
                            {item.priority === 'urgent' ? 'Urgent' : item.priority === 'high' ? 'High Priority' : 'Medium'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Tables */}
          <div className="space-y-8 mb-8">
            {/* Transfer Pricing Documentation */}
            <TimelineTable
              title="Transfer Pricing Documentation"
              subtitle="Timeline view of statutory deadlines and compliance status"
              data={transferPricingData}
              icon={FileText}
            />

            {/* Country by Country Reporting */}
            <TimelineTable
              title="Country by Country Reporting"
              subtitle="Timeline view of statutory deadlines and compliance status"
              data={countryReportingData}
              icon={Globe}
            />
          </div>

          {/* Compliance Health Section - Made Horizontal at Bottom */}
          <div className="mt-8">
            <div className="group relative bg-gradient-to-br from-white via-white to-green-50/20 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow-sm">
                      <CheckCircle size={22} className="text-green-600" strokeWidth={2} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Compliance Health</h3>
                      <p className="text-gray-500 text-xs mt-0.5">Overall status summary</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Healthy
                  </div>
                </div>
                
                {/* Horizontal Layout for Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { metric: 'On-time Completion Rate', value: '85%', status: 'excellent', trend: 'up' },
                    { metric: 'Documentation Quality', value: '92%', status: 'excellent', trend: 'up' },
                    { metric: 'Risk Mitigation', value: '78%', status: 'good', trend: 'stable' },
                    { metric: 'Penalty Avoidance', value: '100%', status: 'excellent', trend: 'up' }
                  ].map((item, index) => (
                    <div key={index} className="group/item relative p-4 rounded-xl hover:bg-white/60 transition-all duration-200 border border-transparent hover:border-green-100 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            item.status === 'excellent' ? 'bg-gradient-to-br from-green-100 to-green-50' :
                            'bg-gradient-to-br from-yellow-100 to-yellow-50'
                          }`}>
                            <div className={`w-3 h-3 rounded-full ${
                              item.status === 'excellent' ? 'bg-green-500' : 'bg-yellow-500'
                            }`} />
                          </div>
                        </div>
                        <div>
                          <span className="text-2xl font-bold text-gray-900 block">{item.value}</span>
                          <div className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                            item.status === 'excellent' ? 'bg-green-100 text-green-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {item.status === 'excellent' ? 'Excellent' : 'Good'}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 text-sm block">{item.metric}</span>
                          <div className="text-xs text-gray-500 mt-0.5">Current period</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status Legend - Horizontal at Bottom */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-xs">
                      <span className="font-medium text-gray-700">Status:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-600">In Progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600">Delayed</span>
                      </div>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      View Detailed Report →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}