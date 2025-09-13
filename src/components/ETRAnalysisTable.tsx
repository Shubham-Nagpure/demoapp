import React, { useState } from 'react';
import { Filter, Download, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

// ETR Analysis data structure based on the provided images
const etrTableData = [
  {
    category: 'Income',
    items: [
      {
        subCategory: 'Sales',
        description: 'Revenue from product sales',
        usa: { current: '', future: '' },
        ireland: { current: 110.85, future: 78.75 },
        china: { current: 110.85, future: 231 },
        singapore: { current: 100, future: 100 },
        australia: { current: 100, future: 100 },
        uk: { current: 100, future: 100 },
        japan: { current: '', future: '' },
        total: { current: '', future: '' }
      },
      {
        subCategory: 'Licensing Income',
        description: 'Income from licensing agreements',
        usa: { current: 6.651, future: 6.93 },
        ireland: { current: 11.09, future: 11.55 },
        china: { current: '', future: '' },
        singapore: { current: '', future: '' },
        australia: { current: '', future: '' },
        uk: { current: '', future: '' },
        japan: { current: '', future: '' },
        total: { current: 17.74, future: 18.48 }
      },
      {
        subCategory: 'Management Fees',
        description: 'Management service fees',
        usa: { current: 10.5, future: 10.5 },
        ireland: { current: '', future: '' },
        china: { current: '', future: '' },
        singapore: { current: '', future: '' },
        australia: { current: '', future: '' },
        uk: { current: '', future: '' },
        japan: { current: '', future: '' },
        total: { current: 10.5, future: 10.5 }
      }
    ]
  },
  {
    category: 'Costs',
    items: [
      {
        subCategory: 'Cost of Goods Sold',
        description: 'Direct costs of production',
        usa: { current: '', future: '' },
        ireland: { current: -70, future: -75 },
        china: { current: -70, future: -78.75 },
        singapore: { current: -73.9, future: -77 },
        australia: { current: -73.9, future: -77 },
        uk: { current: -73.9, future: -77 },
        japan: { current: '', future: '' },
        total: { current: -361.7, future: -384.75 }
      },
      {
        subCategory: 'Other Costs',
        description: 'Additional operational costs',
        usa: { current: '', future: '' },
        ireland: { current: '', future: '' },
        china: { current: '', future: -65 },
        singapore: { current: '', future: '' },
        australia: { current: '', future: '' },
        uk: { current: '', future: '' },
        japan: { current: '', future: '' },
        total: { current: '', future: -65 }
      }
    ]
  },
  {
    category: 'Opex',
    items: [
      {
        subCategory: 'Gross Profit',
        description: 'Revenue minus cost of goods sold',
        usa: { current: 17.151, future: 17.43 },
        ireland: { current: 11.085, future: '' },
        china: { current: 40.85, future: 3.75 },
        singapore: { current: 40.85, future: 87.25 },
        australia: { current: 26.1, future: 23 },
        uk: { current: 26.1, future: 23 },
        japan: { current: 26.1, future: 23 },
        total: { current: 188.24, future: 177.43 }
      },
      {
        subCategory: 'Management Fees',
        description: 'Management fee expenses',
        usa: { current: 10, future: 10 },
        ireland: { current: '', future: '' },
        china: { current: 2.1, future: '' },
        singapore: { current: 2.1, future: 10.5 },
        australia: { current: 2.1, future: '' },
        uk: { current: 2.1, future: '' },
        japan: { current: 2.1, future: '' },
        total: { current: 20.5, future: 20.5 }
      },
      {
        subCategory: 'License Fees',
        description: 'License fee expenses',
        usa: { current: '', future: '' },
        ireland: { current: 6.65, future: 6.93 },
        china: { current: 5.54, future: '' },
        singapore: { current: 5.54, future: 11.55 },
        australia: { current: '', future: '' },
        uk: { current: '', future: '' },
        japan: { current: '', future: '' },
        total: { current: 17.74, future: 18.48 }
      },
      {
        subCategory: 'Opex',
        description: 'Operating expenses',
        usa: { current: '', future: '' },
        ireland: { current: '', future: '' },
        china: { current: 20, future: '' },
        singapore: { current: 20, future: 34 },
        australia: { current: 19, future: 21 },
        uk: { current: 19, future: 21 },
        japan: { current: 19, future: 21 },
        total: { current: 97, future: 97 }
      }
    ]
  },
  {
    category: 'Profitability',
    items: [
      {
        subCategory: 'Net Profit before Tax',
        description: 'Profit before tax deductions',
        usa: { current: 7.151, future: 7.43 },
        ireland: { current: 4.434, future: 4.62 },
        china: { current: 13.2075, future: 3.75 },
        singapore: { current: 13.2075, future: 31.2 },
        australia: { current: 5, future: 2 },
        uk: { current: 5, future: 2 },
        japan: { current: 5, future: 2 },
        total: { current: 53, future: 53 }
      }
    ]
  },
  {
    category: 'Tax',
    items: [
      {
        subCategory: 'Tax Rate',
        description: 'Applicable tax rate percentage',
        usa: { current: '25%', future: '25%' },
        ireland: { current: '12.5%', future: '12.5%' },
        china: { current: '25%', future: '25%' },
        singapore: { current: '17%', future: '10%' },
        australia: { current: '30%', future: '30%' },
        uk: { current: '25%', future: '25%' },
        japan: { current: '30%', future: '30%' },
        total: { current: '', future: '' }
      },
      {
        subCategory: 'Net Profit after Tax',
        description: 'Final profit after tax',
        usa: { current: 1.78775, future: 1.8575 },
        ireland: { current: 0.55425, future: 0.5775 },
        china: { current: 3.301875, future: 0.9375 },
        singapore: { current: 2.245275, future: 3.12 },
        australia: { current: 1.5, future: 0.6 },
        uk: { current: 1.25, future: 0.5 },
        japan: { current: 1.5, future: 0.6 },
        total: { current: 12.14, future: 8.1925 }
      },
      {
        subCategory: 'Effective Tax Rate (ETR)',
        description: 'Actual effective tax rate',
        usa: { current: '', future: '' },
        ireland: { current: '', future: '' },
        china: { current: '', future: '' },
        singapore: { current: '', future: '' },
        australia: { current: '', future: '' },
        uk: { current: '', future: '' },
        japan: { current: '', future: '' },
        total: { current: '22.9%', future: '15.5%' }
      }
    ]
  }
];

const formatValue = (value: any) => {
  if (value === '' || value === null || value === undefined) {
    return '—';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  return value;
};

export default function ETRAnalysisTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Income':
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          accent: 'bg-green-500'
        };
      case 'Costs':
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          accent: 'bg-red-500'
        };
      case 'Opex':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          accent: 'bg-blue-500'
        };
      case 'Profitability':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          border: 'border-purple-200',
          accent: 'bg-purple-500'
        };
      case 'Tax':
        return {
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          border: 'border-amber-200',
          accent: 'bg-amber-500'
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

  const filteredData = etrTableData.filter(section => {
    if (selectedCategory !== 'All' && section.category !== selectedCategory) {
      return false;
    }
    if (searchTerm) {
      return section.items.some(item => 
        item.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              <span className="text-blue-600">Transfer Pricing</span> ETR Analysis Matrix
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Detailed financial analysis across entities with current and future scenarios
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

        {/* Search and Filter Controls */}
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
              <option value="All">All</option>
              <option value="Income">Income</option>
              <option value="Costs">Costs</option>
              <option value="Opex">Opex</option>
              <option value="Profitability">Profitability</option>
              <option value="Tax">Tax</option>
            </select>
          </div>
        </div>

        {/* Statistics Row */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-600">Income: 3</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-600">Costs: 2</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">Opex: 4</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
              <span className="text-xs text-gray-600">Profitability: 1</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              <span className="text-xs text-gray-600">Tax: 3</span>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs py-0.5">
            13 Total
          </Badge>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Column Headers */}
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 bg-white border-b border-r border-gray-200 w-48">
                Category & Item
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900 bg-white border-b border-r border-gray-200 w-80">
                Description
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">USA</div>
                  <div className="h-4"></div>
                  <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                    <div className="text-center border-r border-gray-300 py-1">Current</div>
                    <div className="text-center py-1">Future</div>
                  </div>
                </div>
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Ireland</div>
                  <div className="h-4"></div>
                  <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                    <div className="text-center border-r border-gray-300 py-1">Current</div>
                    <div className="text-center py-1">Future</div>
                  </div>
                </div>
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">China</div>
                  <div className="h-4"></div>
                  <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                    <div className="text-center border-r border-gray-300 py-1">Current</div>
                    <div className="text-center py-1">Future</div>
                  </div>
                </div>
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Singapore</div>
                  <div className="h-4"></div>
                  <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                    <div className="text-center border-r border-gray-300 py-1">Current</div>
                    <div className="text-center py-1">Future</div>
                  </div>
                </div>
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Australia</div>
                  <div className="h-4"></div>
                  <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                    <div className="text-center border-r border-gray-300 py-1">Current</div>
                    <div className="text-center py-1">Future</div>
                  </div>
                </div>
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">UK</div>
                  <div className="h-4"></div>
                  <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                    <div className="text-center border-r border-gray-300 py-1">Current</div>
                    <div className="text-center py-1">Future</div>
                  </div>
                </div>
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-gray-50 border-b border-r border-gray-200 w-32">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Japan</div>
                  <div className="h-4"></div>
                  <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                    <div className="text-center border-r border-gray-300 py-1">Current</div>
                    <div className="text-center py-1">Future</div>
                  </div>
                </div>
              </th>
              <th className="px-2 py-3 text-center text-sm font-semibold text-gray-900 bg-yellow-50 border-b border-gray-200 w-32">
                <div className="space-y-2">
                  <div className="text-sm font-semibold">Total</div>
                  <div className="h-4"></div>
                  <div className="grid grid-cols-2 gap-0 text-xs text-gray-600">
                    <div className="text-center border-r border-gray-300 py-1">Current</div>
                    <div className="text-center py-1">Future</div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredData.map((section, sectionIndex) => (
              <React.Fragment key={section.category}>
                {/* Category Header Row */}
                <tr className="bg-gray-50/50">
                  <td colSpan={11} className="px-3 py-2 border-b border-gray-200">
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
                
                {/* Data Rows */}
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
                    <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                      <div className="grid grid-cols-2 gap-0 h-6">
                        <div className="flex justify-center items-center border-r border-gray-300 text-xs text-gray-700">
                          {formatValue(item.usa.current)}
                        </div>
                        <div className="flex justify-center items-center text-xs text-gray-700">
                          {formatValue(item.usa.future)}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                      <div className="grid grid-cols-2 gap-0 h-6">
                        <div className="flex justify-center items-center border-r border-gray-300 text-xs text-gray-700">
                          {formatValue(item.ireland.current)}
                        </div>
                        <div className="flex justify-center items-center text-xs text-gray-700">
                          {formatValue(item.ireland.future)}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                      <div className="grid grid-cols-2 gap-0 h-6">
                        <div className="flex justify-center items-center border-r border-gray-300 text-xs text-gray-700">
                          {formatValue(item.china.current)}
                        </div>
                        <div className="flex justify-center items-center text-xs text-gray-700">
                          {formatValue(item.china.future)}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                      <div className="grid grid-cols-2 gap-0 h-6">
                        <div className="flex justify-center items-center border-r border-gray-300 text-xs text-gray-700">
                          {formatValue(item.singapore.current)}
                        </div>
                        <div className="flex justify-center items-center text-xs text-gray-700">
                          {formatValue(item.singapore.future)}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                      <div className="grid grid-cols-2 gap-0 h-6">
                        <div className="flex justify-center items-center border-r border-gray-300 text-xs text-gray-700">
                          {formatValue(item.australia.current)}
                        </div>
                        <div className="flex justify-center items-center text-xs text-gray-700">
                          {formatValue(item.australia.future)}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                      <div className="grid grid-cols-2 gap-0 h-6">
                        <div className="flex justify-center items-center border-r border-gray-300 text-xs text-gray-700">
                          {formatValue(item.uk.current)}
                        </div>
                        <div className="flex justify-center items-center text-xs text-gray-700">
                          {formatValue(item.uk.future)}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 bg-gray-50/30 border-r border-gray-200">
                      <div className="grid grid-cols-2 gap-0 h-6">
                        <div className="flex justify-center items-center border-r border-gray-300 text-xs text-gray-700">
                          {formatValue(item.japan.current)}
                        </div>
                        <div className="flex justify-center items-center text-xs text-gray-700">
                          {formatValue(item.japan.future)}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 bg-yellow-50/80 border-gray-200">
                      <div className="grid grid-cols-2 gap-0 h-6">
                        <div className="flex justify-center items-center border-r border-gray-300 text-xs font-medium text-gray-900">
                          {formatValue(item.total.current)}
                        </div>
                        <div className="flex justify-center items-center text-xs font-medium text-gray-900">
                          {formatValue(item.total.future)}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-xs text-gray-600">
            <span>Showing {filteredData.reduce((acc, section) => acc + section.items.length, 0)} of 13 items</span>
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
  );
}