import React from 'react';
import PageHeader from "./PageHeader";
import FARAnalysisDataTable from "./FARAnalysisDataTable";

export default function FARAnalysis() {
  return (
    <div className="h-full overflow-auto bg-white">
      <PageHeader 
        title="FAR Analysis"
        module="plan"
        tool="far-analysis"
      />
      
      <div className="bg-gray-50/30 min-h-[calc(100vh-120px)]">
        <div className="p-8 max-w-7xl mx-auto">
          {/* FAR Analysis Data Table */}
          <FARAnalysisDataTable />
        </div>
      </div>
    </div>
  );
}