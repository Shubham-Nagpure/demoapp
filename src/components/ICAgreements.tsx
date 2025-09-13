import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Upload, 
  Download, 
  Filter, 
  Search,
  MapPin,
  BarChart3,
  PieChart,
  Calendar,
  Globe,
  AlertCircle,
  Eye,
  ShoppingCart,
  RefreshCw
} from 'lucide-react';
import PageHeader from "./PageHeader";
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, LineChart, Line } from 'recharts';
import { CartItem } from '../App';

// Sample data for IC Agreements
const agreementsData = [
  {
    id: 1,
    providerCountry: 'Singapore',
    recipientCountry: 'USA',
    transactionType: 'IP Licensing',
    hasAgreement: true,
    status: 'Completed',
    expiryDate: '2025-12-31',
    riskFlag: 'Low',
    documentUrl: '#',
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    providerCountry: 'USA',
    recipientCountry: 'Germany',
    transactionType: 'Manufacturing Services',
    hasAgreement: true,
    status: 'Pending',
    expiryDate: '2024-06-30',
    riskFlag: 'High',
    documentUrl: null,
    lastUpdated: '2024-02-01'
  },
  {
    id: 3,
    providerCountry: 'Singapore',
    recipientCountry: 'Japan',
    transactionType: 'R&D Services',
    hasAgreement: false,
    status: 'Pending',
    expiryDate: null,
    riskFlag: 'Critical',
    documentUrl: null,
    lastUpdated: '2024-01-20'
  },
  {
    id: 4,
    providerCountry: 'Germany',
    recipientCountry: 'Singapore',
    transactionType: 'Shared Services',
    hasAgreement: true,
    status: 'Completed',
    expiryDate: '2025-03-15',
    riskFlag: 'Low',
    documentUrl: '#',
    lastUpdated: '2024-01-10'
  },
  {
    id: 5,
    providerCountry: 'Japan',
    recipientCountry: 'USA',
    transactionType: 'Distribution Agreement',
    hasAgreement: true,
    status: 'Expiring Soon',
    expiryDate: '2024-04-30',
    riskFlag: 'Medium',
    documentUrl: '#',
    lastUpdated: '2024-02-05'
  },
  {
    id: 6,
    providerCountry: 'USA',
    recipientCountry: 'Singapore',
    transactionType: 'Management Fee',
    hasAgreement: true,
    status: 'Completed',
    expiryDate: '2025-08-20',
    riskFlag: 'Low',
    documentUrl: '#',
    lastUpdated: '2024-01-25'
  },
  {
    id: 7,
    providerCountry: 'Singapore',
    recipientCountry: 'Germany',
    transactionType: 'IP Licensing',
    hasAgreement: false,
    status: 'Pending',
    expiryDate: null,
    riskFlag: 'Critical',
    documentUrl: null,
    lastUpdated: '2024-02-10'
  },
  {
    id: 8,
    providerCountry: 'Germany',
    recipientCountry: 'Japan',
    transactionType: 'Manufacturing Services',
    hasAgreement: true,
    status: 'Pending',
    expiryDate: '2024-09-15',
    riskFlag: 'Medium',
    documentUrl: null,
    lastUpdated: '2024-01-30'
  }
];

// KPI calculations
const totalAgreements = agreementsData.length;
const completedAgreements = agreementsData.filter(a => a.status === 'Completed').length;
const pendingAgreements = agreementsData.filter(a => a.status === 'Pending').length;
const expiringSoonAgreements = agreementsData.filter(a => a.status === 'Expiring Soon').length;

// Chart data - updated colors to match reference design
const statusBreakdownData = [
  { name: 'Completed', value: completedAgreements, color: '#8b5cf6', percentage: Math.round((completedAgreements / totalAgreements) * 100) },
  { name: 'Pending', value: pendingAgreements, color: '#fb7185', percentage: Math.round((pendingAgreements / totalAgreements) * 100) },
  { name: 'Expiring Soon', value: expiringSoonAgreements, color: '#3b82f6', percentage: Math.round((expiringSoonAgreements / totalAgreements) * 100) }
];



const transactionTypeData = [
  { type: 'IP Licensing', count: 2 },
  { type: 'Manufacturing Services', count: 2 },
  { type: 'R&D Services', count: 1 },
  { type: 'Shared Services', count: 1 },
  { type: 'Distribution Agreement', count: 1 },
  { type: 'Management Fee', count: 1 }
];

const countryActivityData = [
  { country: 'Singapore', agreements: 4, risk: 'Medium' },
  { country: 'USA', agreements: 4, risk: 'Low' },
  { country: 'Germany', agreements: 3, risk: 'Medium' },
  { country: 'Japan', agreements: 2, risk: 'High' }
];

const riskDistributionData = [
  { risk: 'Low', count: 3, color: '#10b981' },
  { risk: 'Medium', count: 2, color: '#f59e0b' },
  { risk: 'High', count: 1, color: '#f97316' },
  { risk: 'Critical', count: 2, color: '#ef4444' }
];

interface ICAgreementsProps {
  onAddToCart: (item: CartItem) => void;
}

export default function ICAgreements({ onAddToCart }: ICAgreementsProps) {
  const [filters, setFilters] = useState({
    providerCountry: 'all',
    recipientCountry: 'all',
    transactionType: 'all',
    status: 'all',
    dateRange: 'all'
  });

  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    const styles = {
      'Completed': 'bg-green-100 text-green-800 border-green-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Expiring Soon': 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getRiskBadge = (risk: string) => {
    const styles = {
      'Low': 'bg-green-100 text-green-800 border-green-200',
      'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'High': 'bg-orange-100 text-orange-800 border-orange-200',
      'Critical': 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[risk as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="h-full overflow-auto bg-white">
      <PageHeader 
        title="IC Agreements"
        module="plan"
        tool="ic-agreements"
      />
      
      <div className="bg-gray-50/30 min-h-[calc(100vh-120px)]">
        <div className="p-8 max-w-7xl mx-auto">
          


          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Search agreements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Filter size={16} className="text-gray-500" />
              <Select value={filters.providerCountry} onValueChange={(value) => setFilters({...filters, providerCountry: value})}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Provider Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="japan">Japan</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.transactionType} onValueChange={(value) => setFilters({...filters, transactionType: value})}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ip-licensing">IP Licensing</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="rd-services">R&D Services</SelectItem>
                  <SelectItem value="shared-services">Shared Services</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expiring">Expiring Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Enhanced Agreements Table */}
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <FileText size={20} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Inter-Company Agreements</h2>
                  <p className="text-gray-600">Manage and track all IC agreements across jurisdictions</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">Provider Country</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">Recipient Country</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">Transaction Type</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">IC Agreement</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">Status</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">Expiry Date</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">Risk Flag</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">Document</th>
                      <th className="text-center py-3 px-4 text-xs font-semibold text-gray-700 whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agreementsData.map((agreement) => (
                      <tr key={agreement.id} className="border-b border-gray-25 hover:bg-gray-25/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Globe size={14} className="text-blue-500" />
                            <span className="font-medium text-gray-900 text-xs">{agreement.providerCountry}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Globe size={14} className="text-cyan-500" />
                            <span className="text-gray-700 text-xs">{agreement.recipientCountry}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-gray-700 text-xs">{agreement.transactionType}</span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {agreement.hasAgreement ? (
                            <CheckCircle size={16} className="text-green-500 mx-auto" />
                          ) : (
                            <AlertCircle size={16} className="text-red-500 mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge className={`text-xs ${getStatusBadge(agreement.status)}`}>
                            {agreement.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-xs text-gray-600">
                            {agreement.expiryDate || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge className={`text-xs ${getRiskBadge(agreement.riskFlag)}`}>
                            {agreement.riskFlag}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {agreement.documentUrl ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Eye size={14} className="text-blue-500" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Document</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <Upload size={14} className="text-gray-400" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Upload Document</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            {agreement.status === 'Completed' ? (
                              <Button variant="outline" size="sm" className="h-7 px-2 text-xs">
                                <RefreshCw size={12} className="mr-1" />
                                Renew
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 px-2 text-xs"
                                onClick={() => onAddToCart({
                                  id: agreement.id,
                                  type: 'agreement',
                                  title: `${agreement.transactionType} Agreement`,
                                  description: `${agreement.providerCountry} → ${agreement.recipientCountry} | Status: ${agreement.status} | Risk: ${agreement.riskFlag}`,
                                  metadata: agreement
                                })}
                              >
                                <ShoppingCart size={12} className="mr-1" />
                                Add to Cart
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Visual Analytics Section */}
          <div className="space-y-8">
            
            {/* Status & Transaction Type Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Agreement Status Distribution */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                {/* Header with icon and three dots menu */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
                      <PieChart size={20} className="text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">Agreement Status</h3>
                      <p className="text-sm text-gray-500">Current Period - 2024</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                  </button>
                </div>

                {/* Compact Legend with Numbers */}
                <div className="flex items-center justify-center gap-6 mb-8">
                  {statusBreakdownData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors cursor-pointer">
                      <div 
                        className="w-3 h-3 rounded-full shadow-sm"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm text-gray-600 font-medium">{entry.name}</span>
                      <span className="text-lg font-bold text-gray-900 ml-1">{entry.value}</span>
                    </div>
                  ))}
                </div>

                {/* Modern Donut Chart with Hover Effects */}
                <div className="relative h-80 flex items-center justify-center group">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie 
                        data={statusBreakdownData}
                        cx="50%"
                        cy="50%"
                        innerRadius={85}
                        outerRadius={125}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="white"
                        strokeWidth={3}
                        label={false}
                        className="drop-shadow-lg"
                      >
                        {statusBreakdownData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            className="hover:brightness-110 cursor-pointer transition-all duration-200"
                            style={{
                              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                            }}
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                          padding: '12px 16px'
                        }}
                        formatter={(value: any, name: string) => [
                          <span className="font-semibold text-gray-900">{value} agreements</span>,
                          <span className="text-gray-600">{name}</span>
                        ]}
                        labelStyle={{ display: 'none' }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  
                  {/* Center Label */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{totalAgreements}</div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide">Total</div>
                    </div>
                  </div>

                  {/* Custom External Percentage Labels */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {statusBreakdownData.map((entry, index) => {
                      // Calculate positions for external labels
                      const angles = [
                        -30, // Completed (top-right)
                        150, // Pending (bottom-left)
                        30   // Expiring Soon (bottom-right)
                      ];
                      const angle = angles[index];
                      const radian = (angle * Math.PI) / 180;
                      const radius = 160;
                      const x = 50 + (radius * Math.cos(radian)) / 4;
                      const y = 50 + (radius * Math.sin(radian)) / 4;
                      
                      return (
                        <div
                          key={index}
                          className="absolute flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-lg border border-gray-100"
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          ></div>
                          <span className="text-sm font-bold text-gray-900">
                            {entry.percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>


              </div>

              {/* Transaction Type Distribution */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <BarChart3 size={20} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Transaction Type Breakdown</h3>
                    <p className="text-gray-600 text-sm">Agreements by transaction category</p>
                  </div>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={transactionTypeData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                      <defs>
                        <linearGradient id="transactionGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={1}/>
                          <stop offset="100%" stopColor="#1e40af" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                      <XAxis 
                        dataKey="type" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                        tick={{ fontSize: 12, fill: '#6b7280' }}
                        stroke="#9ca3af"
                      />
                      <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#9ca3af" />
                      <RechartsTooltip 
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                        formatter={(value: any) => [value, 'Agreements']}
                        labelFormatter={(label) => `Type: ${label}`}
                      />
                      <Bar 
                        dataKey="count" 
                        fill="url(#transactionGradient)"
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
            </div>

            {/* Country Activity - Full Width */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                  <Globe size={20} className="text-white" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Country Activity</h3>
                  <p className="text-gray-600 text-sm">Agreements Finalised By Jurisdiction</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {countryActivityData.map((country, index) => {
                  const riskColors = {
                    'Low': 'bg-green-500',
                    'Medium': 'bg-yellow-500', 
                    'High': 'bg-red-500'
                  };
                  
                  return (
                    <div key={index} className="p-6 rounded-xl bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Globe size={18} className="text-blue-600" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${riskColors[country.risk as keyof typeof riskColors]}`}></div>
                          <span className="text-xs text-gray-600">{country.risk}</span>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="font-semibold text-gray-900 text-lg">{country.country}</p>
                        <p className="text-sm text-gray-500">{country.agreements} agreements</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(country.agreements / 4) * 100}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-right">
                        <span className="text-xs text-gray-500">{Math.round((country.agreements / 4) * 100)}% of max</span>
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
  );
}