import { useState } from 'react';
import { ArrowLeft, Search, Bookmark, Download, Share2, Clock, User, FileText, ExternalLink, Star, TrendingUp } from 'lucide-react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ResearchDetailsPageProps {
  onBack: () => void;
  researchTopic: {
    title: string;
    category: string;
    type: string;
    users: number;
    percentage: number;
  } | null;
}

const relatedResources = [
  {
    title: "OECD Transfer Pricing Guidelines for Multinational Enterprises",
    type: "Guidelines",
    source: "OECD",
    date: "2022",
    relevance: 95
  },
  {
    title: "Digital Services Tax Implementation Guide",
    type: "Case Study",
    source: "Tax Authority",
    date: "2023",
    relevance: 88
  },
  {
    title: "Benchmarking Study: Digital Platform Services",
    type: "Analysis",
    source: "Industry Report",
    date: "2023",
    relevance: 82
  },
  {
    title: "Transfer Pricing Aspects of the Digitalized Economy",
    type: "Research",
    source: "Academic",
    date: "2023",
    relevance: 79
  }
];

const keyInsights = [
  {
    title: "Primary Methods for Digital Services",
    content: "The OECD recommends using profit split methods for highly integrated digital business models where unique and valuable contributions are made by multiple entities."
  },
  {
    title: "Jurisdiction-Specific Requirements",
    content: "Different jurisdictions have varying approaches to digital services taxation, with some implementing Digital Services Tax (DST) as an interim measure."
  },
  {
    title: "Documentation Requirements",
    content: "Enhanced documentation is required for digital transactions, including detailed descriptions of value creation and risk allocation."
  }
];

export default function ResearchDetailsPage({ onBack, researchTopic }: ResearchDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!researchTopic) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">No research topic selected</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white/80 backdrop-blur-xl border-b border-white/20">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="bg-white/70 border-white/40 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Research
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl text-gray-900 mb-1">
              Research Results: <span className="text-blue-600">Transfer Pricing</span> Analysis
            </h1>
            <p className="text-gray-600">{researchTopic.title}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/70 border-white/40">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="bg-white/70 border-white/40">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="bg-white/70 border-white/40">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Topic Stats */}
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {researchTopic.category}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{researchTopic.users} researchers</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{(researchTopic.percentage / 20).toFixed(1)} relevance score</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Last updated 2 days ago</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
            <TabsTrigger value="cases">Case Studies</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Executive Summary */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The OECD has established comprehensive guidelines for transfer pricing in the digital economy, 
                  addressing the unique challenges posed by digitalized business models. These guidelines focus on 
                  value creation, profit allocation, and appropriate transfer pricing methods for digital services.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Key considerations include the identification of economically significant activities, 
                  the allocation of risks and assets, and the selection of appropriate tested parties for 
                  benchmarking analysis in digital service transactions.
                </p>
              </CardContent>
            </Card>

            {/* Key Insights */}
            <Card className="bg-white/60 backdrop-blur-sm border-white/30">
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {keyInsights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-gray-900 mb-2">{insight.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{insight.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/30">
              <CardHeader>
                <CardTitle>OECD Guidelines Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-gray-900 mb-2">Chapter IX - Transfer Pricing Aspects</h4>
                    <p className="text-sm text-gray-700">Specific guidance on digitalized business models and value creation analysis.</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="text-gray-900 mb-2">Annexes A-D</h4>
                    <p className="text-sm text-gray-700">Detailed examples and case studies for different digital service scenarios.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="text-gray-900 mb-2">Implementation Guidance</h4>
                    <p className="text-sm text-gray-700">Practical steps for applying guidelines to specific business models.</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="text-gray-900 mb-2">Documentation Requirements</h4>
                    <p className="text-sm text-gray-700">Enhanced reporting standards for digital economy transactions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/30">
              <CardHeader>
                <CardTitle>Relevant Case Studies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg bg-white/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-gray-900">Digital Platform Services - EU Case</h4>
                      <Badge className="bg-green-100 text-green-700">Resolved</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      A multinational technology company's transfer pricing for cloud computing services 
                      was challenged by EU tax authorities. The case established precedent for profit 
                      split method application.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>2023</span>
                      <span>EU Tax Court</span>
                      <span>€50M adjustment</span>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg bg-white/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-gray-900">SaaS Revenue Recognition - US Case</h4>
                      <Badge className="bg-blue-100 text-blue-700">Ongoing</Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">
                      Software-as-a-Service provider's intercompany licensing agreements under 
                      scrutiny for appropriate allocation of development costs and resulting profits.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>2024</span>
                      <span>US Tax Court</span>
                      <span>$200M in question</span>
                    </div>
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
                  {relatedResources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{resource.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          <span>{resource.source}</span>
                          <span>{resource.date}</span>
                          <span className="text-blue-600">{resource.relevance}% relevant</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
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
  );
}