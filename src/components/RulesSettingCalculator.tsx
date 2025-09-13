import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Settings, Save, Calculator, Percent, Edit3, Plus, Check } from 'lucide-react';
import exampleImage from 'figma:asset/62e64ab97b0777fbdf8c6b90f90eb22624f8e1b9.png';

interface TPRule {
  id: string;
  category: string;
  method: string;
  measure: string;
  base: string;
  benchmark: string;
  benchmarkUnit: string;
  allocationBasis: string;
}

const RulesSettingCalculator = () => {
  const [rules, setRules] = useState<TPRule[]>([
    {
      id: '1',
      category: 'Royalty',
      method: 'CUP/CUT',
      measure: '%',
      base: '3P Sales',
      benchmark: '5',
      benchmarkUnit: '%',
      allocationBasis: 'N/A'
    },
    {
      id: '2',
      category: 'Management Service',
      method: 'TNMM/CPM',
      measure: 'Mark-up',
      base: 'Total Mgt Cost',
      benchmark: '5',
      benchmarkUnit: '%',
      allocationBasis: 'Headcount'
    },
    {
      id: '3',
      category: 'Contract Manufacturing',
      method: 'TNMM/CPM',
      measure: 'Mark-up',
      base: 'Total Mfg Cost',
      benchmark: '5',
      benchmarkUnit: '%',
      allocationBasis: 'N/A'
    },
    {
      id: '4',
      category: 'Distribution',
      method: 'TNMM/CPM',
      measure: '%',
      base: '3P Sales',
      benchmark: '2',
      benchmarkUnit: '%',
      allocationBasis: 'N/A'
    }
  ]);

  const [editingCell, setEditingCell] = useState<{id: string, field: string} | null>(null);

  const updateRule = (id: string, field: keyof TPRule, value: string) => {
    setRules(prevRules => 
      prevRules.map(rule => 
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    );
  };

  const addNewRule = () => {
    const newRule: TPRule = {
      id: Date.now().toString(),
      category: 'New Category',
      method: 'TNMM/CPM',
      measure: '%',
      base: '3P Sales',
      benchmark: '0',
      benchmarkUnit: '%',
      allocationBasis: 'N/A'
    };
    setRules([...rules, newRule]);
  };

  const applyRules = () => {
    console.log('Applying rules:', rules);
  };

  const handleCellEdit = (ruleId: string, field: string) => {
    setEditingCell({ id: ruleId, field });
  };

  const handleCellSave = () => {
    setEditingCell(null);
  };

  const renderEditableCell = (rule: TPRule, field: keyof TPRule, value: string, options?: string[]) => {
    const isEditing = editingCell?.id === rule.id && editingCell?.field === field;
    
    if (isEditing && options) {
      return (
        <Select 
          value={value} 
          onValueChange={(newValue) => {
            updateRule(rule.id, field, newValue);
            setEditingCell(null);
          }}
        >
          <SelectTrigger className="h-8 text-sm border-blue-200 focus:border-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }
    
    if (isEditing) {
      return (
        <div className="flex items-center gap-1">
          <Input
            value={value}
            onChange={(e) => updateRule(rule.id, field, e.target.value)}
            className="h-8 text-sm border-blue-200 focus:border-blue-500"
            onBlur={handleCellSave}
            onKeyDown={(e) => e.key === 'Enter' && handleCellSave()}
            autoFocus
          />
          <Button size="sm" variant="ghost" onClick={handleCellSave} className="h-6 w-6 p-0">
            <Check className="h-3 w-3" />
          </Button>
        </div>
      );
    }
    
    return (
      <div 
        className="text-gray-900 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors group flex items-center justify-between"
        onClick={() => handleCellEdit(rule.id, field)}
      >
        <span>{value}</span>
        <Edit3 className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calculator className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-gray-900">Transfer Pricing Rules Configuration</CardTitle>
              <p className="text-sm text-gray-600">Configure intercompany transaction rules and benchmarks</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={addNewRule}>
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
            <Button className="btn-primary-gradient" onClick={applyRules}>
              <Save className="h-4 w-4 mr-2" />
              Apply Rules
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>


        {/* Rules Configuration Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  IC Transaction Category
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Method
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Measure
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Base
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Benchmark / Policy
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                  Allocation basis
                </th>
              </tr>
            </thead>
            <tbody>
              {rules.map((rule, index) => (
                <tr key={rule.id} className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                  <td className="py-3 px-4">
                    {renderEditableCell(rule, 'category', rule.category)}
                  </td>
                  <td className="py-3 px-4">
                    {renderEditableCell(rule, 'method', rule.method, ['CUP/CUT', 'TNMM/CPM', 'PSM', 'RPSM'])}
                  </td>
                  <td className="py-3 px-4">
                    {renderEditableCell(rule, 'measure', rule.measure, ['%', 'Mark-up', 'Margin', 'Fixed'])}
                  </td>
                  <td className="py-3 px-4">
                    {renderEditableCell(rule, 'base', rule.base, ['3P Sales', 'Total Mgt Cost', 'Total Mfg Cost', 'Total Cost', 'Revenue'])}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={rule.benchmark}
                        onChange={(e) => updateRule(rule.id, 'benchmark', e.target.value)}
                        className="w-16 h-8 text-center text-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        min="0"
                        step="0.1"
                      />
                      <span className="text-gray-600 text-sm">%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {renderEditableCell(rule, 'allocationBasis', rule.allocationBasis, ['N/A', 'Headcount', 'Revenue', 'Cost', 'Assets'])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Summary */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-gray-600">
              {rules.length} rules configured
            </Badge>
            <div className="text-sm text-gray-600">
              Click any cell to edit • Use dropdowns for predefined options
            </div>
          </div>
          <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Impact
          </Button>
        </div>

        {/* Quick Summary */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <Percent className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">Current Configuration Summary</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700">Royalty:</span>
              <span className="font-medium text-blue-900">{rules.find(r => r.category === 'Royalty')?.benchmark || '5'}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Mgmt Service:</span>
              <span className="font-medium text-blue-900">{rules.find(r => r.category === 'Management Service')?.benchmark || '5'}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Manufacturing:</span>
              <span className="font-medium text-blue-900">{rules.find(r => r.category === 'Contract Manufacturing')?.benchmark || '5'}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700">Distribution:</span>
              <span className="font-medium text-blue-900">{rules.find(r => r.category === 'Distribution')?.benchmark || '2'}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RulesSettingCalculator;