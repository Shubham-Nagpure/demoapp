import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function PlanPage() {
  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Planning Dashboard</h1>
        <p className="text-gray-600">Optimize your tax strategy with intelligent planning tools</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Estimated Tax Savings</p>
              <p className="text-2xl font-bold text-green-600">$12,450</p>
            </div>
            <Badge variant="secondary" className="bg-green-50 text-green-700">+15%</Badge>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Tax Rate</p>
              <p className="text-2xl font-bold text-blue-600">24%</p>
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">Federal</Badge>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Deadline</p>
              <p className="text-2xl font-bold text-orange-600">45 days</p>
            </div>
            <Badge variant="secondary" className="bg-orange-50 text-orange-700">Q4 Est.</Badge>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tax Strategies */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recommended Strategies</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium">Maximize 401(k) Contributions</h3>
                <p className="text-sm text-gray-600">Potential savings: $4,200</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium">Health Savings Account</h3>
                <p className="text-sm text-gray-600">Potential savings: $2,800</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-medium">Tax-Loss Harvesting</h3>
                <p className="text-sm text-gray-600">Potential savings: $1,650</p>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500">
            View All Strategies
          </Button>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 border-l-4 border-blue-500 bg-gray-50">
              <div className="flex-1">
                <p className="font-medium">Q3 Estimated Payment</p>
                <p className="text-sm text-gray-600">Processed - $3,245</p>
              </div>
              <Badge variant="outline">Completed</Badge>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border-l-4 border-yellow-500 bg-gray-50">
              <div className="flex-1">
                <p className="font-medium">Document Upload</p>
                <p className="text-sm text-gray-600">W-2 Form 2024</p>
              </div>
              <Badge variant="outline">Pending Review</Badge>
            </div>
            
            <div className="flex items-center space-x-3 p-3 border-l-4 border-green-500 bg-gray-50">
              <div className="flex-1">
                <p className="font-medium">Strategy Update</p>
                <p className="text-sm text-gray-600">Retirement planning optimized</p>
              </div>
              <Badge variant="outline">Updated</Badge>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-6">
            View All Activity
          </Button>
        </Card>
      </div>

      {/* Action Items */}
      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Action Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Review Tax Documents</h3>
            <p className="text-sm text-gray-600 mb-4">Ensure all 2024 documents are uploaded</p>
            <Button size="sm" variant="outline">Review</Button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Schedule Consultation</h3>
            <p className="text-sm text-gray-600 mb-4">Discuss year-end tax strategies</p>
            <Button size="sm" variant="outline">Schedule</Button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="font-medium mb-2">Update Information</h3>
            <p className="text-sm text-gray-600 mb-4">Income and deduction changes</p>
            <Button size="sm" variant="outline">Update</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}