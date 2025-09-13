import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Filter, MoreHorizontal } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface Column {
  key: string;
  title: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface StandardTableProps {
  columns: Column[];
  data: any[];
  searchable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
  className?: string;
  onRowClick?: (row: any) => void;
}

export default function StandardTable({ 
  columns, 
  data, 
  searchable = false, 
  filterable = false,
  pagination = false,
  className = "",
  onRowClick 
}: StandardTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const handleSort = (columnKey: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnKey, direction });
  };

  const filteredData = data.filter((row) =>
    searchTerm === '' || 
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const getSortIcon = (columnKey: string) => {
    if (!sortConfig || sortConfig.key !== columnKey) {
      return <ArrowUpDown size={14} className="text-gray-400" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={14} className="text-gray-600" />
      : <ArrowDown size={14} className="text-gray-600" />;
  };

  const renderCellContent = (value: any, column: Column) => {
    if (React.isValidElement(value)) {
      return value;
    }
    
    if (typeof value === 'object' && value !== null) {
      return (
        <div className="flex items-center gap-3">
          {value.icon && <span className="text-lg">{value.icon}</span>}
          {value.logo && <img src={value.logo} alt="" className="w-6 h-6" />}
          <span className="font-medium text-gray-900 text-xs">{value.text || value.name}</span>
        </div>
      );
    }
    
    return <span className="text-gray-700 text-xs">{value}</span>;
  };

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}>
      {/* Header Controls */}
      {(searchable || filterable) && (
        <div className="p-6 border-b border-gray-50">
          <div className="flex items-center gap-4">
            {searchable && (
              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-gray-50/50 border-0 focus:bg-white focus:ring-1 focus:ring-blue-200"
                />
              </div>
            )}
            {filterable && (
              <Button variant="outline" size="sm" className="gap-2">
                <Filter size={14} />
                Add filter
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px]">
          <thead>
            <tr className="border-b border-gray-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-25 select-none' : ''
                  } ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}`}
                  style={{ width: column.width, minWidth: '140px' }}
                  onClick={column.sortable ? () => handleSort(column.key) : undefined}
                >
                  <div className="flex items-center gap-2">
                    {column.title}
                    {column.sortable && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(row)}
                className={`border-b border-gray-25 hover:bg-gray-25/50 transition-colors ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-3 ${
                      column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''
                    }`}
                    style={{ minWidth: '140px' }}
                  >
                    {renderCellContent(row[column.key], column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {pagination && (
        <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {sortedData.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

