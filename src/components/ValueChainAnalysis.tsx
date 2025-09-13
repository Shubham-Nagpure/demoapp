import { useState } from 'react';
import { Building2, Users, Zap, ShoppingCart, Truck, Settings, Send, MessageSquare, HeadphonesIcon, ChevronRight, ArrowRight, Check, Lightbulb, DollarSign, TrendingUp, Globe } from 'lucide-react';
import PageHeader from "./PageHeader";
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import ValueDriversWorldMap from './ValueDriversWorldMap';
import exampleImage from 'figma:asset/7611575b806aca6d2a4914e09886ded724d52b76.png';

const steps = [
  { 
    id: 1, 
    name: 'Step 1: Value Chain Map', 
    description: 'Map your value chain activities using Porter\'s framework',
    icon: Building2, 
    active: true 
  },
  { 
    id: 2, 
    name: 'Step 2: Key Value Drivers', 
    description: 'Identify critical value-creating activities and processes',
    icon: Zap, 
    active: false 
  },
  { 
    id: 3, 
    name: 'Step 3: Peer Analysis', 
    description: 'Compare with industry benchmarks and competitors',
    icon: Users, 
    active: false 
  },
  { 
    id: 4, 
    name: 'Step 4: Profit Allocation', 
    description: 'Determine optimal profit allocation across activities',
    icon: ShoppingCart, 
    active: false 
  }
];

const supportActivities = [
  {
    id: 'firm-infrastructure',
    name: 'Firm Infrastructure',
    percentage: 7,
    icon: Building2,
    description: 'Includes systems components such as accounting, finance, legal, public relations, quality control.'
  },
  {
    id: 'procurement-logistics',
    name: 'Procurement & Logistics',
    percentage: 8,
    icon: ShoppingCart,
    description: 'Includes the acquisition of raw materials, goods, services, and other external resources, as well as logistics coordination.'
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    percentage: 5,
    icon: HeadphonesIcon,
    description: 'Processes that are offered after the product has been sold and delivered, such as customer service and support.'
  }
];

const primaryActivities = [
  {
    id: 'intangible-property',
    name: 'Intangible Property (IP)',
    percentage: 40,
    icon: Lightbulb,
    description: 'Includes all research and development, intellectual property creation, software and hardware upgrades, and technical know-how.'
  },
  {
    id: 'production',
    name: 'Production',
    percentage: 15,
    icon: Settings,
    description: 'Processes that convert raw materials, labor, or energy into finished goods or services.'
  },
  {
    id: 'marketing-sales',
    name: 'Marketing and Sales',
    percentage: 25,
    icon: MessageSquare,
    description: 'Processes relating to the advertising, promotions, and pricing of the products to optimize the return on investment.'
  }
];

export default function ValueChainAnalysis() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const supportTotal = supportActivities.reduce((sum, activity) => sum + activity.percentage, 0);
  const primaryTotal = primaryActivities.reduce((sum, activity) => sum + activity.percentage, 0);

  return (
    <div className="h-full overflow-auto bg-white">
      <PageHeader 
        title="Value Chain Analysis"
        module="plan"
        tool="value-chain"
      />
      
      <div className="bg-gray-50/30 min-h-[calc(100vh-120px)]">
        <div className="p-8 max-w-7xl mx-auto">
          
          {/* Analysis Progress */}
          <div className="mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Analysis Progress</h3>
                </div>
              </div>

              {/* Enhanced Stepper */}
              <div className="relative">
                {/* Background connecting line */}
                <div className="absolute top-8 left-8 right-8 h-0.5 bg-gray-200"></div>
                
                <div className="relative flex justify-between">
                  {steps.map((step, index) => {
                    const IconComponent = step.icon;
                    const isActive = step.id === currentStep;
                    const isCompleted = step.id < currentStep;
                    const isUpcoming = step.id > currentStep;
                    
                    return (
                      <div key={step.id} className="relative flex flex-col items-center max-w-xs cursor-pointer"
                           onClick={() => setCurrentStep(step.id)}>
                        {/* Step Circle */}
                        <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-emerald-500 border-emerald-500 shadow-lg shadow-emerald-500/25' 
                            : isActive 
                            ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/25' 
                            : 'bg-white border-gray-300 shadow-sm hover:border-gray-400'
                        }`}>
                          {isCompleted ? (
                            <Check size={24} className="text-white" strokeWidth={3} />
                          ) : (
                            <IconComponent 
                              size={24} 
                              className={`${isActive ? 'text-white' : 'text-gray-600'}`} 
                              strokeWidth={2} 
                            />
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="text-center mt-4 px-2">
                          <h4 className={`font-semibold text-sm mb-1 transition-colors duration-200 ${
                            isActive ? 'text-blue-700' : 
                            isCompleted ? 'text-emerald-700' : 
                            'text-gray-600'
                          }`}>
                            {step.name}
                          </h4>
                          <p className={`text-xs leading-relaxed transition-colors duration-200 ${
                            isActive ? 'text-blue-600' : 
                            isCompleted ? 'text-emerald-600' : 
                            'text-gray-500'
                          }`}>
                            {step.description}
                          </p>
                        </div>



                        {/* Connecting Line Progress */}
                        {index < steps.length - 1 && (
                          <div className={`absolute top-8 left-8 w-full h-0.5 transition-all duration-500 ${
                            isCompleted ? 'bg-emerald-400' : 'bg-gray-200'
                          }`} style={{ zIndex: 5 }}></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>



          {/* Dynamic Content Based on Selected Step */}
          {currentStep === 1 && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#32C7DB] to-[#2db5c7] shadow-lg">
                    <Building2 size={20} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Porter's Value Chain Model</h2>
                    <p className="text-gray-600">Comprehensive analysis of value-generating activities</p>
                  </div>
                </div>

                {/* Support Activities */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Support Activities</h3>
                    <Badge variant="outline" className="bg-cyan-50 text-[#32C7DB] border-cyan-200">
                      {supportTotal}% Total Value
                    </Badge>
                  </div>
                  
                  {/* Stacked Bar Chart for Support Activities */}
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="flex rounded-lg overflow-hidden shadow-sm border border-cyan-100 h-16">
                        {supportActivities.map((activity, index) => {
                          const IconComponent = activity.icon;
                          const widthPercentage = (activity.percentage / supportTotal) * 100;
                          const colors = [
                            'bg-[#32C7DB] hover:bg-[#2db5c7]',
                            'bg-[#5dd3e6] hover:bg-[#4ac9dc]', 
                            'bg-[#8be0f0] hover:bg-[#7ad8eb]'
                          ];
                          return (
                            <div
                              key={activity.id}
                              className={`relative ${colors[index]} transition-colors duration-200 cursor-pointer group flex items-center justify-center`}
                              style={{ width: `${widthPercentage}%` }}
                              onClick={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}
                            >
                              <div className="flex items-center gap-2 text-white">
                                <IconComponent size={16} className="text-white" strokeWidth={2} />
                                <span className="font-semibold text-sm">{activity.percentage}%</span>
                              </div>
                              
                              {/* Tooltip on hover */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                                  {activity.name}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                    <div className="border-4 border-transparent border-t-gray-900"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-wrap gap-4">
                      {supportActivities.map((activity, index) => {
                        const IconComponent = activity.icon;
                        const colors = [
                          'bg-[#32C7DB]',
                          'bg-[#5dd3e6]',
                          'bg-[#8be0f0]'
                        ];
                        const isSelected = selectedActivity === activity.id;
                        return (
                          <div
                            key={activity.id}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              isSelected ? 'border-cyan-300 bg-cyan-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                            onClick={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}
                          >
                            <div className={`w-4 h-4 rounded ${colors[index]}`}></div>
                            <div className="flex items-center gap-2">
                              <IconComponent size={16} className="text-gray-600" strokeWidth={2} />
                              <span className="text-sm font-medium text-gray-900">{activity.name}</span>
                              <span className="text-sm font-bold text-gray-700">({activity.percentage}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Expanded Description */}
                    {selectedActivity && supportActivities.find(a => a.id === selectedActivity) && (
                      <div className="mt-4 p-4 rounded-lg bg-cyan-50 border border-cyan-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {supportActivities.find(a => a.id === selectedActivity)?.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Value Creation Flow Arrow */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-full border border-cyan-200">
                    <ArrowRight size={16} className="text-[#32C7DB]" />
                    <span className="text-sm font-medium text-gray-700">Value Creation Flow</span>
                    <ArrowRight size={16} className="text-teal-500" />
                  </div>
                </div>

                {/* Primary Activities */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Primary Activities</h3>
                    <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                      {primaryTotal}% Total Value
                    </Badge>
                  </div>
                  
                  {/* Stacked Bar Chart for Primary Activities */}
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="flex rounded-lg overflow-hidden shadow-sm border border-teal-100 h-16">
                        {primaryActivities.map((activity, index) => {
                          const IconComponent = activity.icon;
                          const widthPercentage = (activity.percentage / primaryTotal) * 100;
                          const colors = [
                            'bg-teal-400 hover:bg-teal-500',
                            'bg-teal-500 hover:bg-teal-600',
                            'bg-[#32C7DB] hover:bg-[#2db5c7]'
                          ];
                          return (
                            <div
                              key={activity.id}
                              className={`relative ${colors[index]} transition-colors duration-200 cursor-pointer group flex items-center justify-center`}
                              style={{ width: `${widthPercentage}%` }}
                              onClick={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}
                            >
                              <div className="flex items-center gap-2 text-white">
                                <IconComponent size={16} className="text-white" strokeWidth={2} />
                                <span className="font-semibold text-sm">{activity.percentage}%</span>
                              </div>
                              
                              {/* Tooltip on hover */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                                <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap">
                                  {activity.name}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                                    <div className="border-4 border-transparent border-t-gray-900"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="flex flex-wrap gap-4">
                      {primaryActivities.map((activity, index) => {
                        const IconComponent = activity.icon;
                        const colors = [
                          'bg-teal-400',
                          'bg-teal-500',
                          'bg-[#32C7DB]'
                        ];
                        const isSelected = selectedActivity === activity.id;
                        return (
                          <div
                            key={activity.id}
                            className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              isSelected ? 'border-teal-300 bg-teal-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}
                            onClick={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}
                          >
                            <div className={`w-4 h-4 rounded ${colors[index]}`}></div>
                            <div className="flex items-center gap-2">
                              <IconComponent size={16} className="text-gray-600" strokeWidth={2} />
                              <span className="text-sm font-medium text-gray-900">{activity.name}</span>
                              <span className="text-sm font-bold text-gray-700">({activity.percentage}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Expanded Description */}
                    {selectedActivity && primaryActivities.find(a => a.id === selectedActivity) && (
                      <div className="mt-4 p-4 rounded-lg bg-teal-50 border border-teal-200">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {primaryActivities.find(a => a.id === selectedActivity)?.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Key Value Drivers */}
          {currentStep === 2 && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
                    <Zap size={20} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Key Value Drivers Analysis</h2>
                    <p className="text-gray-600">Global distribution of critical value-creating activities</p>
                  </div>
                </div>

                {/* World Map Visualization */}
                <div className="mb-8">
                  <ValueDriversWorldMap />
                </div>

                {/* Key Insights Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500 text-white">
                        <Lightbulb size={18} strokeWidth={2} />
                      </div>
                      <h4 className="font-semibold text-gray-900">Highest Impact Driver</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-blue-600">40%</p>
                      <p className="text-sm text-gray-700">Intangible Property (IP)</p>
                      <p className="text-xs text-gray-600">Research, patents, and technical know-how concentrated in North America</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500 text-white">
                        <Users size={18} strokeWidth={2} />
                      </div>
                      <h4 className="font-semibold text-gray-900">Brand & Marketing</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-purple-600">25%</p>
                      <p className="text-sm text-gray-700">European Market Focus</p>
                      <p className="text-xs text-gray-600">Brand recognition and customer relationships driving value</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 text-white">
                        <Settings size={18} strokeWidth={2} />
                      </div>
                      <h4 className="font-semibold text-gray-900">Geographic Spread</h4>
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-orange-600">4</p>
                      <p className="text-sm text-gray-700">Global Regions</p>
                      <p className="text-xs text-gray-600">Value drivers distributed across key pharmaceutical markets</p>
                    </div>
                  </div>
                </div>

                {/* Analysis Notes */}
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Pharma/Med-Tech Industry Analysis</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                    <div>
                      <p className="font-medium mb-2">Pre-Peer Analysis Findings:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• IP development concentrated in innovation hubs</li>
                        <li>• Brand/Marketing leverages European regulatory expertise</li>
                        <li>• Operations know-how distributed across manufacturing centers</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Strategic Implications:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Transfer pricing should reflect IP value concentration</li>
                        <li>• Marketing intangibles justify European profit allocation</li>
                        <li>• Manufacturing efficiency drives Asia-Pacific positioning</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Peer Analysis */}
          {currentStep === 3 && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
                    <Users size={20} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Peer Analysis - Value Driver Comparison</h2>
                    <p className="text-gray-600">Horizontal bar chart comparing value driver percentages across industry peers</p>
                  </div>
                </div>

                {/* Modern Value Driver Comparison */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    {[
                      { 
                        company: 'PharmaCo\n(You)', 
                        drivers: { ip: 40, brand: 25, market: 20, operations: 15 },
                        isYou: true 
                      },
                      { 
                        company: 'Competitor A', 
                        drivers: { ip: 35, brand: 30, market: 20, operations: 15 } 
                      },
                      { 
                        company: 'Competitor B', 
                        drivers: { ip: 45, brand: 20, market: 15, operations: 20 } 
                      },
                      { 
                        company: 'Competitor C', 
                        drivers: { ip: 38, brand: 28, market: 18, operations: 16 } 
                      },
                      { 
                        company: 'Group Median', 
                        drivers: { ip: 39, brand: 26, market: 18, operations: 17 },
                        isMedian: true 
                      }
                    ].map((peer, index) => (
                      <div key={index} className="flex items-center gap-4">
                        {/* Company Name Label */}
                        <div className={`w-24 text-right flex-shrink-0 leading-tight ${
                          peer.isYou ? 'text-blue-600 font-semibold' : 
                          peer.isMedian ? 'text-gray-800 font-semibold' : 
                          'text-gray-600 font-medium'
                        }`}>
                          <div className="whitespace-pre-line text-sm">
                            {peer.company}
                          </div>
                        </div>
                        
                        {/* Modern Pill-shaped Stacked Bar */}
                        <div className="flex-1 max-w-2xl">
                          <div className="relative flex rounded-full overflow-hidden h-12 shadow-md border border-gray-100">
                            {/* IP & R&D */}
                            <div 
                              className={`${
                                peer.isMedian 
                                  ? 'bg-gray-700' 
                                  : 'bg-teal-400'
                              } flex items-center justify-center text-white font-semibold text-sm relative group transition-all duration-200`}
                              style={{ width: `${peer.drivers.ip}%` }}
                            >
                              {peer.drivers.ip}%
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg">
                                  IP & R&D: {peer.drivers.ip}%
                                </div>
                              </div>
                            </div>
                            
                            {/* Brand/Marketing */}
                            <div 
                              className={`${
                                peer.isMedian 
                                  ? 'bg-gray-600' 
                                  : 'bg-sky-500'
                              } flex items-center justify-center text-white font-semibold text-sm relative group transition-all duration-200`}
                              style={{ width: `${peer.drivers.brand}%` }}
                            >
                              {peer.drivers.brand}%
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg">
                                  Brand/Marketing: {peer.drivers.brand}%
                                </div>
                              </div>
                            </div>
                            
                            {/* Market Access */}
                            <div 
                              className={`${
                                peer.isMedian 
                                  ? 'bg-gray-500' 
                                  : 'bg-indigo-500'
                              } flex items-center justify-center text-white font-semibold text-sm relative group transition-all duration-200`}
                              style={{ width: `${peer.drivers.market}%` }}
                            >
                              {peer.drivers.market}%
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg">
                                  Market Access: {peer.drivers.market}%
                                </div>
                              </div>
                            </div>
                            
                            {/* Operations */}
                            <div 
                              className={`${
                                peer.isMedian 
                                  ? 'bg-gray-800' 
                                  : 'bg-purple-400'
                              } flex items-center justify-center text-white font-semibold text-sm relative group transition-all duration-200`}
                              style={{ width: `${peer.drivers.operations}%` }}
                            >
                              {peer.drivers.operations}%
                              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                <div className="bg-gray-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap shadow-lg">
                                  Operations: {peer.drivers.operations}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Clean Legend */}
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-teal-400"></div>
                        <span className="text-gray-700 font-medium">IP & R&D</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-sky-500"></div>
                        <span className="text-gray-700 font-medium">Brand/Marketing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-indigo-500"></div>
                        <span className="text-gray-700 font-medium">Market Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                        <span className="text-gray-700 font-medium">Operations</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Summary */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-blue-50 border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Your Position vs. Peers</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">IP & R&D:</span>
                        <span className="font-semibold text-blue-600">40% (Above median)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand/Marketing:</span>
                        <span className="font-semibold text-purple-600">25% (Below median)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Access:</span>
                        <span className="font-semibold text-emerald-600">20% (Above median)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Operations:</span>
                        <span className="font-semibold text-orange-600">15% (Below median)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-gray-50 border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Insights</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Your IP & R&D allocation is above industry median</li>
                      <li>• Brand/Marketing investment below peers average</li>
                      <li>• Market access strategy aligns with top performers</li>
                      <li>• Operations efficiency opportunities identified</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Profit Allocation */}
          {currentStep === 4 && (
            <div className="mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-white/20">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
                    <ShoppingCart size={20} className="text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Profit Allocation Strategy</h2>
                    <p className="text-gray-600">Determine optimal profit allocation across activities</p>
                  </div>
                </div>

                {/* Profit Allocation World Map */}
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-6">Global Profit Allocation Strategy</h3>
                    
                    {/* World Map with Profit Bubbles */}
                    <div className="relative w-full h-[500px] bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl border border-gray-200 overflow-hidden mb-8">
                      {/* World Map Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <svg viewBox="0 0 1000 500" className="w-full h-full">
                          {/* Simplified world continents outline */}
                          <path 
                            d="M150,200 Q200,180 250,200 L300,180 Q350,190 400,210 L450,200 Q500,180 550,200 L600,190 Q650,200 700,220 L750,210 Q800,190 850,210"
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            className="text-gray-400"
                          />
                          <path 
                            d="M100,250 Q150,230 200,250 L250,240 Q300,250 350,270 L400,260 Q450,240 500,260"
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            className="text-gray-400"
                          />
                          <path 
                            d="M600,280 Q650,260 700,280 L750,270 Q800,280 850,300 L900,290"
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                            className="text-gray-400"
                          />
                        </svg>
                      </div>

                      {/* Geographic Region Labels */}
                      <div className="absolute top-4 left-8 text-xs font-medium text-gray-600">North America</div>
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">Europe</div>
                      <div className="absolute top-4 right-8 text-xs font-medium text-gray-600">Asia Pacific</div>
                      <div className="absolute bottom-4 right-1/3 text-xs font-medium text-gray-600">Other Markets</div>

                      {/* Profit Allocation Bubbles */}
                      {[
                        {
                          region: 'North America',
                          percentage: 45,
                          amount: '$2.7B',
                          position: { x: '25%', y: '45%' },
                          color: '#059669', // emerald-600
                          icon: DollarSign
                        },
                        {
                          region: 'Europe',
                          percentage: 30,
                          amount: '$1.8B',
                          position: { x: '50%', y: '35%' },
                          color: '#0891b2', // cyan-600
                          icon: Building2
                        },
                        {
                          region: 'Asia Pacific',
                          percentage: 20,
                          amount: '$1.2B',
                          position: { x: '75%', y: '50%' },
                          color: '#0284c7', // sky-600
                          icon: TrendingUp
                        },
                        {
                          region: 'Other Markets',
                          percentage: 5,
                          amount: '$0.3B',
                          position: { x: '60%', y: '65%' },
                          color: '#7c3aed', // violet-600
                          icon: Globe
                        }
                      ].map((allocation, index) => {
                        const IconComponent = allocation.icon;
                        const bubbleSize = 60 + (allocation.percentage * 1.5); // Scale based on percentage
                        
                        return (
                          <div
                            key={index}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 cursor-pointer group"
                            style={{ 
                              left: allocation.position.x, 
                              top: allocation.position.y,
                              width: `${bubbleSize}px`,
                              height: `${bubbleSize}px`
                            }}
                          >
                            {/* Bubble Glow Effect */}
                            <div 
                              className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                              style={{ backgroundColor: allocation.color, filter: 'blur(8px)' }}
                            ></div>
                            
                            {/* Main Bubble */}
                            <div 
                              className="relative w-full h-full rounded-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-white group-hover:shadow-2xl transition-all duration-300"
                              style={{ backgroundColor: allocation.color }}
                            >
                              {/* Icon */}
                              <IconComponent size={Math.min(24, bubbleSize * 0.25)} className="text-white mb-1" strokeWidth={2.5} />
                              
                              {/* Percentage */}
                              <div className="font-bold text-xs">{allocation.percentage}%</div>
                              
                              {/* Amount */}
                              <div className="font-semibold text-xs opacity-90">{allocation.amount}</div>
                            </div>

                            {/* Pulse Ring Animation */}
                            <div 
                              className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-60 group-hover:animate-ping"
                              style={{ borderColor: allocation.color }}
                            ></div>

                            {/* Region Label */}
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-medium bg-white text-gray-700 shadow-sm border border-gray-200 whitespace-nowrap">
                              {allocation.region}
                            </div>
                          </div>
                        );
                      })}

                      {/* Connection Lines */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                        <defs>
                          <linearGradient id="profitGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#059669', stopOpacity: 0.6 }} />
                            <stop offset="100%" style={{ stopColor: '#0891b2', stopOpacity: 0.6 }} />
                          </linearGradient>
                          <linearGradient id="profitGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#0891b2', stopOpacity: 0.6 }} />
                            <stop offset="100%" style={{ stopColor: '#0284c7', stopOpacity: 0.6 }} />
                          </linearGradient>
                        </defs>
                        
                        {/* North America to Europe */}
                        <path
                          d="M 25% 45% Q 37.5% 35% 50% 35%"
                          stroke="url(#profitGradient1)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="5 5"
                          className="animate-pulse"
                        />
                        
                        {/* Europe to Asia Pacific */}
                        <path
                          d="M 50% 35% Q 62.5% 40% 75% 50%"
                          stroke="url(#profitGradient2)"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="5 5"
                          className="animate-pulse"
                          style={{ animationDelay: '0.5s' }}
                        />
                      </svg>

                      {/* Legend */}
                      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20">
                        <div className="text-xs font-medium text-gray-700 mb-3">Profit Allocation</div>
                        <div className="space-y-2">
                          {[
                            { name: 'North America', color: '#059669', percentage: 45, amount: '$2.7B' },
                            { name: 'Europe', color: '#0891b2', percentage: 30, amount: '$1.8B' },
                            { name: 'Asia Pacific', color: '#0284c7', percentage: 20, amount: '$1.2B' },
                            { name: 'Other Markets', color: '#7c3aed', percentage: 5, amount: '$0.3B' }
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: item.color }}
                              ></div>
                              <span className="text-xs text-gray-600">{item.name}</span>
                              <span className="text-xs font-bold text-gray-700">({item.percentage}% - {item.amount})</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-gray-200 mt-3 pt-3">
                          <div className="text-lg font-bold text-gray-900">$6.0B</div>
                          <div className="text-xs text-gray-600">Total Allocated Profit</div>
                        </div>
                      </div>

                      {/* Analysis Type Badge */}
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg">
                        <div className="text-sm font-semibold">Profit Allocation</div>
                        <div className="text-xs opacity-90">Global Distribution</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-6">Transfer Pricing Implications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { 
                          title: 'Tax Efficiency', 
                          value: '12.5%', 
                          description: 'Effective tax rate optimization',
                          icon: Building2 
                        },
                        { 
                          title: 'Compliance Risk', 
                          value: 'Low', 
                          description: 'OECD guidelines adherence',
                          icon: ShoppingCart 
                        },
                        { 
                          title: 'Annual Savings', 
                          value: '$45M', 
                          description: 'Projected tax optimization',
                          icon: Zap 
                        }
                      ].map((item, index) => {
                        const IconComponent = item.icon;
                        return (
                          <div key={index} className="p-6 rounded-xl bg-white border border-gray-200">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                                <IconComponent size={20} className="text-gray-600" strokeWidth={2} />
                              </div>
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                            </div>
                            <div className="space-y-1">
                              <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}



          {/* Next Step Actions */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p>Click on activities above to view detailed descriptions</p>
            </div>
            <Button variant="login">
              Next: Identify Key Drivers
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}