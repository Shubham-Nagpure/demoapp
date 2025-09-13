import { useState } from 'react';
import { CheckCircle, AlertTriangle, Clock, Download, Settings, ChevronDown, BarChart3, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import PageHeader from './PageHeader';

interface FinancialData {
  particulars: string;
  usa: string | number;
  ireland: string | number;
  china: string | number;
  singapore: string | number;
  australia: string | number;
  uk: string | number;
  japan: string | number;
  total: string | number;
}

interface ResolutionItem {
  title: string;
  description: string;
  status: 'resolved' | 'open' | 'ignored';
  priority: 'high' | 'low';
  recordsAffected?: number;
  autoResolved?: boolean;
}

const ErrorResolutionPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const financialData: FinancialData[] = [
    {
      particulars: 'Sales/Income',
      usa: 5,
      ireland: 8,
      china: 82.5,
      singapore: 82.5,
      australia: 100,
      uk: 100,
      japan: 100,
      total: 478
    },
    {
      particulars: 'Management fees',
      usa: 105,
      ireland: '-',
      china: '-',
      singapore: '-',
      australia: '-',
      uk: '-',
      japan: '-',
      total: 105
    },
    {
      particulars: 'Cost of Goods Sold',
      usa: '-',
      ireland: '-',
      china: -30,
      singapore: -30,
      australia: -55,
      uk: -55,
      japan: -55,
      total: -225
    },
    {
      particulars: 'Gross Profit',
      usa: 110,
      ireland: 8,
      china: 52.5,
      singapore: 52.5,
      australia: 45,
      uk: 45,
      japan: 45,
      total: 358
    },
    {
      particulars: 'Management Fees',
      usa: 100,
      ireland: '-',
      china: 21,
      singapore: 21,
      australia: 21,
      uk: 21,
      japan: 21,
      total: 205
    },
    {
      particulars: 'License Fees',
      usa: '-',
      ireland: 5,
      china: 4,
      singapore: 4,
      australia: '-',
      uk: '-',
      japan: '-',
      total: 13
    },
    {
      particulars: 'Opex',
      usa: '-',
      ireland: '-',
      china: 20,
      singapore: 20,
      australia: 21,
      uk: 21,
      japan: 21,
      total: 103
    },
    {
      particulars: 'Net Profit before tax',
      usa: 10,
      ireland: 3,
      china: 7.5,
      singapore: 7.5,
      australia: 3,
      uk: 3,
      japan: 3,
      total: 37
    },
    {
      particulars: 'Tax rate',
      usa: '21%',
      ireland: '12.5%',
      china: '25%',
      singapore: '17%',
      australia: '30%',
      uk: '25%',
      japan: '30%',
      total: ''
    }
  ];

  const resolutionItems: ResolutionItem[] = [
    {
      title: 'Duplicate Transaction Records',
      description: 'Found 23 potential duplicate transactions',
      status: 'open',
      priority: 'high',
      recordsAffected: 23
    },
    {
      title: 'Missing Functional Currency',
      description: 'Entity records missing functional currency data',
      status: 'resolved',
      priority: 'high',
      recordsAffected: 8,
      autoResolved: true
    },
    {
      title: 'Inconsistent Date Formats',
      description: 'Mixed date formats across transaction files',
      status: 'ignored',
      priority: 'low',
      recordsAffected: 156
    },
    {
      title: 'Misc Column Data Issues',
      description: 'Previously flagged inconsistencies in Misc column data have been resolved automatically',
      status: 'resolved',
      priority: 'low',
      autoResolved: true
    }
  ];

  const formatValue = (value: string | number) => {
    if (value === '-') return value;
    if (typeof value === 'number') {
      if (value < 0) {
        return <span className="text-red-500">{value}</span>;
      }
      return value;
    }
    if (typeof value === 'string' && value.includes('%')) {
      return value;
    }
    return value;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'open':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'ignored':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="h-full bg-white">
      <PageHeader 
        title="Error Resolution" 
        icon={AlertTriangle}
        description="Monitor and resolve data quality issues"
      />
      
      <div className="p-6 space-y-6 overflow-auto h-[calc(100vh-120px)]">
        {/* Corrected Financial Data Section */}
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    Error Resolution - Corrected Financial Data
                    <Badge className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Resolved
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-green-700 mt-1">All data quality issues have been automatically resolved</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900 min-w-[180px] sticky left-0 bg-gray-50 border-r border-gray-200">Particulars</th>
                    <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">USA</th>
                    <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">Ireland</th>
                    <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">China</th>
                    <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">Singapore</th>
                    <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">Australia</th>
                    <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">UK</th>
                    <th className="text-right p-4 font-medium text-gray-900 min-w-[100px]">Japan</th>
                    <th className="text-right p-4 font-medium text-gray-900 min-w-[100px] bg-blue-50 border-l-2 border-blue-200">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {financialData.map((row, index) => (
                    <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      row.particulars === 'Gross Profit' || row.particulars === 'Net Profit before tax' ? 'bg-gray-50' : ''
                    }`}>
                      <td className="p-4 font-medium text-gray-900 sticky left-0 bg-white border-r border-gray-100">{row.particulars}</td>
                      <td className="p-4 text-right text-gray-900">{formatValue(row.usa)}</td>
                      <td className="p-4 text-right text-gray-900">{formatValue(row.ireland)}</td>
                      <td className="p-4 text-right text-gray-900">{formatValue(row.china)}</td>
                      <td className="p-4 text-right text-gray-900">{formatValue(row.singapore)}</td>
                      <td className="p-4 text-right text-gray-900">{formatValue(row.australia)}</td>
                      <td className="p-4 text-right text-gray-900">{formatValue(row.uk)}</td>
                      <td className="p-4 text-right text-gray-900">{formatValue(row.japan)}</td>
                      <td className={`p-4 text-right font-bold text-gray-900 bg-blue-50 border-l-2 border-blue-200 ${
                        row.particulars === 'Gross Profit' || row.particulars === 'Net Profit before tax' ? 'bg-blue-100' : ''
                      }`}>
                        {formatValue(row.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Data Quality Status */}
            <div className="border-t border-gray-200 bg-green-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Data Quality: Excellent</p>
                    <p className="text-sm text-green-700">All validation rules passed • Ready for analysis</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm text-green-700">Issues Resolved</div>
                    <div className="font-bold text-green-900">8/8</div>
                  </div>
                  <div className="w-16 h-2 bg-green-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-green-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section for TP Rules */}
        <Card className="shadow-sm border border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Settings className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Configure <span className="text-blue-600">Transfer Pricing</span> Rules</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Set up automated TP compliance rules to prevent future data quality issues
                  </p>
                </div>
              </div>
              <Button className="btn-primary-gradient">
                <Settings className="h-4 w-4 mr-2" />
                Set TP Rules
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resolution Status Section */}
        <div className="grid grid-cols-1 gap-6">
          {/* Resolution Status */}
          <Card className="shadow-lg border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Resolution Status</CardTitle>
                    <p className="text-sm text-gray-600">Track and manage resolved data issues</p>
                  </div>
                </div>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-32 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Ignored">Ignored</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 p-6">
              {resolutionItems.map((item, index) => (
                <div key={index} className={`border rounded-xl p-4 transition-all hover:shadow-md ${
                  item.status === 'resolved' ? 'border-green-200 bg-green-50' :
                  item.status === 'open' ? 'border-red-200 bg-red-50' :
                  'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        item.status === 'resolved' ? 'bg-green-100' :
                        item.status === 'open' ? 'bg-red-100' :
                        'bg-gray-100'
                      }`}>
                        {item.status === 'resolved' && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {item.status === 'open' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                        {item.status === 'ignored' && <Clock className="h-4 w-4 text-gray-500" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getPriorityColor(item.priority)} variant="outline">
                        {item.priority}
                      </Badge>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {item.recordsAffected && (
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-md border">
                          {item.recordsAffected} records affected
                        </div>
                      </div>
                    )}
                    {item.autoResolved && (
                      <div className="flex items-center gap-2 text-xs text-green-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Auto-resolved via system validation engine
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>


        </div>
      </div>
    </div>
  );
};

export default ErrorResolutionPage;