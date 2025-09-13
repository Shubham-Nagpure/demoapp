import React from 'react';
import { DollarSign, TrendingUp, Calculator, Percent } from 'lucide-react';
import PageHeader from "./PageHeader";
import ETRAnalysisTable from "./ETRAnalysisTable";

// Financial data
const financialMetrics = [
  {
    title: 'Sales Total',
    value: '$150.00M',
    subtitle: 'Total revenue across entities',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: 'Net Profit Before Tax',
    value: '$47.00M',
    subtitle: 'Pre-tax profitability',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Net Profit After Tax',
    value: '$8.67M',
    subtitle: 'After-tax earnings',
    icon: Calculator,
    color: 'from-purple-500 to-violet-600',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Effective Tax Rate (ETR)',
    value: '18.4%',
    subtitle: 'Weighted average tax rate',
    icon: Percent,
    color: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600'
  }
];

export default function ProfitabilityAnalysis() {
  return (
    <div className="h-full overflow-auto bg-white">
      <PageHeader 
        title="Profitability Analysis"
        module="plan"
        tool="profitability"
      />
      
      <div className="bg-gray-50/30 min-h-[calc(100vh-120px)]">
        <div className="p-8 max-w-7xl mx-auto">
          
          {/* Financial Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {financialMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${metric.iconBg}`}>
                      <IconComponent size={20} className={metric.iconColor} strokeWidth={2} />
                    </div>
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

          {/* ETR Analysis Matrix */}
          <div className="mb-8">
            <ETRAnalysisTable />
          </div>

          {/* Analysis Summary */}
          <div className="mt-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
                  <Calculator size={20} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
                  <p className="text-gray-600 text-sm">Transfer pricing profitability analysis summary</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Revenue Distribution</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Singapore generates 56.7% of total revenue ($85M) while USA contributes 43.3% ($65M), 
                    indicating strong Asia-Pacific market performance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Profit Efficiency</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Singapore shows higher profit conversion (71.8% of total net profit) despite similar gross margins, 
                    suggesting operational efficiency advantages.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Tax Optimization</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Effective tax rate of 18.4% reflects balanced allocation strategy between Singapore (17%) 
                    and USA (21%) jurisdictions.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}