import svgPaths from "../imports/svg-ids3okwrbi";
import imgImage1 from "figma:asset/25698dc498d2a78b06424a77d6abc51a77ede870.png";
import { imgG67 } from "../imports/svg-7fdui";
import globeImage from "figma:asset/85e6d202e9d8d9c0d839232d3a8b67e80a44155a.png";

function Money160212391() {
  return (
    <div className="overflow-clip relative shrink-0 size-6" data-name="money_16021239 1">
      <div className="absolute bottom-0 left-[15.63%] right-[15.63%] top-0" data-name="Group">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 24">
          <g id="Group">
            <path clipRule="evenodd" d={svgPaths.p303a6700} fill="url(#paint0_linear_21_923)" fillRule="evenodd" id="Vector" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_21_923" x1="8.24999" x2="8.24999" y1="0" y2="24">
              <stop stopColor="#70C8E2" />
              <stop offset="1" stopColor="#49B3FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Web31782851() {
  return (
    <div className="relative shrink-0 size-6" data-name="web_3178285 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_21_938)" id="web_3178285 1">
          <path clipRule="evenodd" d={svgPaths.p13e0780} fill="url(#paint0_linear_21_938)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_21_938" x1="12" x2="12" y1="0" y2="24">
            <stop stopColor="#01F1FE" />
            <stop offset="1" stopColor="#4FADFE" />
          </linearGradient>
          <clipPath id="clip0_21_938">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Medical149120971() {
  return (
    <div className="overflow-clip relative shrink-0 size-7" data-name="medical_14912097 1">
      <div className="absolute inset-[15.62%_6.25%]" data-name="Layer 2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 20">
          <g id="Layer 2">
            <path d={svgPaths.p19bb70} fill="url(#paint0_linear_21_920)" id="Vector" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_21_920" x1="12.25" x2="12.25" y1="0" y2="19.2516">
              <stop stopColor="#70C8E2" />
              <stop offset="1" stopColor="#4FADFE" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 flex-1 max-w-[200px] min-w-[160px]">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-cyan-50/30 rounded-2xl" />
      
      <div className="relative flex flex-col items-center text-center space-y-3">
        <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl shadow-sm">
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {value}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative size-full min-h-screen" data-name="TAXSAGE Home">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6">
        {/* Hero Title */}
        <div className="text-center mb-8 max-w-5xl">
          <h1 className="font-bold text-gray-900 leading-[1.3] tracking-tight">
            <span className="block text-[52px] md:text-[58px] lg:text-[64px]">Built For</span>
            <span className="block">
              <span className="text-[52px] md:text-[58px] lg:text-[64px]">Smart, </span>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent text-[52px] md:text-[58px] lg:text-[64px]">
                  Compliant
                </span>
                {/* Decorative border box */}
                <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg transform rotate-1 z-0"></div>
                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
              </span>
            </span>
            <span className="block">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-[52px] md:text-[58px] lg:text-[64px]">
                Transfer Pricing
              </span>
            </span>
          </h1>
        </div>

        {/* Hero Subtitle */}
        <div className="text-center mb-16 max-w-2xl">
          <p className="text-lg text-gray-600 leading-relaxed">
            TAXSAGE helps global enterprises streamline operations, ensure compliance, and scale transfer pricing with complete confidence across all jurisdictions.
          </p>
        </div>

        {/* Globe Background - positioned behind statistics */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[25%] overflow-hidden pointer-events-none z-0">
          <img 
            src={globeImage} 
            alt="" 
            className="w-[1800px] h-auto opacity-10 object-contain"
          />
        </div>

        {/* Statistics Cards */}
        <div className="relative z-10 flex items-center justify-center gap-8 w-full max-w-4xl">
          <StatCard 
            icon={<Money160212391 />}
            value="2.4 B"
            label="Global Revenue"
          />
          <StatCard 
            icon={<Web31782851 />}
            value="127"
            label="Active Entities"
          />
          <StatCard 
            icon={<Medical149120971 />}
            value="1.2K"
            label="Processes"
          />
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient orb */}
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </section>

      {/* Footer */}
      <div className="absolute bottom-16 left-1/2 translate-x-[-50%] text-center z-10">
        <div className="font-['Montserrat:Medium',_sans-serif] font-medium text-gray-500 text-[8px]">
          <p className="leading-[20px] text-nowrap whitespace-pre">Powered by</p>
        </div>
        <div className="font-['Montserrat:Bold',_sans-serif] font-bold text-[10px]">
          <p className="leading-[20px] text-nowrap whitespace-pre">
            <span className="text-[#2563eb]">TAX</span>
            <span className="text-gray-800">SAGE</span>
          </p>
        </div>
      </div>
    </div>
  );
}