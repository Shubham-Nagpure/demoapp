import { useState, useRef, useEffect } from "react";
import svgPaths from "../imports/svg-eo2up7qyd4";
import imgImage2 from "figma:asset/d4c4d8e4b5ac629610c6598b73884e66852e951d.png";
import darkLogo from "../assets/headerlogo.png";
import { imgG67 } from "../imports/svg-75dlp";
import headerIcons from "figma:asset/0e465c5fd03ae4ba6c092d156ae1c4a835e10dae.png";
import { CartItem } from "../App";
import {
  X,
  Trash2,
  LogOut,
  User,
  Settings,
  ShoppingCart,
  Folder,
} from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartItems: CartItem[];
  onRemoveFromCart: (itemId: number, itemType: string) => void;
  onClearCart: () => void;
  onLogout: () => void;
  cartAnimationTrigger?: number; // Add this to trigger animation
}

function Group1({ isDark }: { isDark?: boolean }) {
  return (
    <div className="absolute contents leading-[0] left-[98px] text-nowrap top-[23px]">
      <div
        className={`absolute font-['Montserrat:Medium',_sans-serif] font-medium left-[98px] text-[8px] top-[23px] ${
          isDark ? "text-gray-400" : "text-[#a7a7a7]"
        }`}
      >
        <p className="leading-[20px] text-nowrap whitespace-pre">Powered by</p>
      </div>
      <div
        className={`absolute font-['Montserrat:Bold',_sans-serif] font-bold left-[98px] text-[10px] top-[33px] ${
          isDark ? "text-gray-200" : "text-[#505050]"
        }`}
      >
        <p className="leading-[20px] text-nowrap whitespace-pre">
          <span className="text-[#3284ff]">TAX</span>SAGE
        </p>
      </div>
    </div>
  );
}

function Group8({ isDark }: { isDark?: boolean }) {
  return (
    <div className="absolute contents left-[98px] top-[23px]">
      <img src={darkLogo} alt="Tagline" style={{ width: "71px", height: "10px", zIndex: 1}}/>
    </div>
  );
}

function Group214({ isDark }: { isDark?: boolean }) {
  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src={darkLogo} alt="Tagline" style={{ width: "120px", height: "30px", zIndex: 1, objectFit: "contain", objectPosition: "center"}}/>

      {/* <div
        className="w-[32px] h-[32px] object-contain"
        data-name="logo"
        style={{ backgroundImage: `url('${darkLogo}')` }}
      /> */}
      {/* <Group8 isDark={isDark} /> */}
    </div>
  );
}

function Group215({ isDark }: { isDark?: boolean }) {
  return (
    <div className="absolute contents left-[38px] top-[18px]">
      <Group214 isDark={isDark} />
    </div>
  );
}

// Modern Header Icons
function NotificationIcon() {
  return (
    <div className="relative p-2 hover:bg-white/40 rounded-lg transition-colors cursor-pointer group">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="text-gray-600 group-hover:text-gray-800 transition-colors"
      >
        <path
          d="M15 13H5a1 1 0 0 1-.895-1.447L5 10V7a5 5 0 0 1 10 0v3l.895 1.553A1 1 0 0 1 15 13zM8.5 16.5A1.5 1.5 0 0 0 10 18a1.5 1.5 0 0 0 1.5-1.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {/* Notification dot */}
      <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-red-400 to-red-500 rounded-full border border-white shadow-sm"></div>
    </div>
  );
}

function RepositoryIcon({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  return (
    <div
      className="relative p-2 hover:bg-white/40 rounded-lg transition-colors cursor-pointer group"
      onClick={() => onNavigate("repository")}
    >
      <Folder
        size={20}
        className="text-gray-600 group-hover:text-gray-800 transition-colors"
      />
    </div>
  );
}

function CartIcon({
  cartItems,
  onShowCartOverlay,
  animationTrigger,
}: {
  cartItems: CartItem[];
  onShowCartOverlay: () => void;
  animationTrigger?: number;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation when animationTrigger changes
  useEffect(() => {
    if (animationTrigger && animationTrigger > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [animationTrigger]);

  return (
    <div className="relative">
      <div
        className={`relative p-2 hover:bg-white/40 rounded-lg transition-all duration-300 cursor-pointer group ${
          isAnimating ? "animate-pulse bg-blue-50 scale-110 shadow-lg" : ""
        }`}
        onClick={onShowCartOverlay}
      >
        <ShoppingCart
          size={20}
          className={`text-gray-600 group-hover:text-gray-800 transition-colors ${
            isAnimating ? "text-blue-600" : ""
          }`}
        />
        {cartItems.length > 0 && (
          <div
            className={`absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-all duration-300 ${
              isAnimating
                ? "scale-125 shadow-blue-300/50 shadow-lg animate-bounce"
                : ""
            }`}
          >
            <span className="text-[10px] font-bold text-white">
              {cartItems.length}
            </span>
          </div>
        )}

        {/* Added to cart notification pulse */}
        {isAnimating && (
          <div className="absolute inset-0 bg-blue-400/20 rounded-lg animate-ping pointer-events-none" />
        )}
      </div>
    </div>
  );
}

function ProfileIcon({ onLogout }: { onLogout: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    onLogout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative p-2 hover:bg-white/40 rounded-lg transition-colors cursor-pointer group"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-gray-600 group-hover:text-gray-800 transition-colors"
        >
          <path
            d="M10 11c3.866 0 7 1.79 7 4v3H3v-3c0-2.21 3.134-4 7-4z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle
            cx="10"
            cy="6"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
        {/* Online status indicator */}
        <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full border border-white shadow-sm"></div>
      </div>

      {/* Profile Dropdown */}
      {isDropdownOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 z-[9998]"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Dropdown content */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-[9999]">
            <div className="py-2">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100/60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-sm">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900 text-sm font-medium">
                      TAXSAGE User
                    </p>
                    <p className="text-gray-500 text-xs">Premium Account</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  onClick={handleLogoutClick}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                >
                  <LogOut className="w-4 h-4 group-hover:text-red-600 transition-colors" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Cart Overlay Component
function CartOverlay({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onClearCart,
  onNavigate,
}: {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveFromCart: (itemId: number, itemType: string) => void;
  onClearCart: () => void;
  onNavigate: (page: string) => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close overlay when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((total, item) => {
    // Mock pricing based on item type
    const price = item.type === "analysis" ? 2000 : 6000;
    return total + price;
  }, 0);

  const handleCheckout = () => {
    onClose();
    onNavigate("checkout");
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" />

      {/* Cart Overlay */}
      <div
        ref={overlayRef}
        className="fixed top-20 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200/50 z-[9999] max-h-[calc(100vh-120px)] flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Shopping Cart
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">Your cart is empty</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {cartItems.map((item) => {
                const price = item.type === "analysis" ? 2000 : 6000;
                return (
                  <div key={`${item.id}-${item.type}`} className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="text-lg font-semibold text-teal-600 mt-2">
                          USD {price.toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.id, item.type)}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    {/* Separator */}
                    <div className="border-t border-gray-100" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-900">Total:</span>
              <span className="text-xl font-bold text-teal-600">
                USD {subtotal.toLocaleString()}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-xl"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

// Main Header component
export default function Header({
  currentPage,
  onNavigate,
  cartItems,
  onRemoveFromCart,
  onClearCart,
  onLogout,
  cartAnimationTrigger,
}: HeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);

  const handleDashboardClick = () => onNavigate("dashboard");
  const handleResearchClick = () => onNavigate("research");
  const handlePlanClick = () => onNavigate("plan");
  const handleOperateClick = () => onNavigate("operate");
  const handleBenchmarkClick = () => onNavigate("benchmark");
  const handleDocumentClick = () => onNavigate("document");
  const handleDefendClick = () => onNavigate("defend");

  return (
    <div
      className="box-border flex items-start justify-start overflow-visible relative w-full h-[74px] z-50"
      style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
    >
      <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-blue-50 via-white to-cyan-50" />

      {/* Logo Section */}
      <Group215 isDark={isDark} />

      {/* Navigation */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm border border-white/60">
          {/* Dashboard */}
          <div
            className={currentPage === "dashboard" ? "" : "cursor-pointer"}
            onClick={handleDashboardClick}
          >
            {currentPage === "dashboard" ? (
              <div className="bg-[rgba(152,241,226,0.12)] content-stretch flex flex-col gap-2.5 h-[30px] items-center justify-center relative rounded-[50px] shrink-0 w-[105px]">
                <div
                  aria-hidden="true"
                  className="absolute border-[#03bcff] border-[0.6px] border-solid inset-0 pointer-events-none rounded-[50px]"
                />
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                  <div
                    className="[grid-area:1_/_1] ml-0 mt-0.5 overflow-clip relative size-4"
                    data-name="home-icon"
                  >
                    <div
                      className="absolute bottom-[4.17%] left-0 right-0 top-[4.17%]"
                      data-name="Group"
                    >
                      <svg
                        className="block size-full"
                        fill="none"
                        preserveAspectRatio="none"
                        viewBox="0 0 16 15"
                      >
                        <g id="Group">
                          <path
                            d={svgPaths.p242437c0}
                            fill="url(#paint0_linear_1_133)"
                            id="Vector"
                          />
                          <path
                            d={svgPaths.p7521900}
                            fill="url(#paint1_linear_1_133)"
                            id="Vector_2"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            gradientUnits="userSpaceOnUse"
                            id="paint0_linear_1_133"
                            x1="8.00001"
                            x2="8.00001"
                            y1="0"
                            y2="14.6667"
                          >
                            <stop stopColor="#03BCFF" />
                            <stop offset="1" stopColor="#98F1E2" />
                          </linearGradient>
                          <linearGradient
                            gradientUnits="userSpaceOnUse"
                            id="paint1_linear_1_133"
                            x1="8.00013"
                            x2="8.00013"
                            y1="9.33334"
                            y2="12.6667"
                          >
                            <stop stopColor="#03BCFF" />
                            <stop offset="1" stopColor="#98F1E2" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="[grid-area:1_/_1] font-['Montserrat:Medium',_sans-serif] font-medium ml-[22.152px] mt-0 relative text-[12px] text-nowrap text-neutral-100">
                    <p className="leading-[20px] whitespace-pre font-bold text-[rgba(45,43,43,1)]">
                      Dashboard
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={handleDashboardClick}
                className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 cursor-pointer transition-colors px-2 py-1 rounded-lg hover:bg-gray-50/50"
              >
                <div className="[grid-area:1_/_1] font-['Montserrat:SemiBold',_sans-serif] font-semibold ml-[23.207px] mt-0 relative text-[12px] text-nowrap text-[#4e4949]">
                  <p className="leading-[20px] whitespace-pre">Dashboard</p>
                </div>
                <div
                  className="[grid-area:1_/_1] ml-0 mt-0.5 overflow-clip relative size-4"
                  data-name="home-icon"
                >
                  <div
                    className="absolute bottom-[4.17%] left-0 right-0 top-[4.17%]"
                    data-name="Group"
                  >
                    <svg
                      className="block size-full"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 16 15"
                    >
                      <g id="Group">
                        <path
                          d={svgPaths.p242437c0}
                          fill="url(#paint0_linear_1_133)"
                          id="Vector"
                        />
                        <path
                          d={svgPaths.p7521900}
                          fill="url(#paint1_linear_1_133)"
                          id="Vector_2"
                        />
                      </g>
                      <defs>
                        <linearGradient
                          gradientUnits="userSpaceOnUse"
                          id="paint0_linear_1_133"
                          x1="8.00001"
                          x2="8.00001"
                          y1="0"
                          y2="14.6667"
                        >
                          <stop stopColor="#03BCFF" />
                          <stop offset="1" stopColor="#98F1E2" />
                        </linearGradient>
                        <linearGradient
                          gradientUnits="userSpaceOnUse"
                          id="paint1_linear_1_133"
                          x1="8.00013"
                          x2="8.00013"
                          y1="9.33334"
                          y2="12.6667"
                        >
                          <stop stopColor="#03BCFF" />
                          <stop offset="1" stopColor="#98F1E2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* Research */}
          <button
            onClick={handleResearchClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
              currentPage === "research"
                ? "bg-[rgba(152,241,226,0.15)] text-[#0d0c0c] font-bold border border-[#03bcff]/30 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <div className="relative size-[18px]" data-name="search-icon">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 18 18"
              >
                <g id="Icon/Outline/search">
                  <path
                    d={svgPaths.p2e3c1d00}
                    id="Icon"
                    stroke="url(#paint0_linear_search)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </g>
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear_search"
                    x1="2.16382"
                    x2="17.1638"
                    y1="0.5"
                    y2="18"
                  >
                    <stop stopColor="#03BCFF" />
                    <stop offset="1" stopColor="#98F1E2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            Research
          </button>

          {/* Plan */}
          <button
            onClick={handlePlanClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
              currentPage === "plan"
                ? "bg-[rgba(152,241,226,0.15)] text-[#242222] border border-[#03bcff]/30 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <div
              className="relative shrink-0 size-6"
              data-name="trending-up-icon"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
              >
                <g id="Icon/Outline/trending-up">
                  <path
                    d={svgPaths.p76d8100}
                    id="Icon"
                    stroke="url(#paint0_linear_plan)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8151"
                  />
                </g>
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear_plan"
                    x1="15.8359"
                    x2="11.168"
                    y1="3"
                    y2="16.0755"
                  >
                    <stop stopColor="#03BCFF" />
                    <stop offset="1" stopColor="#70C8E2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            Plan
          </button>

          {/* Operate */}
          <button
            onClick={handleOperateClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
              currentPage === "operate"
                ? "bg-[rgba(152,241,226,0.15)] text-gray-800 border border-[#03bcff]/30 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <div className="relative size-6" data-name="cog-icon">
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 24 24"
              >
                <g id="Icon/Outline/cog">
                  <g id="Icon">
                    <path
                      d={svgPaths.p8da5780}
                      stroke="url(#paint0_linear_operate)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                    <path
                      d={svgPaths.p2745d380}
                      stroke="url(#paint1_linear_operate)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.66667"
                    />
                  </g>
                </g>
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear_operate"
                    x1="11.3359"
                    x2="11.3359"
                    y1="5"
                    y2="20"
                  >
                    <stop stopColor="#03BCFF" />
                    <stop offset="1" stopColor="#98F1E2" />
                  </linearGradient>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint1_linear_operate"
                    x1="11.3359"
                    x2="11.3359"
                    y1="5"
                    y2="20"
                  >
                    <stop stopColor="#03BCFF" />
                    <stop offset="1" stopColor="#98F1E2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            Operate
          </button>

          {/* Benchmark */}
          <button
            onClick={handleBenchmarkClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
              currentPage === "benchmark"
                ? "bg-[rgba(152,241,226,0.15)] text-gray-800 border border-[#03bcff]/30 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <div className="rotate-180">
              <div
                className="overflow-clip relative size-[18px]"
                data-name="precision-icon"
              >
                <div
                  className="absolute contents inset-[3.906%]"
                  data-name="g61"
                >
                  <div className="absolute flex inset-[11.59%] items-center justify-center">
                    <div className="flex-none scale-y-[-100%] size-[13.828px]">
                      <div
                        className="mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-2.086px] mask-size-[18px_18px] relative size-full"
                        data-name="g83"
                        style={{ maskImage: `url('${imgG67}')` }}
                      >
                        <div className="absolute inset-[-5.08%]">
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 16 16"
                          >
                            <g id="g83">
                              <path
                                d={svgPaths.p367a7e40}
                                id="path85"
                                stroke="url(#paint0_linear_benchmark)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeMiterlimit="10"
                                strokeWidth="1.40625"
                              />
                            </g>
                            <defs>
                              <linearGradient
                                gradientUnits="userSpaceOnUse"
                                id="paint0_linear_benchmark"
                                x1="7.91406"
                                x2="7.91406"
                                y1="1"
                                y2="14.8281"
                              >
                                <stop stopColor="#03BCFF" />
                                <stop offset="1" stopColor="#98F1E2" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            Benchmark
          </button>

          {/* Document */}
          <button
            onClick={handleDocumentClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
              currentPage === "document"
                ? "bg-[rgba(152,241,226,0.15)] text-gray-800 border border-[#03bcff]/30 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <div
              className="relative size-[22px]"
              data-name="document-text-icon"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 22 22"
              >
                <g id="Icon/Outline/document-text">
                  <path
                    d={svgPaths.p3f4a8b00}
                    id="Icon"
                    stroke="url(#paint0_linear_document)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.83333"
                  />
                </g>
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear_document"
                    x1="11"
                    x2="11"
                    y1="2.75"
                    y2="19.25"
                  >
                    <stop stopColor="#03BCFF" />
                    <stop offset="1" stopColor="#98F1E2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            Document
          </button>

          {/* Defend */}
          <button
            onClick={handleDefendClick}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all font-['Montserrat:SemiBold',_sans-serif] ${
              currentPage === "defend"
                ? "bg-[rgba(152,241,226,0.15)] text-gray-800 border border-[#03bcff]/30 shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <div
              className="relative size-[21.032px]"
              data-name="shield-check-icon"
            >
              <svg
                className="block size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 22 22"
              >
                <g id="Icon/Outline/shield-check">
                  <path
                    d={svgPaths.p3d420600}
                    id="Icon"
                    stroke="url(#paint0_linear_defend)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.75264"
                  />
                </g>
                <defs>
                  <linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="paint0_linear_defend"
                    x1="10.5159"
                    x2="10.5159"
                    y1="2.58019"
                    y2="18.0715"
                  >
                    <stop stopColor="#03BCFF" />
                    <stop offset="1" stopColor="#98F1E2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            Defend
          </button>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-1 z-[100]">
        <NotificationIcon />
        <RepositoryIcon onNavigate={onNavigate} />
        <CartIcon
          cartItems={cartItems}
          onShowCartOverlay={() => setIsCartOverlayOpen(true)}
          animationTrigger={cartAnimationTrigger}
        />
        <ProfileIcon onLogout={onLogout} />
      </div>

      {/* Cart Overlay */}
      <CartOverlay
        isOpen={isCartOverlayOpen}
        onClose={() => setIsCartOverlayOpen(false)}
        cartItems={cartItems}
        onRemoveFromCart={onRemoveFromCart}
        onClearCart={onClearCart}
        onNavigate={onNavigate}
      />
    </div>
  );
}
