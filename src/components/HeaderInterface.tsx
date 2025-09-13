import { useState } from 'react';
import svgPaths from "../imports/svg-eo2up7qyd4";
import imgImage2 from "figma:asset/d4c4d8e4b5ac629610c6598b73884e66852e951d.png";
import darkLogo from "figma:asset/25698dc498d2a78b06424a77d6abc51a77ede870.png";
import { imgG67 } from "../imports/svg-75dlp";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

// Dashboard Icon - in same family as the other icons
function IconOutlineDashboard() {
  return (
    <div className="relative shrink-0 size-4" data-name="dashboard-icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 15">
        <g id="Icon/Outline/dashboard">
          <path d={svgPaths.p242437c0} fill="url(#paint0_linear_dashboard)" id="Vector" />
          <path d={svgPaths.p7521900} fill="url(#paint1_linear_dashboard)" id="Vector_2" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_dashboard" x1="8.00001" x2="8.00001" y1="0" y2="14.6667">
            <stop stopColor="#03BCFF" />
            <stop offset="1" stopColor="#98F1E2" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_dashboard" x1="8.00013" x2="8.00013" y1="9.33334" y2="12.6667">
            <stop stopColor="#03BCFF" />
            <stop offset="1" stopColor="#98F1E2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Research Icon
function IconOutlineSearch() {
  return (
    <div className="relative size-[18px]" data-name="search-icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon/Outline/search">
          <path d={svgPaths.p2e3c1d00} id="Icon" stroke="url(#paint0_linear_search)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_search" x1="2.16382" x2="17.1638" y1="0.5" y2="18">
            <stop stopColor="#03BCFF" />
            <stop offset="1" stopColor="#98F1E2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Plan Icon
function IconOutlineTrendingUp() {
  return (
    <div className="relative shrink-0 size-6" data-name="trending-up-icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon/Outline/trending-up">
          <path d={svgPaths.p76d8100} id="Icon" stroke="url(#paint0_linear_plan)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8151" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_plan" x1="15.8359" x2="11.168" y1="3" y2="16.0755">
            <stop stopColor="#03BCFF" />
            <stop offset="1" stopColor="#70C8E2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Operate Icon
function IconOutlineCog() {
  return (
    <div className="relative size-6" data-name="cog-icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon/Outline/cog">
          <g id="Icon">
            <path d={svgPaths.p8da5780} stroke="url(#paint0_linear_operate)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p2745d380} stroke="url(#paint1_linear_operate)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_operate" x1="11.3359" x2="11.3359" y1="5" y2="20">
            <stop stopColor="#03BCFF" />
            <stop offset="1" stopColor="#98F1E2" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_operate" x1="11.3359" x2="11.3359" y1="5" y2="20">
            <stop stopColor="#03BCFF" />
            <stop offset="1" stopColor="#98F1E2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Benchmark Icon (Complex SVG components)
function G67() {
  return (
    <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-14.531px_-9px] mask-size-[18px_18px] relative size-full" data-name="g67" style={{ maskImage: `url('${imgG67}')` }}>
      <div className="absolute inset-[-0.7px_-25.42%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
          <g id="g67">
            <path d="M1 1H3.76564" id="path69" stroke="url(#paint0_linear_benchmark)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.40625" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_benchmark" x1="2.38282" x2="2.38282" y1="1" y2="2">
              <stop stopColor="#03BCFF" />
              <stop offset="1" stopColor="#98F1E2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function G83() {
  return (
    <div className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.086px] mask-size-[18px_18px] relative size-full" data-name="g83" style={{ maskImage: `url('${imgG67}')` }}>
      <div className="absolute inset-[-5.08%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          <g id="g83">
            <path d={svgPaths.p367a7e40} id="path85" stroke="url(#paint0_linear_benchmark2)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.40625" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_benchmark2" x1="7.91406" x2="7.91406" y1="1" y2="14.8281">
              <stop stopColor="#03BCFF" />
              <stop offset="1" stopColor="#98F1E2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Precision20467961() {
  return (
    <div className="overflow-clip relative size-[18px]" data-name="precision-icon">
      <div className="absolute contents inset-[3.906%]" data-name="g61">
        <div className="absolute flex inset-[11.59%] items-center justify-center">
          <div className="flex-none scale-y-[-100%] size-[13.828px]">
            <G83 />
          </div>
        </div>
      </div>
    </div>
  );
}

// Document Icon
function IconOutlineDocumentText() {
  return (
    <div className="relative size-[22px]" data-name="document-text-icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon/Outline/document-text">
          <path d={svgPaths.p3f4a8b00} id="Icon" stroke="url(#paint0_linear_document)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.83333" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_document" x1="11" x2="11" y1="2.75" y2="19.25">
            <stop stopColor="#03BCFF" />
            <stop offset="1" stopColor="#98F1E2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Defend Icon
function IconOutlineShieldCheck() {
  return (
    <div className="relative size-[21.032px]" data-name="shield-check-icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon/Outline/shield-check">
          <path d={svgPaths.p3d420600} id="Icon" stroke="url(#paint0_linear_defend)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75264" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_defend" x1="10.5159" x2="10.5159" y1="2.58019" y2="18.0715">
            <stop stopColor="#03BCFF" />
            <stop offset="1" stopColor="#98F1E2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Right-side Header Icons

// Bell/Notification Icon (from original Header.tsx)
function BellIcon() {
  return (
    <div className="overflow-clip size-4" data-name="bell-icon">
      <div className="absolute inset-[2.5%_5.68%]" data-name="Group">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 16">
          <g id="Group">
            <path d={svgPaths.p19e9f700} fill="var(--fill-0, #AEBEE4)" id="Vector" />
            <path d={svgPaths.p2470aaf0} fill="var(--fill-0, #AEBEE4)" id="Vector_2" />
            <path d={svgPaths.p1cb83b00} fill="var(--fill-0, #3284FF)" id="Vector_3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// User List/Profile Icon (from original Header.tsx)
function UserListIcon() {
  return (
    <div className="overflow-clip size-5" data-name="user-list-icon">
      <div className="absolute bottom-[16.27%] left-[0.01%] right-0 top-[16.23%]" data-name="Group">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 14">
          <g id="Group">
            <path d={svgPaths.p2a364180} fill="var(--fill-0, #AEBEE4)" id="Vector" />
            <path d={svgPaths.p22ff3770} fill="var(--fill-0, #AEBEE4)" id="Vector_2" />
            <path d={svgPaths.p37e2d900} fill="var(--fill-0, #3284FF)" id="Vector_3" />
            <path d={svgPaths.p2b28b300} fill="var(--fill-0, #3284FF)" id="Vector_4" />
            <path d={svgPaths.p1a6a2000} fill="var(--fill-0, #3284FF)" id="Vector_5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// Cart/Shopping Icon (custom, matching the design style)
function CartIcon() {
  return (
    <div className="relative size-5" data-name="cart-icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Cart">
          <path
            d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V16.5M9 19.5C9.8 19.5 10.5 18.8 10.5 18S9.8 16.5 9 16.5 7.5 17.2 7.5 18 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 18.8 21.5 18S20.8 16.5 20 16.5 18.5 17.2 18.5 18 19.2 19.5 20 19.5Z"
            stroke="url(#paint0_linear_cart)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_cart" x1="3" x2="21.5" y1="3" y2="19.5">
            <stop stopColor="#03BCFF" />
            <stop offset="1" stopColor="#98F1E2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Simple replacement header component that integrates with the existing Header.tsx components
export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isDark] = useState(false);

  const handleHomeClick = () => {
    onNavigate('dashboard');
  };

  const handleResearchClick = () => {
    onNavigate('research');
  };

  const handlePlanClick = () => {
    onNavigate('plan');
  };

  const handleOperateClick = () => {
    onNavigate('operate');
  };

  const handleBenchmarkClick = () => {
    onNavigate('benchmark');
  };

  const handleDocumentClick = () => {
    onNavigate('document');
  };

  const handleDefendClick = () => {
    onNavigate('defend');
  };

  return (
    <header className="h-16 bg-gradient-to-r from-blue-50 via-white to-cyan-50 border-b border-gray-200/50 flex items-center justify-between px-6 relative backdrop-blur-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <div 
          className="w-10 h-10 bg-center bg-cover bg-no-repeat drop-shadow-sm" 
          style={{ backgroundImage: `url('${isDark ? darkLogo : imgImage2}')` }} 
        />
        <div className="flex flex-col">
          <div className="text-xs text-gray-500/80 font-['Montserrat:Medium',_sans-serif]">Powered by</div>
          <div className="text-sm font-bold text-gray-800 font-['Montserrat:Bold',_sans-serif]">
            <span className="text-[#3284ff]">TAX</span>SAGE
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1 bg-white/40 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm border border-white/60">
        <button
          onClick={handleHomeClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
            currentPage === 'dashboard'
              ? 'bg-[rgba(152,241,226,0.15)] text-[#2d2b2b] border border-[#03bcff]/30 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
          }`}
        >
          <IconOutlineDashboard />
          Dashboard
        </button>
        
        <button
          onClick={handleResearchClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
            currentPage === 'research'
              ? 'bg-[rgba(152,241,226,0.15)] text-[#0d0c0c] font-bold border border-[#03bcff]/30 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
          }`}
        >
          <IconOutlineSearch />
          Research
        </button>

        <button
          onClick={handlePlanClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
            currentPage === 'plan'
              ? 'bg-[rgba(152,241,226,0.15)] text-[#242222] border border-[#03bcff]/30 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
          }`}
        >
          <IconOutlineTrendingUp />
          Plan
        </button>

        <button
          onClick={handleOperateClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
            currentPage === 'operate'
              ? 'bg-[rgba(152,241,226,0.15)] text-gray-800 border border-[#03bcff]/30 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
          }`}
        >
          <IconOutlineCog />
          Operate
        </button>

        <button
          onClick={handleBenchmarkClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
            currentPage === 'benchmark'
              ? 'bg-[rgba(152,241,226,0.15)] text-gray-800 border border-[#03bcff]/30 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
          }`}
        >
          <div className="rotate-180">
            <Precision20467961 />
          </div>
          Benchmark
        </button>

        <button
          onClick={handleDocumentClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
            currentPage === 'document'
              ? 'bg-[rgba(152,241,226,0.15)] text-gray-800 border border-[#03bcff]/30 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
          }`}
        >
          <IconOutlineDocumentText />
          Document
        </button>

        <button
          onClick={handleDefendClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
            currentPage === 'defend'
              ? 'bg-[rgba(152,241,226,0.15)] text-gray-800 border border-[#03bcff]/30 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
          }`}
        >
          <IconOutlineShieldCheck />
          Defend
        </button>
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Cart Icon */}
        <button className="p-2 hover:bg-white/40 rounded-lg transition-colors group">
          <CartIcon />
        </button>
        
        {/* Notification Icon */}
        <button className="p-2 hover:bg-white/40 rounded-lg transition-colors group relative">
          <BellIcon />
          {/* Notification dot */}
          <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full border border-white/60 shadow-sm"></div>
        </button>
        
        {/* Profile Icon */}
        <button className="p-2 hover:bg-white/40 rounded-lg transition-colors group">
          <UserListIcon />
        </button>
      </div>
    </header>
  );
}