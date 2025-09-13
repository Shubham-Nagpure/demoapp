import { useState, useEffect, useRef } from 'react';
import PageHeader from './PageHeader';
import StandardTable from './StandardTable';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  Target, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Building2,
  DollarSign,
  Percent,
  Globe,
  Zap,
  Clock,
  Users,
  FileText,
  ShoppingCart,
  Loader2,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Eye,
  Lightbulb,
  X
} from 'lucide-react';

interface BenchmarkSearch {
  id: string;
  title: string;
  category: string;
  timeAgo: string;
}

interface BenchmarkFilters {
  sector: string;
  industry: string;
  subIndustry: string;
  hqCountry: string;
  testedEntityCountry: string;
  functionalCharacteristics: string;
  risk: string;
}

interface BenchmarkPageProps {
  onAddToCart: (item: any) => void;
}

export default function BenchmarkPage({ onAddToCart }: BenchmarkPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0, width: 0 });
  const [filters, setFilters] = useState<BenchmarkFilters>({
    sector: 'Technology',
    industry: 'Semi Conductor',
    subIndustry: 'Services',
    hqCountry: 'Singapore',
    testedEntityCountry: 'China',
    functionalCharacteristics: 'Contract Mfr',
    risk: 'Full Risk'
  });

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mock recent searches data
  const recentSearches: BenchmarkSearch[] = [
    {
      id: '1',
      title: 'Contract manufacturing for medical devices in China',
      category: 'Contract Manufacturing',
      timeAgo: '2 hours ago'
    },
    {
      id: '2',
      title: 'Contract manufacturing margins for semiconductor assembly',
      category: 'Manufacturing',
      timeAgo: '3 hours ago'
    },
    {
      id: '3',
      title: 'Distribution margins for electronic components in Southeast Asia',
      category: 'Distribution',
      timeAgo: '1 day ago'
    },
    {
      id: '4',
      title: 'Technology licensing benchmarks for chip design IP',
      category: 'IP Licensing',
      timeAgo: '2 days ago'
    }
  ];

  // Mock trending benchmarks data
  const trendingBenchmarks = [
    'Semiconductor contract manufacturing margins',
    'Technology services benchmarks Asia-Pacific',
    'IP licensing rates for electronics',
    'Manufacturing risk adjustments'
  ];

  // Mock results generator
  const generateMockResults = (query: string) => {
    const queryLower = query.toLowerCase();
    
    // Determine the type of analysis based on query
    let analysisTitle = "Contract manufacturer benchmarking: Singapore ↔ China | Semiconductor Assembly & Test Services";
    let metrics = {
      range: "4% - 8%",
      rangeSubtitle: "Inter-Quartile Range",
      rangeDescription: "Cost Plus Method",
      median: "5.5%",
      medianSubtitle: "Median",
      medianDescription: "Recommended Rate",
      comparables: "15",
      comparablesSubtitle: "Comparables",
      comparablesDescription: "Data Points"
    };

    if (queryLower.includes('distribution')) {
      analysisTitle = "Distribution benchmarking: Singapore ↔ China | Electronic Components Distribution";
      metrics = {
        range: "3% - 6%",
        rangeSubtitle: "Inter-Quartile Range", 
        rangeDescription: "Cost Plus Method",
        median: "4.2%",
        medianSubtitle: "Median",
        medianDescription: "Recommended Rate",
        comparables: "12",
        comparablesSubtitle: "Comparables",
        comparablesDescription: "Data Points"
      };
    } else if (queryLower.includes('licensing')) {
      analysisTitle = "IP Licensing benchmarking: Singapore ↔ China | Technology Licensing";
      metrics = {
        range: "2% - 5%",
        rangeSubtitle: "Inter-Quartile Range",
        rangeDescription: "Royalty Rate",
        median: "3.8%",
        medianSubtitle: "Median", 
        medianDescription: "Recommended Rate",
        comparables: "8",
        comparablesSubtitle: "Comparables",
        comparablesDescription: "Data Points"
      };
    }

    return {
      query,
      analysisTitle,
      metrics,
      services: [
        {
          id: 1,
          title: "Detailed Comparables Report",
          description: "Do you need detailed report of the comparables for benchmarking analysis?",
          price: "USD 2,000",
          type: "analysis"
        },
        {
          id: 2,
          title: "OECD Transfer Pricing Report",
          description: "Do you need to prepare a OECD transfer pricing report for tax filing purposes?",
          price: "USD 6,000",
          type: "document"
        },
        {
          id: 3,
          title: "Inter-Company Agreement",
          description: "Do you need an inter-company agreement for this transaction?",
          price: "USD 4,000",
          type: "agreement"
        },
        {
          id: 4,
          title: "Transfer Pricing Planning",
          description: "Do you need any other help with transfer pricing planning?",
          price: "Contact Us",
          type: "consultation",
          isConsultation: true
        }
      ]
    };
  };

  const handleFilterChange = (key: keyof BenchmarkFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchInputClick = () => {
    if (searchContainerRef.current) {
      const rect = searchContainerRef.current.getBoundingClientRect();
      setSuggestionPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setShowSuggestions(true);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (!showSuggestions) {
      if (searchContainerRef.current) {
        const rect = searchContainerRef.current.getBoundingClientRect();
        setSuggestionPosition({
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
          width: rect.width
        });
      }
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // Automatically search when suggestion is clicked
    setIsLoading(true);
    setTimeout(() => {
      const results = generateMockResults(suggestion);
      setSearchResults(results);
      setIsLoading(false);
    }, 1500);
  };

  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
  };

  const resetFilters = () => {
    setFilters({
      sector: '',
      industry: '',
      subIndustry: '',
      hqCountry: '',
      testedEntityCountry: '',
      functionalCharacteristics: '',
      risk: ''
    });
  };

  const handleAddToCart = (service: any) => {
    const cartItem = {
      id: service.id,
      type: service.type as 'agreement' | 'analysis' | 'document',
      title: service.title,
      description: service.description,
      metadata: {
        price: service.price,
        searchQuery: searchResults?.query,
        analysisTitle: searchResults?.analysisTitle
      }
    };
    onAddToCart(cartItem);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setShowSuggestions(false);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock benchmark results based on search query
      const results = generateMockResults(searchQuery);
      setSearchResults(results);
      setIsLoading(false);
    }, 1500);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
    setShowSuggestions(false);
  };

  const handleGenerateReport = () => {
    // Generate mock PDF content
    const pdfContent = `
      <html>
        <head>
          <title>Transfer Pricing Benchmark Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
            .header { border-bottom: 2px solid #0891b2; padding-bottom: 20px; margin-bottom: 30px; }
            .title { color: #0891b2; font-size: 24px; margin-bottom: 10px; }
            .subtitle { color: #666; font-size: 16px; }
            .metric-card { border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 20px 0; background: #f9f9f9; }
            .metric-value { font-size: 28px; font-weight: bold; color: #0891b2; }
            .metric-label { font-size: 14px; color: #666; margin-top: 5px; }
            .section { margin: 30px 0; }
            .section-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 15px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Transfer Pricing Benchmark Report</div>
            <div class="subtitle">${searchResults?.analysisTitle || 'Benchmarking Analysis'}</div>
            <div style="color: #666; font-size: 12px; margin-top: 10px;">Generated on ${new Date().toLocaleDateString()}</div>
          </div>
          
          <div class="section">
            <div class="section-title">Executive Summary</div>
            <p>This report provides comprehensive benchmarking analysis for transfer pricing purposes, examining comparable transactions and establishing arm's length pricing parameters.</p>
          </div>
          
          <div class="section">
            <div class="section-title">Key Metrics</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
              <div class="metric-card">
                <div class="metric-value">${searchResults?.metrics.range || 'N/A'}</div>
                <div class="metric-label">${searchResults?.metrics.rangeSubtitle || 'Inter-Quartile Range'}</div>
                <div style="font-size: 12px; color: #888; margin-top: 5px;">${searchResults?.metrics.rangeDescription || 'Cost Plus Method'}</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${searchResults?.metrics.median || 'N/A'}</div>
                <div class="metric-label">${searchResults?.metrics.medianSubtitle || 'Median'}</div>
                <div style="font-size: 12px; color: #888; margin-top: 5px;">${searchResults?.metrics.medianDescription || 'Recommended Rate'}</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${searchResults?.metrics.comparables || 'N/A'}</div>
                <div class="metric-label">${searchResults?.metrics.comparablesSubtitle || 'Comparables'}</div>
                <div style="font-size: 12px; color: #888; margin-top: 5px;">${searchResults?.metrics.comparablesDescription || 'Data Points'}</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">Search Query</div>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-style: italic;">"${searchResults?.query || 'No query specified'}"</p>
          </div>
          
          <div class="section">
            <div class="section-title">Methodology</div>
            <p>This analysis follows OECD Transfer Pricing Guidelines and applies the most appropriate transfer pricing method to establish arm's length pricing. The benchmarking search identified relevant comparable transactions based on functional analysis, risk assessment, and economic circumstances.</p>
          </div>
          
          <div class="section">
            <div class="section-title">Conclusions</div>
            <p>Based on the benchmarking analysis, the recommended transfer pricing range falls within the inter-quartile range of ${searchResults?.metrics.range || 'N/A'}, with a median of ${searchResults?.metrics.median || 'N/A'}. This analysis supports the arm's length nature of the tested transactions.</p>
          </div>
          
          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>This report is generated by taxSAGE.ai for transfer pricing analysis purposes.</p>
            <p>Report ID: TP-${Date.now()}</p>
          </div>
        </body>
      </html>
    `;
    
    // Create a blob and open in new window
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    
    // Clean up the URL after a delay
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Contract Manufacturing':
        return <BarChart3 className="w-4 h-4 text-blue-600" />;
      case 'Manufacturing':
        return <Building2 className="w-4 h-4 text-green-600" />;
      case 'Distribution':
        return <Globe className="w-4 h-4 text-orange-600" />;
      case 'IP Licensing':
        return <FileText className="w-4 h-4 text-purple-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white">
      <PageHeader 
        title="Agile Benchmarking"
        titleHighlight="Agile"
        module="benchmark"
        icon={Target}
      />
      
      <div className="p-6 space-y-6 max-w-6xl mx-auto overflow-auto">
        {/* Main Search Bar */}
        <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <div className="relative flex-1" ref={searchContainerRef}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for benchmarks, margins, comparables..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onClick={handleSearchInputClick}
                  className={`pl-10 h-12 bg-gray-50/80 border-gray-200/50 focus:bg-white cursor-pointer ${
                    (searchQuery || searchResults) ? 'pr-10' : ''
                  }`}
                />
                {(searchQuery || searchResults) && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              <Button 
                onClick={handleSearch}
                variant="login"
                className="h-12 px-8 rounded-xl"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-center space-x-3">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                <span className="text-gray-600">Analyzing benchmark data...</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search Results */}
        {searchResults && !isLoading && (
          <div className="space-y-6">
            {/* Generate Report Button */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Benchmark Analysis Complete</h3>
                      <p className="text-sm text-gray-600">Generate a comprehensive PDF report of your benchmarking results</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleGenerateReport}
                    variant="login"
                    className="rounded-xl"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Query Display */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-blue-600" />
                  <div>
                    <span className="text-sm text-gray-500">Search Query:</span>
                    <h3 className="text-lg font-semibold text-gray-900">{searchResults.query}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benchmark Analysis Results */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Benchmark Analysis Results</h2>
                </div>
                
                <p className="text-gray-600 mb-8">{searchResults.analysisTitle}</p>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/50">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {searchResults.metrics.range}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        {searchResults.metrics.rangeSubtitle}
                      </div>
                      <div className="text-xs text-gray-500">
                        {searchResults.metrics.rangeDescription}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {searchResults.metrics.median}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        {searchResults.metrics.medianSubtitle}
                      </div>
                      <div className="text-xs text-gray-500">
                        {searchResults.metrics.medianDescription}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200/50">
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {searchResults.metrics.comparables}
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-1">
                        {searchResults.metrics.comparablesSubtitle}
                      </div>
                      <div className="text-xs text-gray-500">
                        {searchResults.metrics.comparablesDescription}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Additional Services */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Additional Services</h3>
                  <p className="text-gray-600 mb-6">Enhance your transfer pricing analysis with our professional services</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {searchResults.services.map((service: any) => (
                      <Card key={service.id} className="bg-white/80 border border-gray-200/50 hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200/50">
                              <ShoppingCart className="w-5 h-5 text-blue-600" />
                            </div>
                            
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">{service.title}</h4>
                              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                              
                              <div className="flex items-center justify-between">
                                <div className="text-lg font-bold text-blue-600">
                                  {service.price}
                                </div>
                                
                                {service.isConsultation ? (
                                  <div className="flex gap-2">
                                    <Button variant="login" size="sm" className="h-10 px-6 rounded-xl">
                                      Yes
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-10 px-6 rounded-xl">
                                      No
                                    </Button>
                                  </div>
                                ) : (
                                  <Button 
                                    onClick={() => handleAddToCart(service)}
                                    variant="login" 
                                    size="sm"
                                    className="h-10 px-6 rounded-xl"
                                  >
                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                    Add to Cart
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Benchmark Filters and Recent Searches - Only show when no results */}
        {!searchResults && !isLoading && (
          <>
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg relative z-10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Benchmark Filters</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Refine your search with specific criteria to find the most relevant comparables
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sector</label>
                <Select value={filters.sector} onValueChange={(value) => handleFilterChange('sector', value)}>
                  <SelectTrigger className="bg-gray-50/80 border-gray-200/50">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Financial Services">Financial Services</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Industry */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Industry</label>
                <Select value={filters.industry} onValueChange={(value) => handleFilterChange('industry', value)}>
                  <SelectTrigger className="bg-gray-50/80 border-gray-200/50">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semi Conductor">Semi Conductor</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Automotive">Automotive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sub-Industry */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Sub-Industry</label>
                <Select value={filters.subIndustry} onValueChange={(value) => handleFilterChange('subIndustry', value)}>
                  <SelectTrigger className="bg-gray-50/80 border-gray-200/50">
                    <SelectValue placeholder="Select sub-industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Services">Services</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Assembly">Assembly</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* HQ Country */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">HQ Country</label>
                <Select value={filters.hqCountry} onValueChange={(value) => handleFilterChange('hqCountry', value)}>
                  <SelectTrigger className="bg-gray-50/80 border-gray-200/50">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Singapore">Singapore</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                    <SelectItem value="South Korea">South Korea</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tested Entity Country */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tested Entity Country</label>
                <Select value={filters.testedEntityCountry} onValueChange={(value) => handleFilterChange('testedEntityCountry', value)}>
                  <SelectTrigger className="bg-gray-50/80 border-gray-200/50">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Malaysia">Malaysia</SelectItem>
                    <SelectItem value="Thailand">Thailand</SelectItem>
                    <SelectItem value="Vietnam">Vietnam</SelectItem>
                    <SelectItem value="Philippines">Philippines</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Functional Characteristics */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Functional Characteristics</label>
                <Select value={filters.functionalCharacteristics} onValueChange={(value) => handleFilterChange('functionalCharacteristics', value)}>
                  <SelectTrigger className="bg-gray-50/80 border-gray-200/50">
                    <SelectValue placeholder="Select characteristics" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Contract Mfr">Contract Mfr</SelectItem>
                    <SelectItem value="Distribution">Distribution</SelectItem>
                    <SelectItem value="R&D Services">R&D Services</SelectItem>
                    <SelectItem value="IP Licensing">IP Licensing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Risk */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Risk</label>
                <Select value={filters.risk} onValueChange={(value) => handleFilterChange('risk', value)}>
                  <SelectTrigger className="bg-gray-50/80 border-gray-200/50">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Risk">Full Risk</SelectItem>
                    <SelectItem value="Limited Risk">Limited Risk</SelectItem>
                    <SelectItem value="Low Risk">Low Risk</SelectItem>
                    <SelectItem value="No Risk">No Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 rounded-xl"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Defaults
              </Button>
              
              <Button 
                onClick={handleSearch}
                variant="login"
                className="flex items-center gap-2 rounded-xl"
              >
                <Search className="w-4 h-4" />
                Apply Filters & Search
              </Button>
            </div>
          </CardContent>
            </Card>

            {/* Recent Searches */}
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Searches</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-6">
              Your previous benchmark searches and analyses
            </p>

            <div className="space-y-4">
              {recentSearches.map((search) => (
                <div 
                  key={search.id}
                  onClick={() => handleSuggestionClick(search.title)}
                  className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-lg border border-gray-200/30 hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="p-2 bg-white rounded-lg border border-gray-200/50">
                    {getCategoryIcon(search.category)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {search.title}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {search.category}
                      </Badge>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {search.timeAgo}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSuggestionClick(search.title);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
            </Card>
          </>
        )}

      </div>

      {/* Search Suggestions Window - Fixed positioning for top layer */}
      {showSuggestions && (
        <>
          {/* Backdrop overlay */}
          <div className="fixed inset-0 bg-black/10 z-[9998]" onClick={handleCloseSuggestions} />
          
          {/* Suggestions panel */}
          <div 
            className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl z-[9999]"
            style={{
              top: `${suggestionPosition.top}px`,
              left: `${suggestionPosition.left}px`,
              width: `${suggestionPosition.width}px`
            }}
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Benchmark Search Suggestions</h3>
                </div>
                <button
                  onClick={handleCloseSuggestions}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Trending Benchmarks */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Trending Benchmarks</span>
                </div>
                
                <div className="space-y-2">
                  {trendingBenchmarks.map((benchmark, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(benchmark)}
                      className="flex items-center gap-3 w-full p-3 text-left hover:bg-blue-50 hover:border-blue-200 rounded-lg transition-all duration-200 group border border-transparent cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="p-1.5 bg-blue-50 rounded-md border border-blue-100 group-hover:bg-blue-100 group-hover:border-blue-200 transition-all duration-200">
                        <Zap className="w-3 h-3 text-blue-600 group-hover:text-blue-700" />
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-200">{benchmark}</span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Search className="w-4 h-4 text-blue-600" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}