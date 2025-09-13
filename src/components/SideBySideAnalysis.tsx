import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, CheckCircle, XCircle, DollarSign, TrendingUp, Building2, Users, Target, Zap } from 'lucide-react';

export default function SideBySideAnalysis() {
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Structure Optimization: <span className="text-blue-600">Current vs Future State</span>
        </h1>
        <p className="text-gray-600">
          Comprehensive analysis comparing current entity structure with optimized future state for PharmaCo transfer pricing strategy.
        </p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-6 h-6" />
            <ArrowDownRight className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">$500K</p>
          <p className="text-green-100 text-sm">Annual Cost Savings</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6" />
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">65%</p>
          <p className="text-blue-100 text-sm">Risk Reduction</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-6 h-6" />
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">40%</p>
          <p className="text-purple-100 text-sm">Efficiency Gain</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <Building2 className="w-6 h-6" />
            <Users className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold">2</p>
          <p className="text-orange-100 text-sm">Entities Consolidated</p>
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Detailed Comparison Analysis</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-900 bg-gray-50">Feature</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-red-50">Current State</th>
                <th className="text-center py-4 px-6 font-semibold text-blue-600 bg-blue-50">Future State</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900 bg-green-50">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-5 px-6 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Number of Entities
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 font-medium">
                      7 Entities
                    </span>
                    <span className="text-xs text-gray-500">Complex structure</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
                      5 Entities
                    </span>
                    <span className="text-xs text-blue-600">Streamlined via consolidation</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <ArrowDownRight className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">28% Reduction</span>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-5 px-6 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Fee Types
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-center gap-1">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">License</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Management</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Contract Mfg</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Resale Minus</span>
                    </div>
                    <span className="text-xs text-red-600">4 Different Types</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-center gap-1">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-medium text-sm">Management</span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-medium text-sm">Resale Minus</span>
                    </div>
                    <span className="text-xs text-blue-600">Simplified to 2 Types</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">50% Reduction</span>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-5 px-6 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Complexity Score
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 font-bold">
                      HIGH
                    </span>
                    <div className="w-full bg-red-200 rounded-full h-2 max-w-20">
                      <div className="bg-red-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="text-xs text-red-600">85/100</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-bold">
                      MEDIUM
                    </span>
                    <div className="w-full bg-yellow-200 rounded-full h-2 max-w-20">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '55%'}}></div>
                    </div>
                    <span className="text-xs text-yellow-600">55/100</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <ArrowDownRight className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">35% Reduction</span>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-5 px-6 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Tax Risk Level
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 font-bold">
                      HIGH
                    </span>
                    <div className="flex items-center gap-1">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-red-600">Multiple jurisdictions</span>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold">
                      REDUCED
                    </span>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-green-600">Centralized approach</span>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Risk Mitigated</span>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-5 px-6 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Operational Cost
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">$2.4M</span>
                    <span className="text-xs text-gray-500">Annual operating cost</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xl font-bold text-green-700">$1.9M</span>
                    <div className="flex items-center gap-1">
                      <ArrowDownRight className="w-3 h-3 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">20% reduction</span>
                    </div>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-green-600">Save $500K</span>
                  </div>
                </td>
              </tr>
              
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-5 px-6 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Strategic Benefit
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="text-sm text-gray-700 max-w-36 mx-auto">
                    <div className="mb-1 font-medium">Current Benefits:</div>
                    <div>• Flexibility in jurisdictions</div>
                    <div>• Diversified risk</div>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="text-sm text-blue-700 max-w-40 mx-auto">
                    <div className="mb-1 font-medium">Future Benefits:</div>
                    <div>• Centralized control</div>
                    <div>• Reduced compliance burden</div>
                    <div>• Streamlined operations</div>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">Strategic Upgrade</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Implementation Roadmap</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <h3 className="font-semibold text-blue-900">Phase 1</h3>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Entity Analysis</h4>
            <p className="text-sm text-gray-600 mb-2">Complete detailed analysis of current entity structure and identify consolidation opportunities.</p>
            <div className="text-xs text-blue-600 font-medium">Duration: 2-3 months</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
              <h3 className="font-semibold text-purple-900">Phase 2</h3>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Structure Design</h4>
            <p className="text-sm text-gray-600 mb-2">Design optimized entity structure with simplified fee arrangements and risk mitigation.</p>
            <div className="text-xs text-purple-600 font-medium">Duration: 1-2 months</div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
              <h3 className="font-semibold text-orange-900">Phase 3</h3>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Legal Implementation</h4>
            <p className="text-sm text-gray-600 mb-2">Execute legal restructuring, consolidate entities, and update intercompany agreements.</p>
            <div className="text-xs text-orange-600 font-medium">Duration: 4-6 months</div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
              <h3 className="font-semibold text-green-900">Phase 4</h3>
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Monitoring & Optimization</h4>
            <p className="text-sm text-gray-600 mb-2">Monitor performance, validate cost savings, and continuously optimize the new structure.</p>
            <div className="text-xs text-green-600 font-medium">Duration: Ongoing</div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Strategic Insights</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Cost Optimization</h4>
                <p className="text-sm text-gray-600">Consolidating from 7 to 5 entities will reduce operational complexity and achieve $500K in annual savings.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Risk Mitigation</h4>
                <p className="text-sm text-gray-600">Simplified fee structure reduces transfer pricing complexity and associated tax risks by 65%.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Operational Efficiency</h4>
                <p className="text-sm text-gray-600">Centralized control structure improves decision-making speed and reduces compliance burden.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Strategic Positioning</h4>
                <p className="text-sm text-gray-600">Enhanced structure provides better alignment with business operations and tax efficiency.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}