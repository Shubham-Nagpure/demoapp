import { Globe, Calendar, AlertTriangle, CheckCircle, Flag, FileText, Clock, DollarSign } from 'lucide-react';
import PageHeader from "./PageHeader";
import StandardTable from "./StandardTable";
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const statsData = [
  {
    title: "Countries Monitored",
    value: "7",
    subtitle: "Active jurisdictions",
    icon: Globe,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50"
  },
  {
    title: "Upcoming Deadlines",
    value: "12",
    subtitle: "Next 90 days",
    icon: Calendar,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50"
  },
  {
    title: "High Risk",
    value: "3",
    subtitle: "Require attention",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    title: "Compliant",
    value: "4",
    subtitle: "Up to date",
    icon: CheckCircle,
    iconColor: "text-green-500",
    bgColor: "bg-green-50"
  }
];

const countryTableData = [
  {
    country: { icon: "🇺🇸", text: "USA" },
    tpDocRequired: <span className="text-blue-600 font-medium text-xs">Yes (IRC §482)</span>,
    filingDeadline: (
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs">15th day of 4th month after YE</span>
      </div>
    ),
    localFile: <span className="text-gray-700 text-xs">Combined N/A</span>,
    masterFile: <span className="text-gray-700 text-xs font-medium">USD 850M</span>,
    cbcThreshold: <span className="text-gray-500 text-xs">No specific TP form</span>,
    taxRate: (
      <div className="flex items-center gap-1">
        <DollarSign size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs font-medium">21%</span>
      </div>
    ),
    tpDisclosureForm: <span className="text-gray-700 text-xs">Accuracy-related penalties up to 40%</span>,
    penaltiesNonCompliance: <span className="text-gray-700 text-xs">Contemporaneous documentation required</span>,
    notes: <span className="text-gray-600 text-xs">Combined N/A</span>
  },
  {
    country: { icon: "🇮🇪", text: "Ireland" },
    tpDocRequired: <span className="text-blue-600 font-medium text-xs">Yes (TCA 2021)</span>,
    filingDeadline: (
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs">30 Nov following tax year</span>
      </div>
    ),
    localFile: <span className="text-gray-500 text-xs">No</span>,
    masterFile: <span className="text-gray-700 text-xs font-medium">€ 5,500 Cr</span>,
    cbcThreshold: <span className="text-blue-600 text-xs">Yes (Form CT1)</span>,
    taxRate: (
      <div className="flex items-center gap-1">
        <DollarSign size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs font-medium">25%</span>
      </div>
    ),
    tpDisclosureForm: <span className="text-gray-700 text-xs">2% of transaction value</span>,
    penaltiesNonCompliance: <span className="text-gray-700 text-xs">Detailed documentation required</span>,
    notes: <span className="text-gray-600 text-xs">No</span>
  },
  {
    country: { icon: "🇸🇬", text: "Singapore" },
    tpDocRequired: <span className="text-blue-600 font-medium text-xs">Yes</span>,
    filingDeadline: (
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs">30 Nov</span>
      </div>
    ),
    localFile: (
      <Badge variant="default" className="bg-teal-100 text-teal-700 border-teal-200 text-xs">
        Yes
      </Badge>
    ),
    masterFile: <span className="text-gray-700 text-xs font-medium">SGD 1,125B</span>,
    cbcThreshold: <span className="text-gray-500 text-xs">No</span>,
    taxRate: (
      <div className="flex items-center gap-1">
        <DollarSign size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs font-medium">17%</span>
      </div>
    ),
    tpDisclosureForm: <span className="text-gray-700 text-xs">Up to SGD 10,000</span>,
    penaltiesNonCompliance: <span className="text-gray-700 text-xs">IRAS accepts OECD approach</span>,
    notes: <span className="text-gray-600 text-xs">Yes</span>
  },
  {
    country: { icon: "🇨🇳", text: "China" },
    tpDocRequired: <span className="text-blue-600 font-medium text-xs">Yes (OECD-aligned)</span>,
    filingDeadline: (
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs">With corporate tax return</span>
      </div>
    ),
    localFile: (
      <Badge variant="default" className="bg-teal-100 text-teal-700 border-teal-200 text-xs">
        Yes
      </Badge>
    ),
    masterFile: <span className="text-gray-700 text-xs font-medium">AED 3,15B</span>,
    cbcThreshold: <span className="text-blue-600 text-xs">Yes</span>,
    taxRate: (
      <div className="flex items-center gap-1">
        <DollarSign size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs font-medium">25%</span>
      </div>
    ),
    tpDisclosureForm: <span className="text-gray-700 text-xs">Penalties up to AED 1M+</span>,
    penaltiesNonCompliance: <span className="text-gray-700 text-xs">Use TP year 2024</span>,
    notes: <span className="text-gray-600 text-xs">Yes</span>
  },
  {
    country: { icon: "🇦🇺", text: "Australia" },
    tpDocRequired: <span className="text-blue-600 font-medium text-xs">Yes</span>,
    filingDeadline: (
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs">With income tax return</span>
      </div>
    ),
    localFile: (
      <Badge variant="default" className="bg-teal-100 text-teal-700 border-teal-200 text-xs">
        Yes
      </Badge>
    ),
    masterFile: <span className="text-gray-700 text-xs font-medium">AUD 1B</span>,
    cbcThreshold: <span className="text-blue-600 text-xs">Yes (IDS form)</span>,
    taxRate: (
      <div className="flex items-center gap-1">
        <DollarSign size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs font-medium">30%</span>
      </div>
    ),
    tpDisclosureForm: <span className="text-gray-700 text-xs">Significant penalties per day</span>,
    penaltiesNonCompliance: <span className="text-gray-700 text-xs">ATO focus on related party financing</span>,
    notes: <span className="text-gray-600 text-xs">Yes</span>
  },
  {
    country: { icon: "🇯🇵", text: "Japan" },
    tpDocRequired: <span className="text-blue-600 font-medium text-xs">Yes</span>,
    filingDeadline: (
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs">By corporate tax filing date</span>
      </div>
    ),
    localFile: <span className="text-gray-500 text-xs">No</span>,
    masterFile: <span className="text-gray-700 text-xs font-medium">CAD 1,1B</span>,
    cbcThreshold: <span className="text-gray-500 text-xs">No</span>,
    taxRate: (
      <div className="flex items-center gap-1">
        <DollarSign size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs font-medium">23.2%</span>
      </div>
    ),
    tpDisclosureForm: <span className="text-gray-700 text-xs">Penalties up to 40% of UTA</span>,
    penaltiesNonCompliance: <span className="text-gray-700 text-xs">Tax expects contemporaneous prep</span>,
    notes: <span className="text-gray-600 text-xs">No</span>
  },
  {
    country: { icon: "🇬🇧", text: "UK" },
    tpDocRequired: <span className="text-blue-600 font-medium text-xs">Yes</span>,
    filingDeadline: (
      <div className="flex items-center gap-2">
        <Clock size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs">12 months after YE</span>
      </div>
    ),
    localFile: (
      <Badge variant="default" className="bg-teal-100 text-teal-700 border-teal-200 text-xs">
        Yes
      </Badge>
    ),
    masterFile: <span className="text-gray-700 text-xs font-medium">€750M</span>,
    cbcThreshold: <span className="text-blue-600 text-xs">Yes (SA106/SA709)</span>,
    taxRate: (
      <div className="flex items-center gap-1">
        <DollarSign size={12} className="text-gray-400" />
        <span className="text-gray-700 text-xs font-medium">25%</span>
      </div>
    ),
    tpDisclosureForm: <span className="text-gray-700 text-xs">Up to 100% of understated tax</span>,
    penaltiesNonCompliance: <span className="text-gray-700 text-xs">HMRC applies DEMPE focus</span>,
    notes: <span className="text-gray-600 text-xs">Yes</span>
  }
];

const tableColumns = [
  { key: 'country', title: 'Country', sortable: true },
  { key: 'tpDocRequired', title: 'TP Documentation Required?', sortable: false },
  { key: 'filingDeadline', title: 'Filing Deadline', sortable: false },
  { key: 'localFile', title: 'Local File', sortable: false },
  { key: 'masterFile', title: 'Master File', sortable: true },
  { key: 'cbcThreshold', title: 'CbC Reporting Threshold', sortable: false },
  { key: 'taxRate', title: 'Tax Rate', sortable: true },
  { key: 'tpDisclosureForm', title: 'TP Disclosure Form?', sortable: false },
  { key: 'penaltiesNonCompliance', title: 'Penalties for Non-Compliance', sortable: false },
  { key: 'notes', title: 'Notes', sortable: false }
];

const highPriorityCountries = [
  { flag: "🇺🇸", name: "USA", risk: "high", status: "Documentation pending" },
  { flag: "🇮🇪", name: "Ireland", risk: "medium", status: "Review required" },
  { flag: "🇸🇬", name: "Singapore", risk: "high", status: "Filing overdue" }
];

const recentUpdates = [
  { 
    flag: "🇮🇪", 
    name: "Ireland", 
    description: "TCA 2021 transfer pricing updates implemented with new compliance requirements", 
    timeAgo: "2 days ago",
    isCritical: true,
    type: "Regulatory"
  },
  { 
    flag: "🇺🇸", 
    name: "USA", 
    description: "IRC §482 documentation standards revised for intercompany transactions", 
    timeAgo: "1 week ago",
    isCritical: false,
    type: "Documentation"
  },
  { 
    flag: "🇨🇳", 
    name: "China", 
    description: "OECD BEPS alignment confirmed for transfer pricing regulations", 
    timeAgo: "2 weeks ago",
    isCritical: false,
    type: "Policy"
  }
];

export default function TPCountryRules() {
  return (
    <div className="h-full overflow-auto bg-white">
      <PageHeader 
        title="TP Country Rules"
        module="plan"
        tool="tp-country"
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

          {/* Documentation Requirements Section */}
          <div className="space-y-6 mb-8">
            {/* Section Header */}
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-xl">
                <FileText size={24} className="text-green-600" strokeWidth={2} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">Documentation Requirements by Country</h2>
                <p className="text-gray-600 text-sm">
                  Comprehensive overview of transfer pricing compliance requirements across all monitored jurisdictions
                </p>
              </div>
            </div>

            {/* Countries Table */}
            <div className="overflow-x-auto">
              <StandardTable 
                columns={tableColumns}
                data={countryTableData}
                searchable={true}
                filterable={true}
              />
            </div>
          </div>

          {/* Bottom Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* High Priority Jurisdictions Card */}
            <div className="group relative bg-gradient-to-br from-white via-white to-orange-50/20 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6">
                {/* Header with enhanced styling */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl shadow-sm">
                      <AlertTriangle size={22} className="text-orange-600" strokeWidth={2} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">High Priority Jurisdictions</h3>
                      <p className="text-gray-500 text-xs mt-0.5">Requires immediate attention</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    {highPriorityCountries.length} Active
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                    <span>Compliance Progress</span>
                    <span>57% Complete</span>
                  </div>
                  <Progress value={57} variant="orange" className="h-2" />
                </div>
                
                {/* Enhanced country list */}
                <div className="space-y-4">
                  {highPriorityCountries.map((country, index) => (
                    <div key={index} className="group/item relative p-3 rounded-xl hover:bg-white/60 transition-all duration-200 border border-transparent hover:border-orange-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <span className="text-2xl drop-shadow-sm">{country.flag}</span>
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
                          </div>
                          <div>
                            <span className="font-semibold text-gray-900 text-sm">{country.name}</span>
                            <div className="text-xs text-gray-500 mt-0.5">{country.status}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                          <Badge variant="outline" className="bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border-orange-200 text-xs font-medium shadow-sm">
                            Action Required
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Updates Card */}
            <div className="group relative bg-gradient-to-br from-white via-white to-green-50/20 backdrop-blur-sm rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6">
                {/* Header with enhanced styling */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="relative p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl shadow-sm">
                      <CheckCircle size={22} className="text-green-600" strokeWidth={2} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">Recent Updates</h3>
                      <p className="text-gray-500 text-xs mt-0.5">Latest regulatory changes</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Live
                  </div>
                </div>
                
                {/* Enhanced updates list */}
                <div className="space-y-4">
                  {recentUpdates.map((update, index) => (
                    <div key={index} className="group/item relative p-3 rounded-xl hover:bg-white/60 transition-all duration-200 border border-transparent hover:border-green-100">
                      <div className="flex items-start gap-4">
                        <div className="relative flex-shrink-0">
                          <span className="text-xl drop-shadow-sm">{update.flag}</span>
                          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 text-sm">{update.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              <span className="text-gray-500 text-xs font-medium whitespace-nowrap">{update.timeAgo}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs leading-relaxed">{update.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                              {update.type}
                            </Badge>
                            {update.isCritical && (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                                Critical
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity timeline indicator */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>System monitoring active</span>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      View All Updates →
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