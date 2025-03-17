import React, { useState } from 'react';

interface ResponseTableProps {
  data: Record<string, unknown>[];
}

const ResponseTable: React.FC<ResponseTableProps> = ({ data }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No response data available</p>
      </div>
    );
  }

  // Get all unique keys from all objects in the data array
  const allKeys = Array.from(
    new Set(
      data.flatMap(item => Object.keys(item))
    )
  );

  // Function to format cell value based on its type
  const formatCellValue = (value: unknown): string => {
    if (value === null || value === undefined) {
      return '-';
    } else if (typeof value === 'object') {
      return JSON.stringify(value).slice(0, 50) + (JSON.stringify(value).length > 50 ? '...' : '');
    } else {
      return String(value);
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"></th>
            {allKeys.map(key => (
              <th key={key} className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr 
                className={`hover:bg-gray-50 cursor-pointer ${expandedRow === index ? 'bg-emerald-50' : ''}`}
                onClick={() => toggleRowExpansion(index)}
              >
                <td className="py-3 px-4 text-gray-500">
                  <button className="focus:outline-none">
                    {expandedRow === index ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </td>
                {allKeys.map(key => (
                  <td key={key} className="py-3 px-4 text-sm text-gray-500">
                    {formatCellValue(item[key])}
                  </td>
                ))}
              </tr>
              {expandedRow === index && (
                <tr className="bg-gray-50">
                  <td colSpan={allKeys.length + 1} className="py-3 px-6">
                    <div className="text-sm text-gray-800">
                      <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto">
                        {JSON.stringify(item, null, 2)}
                      </pre>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResponseTable;