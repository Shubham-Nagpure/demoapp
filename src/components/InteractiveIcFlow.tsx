function IconOutlineCheveronDown() {
  return (
    <div className="relative size-3.5">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g>
          <path
            d="M11.0833 5.25L7 9.33333L2.91667 5.25"
            stroke="var(--stroke-0, #111827)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
        </g>
      </svg>
    </div>
  );
}

function IconOutlineCheveronDownGray() {
  return (
    <div className="relative size-3.5">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 14 14"
      >
        <g>
          <path
            d="M11.0833 5.25L7 9.33333L2.91667 5.25"
            stroke="var(--stroke-0, #A5A5A5)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.16667"
          />
        </g>
      </svg>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import Filter53401401 from "../imports/Filter53401401";
import PageHeader from "./PageHeader";
import {
  Building2,
  MapPin,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  TrendingUp,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import React from "react";
import { cn } from "./ui/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type StateOption = "Current" | "Future" | "Side by side";
type FeeOption =
  | "All Fees"
  | "License"
  | "Sub-license"
  | "Management"
  | "Resale Minus";

interface EntityData {
  id: string;
  name: string;
  type: string;
  region: string;
  revenue: string;
  tooltip: string;
  outgoingPayments?: Array<{
    description: string;
    recipient: string;
    amount: string;
  }>;
  incomingPayments?: Array<{
    description: string;
    sender: string;
    amount: string;
  }>;
}

interface EntityPosition {
  id: string;
  top: string;
  left: string;
  width: string;
  height: string;
}

interface InteractiveIcFlowProps {
  onSideBySideChange?: (isSideBySide: boolean) => void;
}

export default function InteractiveIcFlow({
  onSideBySideChange,
}: InteractiveIcFlowProps = {}) {
  const [selectedState, setSelectedState] = useState<StateOption>("Current");
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<FeeOption>("All Fees");
  const [isFeeDropdownOpen, setIsFeeDropdownOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const connectionSvgRef = useRef<SVGSVGElement>(null);

  // Line flow animation using Anime.js
  useEffect(() => {
    const animatePaths = () => {
      // Check if anime is available and SVG ref is ready
      if (typeof window !== 'undefined' && (window as any).anime && connectionSvgRef.current) {
        const anime = (window as any).anime;
        
        // Find all path elements within the connection SVG
        const paths = connectionSvgRef.current.querySelectorAll('path');
        
        if (paths.length > 0) {
          // Set initial state for all paths - ensure they start hidden
          paths.forEach((path: any, index: number) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length} ${length}`;
            path.style.strokeDashoffset = length;
            path.style.setProperty('--path-length', length.toString());
            // Let CSS animation handle opacity
            path.style.animation = `drawLineFade 6s ease-in-out infinite`;
            path.style.animationDelay = `${index * 0.3}s`;
            
            // Ensure markers are visible
            path.style.setProperty('--marker-opacity', '1');
            const markerId = path.getAttribute('marker-end');
            if (markerId) {
              const cleanMarkerId = markerId.replace('url(#', '#').replace(')', '');
              const marker = document.querySelector(cleanMarkerId);
              if (marker) {
                (marker as any).style.opacity = '1';
                // Let CSS handle arrow animation
                const markerPath = marker.querySelector('path');
                if (markerPath) {
                  markerPath.style.opacity = '1';
                  markerPath.style.animation = '';
                  markerPath.style.animationDelay = '';
                }
              }
            }
            
            // Create a moving arrow element for each path
            const arrowId = `moving-arrow-${index}`;
            const pathId = `path-${index}`;
            path.id = pathId;
            
            // Create a circle element that will move along the path
            const movingArrow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            movingArrow.id = arrowId;
            movingArrow.setAttribute('r', '0.3');
            movingArrow.setAttribute('fill', path.getAttribute('stroke') || '#2563eb');
            movingArrow.setAttribute('opacity', '0');
            movingArrow.style.transition = 'opacity 0.2s ease';
            
            // Insert the moving arrow after the path
            path.parentNode.insertBefore(movingArrow, path.nextSibling);
          });
          
          // Add class to indicate animation has started
          if (connectionSvgRef.current) {
            connectionSvgRef.current.classList.add('animation-started');
          }
          
          // Apply animation delays to text elements to match their corresponding arrows
          setTimeout(() => {
            const textElements = document.querySelectorAll('.line-text-values text');
            textElements.forEach((textElement: any, index: number) => {
              textElement.style.animation = `textFade 6s ease-in-out infinite`;
              textElement.style.animationDelay = `${index * 0.3}s`;
            });
          }, 100);
        } else {
          // Retry after a short delay if paths aren't found
          setTimeout(animatePaths, 200);
        }
      } else {
        // Retry after a short delay
        setTimeout(animatePaths, 200);
      }
    };

    // Alternative CSS animation approach as fallback
    const animateWithCSS = () => {
      if (connectionSvgRef.current) {
        // Add class to indicate animation has started
        connectionSvgRef.current.classList.add('animation-started');
        
        const paths = connectionSvgRef.current.querySelectorAll('path');
        paths.forEach((path: any, index: number) => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = `${length} ${length}`;
          path.style.strokeDashoffset = length;
          path.style.opacity = '0'; // Start hidden
          path.style.setProperty('--path-length', length.toString());
          path.style.animation = `drawLineFade 6s ease-in-out infinite`;
          path.style.animationDelay = `${index * 0.3}s`;
          
          // Ensure markers are visible
          const markerId = path.getAttribute('marker-end');
          if (markerId) {
            const cleanMarkerId = markerId.replace('url(#', '#').replace(')', '');
            const marker = document.querySelector(cleanMarkerId);
            if (marker) {
              const markerPath = marker.querySelector('path');
              if (markerPath) {
                markerPath.style.opacity = '1';
              }
            }
          }
        });
        
        // Apply animation delays to text elements to match their corresponding arrows
        setTimeout(() => {
          const textElements = document.querySelectorAll('.line-text-values text');
          textElements.forEach((textElement: any, index: number) => {
            textElement.style.animation = `textFade 6s ease-in-out infinite`;
            textElement.style.animationDelay = `${index * 0.3}s`;
          });
        }, 100);
      }
    };

    // Try Anime.js first, then fallback to CSS
    // Add a small delay to ensure initial state is set
    const timer1 = setTimeout(animatePaths, 100);
    const timer2 = setTimeout(animateWithCSS, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Financial amounts for each entity based on transfer pricing flows
  const getEntityAmount = (entityId: string): string => {
    const amounts: Record<string, string> = {
      "us-hq": "4.2B",
      "irish-ipco": "3.2B",
      "uk-distr": "2.8B",
      "china-mg": "850M",
      "singapore-mfg": "1.1B",
      "japan-distr": "420M",
      "australia-distr": "380M",
    };
    return amounts[entityId] || "0";
  };

  const stateOptions: StateOption[] = ["Current", "Future", "Side by side"];
  const feeOptions: FeeOption[] = [
    "All Fees",
    "License",
    "Sub-license",
    "Management",
    "Resale Minus",
  ];

  // PharmaCo entities data based on new diagram
  const entitiesData: EntityData[] = [
    {
      id: "us-hq",
      name: "US HQ",
      type: "Headquarters",
      region: "Americas",
      revenue: "$2100M",
      tooltip: "top",
      outgoingPayments: [
        {
          description: "License Fee",
          recipient: "Irish IPCo",
          amount: "$2100M",
        },
      ],
    },
    {
      id: "irish-ipco",
      name: "Irish IPCo",
      type: "IP Holding Company",
      region: "Europe",
      revenue: "$2100M",
      tooltip: "top",
      incomingPayments: [
        {
          description: "License Fee",
          sender: "US HQ",
          amount: "$2100M",
        },
      ],
      outgoingPayments: [
        {
          description: "Service Fee",
          recipient: "China MG",
          amount: "$2100M",
        },
        {
          description: "Service Fee",
          recipient: "Singapore Mfg",
          amount: "$2100M",
        },
        {
          description: "Distribution Fee",
          recipient: "Japan Distr",
          amount: "$2100M",
        },
        {
          description: "Distribution Fee",
          recipient: "UK Distr",
          amount: "$2100M",
        },
        {
          description: "Distribution Fee",
          recipient: "Australia Distr",
          amount: "$2100M",
        },
      ],
    },
    {
      id: "china-mg",
      name: "China MG",
      type: "Manufacturing",
      region: "Asia Pacific",
      revenue: "$2100M",
      tooltip: "top",
      incomingPayments: [
        {
          description: "Service Fee",
          sender: "Irish IPCo",
          amount: "$2100M",
        },
      ],
    },
    {
      id: "singapore-mfg",
      name: "Singapore Mfg",
      type: "Manufacturing",
      region: "Asia Pacific",
      revenue: "$2100M",
      tooltip: "top",
      incomingPayments: [
        {
          description: "Service Fee",
          sender: "Irish IPCo",
          amount: "$2100M",
        },
      ],
    },
    {
      id: "japan-distr",
      name: "Japan Distr",
      type: "Distribution",
      region: "Asia Pacific",
      revenue: "$2100M",
      tooltip: "top",
      incomingPayments: [
        {
          description: "Distribution Fee",
          sender: "Irish IPCo",
          amount: "$2100M",
        },
      ],
    },
    {
      id: "uk-distr",
      name: "UK Distr",
      type: "Distribution",
      region: "Europe",
      revenue: "$2100M",
      tooltip: "top",
      incomingPayments: [
        {
          description: "Distribution Fee",
          sender: "Irish IPCo",
          amount: "$2100M",
        },
      ],
    },
    {
      id: "australia-distr",
      name: "Australia Distr",
      type: "Distribution",
      region: "Asia Pacific",
      revenue: "$2100M",
      tooltip: "bottom",
      incomingPayments: [
        {
          description: "Distribution Fee",
          sender: "Irish IPCo",
          amount: "$2100M",
        },
      ],
    },
  ];

  // Approximate positions for hover areas based on the new diagram
  const entityPositions: EntityPosition[] = [
    { id: "us-hq", top: "8%", left: "37%", width: "18%", height: "20%" },
    { id: "irish-ipco", top: "42%", left: "37%", width: "18%", height: "20%" },
    { id: "china-mg", top: "42%", left: "8%", width: "18%", height: "20%" },
    {
      id: "singapore-mfg",
      top: "42%",
      left: "66%",
      width: "18%",
      height: "20%",
    },
    { id: "japan-distr", top: "75%", left: "8%", width: "18%", height: "20%" },
    { id: "uk-distr", top: "75%", left: "37%", width: "18%", height: "20%" },
    {
      id: "australia-distr",
      top: "75%",
      left: "66%",
      width: "18%",
      height: "20%",
    },
  ];

  const getEntityData = (entityId: string): EntityData | undefined => {
    return entitiesData.find((entity) => entity.id === entityId);
  };

  // Zoom functionality
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5)); // Min zoom 0.5x
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  function lineBetweenNodes(x1, y1, x2, y2, r1, r2, curveOffset = 25) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);

    const ux = dx / len;
    const uy = dy / len;

    const startX = x1 + ux * r1;
    const startY = y1 + uy * r1;
    const endX = x2 - ux * r2;
    const endY = y2 - uy * r2;

    // midpoint
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // add curvature (push control point perpendicular to the line)
    const perpX = -uy;
    const perpY = ux;
    const controlX = midX + perpX * curveOffset;
    const controlY = midY + perpY * curveOffset;

    return `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`;
  }

  // Example: US HQ (25,40,r=3) → Irish IPCo (52,32,r=3)
  const pathD = lineBetweenNodes(25, 40, 52, 32, 3, 3, 25);

  return (
    <div className="flex-1 bg-white overflow-auto">
      <PageHeader
        title="Plan Architect"
        titleHighlight="Plan"
        module="plan"
        tool="ic-flow"
        icon={TrendingUp}
      />

      {/* Filter Controls */}
      <div className="px-6 py-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              className="bg-white border border-gray-200 px-4 py-2 rounded-[40px] flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
            >
              <div className="font-['Montserrat:Medium',_sans-serif] font-medium text-[#4e4949] text-[12px]">
                <span className="text-[#878d96]">State:</span>
                <span className="font-['Montserrat:SemiBold',_sans-serif] font-semibold text-[#373738] ml-1">
                  {selectedState}
                </span>
              </div>
              <IconOutlineCheveronDown />
            </button>

            {/* State Dropdown */}
            {isStateDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-[16px] shadow-lg z-50 min-w-full">
                {stateOptions.map((option) => (
                  <button
                    key={option}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-[16px] last:rounded-b-[16px] transition-colors"
                    onClick={() => {
                      setSelectedState(option);
                      setIsStateDropdownOpen(false);
                      // Notify parent when side-by-side is selected
                      if (onSideBySideChange) {
                        onSideBySideChange(option === "Side by side");
                      }
                    }}
                  >
                    <span
                      className={`font-['Montserrat:Medium',_sans-serif] text-[12px] ${
                        selectedState === option
                          ? "font-semibold text-[#373738]"
                          : "font-medium text-[#4e4949]"
                      }`}
                    >
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 px-4 py-2 rounded-[40px] flex items-center gap-2">
            <div className="font-['Montserrat:Medium',_sans-serif] font-medium text-[#4e4949] text-[12px]">
              <span className="text-[#878d96]">Entity:</span>
              <span className="font-['Montserrat:SemiBold',_sans-serif] font-semibold text-[#282727] ml-1">
                IP Holder
              </span>
            </div>
            <IconOutlineCheveronDown />
          </div>

          <div className="bg-white border border-gray-200 px-4 py-2 rounded-[40px] flex items-center gap-2">
            <div className="font-['Montserrat:Medium',_sans-serif] font-medium text-[#4e4949] text-[12px]">
              <span className="text-[#878d96]">Region:</span>
              <span className="font-['Montserrat:SemiBold',_sans-serif] font-semibold text-[#282727] ml-1">
                North America
              </span>
            </div>
            <IconOutlineCheveronDown />
          </div>

          <div className="relative">
            <button
              className="bg-white border border-gray-200 px-4 py-2 rounded-[40px] flex items-center gap-2 hover:bg-gray-50 transition-colors"
              onClick={() => setIsFeeDropdownOpen(!isFeeDropdownOpen)}
            >
              <div className="font-['Montserrat:Medium',_sans-serif] font-medium text-[#4e4949] text-[12px]">
                <span className="text-[#878d96]">Fees:</span>
                <span className="font-['Montserrat:SemiBold',_sans-serif] font-semibold text-[#373738] ml-1">
                  {selectedFee}
                </span>
              </div>
              <IconOutlineCheveronDown />
            </button>

            {/* Fee Dropdown */}
            {isFeeDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-[16px] shadow-lg z-50 min-w-full">
                {feeOptions.map((option) => (
                  <button
                    key={option}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-[16px] last:rounded-b-[16px] transition-colors"
                    onClick={() => {
                      setSelectedFee(option);
                      setIsFeeDropdownOpen(false);
                    }}
                  >
                    <span
                      className={`font-['Montserrat:Medium',_sans-serif] text-[12px] ${
                        selectedFee === option
                          ? "font-semibold text-[#373738]"
                          : "font-medium text-[#4e4949]"
                      }`}
                    >
                      {option}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-gray-200 px-4 py-2 rounded-[40px] flex items-center gap-2">
          <div className="overflow-clip relative shrink-0 size-4">
            <Filter53401401 />
          </div>
          <div className="font-['Montserrat:Medium',_sans-serif] font-medium text-[#4e4949] text-[12px]">
            Apply Filters
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isStateDropdownOpen || isFeeDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsStateDropdownOpen(false);
            setIsFeeDropdownOpen(false);
          }}
        />
      )}

      {/* Canvas Content Area */}
      <div className="relative h-[calc(100vh-280px)] mx-6 mb-6 mt-6">
        {/* Global Entity Transfer Pricing Map */}
        <div className="w-full h-full rounded-[24px] border border-gray-200 shadow-sm overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 relative">
          {/* World map background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                // backgroundImage: `url('https://images.unsplash.com/photo-1742415105376-43d3a5fd03fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTc0OTgyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
                backgroundImage: `url("src/assets/blue-map-world-with-word-world-it.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          {/* Ultra Modern Animated Connection Lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none line-text-values"
            style={{ zIndex: 5 }}
          >
            <defs>
              {/* Advanced gradient definitions with multiple stops */}
              <linearGradient
                id="blueGradientModern"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#60a5fa", stopOpacity: 0.9 }}
                />
                <stop
                  offset="30%"
                  style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                />
                <stop
                  offset="70%"
                  style={{ stopColor: "#2563eb", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#1d4ed8", stopOpacity: 0.8 }}
                />
              </linearGradient>

              <linearGradient
                id="blackGradientModern"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#6b7280", stopOpacity: 0.9 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#374151", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#1f2937", stopOpacity: 0.9 }}
                />
              </linearGradient>

              <linearGradient
                id="orangeGradientModern"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#fcd34d", stopOpacity: 0.9 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#f59e0b", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#d97706", stopOpacity: 0.9 }}
                />
              </linearGradient>

              <linearGradient
                id="greenGradientModern"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#6ee7b7", stopOpacity: 0.9 }}
                />
                <stop
                  offset="50%"
                  style={{ stopColor: "#10b981", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#059669", stopOpacity: 0.9 }}
                />
              </linearGradient>

              {/* Glow effects */}
              <filter id="glow-blue">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-black">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-orange">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-green">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Solid arrow markers for different fee types */}
              <marker
                id="arrow-blue-solid"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="6"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M2,2 L2,10 L10,6 z" fill="#2563eb" stroke="none" opacity="1" />
              </marker>
              <marker
                id="arrow-purple-solid"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="6"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M2,2 L2,10 L10,6 z" fill="#7c3aed" stroke="none" opacity="1" />
              </marker>
              <marker
                id="arrow-orange-solid"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="6"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M2,2 L2,10 L10,6 z" fill="#ea580c" stroke="none" opacity="1" />
              </marker>

              {/* Flow particles animation */}
              <circle id="particle" r="2" fill="white" opacity="0.8">
                <animate
                  attributeName="opacity"
                  values="0;0.8;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Advanced animated patterns with morphing effects */}
              <style>
                {`
                  @keyframes flow-primary {
                    0% { 
                      stroke-dashoffset: 0;
                      filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4));
                    }
                    50% { 
                      filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.6));
                    }
                    100% { 
                      stroke-dashoffset: -40;
                      filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.4));
                    }
                  }
                  
                  @keyframes flow-secondary {
                    0% { 
                      stroke-dashoffset: 0;
                      filter: drop-shadow(0 0 6px rgba(55, 65, 81, 0.3));
                    }
                    50% { 
                      filter: drop-shadow(0 0 10px rgba(55, 65, 81, 0.5));
                    }
                    100% { 
                      stroke-dashoffset: -24;
                      filter: drop-shadow(0 0 6px rgba(55, 65, 81, 0.3));
                    }
                  }
                  
                  @keyframes flow-tertiary {
                    0% { 
                      stroke-dashoffset: 0;
                      filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4));
                    }
                    50% { 
                      filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.6));
                    }
                    100% { 
                      stroke-dashoffset: -36;
                      filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4));
                    }
                  }
                  
                  @keyframes flow-quaternary {
                    0% { 
                      stroke-dashoffset: 0;
                      filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4));
                    }
                    50% { 
                      filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.6));
                    }
                    100% { 
                      stroke-dashoffset: -14;
                      filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4));
                    }
                  }

                  @keyframes pulse-glow {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                  }

                  .ultra-line-primary {
                    animation: flow-primary 4s linear infinite, pulse-glow 2s ease-in-out infinite;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                  }
                  
                  .ultra-line-secondary {
                    animation: flow-secondary 5s linear infinite, pulse-glow 2.5s ease-in-out infinite;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                  }
                  
                  .ultra-line-tertiary {
                    animation: flow-tertiary 3.5s linear infinite, pulse-glow 2.2s ease-in-out infinite;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                  }
                  
                  .ultra-line-quaternary {
                    animation: flow-quaternary 2.8s linear infinite, pulse-glow 1.8s ease-in-out infinite;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                  }
                `}
              </style>
            </defs>
            {/* Flow amount labels */}
            <g style={{ display: "none" }}>
              {/* License Fee: US HQ to Irish IPCo */}
              {(selectedFee === "All Fees" || selectedFee === "License") && (
                <text
                  x="38%"
                  y="34%"
                  fill="#2563eb"
                  fontSize="10"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  $3.2B
                </text>
              )}

              {/* Sub-license Fee: Irish IPCo to China Mfg */}
              {(selectedFee === "All Fees" ||
                selectedFee === "Sub-license") && (
                <text
                  x="60%"
                  y="36%"
                  fill="#7c3aed"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  $850M
                </text>
              )}

              {/* Sub-license Fee: Irish IPCo to Singapore Mfg */}
              {(selectedFee === "All Fees" ||
                selectedFee === "Sub-license") && (
                <text
                  x="64%"
                  y="44%"
                  fill="#7c3aed"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  $1.1B
                </text>
              )}

              {/* Management Fee: US HQ to Japan Distr */}
              {(selectedFee === "All Fees" || selectedFee === "Management") && (
                <text
                  x="57%"
                  y="40%"
                  fill="#ea580c"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  $420M
                </text>
              )}

              {/* Management Fee: US HQ to Australia Distr */}
              {(selectedFee === "All Fees" || selectedFee === "Management") && (
                <text
                  x="52%"
                  y="58%"
                  fill="#ea580c"
                  fontSize="10"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  $380M
                </text>
              )}

              {/* Resale minus Fee: Singapore Mfg to UK Distr */}
              {(selectedFee === "All Fees" ||
                selectedFee === "Resale Minus") && (
                <text
                  x="62%"
                  y="40%"
                  fill="#059669"
                  fontSize="10"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  $2.8B
                </text>
              )}

              {/* Resale minus Fee: Singapore Mfg to Australia Distr */}
              {(selectedFee === "All Fees" ||
                selectedFee === "Resale Minus") && (
                <text
                  x="78%"
                  y="66%"
                  fill="#059669"
                  fontSize="9"
                  fontWeight="600"
                  textAnchor="middle"
                >
                  $1.6B
                </text>
              )}
            </g>
          </svg>

          <svg
            ref={connectionSvgRef}
            className="absolute inset-0 w-full h-full pointer-events-none connection-svg"
            style={{ zIndex: 11 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Black arrow */}
              <marker
                id="arrow-purple"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="6"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M2,2 L2,10 L10,6 z" fill="#a855f7" opacity="1" />
              </marker>
              {/* Blue arrow - using the main definition above */}
              {/* Orange arrow */}
              <marker
                id="arrow-orange"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="6"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M2,2 L2,10 L10,6 z" fill="#ea580c" opacity="1" />
              </marker>
              {/* Green arrow */}
              <marker
                id="arrow-green"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="6"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M2,2 L2,10 L10,6 z" fill="#059669" stroke="none" opacity="1" />
              </marker>
            </defs>
            <path
              d="M 52 32 Q 38 15 25 40"
              stroke="#2563eb"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-blue-solid)"
            />
            {/* China → IPCo */}
            <path
              d="M 70 42 Q 75 20 52 32"
              stroke="#a855f7"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-purple)"
            />
            {/* SG → IPCo */}
            <path
              d="M 75 55 Q 80 25 52 32"
              stroke="#a855f7"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-purple)"
            />
            {/* Management Fees: HQ → China, SG, Japan, UK, Australia */}
            <path
              d="M 25 40 Q 20 10 48 28"
              stroke="#ea580c"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-orange)"
            />
            <path
              d="M 25 40 Q 20 15 52 32"
              stroke="#ea580c"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-orange)"
            />
            <path
              d="M 25 40 Q 50 5 82 42"
              stroke="#ea580c"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-orange)"
            />
            <path
              d="M 25 40 Q 50 90 80 75"
              stroke="#ea580c"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-orange)"
            />
            {/* USHQ → China */}
            <path
              d="M 25 40 Q 50 60 70 42"
              stroke="#ea580c"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-orange)"
            />
            {/* USHQ → SG */}
            <path
              d="M 25 40 Q 50 70 75 55"
              stroke="#ea580c"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-orange)"
            />
            {/* Resale Minus: Mfg → Distr */}
            <path
              d="M 75 55 Q 50 5 48 28"
              stroke="#059669"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-green)"
            />
            <path
              d="M 75 55 Q 85 85 80 75"
              stroke="#059669"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-green)"
            />
            <path
              d="M 75 55 Q 85 25 82 42"
              stroke="#059669"
              strokeWidth="0.2"
              fill="none"
              markerEnd="url(#arrow-green)"
            />
          </svg>

          {/* Entity bubbles positioned on map */}
          {entitiesData.map((entity, index) => {
            const getEntityTypeIcon = (entityType: string) => {
              switch (entityType) {
                case "Headquarters":
                  return Building2;
                case "IP Holding Company":
                  return TrendingUp;
                case "Manufacturing":
                  return Building2;
                case "Distribution":
                  return MapPin;
                default:
                  return Building2;
              }
            };

            const getEntityTypeColor = (entityType: string) => {
              switch (entityType) {
                case "Headquarters":
                  return "#3b82f6"; // Blue
                case "IP Holding Company":
                  return "#10b981"; // Green
                case "Manufacturing":
                  return "#f59e0b"; // Orange
                case "Distribution":
                  return "#8b5cf6"; // Purple
                default:
                  return "#6b7280"; // Gray
              }
            };

            const IconComponent = getEntityTypeIcon(entity.type);
            const bubbleSize = "w-16 h-16"; // Bigger bubbles for better visibility
            const bubbleColor = getEntityTypeColor(entity.type);

            // Use approximate positions based on entity locations
            const positions = {
              "us-hq": { top: "40%", left: "25%" },
              "irish-ipco": { top: "32%", left: "52%" },
              "singapore-mfg": { top: "55%", left: "75%" },
              "japan-distr": { top: "42%", left: "82%" },
              "australia-distr": { top: "75%", left: "80%" },
              "uk-distr": { top: "28%", left: "48%" },
              "china-mg": { top: "42%", left: "70%" },
            };

            const position = positions[entity.id as keyof typeof positions] || {
              top: "50%",
              left: "50%",
            };

            return (
              <HoverCard key={entity.id}>
                <HoverCardTrigger asChild>
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ top: position.top, left: position.left, zIndex: 10 }}
                  >
                    {/* Entity bubble with financial data */}
                    <div className="flex flex-col items-center space-y-2">
                      {/* Financial Amount */}
                      <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg border border-white/20">
                        <span className="text-sm font-semibold text-gray-800">
                          ${getEntityAmount(entity.id)}
                        </span>
                      </div>

                      {/* Entity bubble */}
                      <div
                        className={`${bubbleSize} rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center relative backdrop-blur-sm`}
                        style={{
                          backgroundColor: bubbleColor,
                          border: "4px solid white",
                          boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)`,
                          // Make bubble semi-transparent so lines can be seen passing through
                          opacity: 0.92,
                        }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />

                        {/* Subtle pulse ring */}
                        <div
                          className="absolute inset-0 rounded-full animate-ping opacity-15"
                          style={{
                            backgroundColor: bubbleColor,
                            animationDuration: "4s",
                            animationIterationCount: "infinite",
                          }}
                        />
                      </div>

                      {/* Entity name */}
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm border border-white/20">
                        <span className="text-xs font-medium text-gray-700">
                          {entity.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                
                <HoverCardContent 
                  side={entity.tooltip === "top" ? "top" : "bottom"}
                  className="w-80 p-4 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="font-semibold text-gray-900 text-lg">
                      {entity.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {entity.type} • {entity.region}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue:</span>
                        <span className="font-medium text-green-600">
                          {entity.revenue}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Outflows:</span>
                        <span className="font-medium text-blue-600">
                          {entity.outgoingPayments?.reduce(
                            (sum, payment) =>
                              sum +
                              parseInt(payment.amount.replace(/[^0-9]/g, "")),
                            0
                          ) || 0}
                          M
                        </span>
                      </div>
                    </div>
                    
                    {/* Additional entity details */}
                    {entity.outgoingPayments && entity.outgoingPayments.length > 0 && (
                      <div className="pt-3 border-t border-gray-200">
                        <div className="text-xs font-medium text-gray-700 mb-2">
                          Outgoing Payments:
                        </div>
                        <div className="space-y-1">
                          {entity.outgoingPayments.slice(0, 3).map((payment, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span className="text-gray-600">{payment.recipient}</span>
                              <span className="font-medium text-blue-600">{payment.amount}</span>
                            </div>
                          ))}
                          {entity.outgoingPayments.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{entity.outgoingPayments.length - 3} more...
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </HoverCardContent>
              </HoverCard>
            );
          })}

          {/* Entity Type Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-xl p-4 shadow-xl border border-white/20 min-w-[200px]">
            <div className="text-xs font-medium text-gray-700 mb-3">
              Entity Types
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: "#3b82f6",
                    border: "2px solid white",
                  }}
                >
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-gray-600">Headquarters</span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: "#10b981",
                    border: "2px solid white",
                  }}
                >
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-gray-600">
                  IP Holding Company
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: "#f59e0b",
                    border: "2px solid white",
                  }}
                >
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-gray-600">Manufacturing</span>
              </div>
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: "#8b5cf6",
                    border: "2px solid white",
                  }}
                >
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-gray-600">Distribution</span>
              </div>
            </div>
          </div>

          {/* Flow Types Legend */}
          <div className="absolute top-4 left-4 bg-white  rounded-xl p-4 shadow-xl border border-white/20 min-w-[200px]">
            <div className="text-xs font-medium text-gray-700 mb-3">
              Intercompany Flow Types
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-blue-600 shadow-sm rounded"></div>
                <span className="text-xs text-gray-600">
                  License Fee
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-purple-600 shadow-sm rounded"></div>
                <span className="text-xs text-gray-600">
                  Sub-license Fee
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-orange-600 shadow-sm rounded"></div>
                <span className="text-xs text-gray-600">
                  Management Fee
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-1 bg-emerald-600 shadow-sm rounded"></div>
                <span className="text-xs text-gray-600">
                  Resale minus Fee
                </span>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-4 pt-3">
              <div className="text-xl font-bold text-gray-900">$12.6B</div>
              <div className="text-xs font-semibold text-gray-900">Total Annual Flows</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Summary Panel - Clean Table Design */}
      <div className="mx-6 mb-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">500M</p>
                <p className="text-xs text-gray-600">Group System Profit</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">25%</p>
                <p className="text-xs text-gray-600">Group ETR</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">20%</p>
                <p className="text-xs text-gray-600">Peer ETR</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Building2 className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">5</p>
                <p className="text-xs text-gray-600">Outside BM Range</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Comparison Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                Structure Optimization Analysis
              </h3>
            </div>
            <p className="text-xs text-gray-600">
              Current vs Future State Comparison
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-50">
                  <th
                    className="px-6 py-3 text-left font-semibold text-gray-700 whitespace-nowrap"
                    style={{ minWidth: "160px" }}
                  >
                    Feature
                  </th>
                  <th
                    className="px-6 py-3 text-center font-semibold text-gray-700 whitespace-nowrap"
                    style={{ minWidth: "140px" }}
                  >
                    Current State
                  </th>
                  <th
                    className="px-6 py-3 text-center font-semibold text-gray-700 whitespace-nowrap"
                    style={{ minWidth: "140px" }}
                  >
                    Future State
                  </th>
                  <th
                    className="px-6 py-3 text-center font-semibold text-gray-700 whitespace-nowrap"
                    style={{ minWidth: "120px" }}
                  >
                    Impact
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-25 hover:bg-gray-25/50 transition-colors">
                  <td className="px-6 py-3" style={{ minWidth: "160px" }}>
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900 text-xs">
                        Number of Entities
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                      7 Entities
                    </span>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      5 Entities
                    </span>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "120px" }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <ArrowDownRight className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        28% Less
                      </span>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-25 hover:bg-gray-25/50 transition-colors">
                  <td className="px-6 py-3" style={{ minWidth: "160px" }}>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-gray-900 text-xs">
                        Fee Types
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <div className="flex flex-wrap justify-center gap-1">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        License
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        Mgmt
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        Mfg
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        Resale
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <div className="flex flex-wrap justify-center gap-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        Mgmt
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        Resale
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "120px" }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        50% Less
                      </span>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-25 hover:bg-gray-25/50 transition-colors">
                  <td className="px-6 py-3" style={{ minWidth: "160px" }}>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-gray-900 text-xs">
                        Complexity Score
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                      HIGH (85/100)
                    </span>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                      MEDIUM (55/100)
                    </span>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "120px" }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <ArrowDownRight className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        35% Better
                      </span>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-25 hover:bg-gray-25/50 transition-colors">
                  <td className="px-6 py-3" style={{ minWidth: "160px" }}>
                    <div className="flex items-center gap-3">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-gray-900 text-xs">
                        Tax Risk Level
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                      HIGH
                    </span>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      REDUCED
                    </span>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "120px" }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        Mitigated
                      </span>
                    </div>
                  </td>
                </tr>

                <tr className="hover:bg-gray-25/50 transition-colors">
                  <td className="px-6 py-3" style={{ minWidth: "160px" }}>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900 text-xs">
                        Annual Cost
                      </span>
                    </div>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <span className="text-gray-700 text-xs font-medium">
                      $2.4M
                    </span>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "140px" }}
                  >
                    <span className="text-green-700 text-xs font-medium">
                      $1.9M
                    </span>
                  </td>
                  <td
                    className="px-6 py-3 text-center"
                    style={{ minWidth: "120px" }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        $500K Saved
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Clean Entity Modal Component - Simple and minimal design
function EntityModal({ entity }: { entity: EntityData }) {
  return (
    <div className="space-y-6">
      {/* Basic Entity Information - Clean Layout */}
      <div className="space-y-4">
        {/* Type */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-500">Type:</span>
          <span className="font-medium text-gray-900">
            {entity.type === "Headquarters" ? "HQ" : entity.type}
          </span>
        </div>

        {/* Region */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-500">Region:</span>
          <span className="font-medium text-gray-900">{entity.region}</span>
        </div>

        {/* Revenue */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-gray-500">Revenue:</span>
          <span className="font-medium text-blue-600">{entity.revenue}</span>
        </div>
      </div>

      {/* Outgoing Payments Section */}
      {entity.outgoingPayments && entity.outgoingPayments.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 text-center pt-4 border-t border-gray-100">
            Outgoing Payments
          </h3>

          <div className="space-y-3">
            <div className="text-gray-500">License Fee:</div>
            {entity.outgoingPayments.map((payment, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <span className="text-gray-900">{payment.recipient}</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                  {payment.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Incoming Payments Section */}
      {entity.incomingPayments && entity.incomingPayments.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 text-center pt-4 border-t border-gray-100">
            Incoming Payments
          </h3>

          <div className="space-y-3">
            {entity.incomingPayments.map((payment, index) => (
              <div key={index} className="space-y-2">
                <div className="text-gray-500">{payment.description}:</div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-900">{payment.sender}</span>
                  <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full">
                    {payment.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
