import { useState } from 'react';
import { Lightbulb, Target, Settings, TrendingUp } from 'lucide-react';

interface ValueDriver {
  id: string;
  name: string;
  percentage: number;
  impact: 'High' | 'Medium' | 'Low';
  description: string;
  icon: React.ComponentType<any>;
  position: { x: string; y: string };
  region: string;
  color: string;
}

interface TooltipData {
  driver: ValueDriver;
  bubbleRect: DOMRect;
}

const valueDrivers: ValueDriver[] = [
  {
    id: 'intangible-property',
    name: 'Intangible Property (IP)',
    percentage: 40,
    impact: 'High',
    description: 'Research and development, patents, intellectual property creation, and technical know-how driving innovation.',
    icon: Lightbulb,
    position: { x: '25%', y: '45%' }, // North America
    region: 'North America',
    color: '#3b82f6'
  },
  {
    id: 'brand-marketing',
    name: 'Brand / Marketing',
    percentage: 25,
    impact: 'High',
    description: 'Brand recognition, marketing strategies, customer relationships, and market positioning excellence.',
    icon: Target,
    position: { x: '50%', y: '35%' }, // Europe
    region: 'Europe',
    color: '#8b5cf6'
  },
  {
    id: 'operations-knowhow',
    name: 'Operations Know-how',
    percentage: 15,
    impact: 'Medium',
    description: 'Manufacturing processes, trade secrets, operational efficiency, and production methodologies.',
    icon: Settings,
    position: { x: '75%', y: '50%' }, // Asia
    region: 'Asia Pacific',
    color: '#f59e0b'
  },
  {
    id: 'market-access',
    name: 'Market Access & Distribution',
    percentage: 20,
    impact: 'Medium',
    description: 'Distribution networks, regulatory approvals, market entry strategies, and customer access channels.',
    icon: TrendingUp,
    position: { x: '60%', y: '65%' }, // Emerging Markets
    region: 'Global Markets',
    color: '#10b981'
  }
];

export default function ValueDriversWorldMap() {
  const [hoveredDriver, setHoveredDriver] = useState<TooltipData | null>(null);

  const handleDriverHover = (driver: ValueDriver, event: React.MouseEvent) => {
    const bubbleRect = event.currentTarget.getBoundingClientRect();
    setHoveredDriver({
      driver,
      bubbleRect
    });
  };

  const handleDriverLeave = () => {
    setHoveredDriver(null);
  };

  // Calculate bubble size based on percentage (min 60px, max 120px)
  const getBubbleSize = (percentage: number) => {
    const minSize = 60;
    const maxSize = 120;
    const maxPercentage = Math.max(...valueDrivers.map(d => d.percentage));
    return minSize + ((percentage / maxPercentage) * (maxSize - minSize));
  };

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-gray-200 overflow-hidden">
      {/* World Map Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1000 500" className="w-full h-full">
          {/* Simplified world continents outline */}
          <path 
            d="M150,200 Q200,180 250,200 L300,180 Q350,190 400,210 L450,200 Q500,180 550,200 L600,190 Q650,200 700,220 L750,210 Q800,190 850,210"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-gray-400"
          />
          <path 
            d="M100,250 Q150,230 200,250 L250,240 Q300,250 350,270 L400,260 Q450,240 500,260"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-gray-400"
          />
          <path 
            d="M600,280 Q650,260 700,280 L750,270 Q800,280 850,300 L900,290"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="text-gray-400"
          />
        </svg>
      </div>

      {/* Geographic Region Labels */}
      <div className="absolute top-4 left-8 text-xs font-medium text-gray-600">North America</div>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">Europe</div>
      <div className="absolute top-4 right-8 text-xs font-medium text-gray-600">Asia Pacific</div>
      <div className="absolute bottom-4 right-1/3 text-xs font-medium text-gray-600">Global Markets</div>

      {/* Value Driver Bubbles */}
      {valueDrivers.map((driver) => {
        const IconComponent = driver.icon;
        const bubbleSize = getBubbleSize(driver.percentage);
        
        return (
          <div
            key={driver.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 cursor-pointer group"
            style={{ 
              left: driver.position.x, 
              top: driver.position.y,
              width: `${bubbleSize}px`,
              height: `${bubbleSize}px`
            }}
            onMouseEnter={(e) => handleDriverHover(driver, e)}
            onMouseLeave={handleDriverLeave}
          >
            {/* Bubble Glow Effect */}
            <div 
              className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"
              style={{ backgroundColor: driver.color, filter: 'blur(8px)' }}
            ></div>
            
            {/* Main Bubble */}
            <div 
              className="relative w-full h-full rounded-full border-4 border-white shadow-xl flex flex-col items-center justify-center text-white group-hover:shadow-2xl transition-all duration-300"
              style={{ backgroundColor: driver.color }}
            >
              {/* Icon */}
              <IconComponent size={Math.min(24, bubbleSize * 0.25)} className="text-white mb-1" strokeWidth={2.5} />
              
              {/* Percentage */}
              <div className="font-bold text-xs">{driver.percentage}%</div>
            </div>

            {/* Pulse Ring Animation */}
            <div 
              className="absolute inset-0 rounded-full border-2 opacity-0 group-hover:opacity-60 group-hover:animate-ping"
              style={{ borderColor: driver.color }}
            ></div>

            {/* Impact Badge */}
            <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-medium border-2 border-white shadow-sm ${
              driver.impact === 'High' 
                ? 'bg-red-500 text-white' 
                : driver.impact === 'Medium' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {driver.impact}
            </div>
          </div>
        );
      })}

      {/* Connection Lines Between Related Drivers */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.6 }} />
          </linearGradient>
          <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 0.6 }} />
          </linearGradient>
          <linearGradient id="connectionGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#10b981', stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        
        {/* IP to Brand/Marketing */}
        <path
          d="M 25% 45% Q 37.5% 35% 50% 35%"
          stroke="url(#connectionGradient1)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5 5"
          className="animate-pulse"
        />
        
        {/* Brand/Marketing to Operations */}
        <path
          d="M 50% 35% Q 62.5% 40% 75% 50%"
          stroke="url(#connectionGradient2)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5 5"
          className="animate-pulse"
          style={{ animationDelay: '0.5s' }}
        />
        
        {/* Operations to Market Access */}
        <path
          d="M 75% 50% Q 67.5% 57.5% 60% 65%"
          stroke="url(#connectionGradient3)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5 5"
          className="animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </svg>

      {/* Tooltip */}
      {hoveredDriver && (() => {
        // Calculate if tooltip should appear on left or right side
        const tooltipWidth = 320; // max-w-xs is approximately 320px
        const showOnLeft = hoveredDriver.bubbleRect.right + tooltipWidth + 15 > window.innerWidth;
        
        return (
          <div
            className="fixed z-50 pointer-events-none transition-all duration-200"
            style={{
              left: showOnLeft 
                ? hoveredDriver.bubbleRect.left - tooltipWidth - 15
                : hoveredDriver.bubbleRect.right + 15,
              top: Math.max(10, Math.min(
                window.innerHeight - 250, 
                hoveredDriver.bubbleRect.top + (hoveredDriver.bubbleRect.height / 2)
              )),
              transform: 'translateY(-50%)'
            }}
          >
            {/* Tooltip Arrow */}
            <div className={`absolute top-1/2 transform -translate-y-1/2 ${
              showOnLeft ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'
            }`}>
              {showOnLeft ? (
                <>
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-white"></div>
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-gray-200 absolute top-0 right-0 transform -translate-x-px"></div>
                </>
              ) : (
                <>
                  <div className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white"></div>
                  <div className="w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-gray-200 absolute top-0 left-0 transform translate-x-px"></div>
                </>
              )}
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="flex items-center justify-center w-10 h-10 rounded-full text-white"
                  style={{ backgroundColor: hoveredDriver.driver.color }}
                >
                  <hoveredDriver.driver.icon size={18} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{hoveredDriver.driver.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold" style={{ color: hoveredDriver.driver.color }}>
                      {hoveredDriver.driver.percentage}%
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hoveredDriver.driver.impact === 'High' 
                        ? 'bg-red-100 text-red-700' 
                        : hoveredDriver.driver.impact === 'Medium' 
                        ? 'bg-yellow-100 text-yellow-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {hoveredDriver.driver.impact} Impact
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{hoveredDriver.driver.description}</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Regional Focus:</span>
                  <span className="font-medium text-gray-700">{hoveredDriver.driver.region}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20">
        <div className="text-xs font-medium text-gray-700 mb-3">Key Value Drivers</div>
        <div className="space-y-2">
          {valueDrivers.map((driver) => {
            const IconComponent = driver.icon;
            return (
              <div key={driver.id} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: driver.color }}
                ></div>
                <IconComponent size={14} className="text-gray-600" strokeWidth={2} />
                <span className="text-xs text-gray-600">{driver.name}</span>
                <span className="text-xs font-bold text-gray-700">({driver.percentage}%)</span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-200 mt-3 pt-3">
          <div className="text-lg font-bold text-gray-900">100%</div>
          <div className="text-xs text-gray-600">Total Value Creation</div>
        </div>
      </div>

      {/* Analysis Type Badge */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-xl shadow-lg">
        <div className="text-sm font-semibold">Pharma/Med-Tech Analysis</div>
        <div className="text-xs opacity-90">Pre-Peer Benchmark</div>
      </div>
    </div>
  );
}