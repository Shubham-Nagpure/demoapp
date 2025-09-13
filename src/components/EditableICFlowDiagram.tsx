import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Link, Save, X, ChevronDown, MapPin, Building, Factory, Landmark, Globe2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import PageHeader from "./PageHeader";
import exampleImage from 'figma:asset/f6a27d8a93210e21a3feb1a6432505103617181a.png';

interface DiagramNode {
  id: string;
  title: string;
  subtitle: string;
  revenue: string;
  position: { x: number; y: number };
  color: string;
  icon: string;
  type: 'headquarters' | 'ipco' | 'operations' | 'subsidiary' | 'holding';
}

interface Connection {
  id: string;
  from: string;
  to: string;
  type: 'straight' | 'curved' | 'loop';
  animated: boolean;
  color: string;
  purpose: 'license' | 'service' | 'dividend' | 'royalty' | 'management' | 'loan';
}

interface NodeFormData {
  title: string;
  subtitle: string;
  revenue: string;
  color: string;
  icon: string;
  type: 'headquarters' | 'ipco' | 'operations' | 'subsidiary' | 'holding';
}

const nodeColors = [
  { name: 'Light Blue', value: 'bg-blue-50', border: 'border-blue-100', text: 'text-gray-700', pin: 'text-blue-500' },
  { name: 'Light Green', value: 'bg-green-50', border: 'border-green-100', text: 'text-gray-700', pin: 'text-green-600' },
  { name: 'Light Pink', value: 'bg-pink-50', border: 'border-pink-100', text: 'text-gray-700', pin: 'text-pink-500' },
  { name: 'Light Purple', value: 'bg-purple-50', border: 'border-purple-100', text: 'text-gray-700', pin: 'text-purple-500' },
  { name: 'Light Gray', value: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-700', pin: 'text-gray-500' },
  { name: 'Light Yellow', value: 'bg-yellow-50', border: 'border-yellow-100', text: 'text-gray-700', pin: 'text-yellow-600' },
  { name: 'Light Indigo', value: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-gray-700', pin: 'text-indigo-500' },
  { name: 'Light Orange', value: 'bg-orange-50', border: 'border-orange-100', text: 'text-gray-700', pin: 'text-orange-500' }
];

const nodeIcons = [
  { name: 'Location Pin', icon: 'location', component: MapPin },
  { name: 'Building', icon: 'building', component: Building },
  { name: 'Factory', icon: 'factory', component: Factory },
  { name: 'Landmark', icon: 'landmark', component: Landmark },
  { name: 'Globe', icon: 'globe', component: Globe2 },
  { name: 'Headquarters', icon: 'headquarters', component: Building },
];

const connectionColors = [
  { name: 'Green', value: '#10B981', purpose: 'license' },
  { name: 'Black', value: '#1F2937', purpose: 'service' },
  { name: 'Pink', value: '#EC4899', purpose: 'dividend' },
  { name: 'Blue', value: '#3B82F6', purpose: 'royalty' },
  { name: 'Purple', value: '#8B5CF6', purpose: 'management' },
  { name: 'Orange', value: '#F59E0B', purpose: 'loan' }
];

export default function EditableICFlowDiagram() {
  const [nodes, setNodes] = useState<DiagramNode[]>([
    {
      id: '1',
      title: 'US',
      subtitle: 'HQ',
      revenue: '$2100M',
      position: { x: 500, y: 60 },
      color: 'bg-blue-50',
      icon: 'location',
      type: 'headquarters'
    },
    {
      id: '2',
      title: 'Irish',
      subtitle: 'IPCo',
      revenue: '$2100M',
      position: { x: 500, y: 280 },
      color: 'bg-blue-50',
      icon: 'location',
      type: 'ipco'
    },
    {
      id: '3',
      title: 'China',
      subtitle: 'Operations',
      revenue: '$2100M',
      position: { x: 180, y: 380 },
      color: 'bg-green-50',
      icon: 'factory',
      type: 'operations'
    },
    {
      id: '4',
      title: 'SG',
      subtitle: 'Operations',
      revenue: '$2100M',
      position: { x: 820, y: 380 },
      color: 'bg-green-50',
      icon: 'factory',
      type: 'operations'
    },
    {
      id: '5',
      title: 'Japan',
      subtitle: 'HQ',
      revenue: '$2100M',
      position: { x: 180, y: 580 },
      color: 'bg-pink-50',
      icon: 'location',
      type: 'subsidiary'
    },
    {
      id: '6',
      title: 'UK',
      subtitle: 'HQ',
      revenue: '$2100M',
      position: { x: 500, y: 580 },
      color: 'bg-pink-50',
      icon: 'location',
      type: 'subsidiary'
    },
    {
      id: '7',
      title: 'Australia',
      subtitle: 'HQ',
      revenue: '$2100M',
      position: { x: 820, y: 580 },
      color: 'bg-pink-50',
      icon: 'location',
      type: 'subsidiary'
    }
  ]);

  const [connections, setConnections] = useState<Connection[]>([
    { id: 'c1', from: '1', to: '2', type: 'straight', animated: true, color: '#10B981', purpose: 'license' },
    { id: 'c2', from: '2', to: '3', type: 'curved', animated: true, color: '#1F2937', purpose: 'service' },
    { id: 'c3', from: '2', to: '4', type: 'curved', animated: true, color: '#1F2937', purpose: 'service' },
    { id: 'c4', from: '2', to: '5', type: 'loop', animated: true, color: '#EC4899', purpose: 'dividend' },
    { id: 'c5', from: '2', to: '6', type: 'straight', animated: true, color: '#3B82F6', purpose: 'royalty' },
    { id: 'c6', from: '2', to: '7', type: 'curved', animated: true, color: '#EC4899', purpose: 'dividend' },
    { id: 'c7', from: '5', to: '6', type: 'curved', animated: true, color: '#8B5CF6', purpose: 'management' }
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<string | null>(null);
  const [editingNode, setEditingNode] = useState<DiagramNode | null>(null);
  const [isNodeDialogOpen, setIsNodeDialogOpen] = useState(false);
  const [isConnectionMode, setIsConnectionMode] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const getNodeIcon = (iconName: string) => {
    const iconData = nodeIcons.find(i => i.icon === iconName);
    return iconData ? iconData.component : MapPin;
  };

  const getNodeColorClasses = (color: string) => {
    const colorData = nodeColors.find(c => c.value === color);
    return colorData || nodeColors[0];
  };

  const handleNodeDrag = useCallback((nodeId: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (isConnectionMode) return;
    
    setDraggedNode(nodeId);
    const startX = e.clientX;
    const startY = e.clientY;
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const startPos = { x: node.position.x, y: node.position.y };

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      setNodes(prev => prev.map(n => 
        n.id === nodeId 
          ? { ...n, position: { x: startPos.x + deltaX, y: startPos.y + deltaY } }
          : n
      ));
    };

    const handleMouseUp = () => {
      setDraggedNode(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [nodes, isConnectionMode]);

  const handleNodeClick = (nodeId: string) => {
    if (isConnectionMode) {
      if (!connectionStart) {
        setConnectionStart(nodeId);
      } else if (connectionStart !== nodeId) {
        // Create new connection
        const randomConnection = connectionColors[Math.floor(Math.random() * connectionColors.length)];
        const newConnection: Connection = {
          id: `c${Date.now()}`,
          from: connectionStart,
          to: nodeId,
          type: 'straight',
          animated: true,
          color: randomConnection.value,
          purpose: randomConnection.purpose as any
        };
        setConnections(prev => [...prev, newConnection]);
        setConnectionStart(null);
        setIsConnectionMode(false);
      }
    } else {
      setSelectedNode(selectedNode === nodeId ? null : nodeId);
    }
  };

  const addNewNode = () => {
    const newNode: DiagramNode = {
      id: `node-${Date.now()}`,
      title: 'New Entity',
      subtitle: 'HQ',
      revenue: '$100M',
      position: { x: 400, y: 300 },
      color: 'bg-blue-50',
      icon: 'location',
      type: 'headquarters'
    };
    setNodes(prev => [...prev, newNode]);
    setEditingNode(newNode);
    setIsNodeDialogOpen(true);
  };

  const editNode = (node: DiagramNode) => {
    setEditingNode(node);
    setIsNodeDialogOpen(true);
  };

  const saveNode = (formData: NodeFormData) => {
    if (!editingNode) return;
    
    setNodes(prev => prev.map(n => 
      n.id === editingNode.id 
        ? { ...n, ...formData }
        : n
    ));
    setIsNodeDialogOpen(false);
    setEditingNode(null);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    setSelectedNode(null);
  };

  const deleteConnection = (connectionId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connectionId));
  };

  const getSVGPath = (from: DiagramNode, to: DiagramNode, type: string) => {
    const fromX = from.position.x + 90; // Center of node
    const fromY = from.position.y + 60;
    const toX = to.position.x + 90;
    const toY = to.position.y + 60;

    if (type === 'curved') {
      const midX = (fromX + toX) / 2;
      const midY = (fromY + toY) / 2;
      const controlX = midX + (fromY > toY ? -80 : 80);
      const controlY = midY + (fromX > toX ? -80 : 80);
      
      return `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;
    } else if (type === 'loop') {
      // Create a loop that goes out and comes back
      const offsetX = fromX < toX ? -120 : 120;
      const offsetY = -100;
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
    <div className="flex-1 bg-white overflow-hidden">
      <PageHeader 
        title="Interactive IC Flow Diagram"
        titleHighlight="IC Flow"
        module="plan"
        tool="ic-flow-diagram"
      />

      {/* Toolbar */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={addNewNode} className="flex items-center gap-2">
            <Plus size={16} />
            Add Entity
          </Button>
          <Button 
            variant={isConnectionMode ? "default" : "outline"}
            onClick={() => {
              setIsConnectionMode(!isConnectionMode);
              setConnectionStart(null);
            }}
            className="flex items-center gap-2"
          >
            <Link size={16} />
            {isConnectionMode ? 'Exit Connect Mode' : 'Connect Mode'}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {nodes.length} Entities • {connections.length} Connections
          </Badge>
          {isConnectionMode && (
            <Badge variant="default" className="text-xs animate-pulse">
              {connectionStart ? 'Select target entity' : 'Select source entity'}
            </Badge>
          )}
          
          {/* Connection Legend */}
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs text-gray-500">Connections:</span>
            {connectionColors.slice(0, 3).map(conn => (
              <div key={conn.purpose} className="flex items-center gap-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: conn.value }}
                />
                <span className="text-xs capitalize text-gray-600">{conn.purpose}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-[calc(100vh-200px)] overflow-auto bg-gray-50">
        <div 
          ref={canvasRef}
          className="relative w-full h-full min-w-[1200px] min-h-[800px] bg-white/50"
          style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        >
          {/* SVG for connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              {connectionColors.map(color => (
                <marker
                  key={`arrow-${color.value}`}
                  id={`arrow-${color.value.replace('#', '')}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="3"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill={color.value} />
                </marker>
              ))}
            </defs>
            
            {connections.map(connection => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              if (!fromNode || !toNode) return null;

              const path = getSVGPath(fromNode, toNode, connection.type);
              const markerId = `arrow-${connection.color.replace('#', '')}`;

              return (
                <g key={connection.id}>
                  <motion.path
                    d={path}
                    stroke={connection.color}
                    strokeWidth="2"
                    fill="none"
                    markerEnd={`url(#${markerId})`}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                  />
                  {connection.animated && (
                    <motion.circle
                      r="3"
                      fill={connection.color}
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        offsetPath: `path('${path}')`,
                        offsetRotate: 'auto'
                      }}
                    />
                  )}
                  <path
                    d={path}
                    stroke="transparent"
                    strokeWidth="10"
                    fill="none"
                    className="cursor-pointer pointer-events-auto"
                    onClick={() => deleteConnection(connection.id)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          <AnimatePresence>
            {nodes.map(node => {
              const colorClasses = getNodeColorClasses(node.color);
              const IconComponent = getNodeIcon(node.icon);
              const isSelected = selectedNode === node.id;
              const isDragging = draggedNode === node.id;

              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className={`absolute z-20 cursor-pointer transition-all duration-200 ${isDragging ? 'z-30' : ''}`}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                    width: 180,
                    height: 120
                  }}
                  onMouseDown={(e) => handleNodeDrag(node.id, e)}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <div className={`
                    w-full h-full rounded-3xl border-0 p-6 shadow-lg
                    ${colorClasses.value}
                    ${isSelected ? 'ring-3 ring-blue-500 ring-offset-2' : ''}
                    ${isConnectionMode && connectionStart === node.id ? 'ring-3 ring-green-500 ring-offset-2' : ''}
                    ${isDragging ? 'shadow-2xl scale-105' : ''}
                    transition-all duration-200 relative
                  `}>
                    {/* Location Pin Icon */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${colorClasses.pin}`}>
                        <IconComponent size={14} className="text-white" />
                      </div>
                    </div>
                    
                    {/* Entity Icon */}
                    <div className="flex justify-center mb-3">
                      {node.type === 'operations' && (
                        <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                          <Factory size={16} className="text-white" />
                        </div>
                      )}
                      {node.type !== 'operations' && (
                        <div className="w-8 h-8 bg-orange-400 rounded flex items-center justify-center">
                          <Building size={16} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {node.title}
                      </h3>
                      <div className="bg-gray-200 rounded-full px-3 py-1 mb-2">
                        <span className="text-xs font-semibold text-gray-600">
                          {node.subtitle}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-700">
                        {node.revenue}
                      </p>
                    </div>
                    
                    {/* Edit Controls */}
                    {isSelected && !isConnectionMode && (
                      <div className="absolute -top-2 -right-2 flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            editNode(node);
                          }}
                          className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors shadow-lg"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNode(node.id);
                          }}
                          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Node Dialog */}
      <Dialog open={isNodeDialogOpen} onOpenChange={setIsNodeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingNode?.id.startsWith('node-') ? 'Create Node' : 'Edit Node'}
            </DialogTitle>
            <DialogDescription>
              Configure the node properties and appearance.
            </DialogDescription>
          </DialogHeader>
          
          {editingNode && (
            <NodeEditForm 
              node={editingNode} 
              onSave={saveNode}
              onCancel={() => {
                setIsNodeDialogOpen(false);
                setEditingNode(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Node Edit Form Component
function NodeEditForm({ 
  node, 
  onSave, 
  onCancel 
}: { 
  node: DiagramNode; 
  onSave: (data: NodeFormData) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<NodeFormData>({
    title: node.title,
    subtitle: node.subtitle,
    revenue: node.revenue,
    color: node.color,
    icon: node.icon,
    type: node.type
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Title</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Node title"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Entity Type</label>
        <Input
          value={formData.subtitle}
          onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
          placeholder="e.g., HQ, IPCo, Operations"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Revenue</label>
        <Input
          value={formData.revenue}
          onChange={(e) => setFormData(prev => ({ ...prev, revenue: e.target.value }))}
          placeholder="e.g., $2100M"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="headquarters">Headquarters</SelectItem>
            <SelectItem value="ipco">IP Company</SelectItem>
            <SelectItem value="operations">Operations</SelectItem>
            <SelectItem value="subsidiary">Subsidiary</SelectItem>
            <SelectItem value="holding">Holding Company</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Color</label>
        <div className="grid grid-cols-4 gap-2">
          {nodeColors.map(color => (
            <button
              key={color.value}
              type="button"
              className={`w-full h-8 rounded border-2 ${color.value} ${color.border} ${
                formData.color === color.value ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Icon</label>
        <div className="grid grid-cols-4 gap-2">
          {nodeIcons.map(iconData => {
            const IconComponent = iconData.component;
            return (
              <button
                key={iconData.icon}
                type="button"
                className={`w-full h-8 rounded border flex items-center justify-center ${
                  formData.icon === iconData.icon 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, icon: iconData.icon }))}
              >
                <IconComponent size={16} />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Node
        </Button>
      </div>
    </form>
  );
}