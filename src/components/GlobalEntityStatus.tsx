import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Globe, Building2, TrendingUp, DollarSign, MapPin, ArrowRight, Factory, Store } from 'lucide-react';
import PageHeader from "./PageHeader";
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Entity data for the Plan Architect - Transfer Pricing entities
const entityData = [
  { 
    country: 'USA', 
    entityName: 'US HQ',
    entityType: 'Headquarters',
    region: 'Americas',
    completion: 95, 
    revenue: '$2,100M',
    outflows: '$2,100M',
    inflows: '$0M',
    transferType: 'License Fee Payer',
    position: { top: '40%', left: '25%' },
    color: '#3b82f6', // Blue for HQ
    flows: ['Ireland IPCo']
  },
  { 
    country: 'Ireland', 
    entityName: 'Irish IPCo',
    entityType: 'IP Holding Company',
    region: 'Europe',
    completion: 88, 
    revenue: '$2,100M',
    outflows: '$10,500M',
    inflows: '$2,100M',
    transferType: 'IP Licensor',
    position: { top: '32%', left: '52%' },
    color: '#10b981', // Green for IP holding
    flows: ['UK Distr', 'Singapore Mfg', 'China MG', 'Japan Distr', 'Australia Distr']
  },
  { 
    country: 'Singapore', 
    entityName: 'Singapore Mfg',
    entityType: 'Manufacturing',
    region: 'Asia Pacific',
    completion: 92, 
    revenue: '$2,100M',
    outflows: '$0M',
    inflows: '$2,100M',
    transferType: 'Service Provider',
    position: { top: '55%', left: '75%' },
    color: '#f59e0b', // Orange for manufacturing
    flows: []
  },
  { 
    country: 'Japan', 
    entityName: 'Japan Distr',
    entityType: 'Distribution',
    region: 'Asia Pacific',
    completion: 85, 
    revenue: '$2,100M',
    outflows: '$0M',
    inflows: '$2,100M',
    transferType: 'Distributor',
    position: { top: '42%', left: '82%' },
    color: '#8b5cf6', // Purple for distribution
    flows: []
  },
  { 
    country: 'Australia', 
    entityName: 'Australia Distr',
    entityType: 'Distribution',
    region: 'Asia Pacific',
    completion: 90, 
    revenue: '$2,100M',
    outflows: '$0M',
    inflows: '$2,100M',
    transferType: 'Distributor',
    position: { top: '75%', left: '80%' },
    color: '#8b5cf6', // Purple for distribution
    flows: []
  },
  { 
    country: 'UK', 
    entityName: 'UK Distr',
    entityType: 'Distribution',
    region: 'Europe',
    completion: 78, 
    revenue: '$2,100M',
    outflows: '$0M',
    inflows: '$2,100M',
    transferType: 'Distributor',
    position: { top: '28%', left: '48%' },
    color: '#8b5cf6', // Purple for distribution
    flows: []
  },
  { 
    country: 'China', 
    entityName: 'China MG',
    entityType: 'Manufacturing',
    region: 'Asia Pacific',
    completion: 88, 
    revenue: '$2,100M',
    outflows: '$0M',
    inflows: '$2,100M',
    transferType: 'Service Provider',
    position: { top: '42%', left: '70%' },
    color: '#f59e0b', // Orange for manufacturing
    flows: []
  }
];

// Key performance indicators
const kpiData = [
  {
    title: 'Total Entities',
    value: '7',
    change: '0',
    trend: 'stable',
    icon: Building2,
    description: 'Active entities',
    color: 'blue'
  },
  {
    title: 'Total Revenue',
    value: '$14.7B',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign,
    description: 'Group revenue',
    color: 'emerald'
  },
  {
    title: 'Transfer Flows',
    value: '$12.6B',
    change: '+5.1%',
    trend: 'up',
    icon: TrendingUp,
    description: 'Intercompany flows',
    color: 'purple'
  },
  {
    title: 'Avg. Completion',
    value: '88%',
    change: '+3%',
    trend: 'up',
    icon: MapPin,
    description: 'Documentation ready',
    color: 'orange'
  }
];

interface GlobalEntityStatusProps {
  onSideBySideChange?: (isSideBySide: boolean) => void;
}

export default function GlobalEntityStatus({ onSideBySideChange }: GlobalEntityStatusProps = {}) {
  const [selectedEntity, setSelectedEntity] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('current-year');
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const [worldMapImage, setWorldMapImage] = useState<string>('');

  // Load world map image on component mount
  useEffect(() => {
    setWorldMapImage('https://images.unsplash.com/photo-1742415105376-43d3a5fd03fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc0OTgyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');
  }, []);

  const getEntityTypeIcon = (entityType: string) => {
    switch (entityType) {
      case 'Headquarters': return Building2;
      case 'IP Holding Company': return Globe;
      case 'Manufacturing': return Factory;
      case 'Distribution': return Store;
      default: return Building2;
    }
  };

  const getEntityTypeColor = (entityType: string) => {
    switch (entityType) {
      case 'Headquarters': return '#3b82f6'; // Blue
      case 'IP Holding Company': return '#10b981'; // Green
      case 'Manufacturing': return '#f59e0b'; // Orange
      case 'Distribution': return '#8b5cf6'; // Purple
      default: return '#6b7280'; // Gray
    }
  };

  const getBubbleSize = (entityType: string) => {
    switch (entityType) {
      case 'IP Holding Company': return 'w-10 h-10'; // 40px - largest for IP holding
      case 'Headquarters': return 'w-8 h-8'; // 32px
      case 'Manufacturing': return 'w-6 h-6'; // 24px
      case 'Distribution': return 'w-5 h-5'; // 20px
      default: return 'w-6 h-6';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowRight className="w-4 h-4 text-green-600 rotate-[-45deg]" />;
      case 'down': return <ArrowRight className="w-4 h-4 text-red-600 rotate-[45deg]" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-400"></div>;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <PageHeader 
        title="Plan Architect"
        titleHighlight="Plan"
        module="plan"
        tool="ic-flow"
        icon={TrendingUp}
      />
      
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        {/* Header Controls */}
        <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              PharmaCo Global • Transfer Pricing Architecture
            </div>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-year">2024</SelectItem>
                <SelectItem value="q4-2024">Q4 2024</SelectItem>
                <SelectItem value="ytd">YTD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="h-8 text-sm">
              Export Structure
            </Button>
            <Button size="sm" className="h-8 text-sm bg-blue-600 hover:bg-blue-700">
              Generate Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi, index) => {
            const IconComponent = kpi.icon;
            const trendColors = {
              blue: 'from-blue-500 to-blue-600',
              emerald: 'from-emerald-500 to-emerald-600',
              orange: 'from-orange-500 to-orange-600',
              purple: 'from-purple-500 to-purple-600'
            };

            return (
              <Card key={index} className="relative overflow-hidden hover:shadow-md transition-all duration-200 border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-muted-foreground">{kpi.title}</p>
                        {getTrendIcon(kpi.trend)}
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-semibold text-gray-900">{kpi.value}</p>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            kpi.trend === 'up' ? 'bg-green-100 text-green-700' : 
                            kpi.trend === 'down' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {kpi.change}
                          </span>
                          <span className="text-xs text-gray-500">{kpi.description}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${trendColors[kpi.color as keyof typeof trendColors]}`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Global Entity Transfer Pricing Map */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
            <CardTitle className="flex items-center space-x-3 text-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600" />
              </div>
              <span>Global Entity <span className="text-blue-600">Transfer Pricing</span> Structure</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative rounded-xl h-96 overflow-hidden mb-6 bg-gradient-to-br from-blue-50 to-indigo-50">
              {/* World map background */}
              <div className="absolute inset-0">
                {worldMapImage ? (
                  <div 
                    className="absolute inset-0 w-full h-full opacity-20"
                    style={{
                      backgroundImage: `url(${worldMapImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  ></div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-30"></div>
                )}
              </div>

              {/* Entity bubbles positioned on map */}
              {entityData.map((entity, index) => {
                const IconComponent = getEntityTypeIcon(entity.entityType);
                const bubbleSize = getBubbleSize(entity.entityType);
                const bubbleColor = getEntityTypeColor(entity.entityType);

                return (
                  <div
                    key={entity.country}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ top: entity.position.top, left: entity.position.left, zIndex: 10 }}
                    onMouseEnter={() => setHoveredEntity(entity.country)}
                    onMouseLeave={() => setHoveredEntity(null)}
                  >
                    {/* Entity bubble */}
                    <div className={`${bubbleSize} rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center animate-pulse`}
                         style={{ 
                           backgroundColor: bubbleColor,
                           animationDuration: '2s',
                           border: '3px solid white'
                         }}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>

                    {/* Hover tooltip */}
                    {hoveredEntity === entity.country && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-20">
                        <div className="bg-black/90 text-white px-4 py-3 rounded-lg shadow-xl text-sm whitespace-nowrap min-w-[200px]">
                          <div className="font-semibold text-white mb-1">{entity.entityName}</div>
                          <div className="text-xs opacity-90 mb-2">{entity.country} • {entity.entityType}</div>
                          <div className="text-xs space-y-1">
                            <div>Revenue: <span className="font-medium text-green-300">{entity.revenue}</span></div>
                            <div>Type: <span className="font-medium text-blue-300">{entity.transferType}</span></div>
                            <div>Completion: <span className="font-medium text-yellow-300">{entity.completion}%</span></div>
                          </div>
                          {/* Tooltip arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                            <div className="border-4 border-transparent border-t-black/90"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Entity Type Legend */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-sm min-w-[200px]">
                <div className="text-xs font-medium text-gray-700 mb-3">Entity Types</div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3b82f6' }}>
                      <Building2 className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">Headquarters</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">IP Holding Company</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f59e0b' }}>
                      <Factory className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">Manufacturing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8b5cf6' }}>
                      <Store className="w-2 h-2 text-white" />
                    </div>
                    <span className="text-xs text-gray-600">Distribution</span>
                  </div>
                </div>
              </div>

              {/* Flow Direction Legend */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                <div className="text-xs font-medium text-gray-700 mb-2">Transfer Flow</div>
                <div className="flex items-center space-x-2">
                  <div className="text-xs text-gray-600">IP Licensing →</div>
                  <div className="text-xs text-gray-600">Service Fees</div>
                </div>
                <div className="text-lg font-bold text-gray-900 mt-1">$12.6B</div>
                <div className="text-xs text-gray-600">Total Flows</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entity Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entityData.map((entity, index) => {
            const IconComponent = getEntityTypeIcon(entity.entityType);
            return (
              <Card key={entity.country} className="relative overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300 group bg-white">
                <CardContent className="p-4">
                  {/* Header with entity name and type */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="p-2 rounded-lg flex items-center justify-center w-10 h-10"
                        style={{ backgroundColor: `${entity.color}20` }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: entity.color }} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{entity.entityName}</div>
                        <div className="text-xs text-gray-500">{entity.country} • {entity.region}</div>
                      </div>
                    </div>
                    <Badge 
                      className="text-xs px-2 py-1"
                      style={{ 
                        backgroundColor: `${entity.color}20`,
                        color: entity.color,
                        border: `1px solid ${entity.color}40`
                      }}
                    >
                      {entity.entityType}
                    </Badge>
                  </div>

                  {/* Revenue and completion metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Revenue</span>
                      <span className="text-sm font-semibold text-gray-900">{entity.revenue}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Inflows</span>
                      <span className="text-sm font-medium text-green-600">{entity.inflows}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Outflows</span>
                      <span className="text-sm font-medium text-blue-600">{entity.outflows}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Documentation</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500" 
                            style={{ width: `${entity.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">{entity.completion}%</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="text-xs text-gray-600 mb-1">Transfer Type</div>
                      <div className="text-sm font-medium text-gray-900">{entity.transferType}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}