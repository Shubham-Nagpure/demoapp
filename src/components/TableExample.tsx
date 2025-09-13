import StandardTable from './StandardTable';
import { Badge } from './ui/badge';

// Example data demonstrating different cell types
const exampleData = [
  {
    company: { icon: "🍎", text: "Apple" },
    description: "Global leader in consumer electronics and software",
    domain: "apple.com",
    location: { icon: "🇺🇸", text: "Cupertino, CA" },
    status: <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>,
    revenue: "$394.3B"
  },
  {
    company: { icon: "💻", text: "Microsoft" },
    description: "Technology giant providing software and cloud services",
    domain: "microsoft.com",
    location: { icon: "🇺🇸", text: "Redmond, WA" },
    status: <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>,
    revenue: "$211.9B"
  },
  {
    company: { icon: "🛒", text: "Amazon" },
    description: "E-commerce, cloud computing, and streaming powerhouse",
    domain: "amazon.com",
    location: { icon: "🇺🇸", text: "Seattle, WA" },
    status: <Badge className="bg-blue-100 text-blue-700 border-blue-200">Growing</Badge>,
    revenue: "$574.8B"
  },
  {
    company: { icon: "🔍", text: "Google" },
    description: "Search engine and digital advertising leader",
    domain: "google.com",
    location: { icon: "🇺🇸", text: "Mountain View, CA" },
    status: <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>,
    revenue: "$307.4B"
  }
];

const exampleColumns = [
  { key: 'company', title: 'Company', sortable: true, width: '200px' },
  { key: 'description', title: 'Description', sortable: false },
  { key: 'domain', title: 'Domain', sortable: true, width: '150px' },
  { key: 'location', title: 'Location', sortable: true, width: '180px' },
  { key: 'status', title: 'Status', sortable: false, width: '120px' },
  { key: 'revenue', title: 'Revenue', sortable: true, align: 'right' as const, width: '120px' }
];

export default function TableExample() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Standard Table Example</h1>
          <p className="text-gray-600">
            This is the standardized table format that should be used across the TAXSAGE application.
            Simply mention "Table" in your prompts to use this design language.
          </p>
        </div>

        <StandardTable 
          columns={exampleColumns}
          data={exampleData}
          searchable={true}
          filterable={true}
          onRowClick={(row) => console.log('Clicked row:', row)}
        />
      </div>
    </div>
  );
}