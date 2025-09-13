import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock, AlertTriangle, CheckCircle, FileText, Globe, Building, DollarSign, BarChart3 } from 'lucide-react';

interface DeadlineItem {
  id: string;
  title: string;
  date: string;
  month: number;
  day: number;
  category: 'filing' | 'documentation' | 'compliance' | 'review';
  priority: 'high' | 'medium' | 'low';
  jurisdiction: string;
  description: string;
  status: 'upcoming' | 'completed' | 'overdue';
  daysUntil?: number;
}

const deadlines: DeadlineItem[] = [
  // January
  { id: '1', title: 'Corporate Income Tax Return', date: 'Jan 15', month: 1, day: 15, category: 'filing', priority: 'high', jurisdiction: 'US', description: 'Annual corporate tax return filing deadline', status: 'upcoming', daysUntil: 45 },
  { id: '2', title: 'Transfer Pricing Documentation Review', date: 'Jan 31', month: 1, day: 31, category: 'review', priority: 'medium', jurisdiction: 'Global', description: 'Annual review of TP documentation', status: 'upcoming', daysUntil: 61 },
  
  // February
  { id: '3', title: 'BEPS Action 13 CbCR Filing', date: 'Feb 28', month: 2, day: 28, category: 'filing', priority: 'high', jurisdiction: 'EU', description: 'Country-by-Country Report filing', status: 'upcoming', daysUntil: 89 },
  
  // March
  { id: '4', title: 'Master File Update', date: 'Mar 15', month: 3, day: 15, category: 'documentation', priority: 'high', jurisdiction: 'OECD', description: 'Annual master file documentation update', status: 'upcoming', daysUntil: 104 },
  { id: '5', title: 'Local File Preparation', date: 'Mar 31', month: 3, day: 31, category: 'documentation', priority: 'high', jurisdiction: 'Multiple', description: 'Local file documentation for key jurisdictions', status: 'upcoming', daysUntil: 120 },
  
  // April
  { id: '6', title: 'US Corporate Tax Return', date: 'Apr 15', month: 4, day: 15, category: 'filing', priority: 'high', jurisdiction: 'US', description: 'Form 1120 filing deadline', status: 'upcoming', daysUntil: 135 },
  
  // May
  { id: '7', title: 'German Tax Declaration', date: 'May 31', month: 5, day: 31, category: 'filing', priority: 'high', jurisdiction: 'Germany', description: 'Corporate tax declaration filing', status: 'upcoming', daysUntil: 181 },
  
  // June
  { id: '8', title: 'UK Corporate Tax Return', date: 'Jun 30', month: 6, day: 30, category: 'filing', priority: 'high', jurisdiction: 'UK', description: 'CT600 filing deadline', status: 'upcoming', daysUntil: 211 },
  
  // July
  { id: '9', title: 'Mid-Year TP Review', date: 'Jul 15', month: 7, day: 15, category: 'review', priority: 'medium', jurisdiction: 'Global', description: 'Mid-year transfer pricing review', status: 'upcoming', daysUntil: 226 },
  
  // August
  { id: '10', title: 'Australian TP Documentation', date: 'Aug 31', month: 8, day: 31, category: 'documentation', priority: 'medium', jurisdiction: 'Australia', description: 'Local file and master file preparation', status: 'upcoming', daysUntil: 273 },
  
  // September
  { id: '11', title: 'EU DAC6 Reporting', date: 'Sep 30', month: 9, day: 30, category: 'compliance', priority: 'high', jurisdiction: 'EU', description: 'Directive on Administrative Cooperation reporting', status: 'upcoming', daysUntil: 303 },
  
  // October
  { id: '12', title: 'Canadian T2 Return', date: 'Oct 15', month: 10, day: 15, category: 'filing', priority: 'high', jurisdiction: 'Canada', description: 'Corporate income tax return filing', status: 'upcoming', daysUntil: 318 },
  
  // November
  { id: '13', title: 'Singapore TP Documentation', date: 'Nov 30', month: 11, day: 30, category: 'documentation', priority: 'medium', jurisdiction: 'Singapore', description: 'Transfer pricing documentation filing', status: 'upcoming', daysUntil: 364 },
  
  // December
  { id: '14', title: 'Year-End Planning Review', date: 'Dec 15', month: 12, day: 15, category: 'review', priority: 'high', jurisdiction: 'Global', description: 'Annual tax planning and strategy review', status: 'upcoming', daysUntil: 379 }
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const categoryColors = {
  filing: 'bg-red-100 text-red-800 border-red-200',
  documentation: 'bg-blue-100 text-blue-800 border-blue-200',
  compliance: 'bg-orange-100 text-orange-800 border-orange-200',
  review: 'bg-green-100 text-green-800 border-green-200'
};

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500'
};

const categoryIcons = {
  filing: FileText,
  documentation: Building,
  compliance: Globe,
  review: CheckCircle
};

export default function AnnualDocumentationCalendar() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  
  // Get upcoming deadlines (next 90 days)
  const upcomingDeadlines = deadlines
    .filter(d => d.daysUntil && d.daysUntil <= 90)
    .sort((a, b) => (a.daysUntil || 0) - (b.daysUntil || 0))
    .slice(0, 6);

  const getDeadlinesForMonth = (month: number) => {
    return deadlines.filter(d => d.month === month);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Annual Documentation Calendar</h1>
            <p className="text-gray-600">Track compliance deadlines and documentation requirements</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-gray-600">
            2024 Tax Year
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Month Wise Calendar - 66% width (2 columns) */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl text-gray-900 mb-2">Month Wise Calendar</h3>
                <p className="text-gray-600 text-sm">Click on any month to view detailed deadlines and requirements</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                {months.map((month, index) => {
                  const monthDeadlines = getDeadlinesForMonth(index + 1);
                  const isSelected = selectedMonth === index + 1;
                  
                  return (
                    <div
                      key={month}
                      className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 hover:shadow-md group ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-200 shadow-md' 
                          : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                      }`}
                      onClick={() => setSelectedMonth(isSelected ? null : index + 1)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className={`font-medium transition-colors ${
                          isSelected ? 'text-blue-900' : 'text-gray-900 group-hover:text-blue-700'
                        }`}>
                          {month}
                        </h4>
                        {monthDeadlines.length > 0 && (
                          <Badge 
                            variant="secondary" 
                            className={`text-xs transition-colors ${
                              isSelected ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {monthDeadlines.length}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        {monthDeadlines.slice(0, 2).map((deadline) => {
                          const IconComponent = categoryIcons[deadline.category];
                          return (
                            <div
                              key={deadline.id}
                              className={`p-2 rounded-lg text-xs transition-all ${categoryColors[deadline.category]}`}
                            >
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${priorityColors[deadline.priority]}`} />
                                <IconComponent className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{deadline.title}</span>
                              </div>
                            </div>
                          );
                        })}
                        {monthDeadlines.length > 2 && (
                          <div className="text-xs text-gray-500 text-center font-medium">
                            +{monthDeadlines.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats - 33% width (1 column) */}
        <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300 h-full">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl text-gray-900">Quick Stats</h3>
                <p className="text-gray-600 text-sm">Overview</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-sm text-red-700 font-medium">High Priority</span>
                </div>
                <div className="text-xl font-bold text-red-600">
                  {deadlines.filter(d => d.priority === 'high').length}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-blue-700 font-medium">Filing Deadlines</span>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {deadlines.filter(d => d.category === 'filing').length}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Building className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="text-sm text-purple-700 font-medium">Documentation</span>
                </div>
                <div className="text-xl font-bold text-purple-600">
                  {deadlines.filter(d => d.category === 'documentation').length}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm text-green-700 font-medium">Jurisdictions</span>
                </div>
                <div className="text-xl font-bold text-green-600">
                  {new Set(deadlines.map(d => d.jurisdiction)).size}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Selected Month Details */}
      {selectedMonth && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {months[selectedMonth - 1]} Deadlines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getDeadlinesForMonth(selectedMonth).map((deadline) => {
              const IconComponent = categoryIcons[deadline.category];
              
              return (
                <div
                  key={deadline.id}
                  className={`p-4 rounded-lg border ${categoryColors[deadline.category]}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{deadline.title}</h4>
                        <div className={`w-2 h-2 rounded-full ${priorityColors[deadline.priority]}`} />
                      </div>
                      <p className="text-sm opacity-75 mb-2">{deadline.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span>{deadline.date}</span>
                        <span>{deadline.jurisdiction}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}