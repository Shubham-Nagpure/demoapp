import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Upload, 
  Download, 
  MoreHorizontal, 
  ChevronDown, 
  ChevronUp,
  FileText,
  BarChart3,
  Building,
  Target,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Folder,
  Archive,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Database,
  BookOpen,
  Globe,
  TrendingUp,
  Users
} from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Document {
  id: string;
  name: string;
  description: string;
  size: string;
  date: string;
  status: 'Public' | 'Client' | 'Confidential' | 'Firm';
  level: 'Needs Update' | 'Pending' | 'Uploaded';
  category: 'research' | 'planning' | 'operational' | 'benchmarking' | 'compliance' | 'defence';
  icon: 'document' | 'chart' | 'building' | 'target' | 'alert';
}

export default function RepositoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    research: true,
    planning: true,
    operational: true,
    benchmarking: true,
    compliance: true,
    defence: true
  });
  const [activeTool, setActiveTool] = useState('all-modules');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const documentStatus = [
    { 
      name: 'Uploaded', 
      count: 5, 
      color: 'bg-green-500',
      icon: CheckCircle,
      description: 'Ready for use'
    },
    { 
      name: 'Pending', 
      count: 3, 
      color: 'bg-yellow-500',
      icon: Clock,
      description: 'Under review'
    },
    { 
      name: 'Needs Update', 
      count: 3, 
      color: 'bg-red-500',
      icon: XCircle,
      description: 'Action required'
    }
  ];

  // Comprehensive documents data for all categories
  const documents: Document[] = [
    // Research Hub documents
    {
      id: '1',
      name: 'Competitor Benchmarking Database',
      description: 'Detailed comparative analysis of peer companies and their transfer pricing methodologies.',
      size: '5.1 MB',
      date: '2024-01-10',
      status: 'Public',
      level: 'Needs Update',
      category: 'research',
      icon: 'building'
    },
    {
      id: '2',
      name: 'Economic Analysis Framework',
      description: 'Theoretical framework for economic substance analysis in transfer pricing documentation.',
      size: '1.8 MB',
      date: '2024-01-12',
      status: 'Client',
      level: 'Pending',
      category: 'research',
      icon: 'chart'
    },
    {
      id: '3',
      name: 'Market Analysis Report 2024',
      description: 'Comprehensive market analysis covering regional benchmarks and industry trends for transfer pricing.',
      size: '2.4 MB',
      date: '2024-01-16',
      status: 'Firm',
      level: 'Uploaded',
      category: 'research',
      icon: 'target'
    },
    
    // Planning documents
    {
      id: '4',
      name: 'Intercompany Agreement Templates',
      description: 'Standardized templates for various types of intercompany agreements and contracts.',
      size: '2.1 MB',
      date: '2024-01-13',
      status: 'Firm',
      level: 'Uploaded',
      category: 'planning',
      icon: 'document'
    },
    {
      id: '5',
      name: 'TP Policy Implementation Guide',
      description: 'Step-by-step implementation guide for transfer pricing policies across all jurisdictions.',
      size: '3.2 MB',
      date: '2024-01-14',
      status: 'Firm',
      level: 'Uploaded',
      category: 'planning',
      icon: 'document'
    },
    {
      id: '6',
      name: 'Value Chain Analysis Methodology',
      description: 'Comprehensive methodology for conducting value chain analysis in transfer pricing studies.',
      size: '4.7 MB',
      date: '2024-01-11',
      status: 'Client',
      level: 'Needs Update',
      category: 'planning',
      icon: 'chart'
    },
    
    // Operational TP documents
    {
      id: '7',
      name: 'Monthly TP Monitoring Report',
      description: 'Real-time monitoring dashboard for transfer pricing transactions and adjustments.',
      size: '3.8 MB',
      date: '2024-01-18',
      status: 'Firm',
      level: 'Uploaded',
      category: 'operational',
      icon: 'chart'
    },
    {
      id: '8',
      name: 'Operational Transfer Pricing Manual',
      description: 'Day-to-day operational procedures for transfer pricing compliance and management.',
      size: '6.2 MB',
      date: '2024-01-15',
      status: 'Firm',
      level: 'Uploaded',
      category: 'operational',
      icon: 'document'
    },
    
    // Benchmarking documents
    {
      id: '9',
      name: 'Industry Benchmark Study 2024',
      description: 'Comprehensive benchmarking analysis for technology services industry.',
      size: '4.5 MB',
      date: '2024-01-17',
      status: 'Client',
      level: 'Uploaded',
      category: 'benchmarking',
      icon: 'target'
    },
    {
      id: '10',
      name: 'Regional Profitability Analysis',
      description: 'Multi-jurisdictional profitability benchmarking for manufacturing operations.',
      size: '3.7 MB',
      date: '2024-01-14',
      status: 'Firm',
      level: 'Pending',
      category: 'benchmarking',
      icon: 'chart'
    },
    
    // Defence Materials
    {
      id: '11',
      name: 'Audit Defense Strategy Guide',
      description: 'Comprehensive guide for defending transfer pricing positions during tax audits.',
      size: '2.9 MB',
      date: '2024-01-09',
      status: 'Confidential',
      level: 'Uploaded',
      category: 'defence',
      icon: 'alert'
    },
    {
      id: '12',
      name: 'Documentation Defense Package',
      description: 'Complete documentation package for regulatory compliance and audit defense.',
      size: '8.1 MB',
      date: '2024-01-12',
      status: 'Firm',
      level: 'Uploaded',
      category: 'defence',
      icon: 'document'
    }
  ];

  // Get document counts by category
  const getDocumentCount = (category: string) => {
    return documents.filter(doc => doc.category === category).length;
  };

  // Sidebar tools data matching Plan module design
  const sidebarTools = [
    {
      id: 'all-modules',
      title: 'All Modules',
      subtitle: 'Complete document repository...',
      icon: Database,
      count: documents.length,
      isActive: true,
      hasAccent: true
    },
    {
      id: 'research',
      title: 'Research Hub',
      subtitle: 'Market analysis and benchmarks...',
      icon: BarChart3,
      count: getDocumentCount('research'),
      isActive: false
    },
    {
      id: 'planning',
      title: 'Planning Docs',
      subtitle: 'Policy templates and guides...',
      icon: FileText,
      count: getDocumentCount('planning'),
      isActive: false
    },
    {
      id: 'operational',
      title: 'Operational TP',
      subtitle: 'Day-to-day operations docs...',
      icon: TrendingUp,
      count: getDocumentCount('operational'),
      isActive: false
    },
    {
      id: 'benchmarking',
      title: 'Benchmarking',
      subtitle: 'Comparative studies library...',
      icon: Target,
      count: getDocumentCount('benchmarking'),
      isActive: false
    },
    {
      id: 'compliance',
      title: 'Compliance Docs',
      subtitle: 'Regulatory requirements...',
      icon: Shield,
      count: getDocumentCount('compliance'),
      isActive: false
    },
    {
      id: 'defence',
      title: 'Defence Materials',
      subtitle: 'Audit and defence resources...',
      icon: AlertTriangle,
      count: getDocumentCount('defence'),
      isActive: false
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'document': return <FileText size={16} className="text-blue-500" />;
      case 'chart': return <BarChart3 size={16} className="text-green-500" />;
      case 'building': return <Building size={16} className="text-purple-500" />;
      case 'target': return <Target size={16} className="text-orange-500" />;
      case 'alert': return <AlertTriangle size={16} className="text-red-500" />;
      default: return <FileText size={16} className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Public': 'bg-gray-100 text-gray-800',
      'Client': 'bg-blue-100 text-blue-800',
      'Confidential': 'bg-red-100 text-red-800',
      'Firm': 'bg-green-100 text-green-800'
    };
    return variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const getLevelBadge = (level: string) => {
    const variants = {
      'Needs Update': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Uploaded': 'bg-green-100 text-green-800'
    };
    return variants[level as keyof typeof variants] || 'bg-gray-100 text-gray-800';
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by active tool/category
    if (activeTool === 'all-modules') {
      return matchesSearch;
    } else {
      return matchesSearch && doc.category === activeTool;
    }
  });

  // Group documents by category for display
  const getDocumentsByCategory = (category: string) => {
    return filteredDocuments.filter(doc => doc.category === category);
  };

  const researchDocs = getDocumentsByCategory('research');
  const planningDocs = getDocumentsByCategory('planning');
  const operationalDocs = getDocumentsByCategory('operational');
  const benchmarkingDocs = getDocumentsByCategory('benchmarking');
  const complianceDocs = getDocumentsByCategory('compliance');
  const defenceDocs = getDocumentsByCategory('defence');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleToolChange = (toolId: string) => {
    setActiveTool(toolId);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Document Section Component
  const DocumentSection = ({ 
    category, 
    title, 
    icon: IconComponent, 
    iconColor, 
    badgeColor, 
    documents, 
    expandedSections, 
    toggleSection, 
    getIcon, 
    getStatusBadge, 
    getLevelBadge 
  }: {
    category: string;
    title: string;
    icon: any;
    iconColor: string;
    badgeColor: string;
    documents: Document[];
    expandedSections: { [key: string]: boolean };
    toggleSection: (section: string) => void;
    getIcon: (iconType: string) => React.ReactNode;
    getStatusBadge: (status: string) => string;
    getLevelBadge: (level: string) => string;
  }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50/50 transition-colors border-b border-gray-50"
        onClick={() => toggleSection(category)}
      >
        <div className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${iconColor}`}>
            <IconComponent size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <span className="text-sm text-gray-500">{documents.length} documents available</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={badgeColor}>{documents.length}</Badge>
          {expandedSections[category] ? 
            <ChevronUp size={20} className="text-gray-400" /> : 
            <ChevronDown size={20} className="text-gray-400" />
          }
        </div>
      </div>
      
      {expandedSections[category] && (
        <div>
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-b-0">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100">
                  {getIcon(doc.icon)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{doc.name}</h4>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{doc.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Archive size={12} />
                      {doc.size}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {doc.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusBadge(doc.status)}>{doc.status}</Badge>
                <Badge className={getLevelBadge(doc.level)}>{doc.level}</Badge>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full bg-gray-50 flex">
      {/* Modern Sidebar - matching Plan module design */}
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-[300px]'} bg-white border-r border-gray-100 h-full flex flex-col transition-all duration-300 ease-in-out`}>
        {/* Header */}
        <div className={`${isSidebarCollapsed ? 'p-2' : 'p-6'} border-b border-gray-50 flex items-center justify-between`}>
          {!isSidebarCollapsed && (
            <div className="text-sm text-gray-600">
              <span>Tools under </span>
              <span className="font-semibold text-gray-800">Document <span className="text-blue-600">Repository</span></span>
            </div>
          )}
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          >
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Tools List */}
        <div className={`flex-1 ${isSidebarCollapsed ? 'p-2' : 'p-4'} space-y-2`}>
          {sidebarTools.map((tool) => {
            const IconComponent = tool.icon;
            const isActive = activeTool === tool.id;
            const hasAccent = isActive;
            
            return (
              <div
                key={tool.id}
                onClick={() => handleToolChange(tool.id)}
                className={`relative flex items-center ${isSidebarCollapsed ? 'justify-center p-3' : 'space-x-3 p-4'} rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                  isActive && hasAccent
                    ? 'bg-blue-50/50 border border-blue-100' 
                    : isActive
                      ? 'bg-gray-50'
                      : hasAccent 
                        ? 'bg-blue-50/50 border border-blue-100' 
                        : 'hover:shadow-sm'
                }`}
                title={isSidebarCollapsed ? tool.title : undefined}
              >
                {/* Blue accent indicators */}
                {hasAccent && !isSidebarCollapsed && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-blue-500 rounded-r-full" />
                )}
                {hasAccent && isSidebarCollapsed && (
                  <div className="absolute right-1 top-1 w-2 h-2 bg-blue-500 rounded-full" />
                )}

                {/* Icon */}
                <div className="relative">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                    isActive && hasAccent
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                      : isActive
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                        : hasAccent
                          ? 'bg-blue-500'
                          : 'bg-gray-100'
                  }`}>
                    <IconComponent 
                      size={18} 
                      className={
                        isActive || hasAccent 
                          ? 'text-white' 
                          : 'text-gray-500'
                      } 
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* Content - only show when not collapsed */}
                {!isSidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className={`font-semibold text-sm leading-tight mb-1 ${
                        isActive 
                          ? 'text-gray-900' 
                          : hasAccent
                            ? 'text-gray-900'
                            : 'text-gray-700'
                      }`}>
                        {tool.title}
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs min-w-[20px] text-center ${
                        isActive || hasAccent
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {tool.count}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 leading-tight">
                      {tool.subtitle}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Document Status Section - only when expanded */}
        {!isSidebarCollapsed && (
          <div className="p-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Document Status</h3>
            <div className="space-y-3">
              {documentStatus.map((status, index) => {
                const IconComponent = status.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${status.color}/10`}>
                        <IconComponent size={14} className={`${status.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">{status.name}</span>
                        <div className="text-xs text-gray-500">{status.description}</div>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      status.name === 'Uploaded' ? 'bg-green-100 text-green-700' :
                      status.name === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {status.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="border-b border-gray-100 px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                My <span className="text-blue-600">Repository</span>
              </h1>
              <p className="text-gray-600 mt-2">Centralized document management for Transfer Pricing workflows</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                <Download size={16} className="mr-2" />
                Export All
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-sm">
                <Upload size={16} className="mr-2" />
                Upload New File
              </Button>
            </div>
          </div>

          {/* Enhanced Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
              />
            </div>
            
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
            >
              <option>All Status</option>
              <option>Public</option>
              <option>Client</option>
              <option>Confidential</option>
              <option>Firm</option>
            </select>

            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-gray-50/50"
            >
              <option>All Years</option>
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>

            <Button variant="outline" size="sm" className="border-gray-200 text-gray-500 hover:bg-gray-50">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        {/* Document Sections */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50/30">
          {/* Document sections - render based on active tool */}
          {activeTool === 'all-modules' ? (
            // Show all categories when "All Modules" is selected
            <div className="space-y-6">
              {/* Research Section */}
              {researchDocs.length > 0 && (
                <DocumentSection
                  category="research"
                  title="Research Hub"
                  icon={BarChart3}
                  iconColor="from-blue-500 to-blue-600"
                  badgeColor="bg-blue-50 text-blue-700 border-blue-200"
                  documents={researchDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
              
              {/* Planning Section */}
              {planningDocs.length > 0 && (
                <DocumentSection
                  category="planning"
                  title="Planning Documents"
                  icon={FileText}
                  iconColor="from-green-500 to-green-600"
                  badgeColor="bg-green-50 text-green-700 border-green-200"
                  documents={planningDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
              
              {/* Operational Section */}
              {operationalDocs.length > 0 && (
                <DocumentSection
                  category="operational"
                  title="Operational TP"
                  icon={TrendingUp}
                  iconColor="from-purple-500 to-purple-600"
                  badgeColor="bg-purple-50 text-purple-700 border-purple-200"
                  documents={operationalDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
              
              {/* Benchmarking Section */}
              {benchmarkingDocs.length > 0 && (
                <DocumentSection
                  category="benchmarking"
                  title="Benchmarking"
                  icon={Target}
                  iconColor="from-orange-500 to-orange-600"
                  badgeColor="bg-orange-50 text-orange-700 border-orange-200"
                  documents={benchmarkingDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
              
              {/* Defence Section */}
              {defenceDocs.length > 0 && (
                <DocumentSection
                  category="defence"
                  title="Defence Materials"
                  icon={AlertTriangle}
                  iconColor="from-red-500 to-red-600"
                  badgeColor="bg-red-50 text-red-700 border-red-200"
                  documents={defenceDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
              
              {/* Compliance Section - Empty state */}
              {activeTool === 'all-modules' && complianceDocs.length === 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gray-100 mx-auto mb-4">
                    <Shield size={24} className="text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Compliance Documents</h3>
                  <p className="text-gray-500 text-sm">No compliance documents available. Upload new documents to get started.</p>
                </div>
              )}
            </div>
          ) : (
            // Show specific category when one is selected
            <div>
              {activeTool === 'research' && (
                <DocumentSection
                  category="research"
                  title="Research Hub"
                  icon={BarChart3}
                  iconColor="from-blue-500 to-blue-600"
                  badgeColor="bg-blue-50 text-blue-700 border-blue-200"
                  documents={researchDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
              
              {activeTool === 'planning' && (
                <DocumentSection
                  category="planning"
                  title="Planning Documents"
                  icon={FileText}
                  iconColor="from-green-500 to-green-600"
                  badgeColor="bg-green-50 text-green-700 border-green-200"
                  documents={planningDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
              
              {activeTool === 'operational' && (
                <DocumentSection
                  category="operational"
                  title="Operational TP"
                  icon={TrendingUp}
                  iconColor="from-purple-500 to-purple-600"
                  badgeColor="bg-purple-50 text-purple-700 border-purple-200"
                  documents={operationalDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
              
              {activeTool === 'benchmarking' && (
                <DocumentSection
                  category="benchmarking"
                  title="Benchmarking"
                  icon={Target}
                  iconColor="from-orange-500 to-orange-600"
                  badgeColor="bg-orange-50 text-orange-700 border-orange-200"
                  documents={benchmarkingDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
              
              {activeTool === 'compliance' && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-gray-100 mx-auto mb-6">
                    <Shield size={32} className="text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">Compliance Documents</h3>
                  <p className="text-gray-500 mb-6 max-w-md mx-auto">No compliance documents available yet. Upload regulatory requirements, compliance checklists, and audit documentation to get started.</p>
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white">
                    <Upload size={16} className="mr-2" />
                    Upload First Document
                  </Button>
                </div>
              )}
              
              {activeTool === 'defence' && (
                <DocumentSection
                  category="defence"
                  title="Defence Materials"
                  icon={AlertTriangle}
                  iconColor="from-red-500 to-red-600"
                  badgeColor="bg-red-50 text-red-700 border-red-200"
                  documents={defenceDocs}
                  expandedSections={expandedSections}
                  toggleSection={toggleSection}
                  getIcon={getIcon}
                  getStatusBadge={getStatusBadge}
                  getLevelBadge={getLevelBadge}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}