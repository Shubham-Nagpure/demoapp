import { FileText, Users, Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import PageHeader from "./PageHeader";
import { Badge } from './ui/badge';

// Team members data
const teamMembers = [
  {
    id: 'JS',
    name: 'John',
    fullName: 'John Smith',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'PP',
    name: 'Priya',
    fullName: 'Priya Patel',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 'AC',
    name: 'Alex',
    fullName: 'Alex Chen',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
];

// Documentation tasks and responsibilities
const documentationTasks = [
  {
    task: 'Filing Task',
    description: 'Primary responsibility for regulatory filings',
    responsibilities: [
      { memberId: 'JS', status: 'primary', priority: 'high' },
      { memberId: 'PP', status: 'support', priority: 'medium' },
      { memberId: 'AC', status: 'review', priority: 'low' }
    ]
  },
  {
    task: 'Master File',
    description: 'Master file preparation and maintenance',
    responsibilities: [
      { memberId: 'JS', status: 'primary', priority: 'high' },
      { memberId: 'PP', status: 'none', priority: 'none' },
      { memberId: 'AC', status: 'none', priority: 'none' }
    ]
  },
  {
    task: 'Local File',
    description: 'Local documentation requirements',
    responsibilities: [
      { memberId: 'JS', status: 'none', priority: 'none' },
      { memberId: 'PP', status: 'primary', priority: 'high' },
      { memberId: 'AC', status: 'none', priority: 'none' }
    ]
  },
  {
    task: 'CbCR',
    description: 'Country-by-Country Reporting',
    responsibilities: [
      { memberId: 'JS', status: 'none', priority: 'none' },
      { memberId: 'PP', status: 'none', priority: 'none' },
      { memberId: 'AC', status: 'primary', priority: 'high' }
    ]
  },
  {
    task: 'Benchmarking',
    description: 'Economic analysis and benchmarking studies',
    responsibilities: [
      { memberId: 'JS', status: 'primary', priority: 'high' },
      { memberId: 'PP', status: 'primary', priority: 'high' },
      { memberId: 'AC', status: 'none', priority: 'none' }
    ]
  }
];

// Statistics data
const statsData = [
  {
    title: "Total Tasks",
    value: "5",
    subtitle: "Documentation areas",
    icon: FileText,
    iconColor: "text-gray-500",
    bgColor: "bg-gray-50"
  },
  {
    title: "Team Members",
    value: "3",
    subtitle: "Active contributors",
    icon: Users,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    title: "Primary Responsibilities",
    value: "7",
    subtitle: "Assigned ownership",
    icon: CheckCircle,
    iconColor: "text-green-500",
    bgColor: "bg-green-50"
  },
  {
    title: "Coverage",
    value: "100%",
    subtitle: "All areas assigned",
    icon: Calendar,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50"
  }
];

function ResponsibilityMatrix() {
  const getStatusIndicator = (status: string, memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (!member) return null;

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'primary': return member.color.replace('text-', 'bg-');
        case 'support': return member.color.replace('text-', 'bg-').replace('-600', '-400');
        case 'review': return member.color.replace('text-', 'bg-').replace('-600', '-200');
        default: return 'bg-gray-100';
      }
    };

    if (status === 'none') {
      return <div className="w-3 h-3 bg-gray-100 rounded-full"></div>;
    }

    return (
      <div className="group relative">
        <div 
          className={`w-3 h-3 rounded-full ${getStatusColor(status)} shadow-sm hover:scale-125 transition-all duration-200 cursor-pointer`}
        />
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
          <div className="bg-white text-gray-900 rounded-xl px-3 py-2 text-xs shadow-lg border border-gray-200 min-w-[120px] text-center">
            <div className="space-y-1">
              <div className="font-semibold">{member.fullName}</div>
              <div className={`font-medium ${
                status === 'primary' ? 'text-gray-900' : 
                status === 'support' ? 'text-gray-600' : 
                'text-gray-500'
              }`}>
                {status === 'primary' ? 'Primary Owner' : 
                 status === 'support' ? 'Support Role' : 
                 'Review Role'}
              </div>
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
              <div className="w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Users size={20} className="text-blue-600" strokeWidth={2} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Responsibility Matrix</h3>
        </div>
        <p className="text-sm text-gray-600">Transfer Pricing documentation task assignments and ownership</p>
      </div>

      {/* Matrix Table */}
      <div className="p-6 overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Team member headers */}
          <div className="flex gap-4 mb-4 pb-3 border-b-2 border-gray-200">
            <div className="w-48 font-medium text-xs text-gray-700 flex-shrink-0">Filing Task</div>
            <div className="flex-1 flex justify-between gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center flex-1">
                  <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${member.bgColor} ${member.borderColor} border mb-2`}>
                    <span className={`text-sm font-bold ${member.color}`}>{member.id}</span>
                  </div>
                  <div className={`text-xs font-medium ${member.color}`}>{member.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Task rows */}
          <div className="space-y-0">
            {documentationTasks.map((task, index) => (
              <div key={index} className={`flex gap-4 items-center py-4 ${index % 2 === 1 ? 'bg-gray-25/30 rounded-lg px-2' : 'px-2'} ${index !== documentationTasks.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="w-48 flex-shrink-0">
                  <div className="text-sm font-medium text-gray-900 mb-1">{task.task}</div>
                  <div className="text-xs text-gray-500">{task.description}</div>
                </div>
                <div className="flex-1 flex justify-between gap-8">
                  {teamMembers.map((member) => {
                    const responsibility = task.responsibilities.find(r => r.memberId === member.id);
                    return (
                      <div key={member.id} className="flex justify-center items-center flex-1">
                        {responsibility && getStatusIndicator(responsibility.status, member.id)}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6 text-xs">
            <span className="font-medium text-gray-700">Responsibility Level:</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600">Primary Owner</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-gray-600">Support Role</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
              <span className="text-gray-600">Review Role</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
              <span className="text-gray-600">Not Assigned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TPDocumentationTable() {
  return (
    <div className="h-full overflow-auto bg-white">
      <PageHeader 
        title="Transfer Pricing Documentation"
        titleHighlight="Transfer Pricing"
        module="plan"
        tool="documentation"
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

          {/* Team Overview Section */}
          <div className="mb-8">
            <div className="group relative bg-gradient-to-br from-white via-white to-blue-50/20 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl shadow-sm">
                      <Users size={22} className="text-blue-600" strokeWidth={2} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Documentation Team</h3>
                      <p className="text-gray-500 text-xs mt-0.5">Active team members and specializations</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    3 Members
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="group/item relative p-4 rounded-xl hover:bg-white/60 transition-all duration-200 border border-transparent hover:border-blue-100">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${member.bgColor} ${member.borderColor} border-2 rounded-xl flex items-center justify-center`}>
                          <span className={`text-lg font-bold ${member.color}`}>{member.id}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 text-sm block">{member.fullName}</span>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {member.id === 'JS' ? 'Lead Documentation Specialist' :
                             member.id === 'PP' ? 'Local File Coordinator' :
                             'CbCR & Compliance Manager'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Responsibility Matrix */}
          <ResponsibilityMatrix />

          {/* Task Summary Section */}
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
                      <h3 className="font-semibold text-gray-900 text-lg">Task Distribution Summary</h3>
                      <p className="text-gray-500 text-xs mt-0.5">Current workload and responsibility allocation</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Balanced
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {teamMembers.map((member) => {
                    const primaryTasks = documentationTasks.filter(task => 
                      task.responsibilities.some(r => r.memberId === member.id && r.status === 'primary')
                    );
                    const supportTasks = documentationTasks.filter(task => 
                      task.responsibilities.some(r => r.memberId === member.id && r.status === 'support')
                    );
                    
                    return (
                      <div key={member.id} className="group/item relative p-4 rounded-xl hover:bg-white/60 transition-all duration-200 border border-transparent hover:border-green-100">
                        <div className="text-center">
                          <div className={`w-10 h-10 ${member.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                            <span className={`text-sm font-bold ${member.color}`}>{member.id}</span>
                          </div>
                          <span className="font-semibold text-gray-900 text-sm block mb-2">{member.name}</span>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-gray-900">{primaryTasks.length}</div>
                            <div className="text-xs text-gray-600">Primary Tasks</div>
                            {supportTasks.length > 0 && (
                              <div className="text-xs text-gray-500">+{supportTasks.length} support</div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}