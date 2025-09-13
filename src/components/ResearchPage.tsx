import { useState } from 'react';
import { Search, TrendingUp, Database, FileText, Bookmark, Clock, Sparkles, Star, Download, Share2, Save, MapPin, Building, Users, ExternalLink, ArrowLeft, Globe, BarChart3, UserCheck, X } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import PageHeader from "./PageHeader";

const researchTopics = [
  {
    title: "What are the benchmark margins for manufacturing in APAC?",
    category: "Benchmarking",
    users: 234,
    percentage: 89,
    color: "from-emerald-50 to-green-100",
    type: "Question",
    date: "2 days ago",
    trending: true,
    jurisdiction: "APAC",
    industry: "Manufacturing",
    method: "TNMM",
    source: "Industry Database",
    relevanceScore: 95,
    summary: "Comprehensive analysis of manufacturing margins across APAC markets including China, India, and Southeast Asia."
  },
  {
    title: "Latest OECD transfer pricing guidelines on digital services",
    category: "Regulatory",
    users: 189,
    percentage: 76,
    color: "from-blue-50 to-indigo-100",
    type: "Guidelines",
    date: "1 day ago",
    trending: false,
    jurisdiction: "Global",
    industry: "Technology",
    method: "Profit Split",
    source: "OECD Official",
    relevanceScore: 88,
    summary: "Updated OECD guidelines addressing transfer pricing challenges in the digitalized economy."
  },
  {
    title: "Comparable companies for automotive parts distribution",
    category: "Comparability",
    users: 156,
    percentage: 82,
    color: "from-purple-50 to-violet-100",
    type: "Analysis",
    date: "3 days ago",
    trending: true,
    jurisdiction: "EU",
    industry: "Automotive",
    method: "CUP",
    source: "Market Analysis",
    relevanceScore: 92,
    summary: "Detailed comparable company analysis for automotive parts distribution across European markets."
  },
  {
    title: "DEMPE analysis for intangible assets valuation",
    category: "Intangibles",
    users: 143,
    percentage: 71,
    color: "from-orange-50 to-red-100",
    type: "Framework",
    date: "1 day ago",
    trending: false,
    jurisdiction: "US",
    industry: "Pharmaceuticals",
    method: "DEMPE",
    source: "Academic Research",
    relevanceScore: 87,
    summary: "Framework for Development, Enhancement, Maintenance, Protection, and Exploitation of intangibles."
  },
  {
    title: "Transfer pricing documentation requirements in EU",
    category: "Documentation",
    users: 127,
    percentage: 68,
    color: "from-cyan-50 to-blue-100",
    type: "Compliance",
    date: "4 days ago",
    trending: false,
    jurisdiction: "EU",
    industry: "General",
    method: "Documentation",
    source: "Tax Authority",
    relevanceScore: 78,
    summary: "Complete guide to EU transfer pricing documentation requirements and best practices."
  },
  {
    title: "Cost plus markup rates for shared services",
    category: "Service Fees",
    users: 108,
    percentage: 79,
    color: "from-pink-50 to-rose-100",
    type: "Benchmark",
    date: "2 days ago",
    trending: true,
    jurisdiction: "Global",
    industry: "Shared Services",
    method: "Cost Plus",
    source: "Benchmarking Study",
    relevanceScore: 84,
    summary: "Market benchmarks for cost-plus markup rates applicable to intercompany shared services."
  }
];



const popularTopics = [
  {
    title: "What are the benchmark margins for manufacturing in APAC?",
    category: "Benchmarking",
    users: 234,
    percentage: 89,
    color: "emerald"
  },
  {
    title: "Latest OECD transfer pricing guidelines on digital services",
    category: "Regulatory",
    users: 189,
    percentage: 76,
    color: "blue"
  },
  {
    title: "Comparable companies for automotive parts distribution",
    category: "Comparability", 
    users: 156,
    percentage: 82,
    color: "amber"
  },
  {
    title: "DEMPE analysis for intangible assets valuation",
    category: "Intangibles",
    users: 143,
    percentage: 71,
    color: "gray"
  },
  {
    title: "Transfer pricing documentation requirements in EU",
    category: "Documentation",
    users: 127,
    percentage: 68,
    color: "gray"
  },
  {
    title: "Cost plus markup rates for shared services",
    category: "Service Fees",
    users: 198,
    percentage: 79,
    color: "amber"
  }
];



const recentSearches = [
  {
    id: 1,
    query: "Summarise key transfer pricing disputes in life sciences",
    category: "Case Studies",
    icon: FileText,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    query: "Transfer Pricing Case relating to Pepsi Australia",
    category: "Legal",
    icon: Globe,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    query: "What's the transfer pricing benchmarking range for software companies in India",
    category: "Benchmarking",
    icon: BarChart3,
    timestamp: "1 day ago"
  },
  {
    id: 4,
    query: "Is berry ratio accepted by the Singapore tax authorities?",
    category: "Regulatory",
    icon: UserCheck,
    timestamp: "2 days ago"
  }
];

// Life Sciences Case Studies Data
const lifeSciencesCases = [
  {
    id: 1,
    title: "Medtronic, Inc. v. Commissioner",
    status: "Completed",
    court: "U.S. Tax Court",
    tags: ["Intangibles", "Royalties", "Medical Devices", "Puerto Rico"],
    statusColor: "bg-green-100 text-green-700 border-green-200",
    caseSummary: "Medtronic Puerto Rico Operations Co. (MPROC) manufactured implantable cardiac & spinal devices. It paid royalties to U.S. parent for intangibles (patents, know-how, trademarks). IRS argued Medtronic underpaid royalties by shifting too much profits to Puerto Rico.",
    keyIssue: "What is the arm's-length royalty rate for device IP?",
    outcome: "The U.S. Tax Court initially crafted its own method to determine an arm's-length royalty after rejecting both IRS and Medtronic's approaches, leading to prolonged litigation and appeals.",
    details: "Court rejected pure CUT & CPM; crafted unspecified hybrid method, resulting in ~70% system profit to U.S and ~30% to PR.",
    keyTakeaway: "This teaches us that robust analysis and documentation for intangible licenses are critical – an insufficient method or support can result in years-long battles",
    takeawayColor: "bg-yellow-50 border-yellow-200 text-yellow-800"
  },
  {
    id: 2,
    title: "Amgen Inc. v. Commissioner",
    status: "Pending",
    court: "U.S. Tax Court",
    tags: ["Biologics", "DEMPE", "Manufacturing", "Cost-Sharing", "Puerto Rico"],
    statusColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
    caseSummary: "Amgen Manufacturing Ltd. (AML) in Puerto Rico produces biologics. IRS claimed Amgen shifted excessive profit to PR. Adjustments for 2010–2015: ~$10.7B (tax + penalties + interest). Amgen disputes, says allocations consistent with cost-sharing and arm's-length principles.",
    keyIssue: "How should U.S. vs. Puerto Rico returns be divided for biologic manufacturing?",
    outcome: "The case is still ongoing. This is one of the largest TP disputes on record and will be a Critical test case for DEMPE framework and Puerto Rico structures.",
    details: "The IRS arguments are that PR plant was contract-like manufacturer and hence bulk of profit should stay in U.S. where R&D, IP control, and DEMPE functions sit. Amgen argues that PR entity bore significant manufacturing, regulatory, and quality risks and therefore is entitled to high returns.",
    keyTakeaway: "The outcome could reshape profit allocation for pharma/biotech groups with offshore manufacturing.",
    takeawayColor: "bg-yellow-50 border-yellow-200 text-yellow-800"
  }
];

const relatedResearch = [
  {
    title: "Pharmaceutical Industry TP Trends",
    description: "Latest developments in pharma transfer pricing"
  },
  {
    title: "DEMPE Framework Applications",
    description: "Development, Enhancement, Maintenance, Protection, Exploitation analysis"
  },
  {
    title: "Cost-Sharing Arrangements",
    description: "Best practices for intangible development cost sharing"
  }
];

// Life Sciences Cases Display Component
function LifeSciencesCasesView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900 mb-2">Key Transfer Pricing Disputes in Life Sciences</h1>
        <p className="text-gray-600">
          Transfer pricing disputes in the life sciences sector often involve complex intangible property valuations, cost-
          sharing arrangements, and profit allocation between manufacturing and R&D entities.
        </p>
      </div>

      {/* Case Studies */}
      <div className="space-y-6">
        {lifeSciencesCases.map((case_item) => (
          <div key={case_item.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            {/* Case Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl text-gray-900">{case_item.title}</h2>
                  <Badge className={case_item.statusColor}>
                    {case_item.status}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">{case_item.court}</p>
                <div className="flex flex-wrap gap-2">
                  {case_item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Case Content */}
            <div className="space-y-4">
              {/* Case Summary */}
              <div className="border-l-4 border-blue-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <h3 className="text-gray-900">Case Summary</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{case_item.caseSummary}</p>
              </div>

              {/* Key Issue */}
              <div className="border-l-4 border-purple-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 text-xs">?</span>
                  </span>
                  <h3 className="text-gray-900">Key Issue</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{case_item.keyIssue}</p>
              </div>

              {/* Outcome */}
              <div className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </span>
                  <h3 className="text-gray-900">Outcome</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{case_item.outcome}</p>
              </div>

              {/* Details */}
              <div className="border-l-4 border-orange-500 pl-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-orange-600" />
                  <h3 className="text-gray-900">Details</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{case_item.details}</p>
              </div>

              {/* Key Takeaway */}
              <div className="border-l-4 border-yellow-500 pl-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-yellow-600" />
                  <h3 className="text-gray-900">Key Takeaway</h3>
                </div>
                <div className={`p-4 rounded-lg border ${case_item.takeawayColor}`}>
                  <p className="text-sm leading-relaxed">{case_item.keyTakeaway}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Related Research */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl text-gray-900">Related Research</h2>
        </div>
        <p className="text-gray-600 mb-6">Explore more transfer pricing research on related topics</p>
        
        <div className="space-y-4">
          {relatedResearch.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div>
                <h3 className="text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">
                <ExternalLink className="w-3 h-3 mr-2" />
                Explore
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ResearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [activeResearchTab, setActiveResearchTab] = useState('overview');
  const [selectedResearch, setSelectedResearch] = useState<any>(null);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [showLifeSciencesCases, setShowLifeSciencesCases] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setHasSearched(true);
      // Check if this is the life sciences disputes query
      if (searchQuery === "Summarise key transfer pricing disputes in life sciences") {
        setShowLifeSciencesCases(true);
      } else {
        setShowLifeSciencesCases(false);
      }
      console.log('Searching for:', searchQuery);
    }
  };

  const filteredTopics = researchTopics.filter(topic => {
    const matchesSearch = !searchQuery || topic.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         topic.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleResearchSelect = (topic: any) => {
    setSelectedResearch(topic);
    setHasSearched(true);
  };

  const handleBackToSearch = () => {
    setSelectedResearch(null);
  };

  const handleSaveSearch = () => {
    const searchTerm = searchQuery || 'Current Search';
    setSavedSearches(prev => [...prev, searchTerm]);
    console.log('Search saved:', searchTerm);
  };

  const handleExportResults = () => {
    console.log('Exporting search results...');
  };

  const handleShareResults = () => {
    console.log('Sharing search results...');
  };

  const handleClearData = () => {
    setSearchQuery('');
    setHasSearched(false);
    setShowLifeSciencesCases(false);
    setSelectedResearch(null);
    console.log('Search data cleared');
  };



  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {!selectedResearch && (
        <PageHeader 
          title="Research Lens"
          titleHighlight="Research"
          module="research"
          icon={Search}
        />
      )}
      {selectedResearch ? (
        /* Research Details View */
        <div className="flex flex-col flex-1">
            {/* Research Header */}
            <div className="p-6 bg-white/80 backdrop-blur-xl border-b border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBackToSearch}
                  className="bg-white/70 border-white/40 hover:bg-white rounded-xl"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Search
                </Button>
                <div className="flex-1">
                  <h1 className="text-xl text-gray-900 mb-1">
                    <span className="text-blue-600">Transfer Pricing</span> Research Details
                  </h1>
                  <p className="text-gray-600">{selectedResearch.title}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white/70 border-white/40 rounded-xl" onClick={handleSaveSearch}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/70 border-white/40 rounded-xl" onClick={handleShareResults}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/70 border-white/40 rounded-xl" onClick={handleExportResults}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Research Stats */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {selectedResearch.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{selectedResearch.users} researchers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{selectedResearch.relevanceScore}% relevance</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedResearch.jurisdiction}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  <span>{selectedResearch.industry}</span>
                </div>
              </div>
            </div>

            {/* Research Content Tabs */}
            <div className="flex-1 overflow-auto p-6">
              <Tabs value={activeResearchTab} onValueChange={setActiveResearchTab} className="space-y-6">
                <TabsList className="bg-white/60 backdrop-blur-sm">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                  <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle>Executive Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">{selectedResearch.summary}</p>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="text-sm text-gray-900 mb-1">Transfer Pricing Method</h4>
                          <p className="text-sm text-gray-700">{selectedResearch.method}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <h4 className="text-sm text-gray-900 mb-1">Source Type</h4>
                          <p className="text-sm text-gray-700">{selectedResearch.source}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-6">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle>Detailed Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        This research provides comprehensive insights into {selectedResearch.title.toLowerCase()}, 
                        focusing on practical applications and regulatory compliance requirements.
                      </p>
                      <div className="space-y-3">
                        <div className="border-l-4 border-blue-500 pl-4">
                          <h4 className="text-gray-900 mb-2">Key Findings</h4>
                          <p className="text-gray-700 text-sm">Primary analysis results and implications for transfer pricing strategy.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4">
                          <h4 className="text-gray-900 mb-2">Recommendations</h4>
                          <p className="text-gray-700 text-sm">Actionable recommendations based on current market conditions.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="guidelines" className="space-y-6">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle>Regulatory Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h4 className="text-gray-900 mb-2">OECD Guidelines</h4>
                          <p className="text-sm text-gray-700">Relevant OECD transfer pricing guidelines and their application.</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="text-gray-900 mb-2">Local Regulations</h4>
                          <p className="text-sm text-gray-700">Jurisdiction-specific requirements and compliance obligations.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="resources" className="space-y-6">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/30">
                    <CardHeader>
                      <CardTitle>Related Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[1, 2, 3].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white/50">
                            <div>
                              <h4 className="text-gray-900 text-sm">Related Document {item}</h4>
                              <p className="text-xs text-gray-600">Additional resource for comprehensive understanding</p>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-xl">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
          </div>
        </div>
      ) : (
        /* Search Results View */
        <>
          {/* Enhanced Search Header */}
          <div className="p-6 bg-white/80 backdrop-blur-xl border-b border-white/20">
            {/* Search Bar */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/30 shadow-lg mb-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search transfer pricing topics, regulations, or case studies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 bg-white/70 border-white/40 focus:bg-white focus:border-blue-300 transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearData}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Button 
                  onClick={handleSearch}
                  variant="login"
                  className="px-6 rounded-xl"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Search Stats and Actions */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {hasSearched ? `Showing ${filteredTopics.length} research topics` : 'Explore popular research topics'}
              </span>
                <div className="flex items-center gap-4">
                  {hasSearched && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleSaveSearch} className="text-xs rounded-xl">
                        <Save className="w-3 h-3 mr-1" />
                        Save Search
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleExportResults} className="text-xs rounded-xl">
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShareResults} className="text-xs rounded-xl">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-gray-500">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Live Updates
                    </span>
                    <span className="flex items-center gap-1">
                      <Database className="w-4 h-4" />
                      50K+ Sources
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Content */}
            <div className="flex-1 overflow-auto p-6">
              {showLifeSciencesCases ? (
                /* Life Sciences Cases View */
                <LifeSciencesCasesView />
              ) : !hasSearched ? (
                /* Popular Topics - Default View */
                <div className="space-y-6">
                  {/* Recent Searches */}
                  <div>
                    <h2 className="text-lg mb-4 text-gray-800">Recent Searches</h2>
                    <div className="space-y-3">
                      {recentSearches.map((search) => {
                        const IconComponent = search.icon;
                        const getCategoryColor = (category: string) => {
                          switch (category) {
                            case 'Case Studies': return 'bg-orange-100 text-orange-700 border-orange-200';
                            case 'Legal': return 'bg-blue-100 text-blue-700 border-blue-200';
                            case 'Benchmarking': return 'bg-purple-100 text-purple-700 border-purple-200';
                            case 'Regulatory': return 'bg-green-100 text-green-700 border-green-200';
                            default: return 'bg-gray-100 text-gray-700 border-gray-200';
                          }
                        };

                        return (
                          <div 
                            key={search.id} 
                            className="flex items-start gap-3 p-4 bg-white/80 hover:bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm hover:border-blue-200 group"
                            onClick={() => {
                              setSearchQuery(search.query);
                              setHasSearched(true);
                              
                              // Check if this is the life sciences disputes query
                              if (search.query === "Summarise key transfer pricing disputes in life sciences") {
                                setShowLifeSciencesCases(true);
                              } else {
                                setShowLifeSciencesCases(false);
                              }
                            }}
                          >
                            <div className="p-2 bg-gray-50 rounded-lg mt-0.5">
                              <IconComponent className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-gray-900 group-hover:text-blue-600 transition-colors mb-2 leading-relaxed">
                                {search.query}
                              </h3>
                              <div className="flex items-center gap-3">
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${getCategoryColor(search.category)}`}
                                >
                                  {search.category}
                                </Badge>
                                <span className="text-xs text-gray-500">{search.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Popular Research Topics */}
                  <div>
                    <h2 className="text-xl mb-4 text-gray-800">Popular Research Topics</h2>
                    <div className="space-y-3">
                      {popularTopics.map((topic, index) => {
                        const getColorClasses = (color: string) => {
                          switch (color) {
                            case 'emerald': return 'text-emerald-600 bg-emerald-50';
                            case 'blue': return 'text-blue-600 bg-blue-50';
                            case 'amber': return 'text-amber-600 bg-amber-50';
                            case 'gray': return 'text-gray-600 bg-gray-50';
                            default: return 'text-gray-600 bg-gray-50';
                          }
                        };

                        const matchingTopic = researchTopics.find(rt => rt.title === topic.title);

                        return (
                          <Card key={index} className="group border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-blue-200">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h3 className="text-base mb-2 text-gray-900 group-hover:text-blue-600 cursor-pointer transition-colors">
                                    {topic.title}
                                  </h3>
                                  <div className="flex items-center gap-3">
                                    <Badge 
                                      variant="secondary" 
                                      className={`${getColorClasses(topic.color)} border-0`}
                                    >
                                      {topic.category}
                                    </Badge>
                                    <span className="text-sm text-gray-500">{topic.users} uses</span>
                                  </div>
                                </div>
                                
                                {/* Percentage Circle */}
                                <div className="flex items-center gap-3">
                                  <div className={`w-12 h-6 rounded-full flex items-center justify-center text-sm ${getColorClasses(topic.color)}`}>
                                    {topic.percentage}%
                                  </div>
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleResearchSelect(matchingTopic || topic)}
                                    variant="login"
                                    className="rounded-xl"
                                  >
                                    <Search className="w-3 h-3 mr-1" />
                                    Research
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                /* Search Results View */
                <div className="grid gap-4">
                  {filteredTopics.map((topic, index) => (
                    <Card key={index} className="group border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            {/* Topic Header */}
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${topic.color.replace('400', '100').replace('500', '200')} flex items-center justify-center flex-shrink-0 border border-white/50`}>
                                <FileText className="w-6 h-6 text-gray-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                                    {topic.title}
                                  </h3>
                                  {topic.trending && (
                                    <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border border-orange-200">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                    {topic.category}
                                  </Badge>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {topic.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {topic.jurisdiction}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Building className="w-3 h-3" />
                                    {topic.industry}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Topic Description */}
                            <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                              {topic.summary}
                            </p>

                            {/* Enhanced Tags */}
                            <div className="flex flex-wrap gap-2 text-xs">
                              <span className="px-2 py-1 bg-green-100 rounded-full text-green-700">
                                {topic.relevanceScore}% Relevant
                              </span>
                              <span className="px-2 py-1 bg-blue-100 rounded-full text-blue-700">
                                {topic.method}
                              </span>
                              <span className="px-2 py-1 bg-purple-100 rounded-full text-purple-700">
                                {topic.source}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                                Updated {topic.date}
                              </span>
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2">
                            <Button 
                              onClick={() => handleResearchSelect(topic)}
                              variant="login"
                              className="border-0 group-hover:shadow-lg transition-all rounded-xl"
                            >
                              <Search className="w-4 h-4 mr-2" />
                              Research Now
                            </Button>
                            <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50 rounded-xl">
                              <Bookmark className="w-3 h-3 mr-2" />
                              Save
                            </Button>
                            <div className="text-center mt-2">
                              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{(topic.percentage / 20).toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
    </div>
  );
}