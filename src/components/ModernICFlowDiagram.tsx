import { motion } from 'motion/react';
import { MapPin, Building, Factory, Landmark, Globe2 } from 'lucide-react';
import { Badge } from "./ui/badge";
import PageHeader from "./PageHeader";

interface DiagramNode {
  id: string;
  title: string;
  subtitle: string;
  revenue: string;
  position: { x: number; y: number };
  color: string;
  type: 'headquarters' | 'ipco' | 'operations' | 'subsidiary' | 'holding';
}

interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'straight' | 'curved' | 'loop';
  color: string;
  purpose: 'license' | 'service' | 'dividend' | 'royalty' | 'management' | 'loan';
  amount?: string;
}

const entityColors = {
  'headquarters': { bg: 'from-blue-50 to-blue-100', border: 'border-blue-200', pin: 'bg-blue-500' },
  'ipco': { bg: 'from-indigo-50 to-indigo-100', border: 'border-indigo-200', pin: 'bg-indigo-500' },
  'operations': { bg: 'from-green-50 to-green-100', border: 'border-green-200', pin: 'bg-green-500' },
  'subsidiary': { bg: 'from-pink-50 to-pink-100', border: 'border-pink-200', pin: 'bg-pink-500' },
  'holding': { bg: 'from-purple-50 to-purple-100', border: 'border-purple-200', pin: 'bg-purple-500' }
};

const connectionStyles = {
  'license': { color: '#059669', name: 'License Fee', dash: 'none' },
  'service': { color: '#1F2937', name: 'Service Fee', dash: '5,5' },
  'dividend': { color: '#EC4899', name: 'Dividend', dash: 'none' },
  'royalty': { color: '#3B82F6', name: 'Royalty', dash: '10,3' },
  'management': { color: '#8B5CF6', name: 'Management Fee', dash: '3,3' },
  'loan': { color: '#F59E0B', name: 'Loan', dash: '8,4' }
};

export default function ModernICFlowDiagram() {
  // PharmaCo intercompany structure
  const nodes: DiagramNode[] = [
    {
      id: '1',
      title: 'United States',
      subtitle: 'Headquarters',
      revenue: '$2,100M',
      position: { x: 500, y: 80 },
      color: 'headquarters',
      type: 'headquarters'
    },
    {
      id: '2',
      title: 'Ireland',
      subtitle: 'IP Holding Co.',
      revenue: '$850M',
      position: { x: 500, y: 300 },
      color: 'ipco',
      type: 'ipco'
    },
    {
      id: '3',
      title: 'China',
      subtitle: 'Operations',
      revenue: '$420M',
      position: { x: 200, y: 480 },
      color: 'operations',
      type: 'operations'
    },
    {
      id: '4',
      title: 'Singapore',
      subtitle: 'Operations',
      revenue: '$380M',
      position: { x: 800, y: 480 },
      color: 'operations',
      type: 'operations'
    },
    {
      id: '5',
      title: 'Japan',
      subtitle: 'Subsidiary',
      revenue: '$290M',
      position: { x: 200, y: 650 },
      color: 'subsidiary',
      type: 'subsidiary'
    },
    {
      id: '6',
      title: 'United Kingdom',
      subtitle: 'Subsidiary',
      revenue: '$340M',
      position: { x: 500, y: 650 },
      color: 'subsidiary',
      type: 'subsidiary'
    },
    {
      id: '7',
      title: 'Australia',
      subtitle: 'Subsidiary',
      revenue: '$195M',
      position: { x: 800, y: 650 },
      color: 'subsidiary',
      type: 'subsidiary'
    }
  ];

  const connections: Connection[] = [
    { id: 'c1', from: '1', to: '2', type: 'straight', color: '#059669', purpose: 'license', amount: '$125M' },
    { id: 'c2', from: '2', to: '3', type: 'curved', color: '#1F2937', purpose: 'service', amount: '$45M' },
    { id: 'c3', from: '2', to: '4', type: 'curved', color: '#1F2937', purpose: 'service', amount: '$38M' },
    { id: 'c4', from: '2', to: '5', type: 'loop', color: '#EC4899', purpose: 'dividend', amount: '$25M' },
    { id: 'c5', from: '2', to: '6', type: 'straight', color: '#3B82F6', purpose: 'royalty', amount: '$42M' },
    { id: 'c6', from: '2', to: '7', type: 'curved', color: '#EC4899', purpose: 'dividend', amount: '$18M' },
    { id: 'c7', from: '5', to: '6', type: 'curved', color: '#8B5CF6', purpose: 'management', amount: '$12M' }
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'operations': return Factory;
      case 'ipco': return Landmark;
      case 'subsidiary': return Building;
      default: return Building;
    }
  };

  const getSVGPath = (from: DiagramNode, to: DiagramNode, type: string) => {
    const fromX = from.position.x + 100; // Center of card
    const fromY = from.position.y + 75;
    const toX = to.position.x + 100;
    const toY = to.position.y + 75;

    if (type === 'curved') {
      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;
      const controlX = midX + (fromY > toY ? -120 : 120);
      const controlY = midY + (fromX > toX ? -80 : 80);
      
      return `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;
    } else if (type === 'loop') {
      const offsetX = fromX < toX ? -140 : 140;
      const offsetY = -120;
      const control1X = fromX + offsetX;
      const control1Y = fromY + offsetY;
      const control2X = toX + offsetX;
      const control2Y = toY + offsetY;
      
      return `M ${fromX} ${fromY} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${toX} ${toY}`;
    } else {
      return `M ${fromX} ${fromY} L ${toX} ${toY}`;
    }
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <PageHeader 
        title="PharmaCo Intercompany Structure"
        titleHighlight="Transfer Pricing" 
        module="plan"
        tool="ic-flow"
      />

      {/* Legend */}
      <div className="px-8 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Entity Types</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200"></div>
                  <span className="text-sm text-gray-600">Headquarters</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-indigo-50 to-indigo-100 border border-indigo-200"></div>
                  <span className="text-sm text-gray-600">IP Company</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-green-50 to-green-100 border border-green-200"></div>
                  <span className="text-sm text-gray-600">Operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200"></div>
                  <span className="text-sm text-gray-600">Subsidiary</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Flows</h3>
            <div className="flex items-center gap-6">
              {Object.entries(connectionStyles).slice(0, 4).map(([key, style]) => (
                <div key={key} className="flex items-center gap-2">
                  <svg width="20" height="4">
                    <line 
                      x1="0" y1="2" x2="20" y2="2" 
                      stroke={style.color} 
                      strokeWidth="2"
                      strokeDasharray={style.dash}
                    />
                  </svg>
                  <span className="text-sm text-gray-600">{style.name}</span>
                </div>
              ))}
            </div>
          </div>

          <Badge variant="outline" className="text-sm px-4 py-2">
            7 Entities • 7 Payment Flows
          </Badge>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-[calc(100vh-280px)] overflow-auto">
        <div className="relative w-full h-full min-w-[1200px] min-h-[800px]">
          
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              {Object.entries(connectionStyles).map(([key, style]) => (
                <marker
                  key={`arrow-${key}`}
                  id={`arrow-${key}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="3"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill={style.color} />
                </marker>
              ))}
            </defs>
            
            {connections.map(connection => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              if (!fromNode || !toNode) return null;

              const path = getSVGPath(fromNode, toNode, connection.type);
              const style = connectionStyles[connection.purpose];
              const pathId = `path-${connection.id}`;

              return (
                <g key={connection.id}>
                  <motion.path
                    id={pathId}
                    d={path}
                    stroke={connection.color}
                    strokeWidth="3"
                    strokeDasharray={style.dash}
                    fill="none"
                    markerEnd={`url(#arrow-${connection.purpose})`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    className="drop-shadow-sm"
                  />
                  
                  {/* Animated particle */}
                  <motion.circle
                    r="4"
                    fill={connection.color}
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      offsetPath: `path('${path}')`,
                      offsetRotate: 'auto'
                    }}
                    className="drop-shadow-sm"
                  />

                  {/* Amount label */}
                  {connection.amount && (
                    <text
                      x={(fromNode.position.x + toNode.position.x) / 2 + 100}
                      y={(fromNode.position.y + toNode.position.y) / 2 + 75}
                      className="text-xs font-semibold fill-gray-700"
                      textAnchor="middle"
                      dy="-8"
                    >
                      <tspan className="bg-white px-2 py-1 rounded shadow-sm">
                        {connection.amount}
                      </tspan>
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Entity Cards */}
          {nodes.map((node, index) => {
            const colorScheme = entityColors[node.type];
            const IconComponent = getNodeIcon(node.type);

            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100 
                }}
                className="absolute z-20"
                style={{
                  left: node.position.x,
                  top: node.position.y,
                  width: 200,
                  height: 150
                }}
              >
                <div className={`
                  w-full h-full rounded-3xl border-2 ${colorScheme.border}
                  bg-gradient-to-br ${colorScheme.bg}
                  shadow-xl backdrop-blur-sm
                  transition-all duration-300 hover:shadow-2xl hover:scale-105
                  relative overflow-hidden
                `}>
                  {/* Subtle pattern overlay */}
                  <div className="absolute inset-0 bg-white/20 rounded-3xl"></div>
                  
                  {/* Location Pin */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-30">
                    <div className={`w-8 h-8 rounded-full ${colorScheme.pin} flex items-center justify-center shadow-lg`}>
                      <MapPin size={16} className="text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-20 p-6 pt-8 text-center h-full flex flex-col justify-center">
                    {/* Entity Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-white/90 rounded-2xl flex items-center justify-center shadow-md">
                        <IconComponent size={20} className="text-gray-700" />
                      </div>
                    </div>

                    {/* Entity Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {node.title}
                    </h3>
                    
                    {/* Entity Type Badge */}
                    <div className="mb-3">
                      <Badge 
                        variant="secondary" 
                        className="bg-white/80 text-gray-700 font-semibold px-3 py-1 text-xs"
                      >
                        {node.subtitle}
                      </Badge>
                    </div>
                    
                    {/* Revenue */}
                    <p className="text-lg font-bold text-gray-800">
                      {node.revenue}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}