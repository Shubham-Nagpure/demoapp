import { useState } from 'react';
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";
import TPPolicySummary from "./TPPolicySummary";
// COMMENTED OUT - TO BE MOVED TO DOCUMENT MODULE
// import TPCountryRules from "./TPCountryRules";
// import TPComplianceTracker from "./TPComplianceTracker";
import FARAnalysis from "./FARAnalysis";
import ValueChainAnalysis from "./ValueChainAnalysis";
import ProfitabilityAnalysis from "./ProfitabilityAnalysis";
import ICAgreements from "./ICAgreements";
// COMMENTED OUT - REMOVED FROM PLAN MODULE
// import SideBySideAnalysis from "./SideBySideAnalysis";
import { CartItem } from '../App';

interface PlanWorkspaceProps {
  onAddToCart: (item: CartItem) => void;
}

export default function PlanWorkspace({ onAddToCart }: PlanWorkspaceProps) {
  const [activeTool, setActiveTool] = useState('ic-flow');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSideBySideMode, setIsSideBySideMode] = useState(false);

  const handleToolChange = (toolId: string) => {
    setActiveTool(toolId);
  };

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSideBySideChange = (isSideBySide: boolean) => {
    setIsSideBySideMode(isSideBySide);
    // Auto-collapse sidebar in side-by-side mode for better viewing
    if (isSideBySide) {
      setIsSidebarCollapsed(true);
    }
  };

  const renderMainContent = () => {
    switch (activeTool) {
      case 'ic-flow':
        return <Canvas onSideBySideChange={handleSideBySideChange} />;
      case 'tp-policy':
        return <TPPolicySummary />;
      // COMMENTED OUT - TO BE MOVED TO DOCUMENT MODULE
      // case 'tp-country':
      //   return <TPCountryRules />;
      // case 'compliance':
      //   return <TPComplianceTracker />;
      case 'far-analysis':
        return <FARAnalysis />;
      case 'value-chain':
        return <ValueChainAnalysis />;
      case 'profitability':
        return <ProfitabilityAnalysis />;
      case 'ic-agreements':
        return <ICAgreements onAddToCart={onAddToCart} />;
      // COMMENTED OUT - REMOVED FROM PLAN MODULE
      // case 'side-by-side':
      //   return <SideBySideAnalysis />;
      default:
        return <Canvas onSideBySideChange={handleSideBySideChange} />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Hide sidebar completely in side-by-side mode */}
      {!isSideBySideMode && (
        <div className="sticky top-0 h-full">
          <Sidebar 
            activeTool={activeTool} 
            onToolChange={handleToolChange}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
          />
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {renderMainContent()}
      </div>
    </div>
  );
}