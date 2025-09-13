import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Logo and branding */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <div>
            <div className="text-xs text-gray-500">Powered by</div>
            <div className="text-sm font-bold text-gray-800">
              <span className="text-blue-600">TAX</span>SAGE
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-2">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
          { id: 'research', label: 'Research', icon: '🔍' },
          { id: 'plan', label: 'Plan', icon: '📊' },
          { id: 'operate', label: 'Operate', icon: '⚙️' },
          { id: 'benchmark', label: 'Benchmark', icon: '📈' },
          { id: 'document', label: 'Document', icon: '📄' },
          { id: 'defend', label: 'Defend', icon: '🛡️' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentPage === item.id
                ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-300'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span className="mr-1">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right side actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </header>
  );
}