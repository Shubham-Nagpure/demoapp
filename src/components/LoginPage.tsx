import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import logoImage from "figma:asset/cbed48d683d86fc5d93472d0b5f0df03fa6c269e.png";
import globeImage from "../assets/Video_20250912_154720_278.mp4";

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("shrirajchavan@gmail.com");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-6 px-10 h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0"
        style={{
          height: "1024px",
          width: "auto",
          marginBottom: "-560px",
          zIndex: -2,
        }}
      >
        <source src={globeImage} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-50"
        style={{
          background: "linear-gradient(to top left, #91ABD7, white, #CDFCF4)",
          zIndex: -1,
        }}
      />
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center min-h-[600px]">
        {/* Left Section - Content (~60% width) */}
        <div className="lg:col-span-3 flex items-center justify-start px-8 lg:px-16">
          <div className="w-full max-w-2xl space-y-8">
            {/* Logo */}
            <div className="text-left">
              <img
                src={logoImage}
                alt="taxSAGE.ai - AI-Powered Tax Solutions"
                className="h-32 lg:h-40 w-auto object-contain"
              />
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
                <span className="animated-gradient-text">
                  Human-Led, AI-Powered
                </span>
                <br />
                <span style={{ color: "#173768" }}>Transfer Pricing</span>
                <br />
                <span style={{ color: "#173768" }}>Technology Solutions</span>
              </h1>

              {/* Description */}
              <p
                className="text-base lg:text-lg leading-relaxed max-w-xl"
                style={{ color: "#424955" }}
              >
                End-to-end integrated cloud platform providing intelligent
                solutions across the entire TP life cycle - from planning to
                operations, compliance and defence.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Sign In Form (~40% width) */}
        <div className="lg:col-span-2 flex justify-center lg:justify-center px-6">
          <div className="w-full max-w-md">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-white/20">
              {/* Form Header */}
              <div className="text-center space-y-3 mb-10">
                <h3 className="text-2xl font-bold text-gray-900">Sign In</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Sign In Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Email Field */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 px-4"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                    >
                      Forget password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Type here..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pl-4 pr-14"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full h-14 rounded-xl text-base btn-login-gradient"
                >
                  Sign In
                </Button>

                {/* Footer Text */}
                <p className="text-xs text-gray-500 text-center leading-relaxed pt-2">
                  By signing in, you agree to our{" "}
                  <span className="text-blue-600 hover:text-blue-500 cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 hover:text-blue-500 cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
