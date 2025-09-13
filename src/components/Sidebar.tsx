import { 
  ArrowRightLeft,
  BookOpen,
  Globe,
  Calendar,
  TrendingUp,
  Grid3X3,
  FileText,
  ChartBar,
  ChevronLeft,
  ChevronRight,
  GitCompare
} from 'lucide-react';

const sidebarTools = [
  {
    id: 'ic-flow',
    title: 'IC Flow Diagram',
    subtitle: 'Interactive intercompany flow...',
    icon: ArrowRightLeft,
    isActive: true,
    hasAccent: true
  },
  {
    id: 'tp-policy',
    title: 'TP Policy Summary',
    subtitle: 'Overview of transfer pricing...',
    icon: BookOpen,
    isActive: false
  },
  // COMMENTED OUT - TO BE MOVED TO DOCUMENT MODULE
  // {
  //   id: 'tp-country',
  //   title: 'TP Country Rules',
  //   subtitle: 'Country-specific requirements...',
  //   icon: Globe,
  //   isActive: false
  // },
  // {
  //   id: 'compliance',
  //   title: 'TP Compliance Tracker',
  //   subtitle: 'Gantt timeline view of compliance...',
  //   icon: Calendar,
  //   isActive: false
  // },
  {
    id: 'value-chain',
    title: 'Value Chain Analysis',
    subtitle: '4-step workflow for...',
    icon: TrendingUp,
    isActive: false
  },
  {
    id: 'far-analysis',
    title: 'FAR Analysis',
    subtitle: 'Functions, Assets, and Risks...',
    icon: Grid3X3,
    isActive: false
  },
  {
    id: 'ic-agreements',
    title: 'IC Agreements',
    subtitle: 'Intercompany agreement man...',
    icon: FileText,
    isActive: false
  },
  {
    id: 'profitability',
    title: 'Profitability Analysis',
    subtitle: 'Profit level indicators and tax...',
    icon: ChartBar,
    isActive: false
  },
  // COMMENTED OUT - REMOVED FROM PLAN MODULE
  // {
  //   id: 'side-by-side',
  //   title: 'Side-by-Side Analysis',
  //   subtitle: 'Current vs future state comparison...',
  //   icon: GitCompare,
  //   isActive: false
  // }
];

export default function Sidebar({ activeTool, onToolChange, isCollapsed, onToggleCollapse }: { 
  activeTool?: string; 
  onToolChange?: (toolId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}) {
  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-[300px]'} bg-white border-r border-gray-100 h-screen flex flex-col transition-all duration-300 ease-in-out`}>
      {/* Header */}
      <div className={`${isCollapsed ? 'p-2' : 'p-6'} border-b border-gray-50 flex items-center justify-between`}>
        {!isCollapsed && (
          <div className="text-sm text-gray-600">
            <span>Tools under </span>
            <span className="font-semibold text-gray-800">Plan <span className="text-[#32C7DB]">Architect</span></span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Tools List */}
      <div className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} space-y-2`}>
        {sidebarTools.map((tool) => {
          const IconComponent = tool.icon;
          const isActive = activeTool === tool.id;
          const hasAccent = isActive;
          
          return (
            <div
              key={tool.id}
              onClick={() => onToolChange?.(tool.id)}
              className={`relative flex items-center ${isCollapsed ? 'justify-center p-3' : 'space-x-3 p-4'} rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                isActive && hasAccent
                  ? 'bg-cyan-50/50 border border-cyan-100' 
                  : isActive
                    ? 'bg-gray-50'
                    : hasAccent 
                      ? 'bg-cyan-50/50 border border-cyan-100' 
                      : 'hover:shadow-sm'
              }`}
              title={isCollapsed ? tool.title : undefined}
            >
              {/* Cyan accent indicators */}
              {hasAccent && !isCollapsed && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#32C7DB] rounded-r-full" />
              )}
              {hasAccent && isCollapsed && (
                <div className="absolute right-1 top-1 w-2 h-2 bg-[#32C7DB] rounded-full" />
              )}

              {/* Icon */}
              <div className="relative">
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                  isActive && hasAccent
                    ? 'bg-gradient-to-br from-[#32C7DB] to-[#2db5c7]' 
                    : isActive
                      ? 'bg-gradient-to-br from-[#32C7DB] to-[#2db5c7]'
                      : hasAccent
                        ? 'bg-[#32C7DB]'
                        : 'bg-gray-100'
                }`}>
                  <IconComponent 
                    size={18} 
                    className={
                      isActive || hasAccent 
                        ? 'text-white' 
                        : 'text-gray-500'
                    } 
                    strokeWidth={1.8}
                  />
                </div>
              </div>

              {/* Content - only show when not collapsed */}
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm leading-tight mb-1 ${
                    isActive 
                      ? 'text-gray-900' 
                      : hasAccent
                        ? 'text-gray-900'
                        : 'text-gray-700'
                  }`}>
                    {tool.title}
                  </div>
                  <div className="text-xs text-gray-500 leading-tight">
                    {tool.subtitle}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}