interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[]; // Optional - will auto-generate if not provided
  title: string;
  titleHighlight?: string; // Optional highlighted part of title (e.g., "Plan" in blue)
  module?: string; // Current module (e.g., 'plan', 'research', etc.)
  tool?: string; // Current tool (e.g., 'ic-flow', 'tp-policy', etc.)
  icon?: React.ComponentType<{ className?: string }>; // Optional icon component
  rightComponent?: React.ReactNode; // Optional component to render on the right side
}

// Tool name mappings for different modules
const TOOL_LABELS: Record<string, string> = {
  // Plan module tools
  'ic-flow': 'IC Flow Diagram',
  'tp-policy': 'TP Policy Summary',
  'tp-country': 'TP Country Rules',
  'value-chain': 'Value Chain Analysis',
  'policy-manual': 'TP Policy Manual',
  
  // Research module tools  
  'market-research': 'Market Research',
  'benchmarking': 'Benchmarking Analysis',
  'database-search': 'Database Search',
  
  // Operate module tools
  'transaction-monitoring': 'Transaction Monitoring',
  'compliance-tracking': 'Compliance Tracking',
  
  // Document module tools
  'document': 'Document Dashboard',
  'documentation-hub': 'Documentation Hub',
  'report-generator': 'Report Generator',
  
  // Defend module tools
  'audit-defense': 'Audit Defense',
  'position-papers': 'Position Papers'
};

// Module name mappings
const MODULE_LABELS: Record<string, string> = {
  'home': 'Home',
  'dashboard': 'Dashboard',
  'research': 'Research',
  'plan': 'Plan',
  'operate': 'Operate',
  'benchmark': 'Benchmark',
  'document': 'Document',
  'defend': 'Defend'
};

function IconOutlineCheveronDownGray() {
  return (
    <div className="relative size-3.5">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g>
          <path d="M11.0833 5.25L7 9.33333L2.91667 5.25" stroke="var(--stroke-0, #A5A5A5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

export default function PageHeader({ breadcrumbs, title, titleHighlight, module, tool, icon: Icon, rightComponent }: PageHeaderProps) {
  // Auto-generate breadcrumbs if not provided
  const finalBreadcrumbs = breadcrumbs || [
    { label: MODULE_LABELS.home },
    ...(module && module !== 'home' ? [{ label: MODULE_LABELS[module] || module }] : []),
    ...(tool ? [{ label: TOOL_LABELS[tool] || tool }] : [])
  ];
  return (
    <div>
      {/* Breadcrumbs */}
      <div className="px-6 py-3 border-b border-gray-100">
        <div className="flex items-center gap-1 text-[10px]">
          {finalBreadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center">
              <div className="font-['Montserrat:Medium',_sans-serif] font-medium text-[#4e4949]">
                {crumb.label}
              </div>
              {index < finalBreadcrumbs.length - 1 && (
                <div className="flex h-[14px] items-center justify-center w-[14px]">
                  <div className="flex-none rotate-[270deg]">
                    <IconOutlineCheveronDownGray />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Title */}
      <div className="px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
            )}
            <h1 className="font-['Montserrat:Bold',_sans-serif] font-bold text-[24px] text-[#3a3838]">
              <span>{title}</span>
            </h1>
          </div>
          {rightComponent && (
            <div className="flex items-center">
              {rightComponent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}