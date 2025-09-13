import React, { useState } from 'react';
import { Check, Filter, Download, Search, ChevronDown, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

// Financial Data for entities
const financialData = [
  {
    entity: 'US HQ',
    revenue: 850000000,
    costs: 450000000,
    profit: 400000000,
    margin: 47.1,
    employees: 1200,
    assets: 320000000,
    region: 'North America'
  },
  {
    entity: 'IPCo (Irish → Singapore)',
    revenue: 1200000000,
    costs: 780000000,
    profit: 420000000,
    margin: 35.0,
    employees: 85,
    assets: 2400000000,
    region: 'EMEA → APAC'
  },
  {
    entity: 'MfgCo',
    revenue: 650000000,
    costs: 590000000,
    profit: 60000000,
    margin: 9.2,
    employees: 2800,
    assets: 450000000,
    region: 'Asia Pacific'
  },
  {
    entity: 'DistCo',
    revenue: 380000000,
    costs: 340000000,
    profit: 40000000,
    margin: 10.5,
    employees: 950,
    assets: 125000000,
    region: 'Europe'
  }
];

// Data structure matching the image provided
const farTableData = [
  // Functions Section
  {
    category: 'Functions',
    items: [
      {
        subCategory: 'Strategic Planning',
        description: 'Long-term strategic planning and decision making',
        usHq: { current: true, future: true },
        ipcs: { current: true, future: true },
        migco: { current: false, future: false },
        distco: { current: false, future: true }
      },
      {
        subCategory: 'Business Development',
        description: 'New market development and expansion strategies',
        usHq: { current: true, future: true },
        ipcs: { current: true, future: true },
        migco: { current: false, future: false },
        distco: { current: false, future: true }
      },
      {
        subCategory: 'Manufacturing Operations',
        description: 'Production planning and manufacturing oversight',
        usHq: { current: false, future: false },
        ipcs: { current: true, future: true },
        migco: { current: true, future: false },
        distco: { current: false, future: false }
      },
      {
        subCategory: 'Quality Control',
        description: 'Product quality assurance and testing',
        usHq: { current: false, future: false },
        ipcs: { current: true, future: true },
        migco: { current: true, future: true },
        distco: { current: true, future: true }
      }
    ]
  },
  // Assets Section
  {
    category: 'Assets',
    items: [
      {
        subCategory: 'Intellectual Property',
        description: 'Patents, trademarks, and proprietary technology',
        usHq: { current: true, future: true },
        ipcs: { current: true, future: true },
        migco: { current: false, future: false },
        distco: { current: false, future: false }
      },
      {
        subCategory: 'Brand Assets',
        description: 'Brand names, logos, and marketing intangibles',
        usHq: { current: true, future: true },
        ipcs: { current: true, future: true },
        migco: { current: false, future: false },
        distco: { current: false, future: false }
      },
      {
        subCategory: 'Manufacturing Equipment',
        description: 'Production machinery and equipment',
        usHq: { current: false, future: false },
        ipcs: { current: true, future: true },
        migco: { current: true, future: false },
        distco: { current: false, future: false }
      },
      {
        subCategory: 'Distribution Network',
        description: 'Distribution channels and customer relationships',
        usHq: { current: false, future: false },
        ipcs: { current: false, future: false },
        migco: { current: false, future: false },
        distco: { current: true, future: true }
      }
    ]
  },
  // Risks Section
  {
    category: 'Risks',
    items: [
      {
        subCategory: 'Market Risk',
        description: 'Risk of market demand fluctuations',
        usHq: { current: true, future: true },
        ipcs: { current: true, future: true },
        migco: { current: false, future: false },
        distco: { current: true, future: true }
      },
      {
        subCategory: 'Manufacturing Risk',
        description: 'Production and operational risk management',
        usHq: { current: false, future: false },
        ipcs: { current: true, future: true },
        migco: { current: true, future: false },
        distco: { current: false, future: false }
      },
      {
        subCategory: 'Credit Risk',
        description: 'Customer payment and credit risk',
        usHq: { current: false, future: false },
        ipcs: { current: false, future: false },
        migco: { current: false, future: false },
        distco: { current: true, future: true }
      },
      {
        subCategory: 'Regulatory Risk',
        description: 'Compliance and regulatory risk management',
        usHq: { current: true, future: true },
        ipcs: { current: true, future: true },
        migco: { current: true, future: true },
        distco: { current: true, future: true }
      }
    ]
  }
];

const CheckIcon = ({ checked }: { checked: boolean }) => {
  if (!checked) return (
    <div className="w-4 h-4 flex items-center justify-center">
      <span className="text-gray-400 text-sm">—</span>
    </div>
  );
  
  return (
    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
      <Check size={10} className="text-white" strokeWidth={2.5} />
    </div>
  );
};

export default function FARAnalysisDataTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Current');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Functions':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          accent: 'bg-blue-500'
        };
      case 'Assets':
        return {
          bg: 'bg-cyan-50',
          text: 'text-cyan-700',
          border: 'border-cyan-200',
          accent: 'bg-cyan-500'
        };
      case 'Risks':
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
          accent: 'bg-orange-500'
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          accent: 'bg-gray-500'
        };
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const filteredData = farTableData.filter(section => {
    // For now, show all data regardless of the view selection
    // The view selection (Current/Future/Side by Side) affects display format, not filtering
    if (searchTerm) {
      return section.items.some(item => 
        item.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Financial Data Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Financial Data Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-semibold text-gray-900 flex items-center space-x-2">
                <DollarSign size={16} className="text-blue-600" />
                <span>Financial Data Overview</span>
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Key financial metrics across entities for <span className="text-blue-600">Transfer Pricing</span> analysis
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-1 h-7 text-xs">
                <TrendingUp size={12} />
                <span>Analytics</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1 h-7 text-xs">
                <Download size={12} />
                <span>Export</span>
              </Button>
            </div>
          </div>

          {/* Financial Summary Stats */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-xs text-gray-600">Total Revenue: {formatCurrency(financialData.reduce((sum, entity) => sum + entity.revenue, 0))}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600">Total Profit: {formatCurrency(financialData.reduce((sum, entity) => sum + entity.profit, 0))}</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs py-0.5">
              4 Entities
            </Badge>
          </div>
        </div>

        {/* Financial Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 bg-white border-b border-r border-gray-200">
                  Entity
                </th>
                <th className="px-3 py-3 text-right text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200">
                  Revenue
                </th>
                <th className="px-3 py-3 text-right text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200">
                  Costs
                </th>
                <th className="px-3 py-3 text-right text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200">
                  Profit
                </th>
                <th className="px-3 py-3 text-right text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200">
                  Margin %
                </th>
                <th className="px-3 py-3 text-right text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200">
                  Employees
                </th>
                <th className="px-3 py-3 text-right text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200">
                  Assets
                </th>
                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 bg-gray-50 border-b border-gray-200">
                  Region
                </th>
              </tr>
            </thead>
            <tbody>
              {financialData.map((entity, index) => (
                <tr key={entity.entity} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100">
                  <td className="px-3 py-3 border-r border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        entity.entity.includes('US HQ') ? 'bg-blue-500' :
                        entity.entity.includes('IPCo') ? 'bg-cyan-500' :
                        entity.entity.includes('MfgCo') ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {entity.entity}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right border-r border-gray-200">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(entity.revenue)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right border-r border-gray-200">
                    <span className="text-sm text-gray-700">
                      {formatCurrency(entity.costs)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right border-r border-gray-200">
                    <span className={`text-sm font-medium ${entity.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(entity.profit)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right border-r border-gray-200">
                    <div className="flex items-center justify-end space-x-2">
                      <span className={`text-sm font-medium ${entity.margin > 30 ? 'text-green-600' : entity.margin > 15 ? 'text-blue-600' : 'text-orange-600'}`}>
                        {entity.margin.toFixed(1)}%
                      </span>
                      <div className={`w-12 h-2 rounded-full ${entity.margin > 30 ? 'bg-green-100' : entity.margin > 15 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                        <div 
                          className={`h-full rounded-full ${entity.margin > 30 ? 'bg-green-500' : entity.margin > 15 ? 'bg-blue-500' : 'bg-orange-500'}`}
                          style={{ width: `${Math.min(entity.margin, 50)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-right border-r border-gray-200">
                    <span className="text-sm text-gray-700">
                      {formatNumber(entity.employees)}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right border-r border-gray-200">
                    <span className="text-sm text-gray-700">
                      {formatCurrency(entity.assets)}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-gray-600">
                      {entity.region}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Financial Data Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <span>Showing {financialData.length} entities</span>
              <span>•</span>
              <span>Avg Margin: {(financialData.reduce((sum, entity) => sum + entity.margin, 0) / financialData.length).toFixed(1)}%</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>Data as of: Q4 2024</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* FAR Analysis Matrix */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Compact Table Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                <span className="text-blue-600">Transfer Pricing</span> FAR Analysis Matrix
              </h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Detailed mapping of Functions, Assets, and Risks across entities
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="flex items-center space-x-1 h-7 text-xs">
                <Filter size={12} />
                <span>Filter</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-1 h-7 text-xs">
                <Download size={12} />
                <span>Export</span>
              </Button>
            </div>
          </div>

          {/* Compact Search and Filter Controls */}
          <div className="flex items-center space-x-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 h-7 text-xs bg-white border-gray-200"
              />
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-600">Category:</span>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-2 py-1 border border-gray-200 rounded text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Current">Current</option>
                <option value="Future">Future</option>
                <option value="Side by Side">Side by Side</option>
              </select>
            </div>
          </div>

          {/* Compact Statistics Row */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-xs text-gray-600">Functions: 4</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                <span className="text-xs text-gray-600">Assets: 4</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                <span className="text-xs text-gray-600">Risks: 4</span>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs py-0.5">
              12 Total
            </Badge>
          </div>
        </div>

        {/* Clean Professional Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Compact Column Headers */}
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 bg-white border-b border-r border-gray-200 w-48">
                  Category & Item
                </th>
                <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 bg-white border-b border-r border-gray-200 w-80">
                  Description
                </th>
                {selectedCategory === 'Side by Side' ? (
                  <>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">US HQ</div>
                        <div className="h-4"></div>
                        <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                          <div className="text-center border-r border-gray-300 py-1">Current</div>
                          <div className="text-center py-1">Future</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">IPCo</div>
                        <div className="text-xs text-gray-600 font-normal h-4">Irish → Singapore</div>
                        <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                          <div className="text-center border-r border-gray-300 py-1">Current</div>
                          <div className="text-center py-1">Future</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">MfgCo</div>
                        <div className="h-4"></div>
                        <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                          <div className="text-center border-r border-gray-300 py-1">Current</div>
                          <div className="text-center py-1">Future</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-gray-200 w-32">
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">Distr Co</div>
                        <div className="h-4"></div>
                        <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                          <div className="text-center border-r border-gray-300 py-1">Current</div>
                          <div className="text-center py-1">Future</div>
                        </div>
                      </div>
                    </th>
                  </>
                ) : (
                  <>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-24">
                      <div className="text-sm font-semibold">US HQ</div>
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-24">
                      <div className="space-y-1">
                        <div className="text-sm font-semibold">IPCo</div>
                        <div className="text-xs text-gray-600 font-normal">Irish → Singapore</div>
                      </div>
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-24">
                      <div className="text-sm font-semibold">MfgCo</div>
                    </th>
                    <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-gray-200 w-24">
                      <div className="text-sm font-semibold">Distr Co</div>
                    </th>
                  </>
                )}
              </tr>
            </thead>

            {/* Clean Table Body */}
            <tbody>
              {filteredData.map((section, sectionIndex) => (
                <React.Fragment key={section.category}>
                  {/* Compact Category Header Row */}
                  <tr className="bg-gray-50/50">
                    <td colSpan={6} className="px-3 py-2 border-b border-gray-200">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getCategoryColor(section.category).accent}`}></div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${getCategoryColor(section.category).bg} ${getCategoryColor(section.category).text}`}>
                          {section.category}
                        </span>
                        <span className="text-xs text-gray-500 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                          {section.items.length}
                        </span>
                      </div>
                    </td>
                  </tr>
                  
                  {/* Compact Data Rows */}
                  {section.items.map((item, itemIndex) => (
                    <tr 
                      key={`${section.category}-${itemIndex}`} 
                      className="hover:bg-gray-50/50 transition-colors group border-b border-gray-100"
                    >
                      <td className="px-3 py-3 border-r border-gray-200">
                        <div className="flex items-start space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${getCategoryColor(section.category).accent} opacity-70`}></div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                              {item.subCategory}
                            </div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              {section.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 border-r border-gray-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {item.description}
                        </p>
                      </td>
                      {selectedCategory === 'Side by Side' ? (
                        <>
                          <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                            <div className="grid grid-cols-2 gap-0 h-6">
                              <div className="flex justify-center items-center border-r border-gray-300">
                                <CheckIcon checked={item.usHq.current} />
                              </div>
                              <div className="flex justify-center items-center">
                                <CheckIcon checked={item.usHq.future} />
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                            <div className="grid grid-cols-2 gap-0 h-6">
                              <div className="flex justify-center items-center border-r border-gray-300">
                                <CheckIcon checked={item.ipcs.current} />
                              </div>
                              <div className="flex justify-center items-center">
                                <CheckIcon checked={item.ipcs.future} />
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                            <div className="grid grid-cols-2 gap-0 h-6">
                              <div className="flex justify-center items-center border-r border-gray-300">
                                <CheckIcon checked={item.migco.current} />
                              </div>
                              <div className="flex justify-center items-center">
                                <CheckIcon checked={item.migco.future} />
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-3 bg-gray-50/30">
                            <div className="grid grid-cols-2 gap-0 h-6">
                              <div className="flex justify-center items-center border-r border-gray-300">
                                <CheckIcon checked={item.distco.current} />
                              </div>
                              <div className="flex justify-center items-center">
                                <CheckIcon checked={item.distco.future} />
                              </div>
                            </div>
                          </td>
                        </>
                      ) : selectedCategory === 'Current' ? (
                        <>
                          <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                            <div className="flex justify-center items-center h-6">
                              <CheckIcon checked={item.usHq.current} />
                            </div>
                          </td>
                          <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                            <div className="flex justify-center items-center h-6">
                              <CheckIcon checked={item.ipcs.current} />
                            </div>
                          </td>
                          <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                            <div className="flex justify-center items-center h-6">
                              <CheckIcon checked={item.migco.current} />
                            </div>
                          </td>
                          <td className="px-2 py-3 bg-gray-50/30">
                            <div className="flex justify-center items-center h-6">
                              <CheckIcon checked={item.distco.current} />
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                            <div className="flex justify-center items-center h-6">
                              <CheckIcon checked={item.usHq.future} />
                            </div>
                          </td>
                          <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                            <div className="flex justify-center items-center h-6">
                              <CheckIcon checked={item.ipcs.future} />
                            </div>
                          </td>
                          <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                            <div className="flex justify-center items-center h-6">
                              <CheckIcon checked={item.migco.future} />
                            </div>
                          </td>
                          <td className="px-2 py-3 bg-gray-50/30">
                            <div className="flex justify-center items-center h-6">
                              <CheckIcon checked={item.distco.future} />
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compact Footer */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <span>Showing {filteredData.reduce((acc, section) => acc + section.items.length, 0)} of 12 items</span>
              {searchTerm && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs py-0.5">
                  Filtered: "{searchTerm}"
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>Updated: Today</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}