import { ApiCall } from '@/types/myWorkflows';
import { formatDateTime } from '@/utils/myWorkflows';
import React from 'react';

interface ApiCallsListProps {
  apiCalls: ApiCall[];
}

const ApiCallsList: React.FC<ApiCallsListProps> = ({ apiCalls }) => {
  if (apiCalls.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No API calls available</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Endpoint
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Method
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Timestamp
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duration
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Credits
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {apiCalls.map((apiCall) => (
            <tr key={apiCall.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                {apiCall.endpoint}
              </td>
              <td className="py-3 px-4 text-sm text-gray-500">
                <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                  apiCall.method === 'GET' 
                    ? 'bg-blue-100 text-blue-800' 
                    : apiCall.method === 'POST'
                    ? 'bg-green-100 text-green-800'
                    : apiCall.method === 'PUT'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {apiCall.method}
                </span>
              </td>
              <td className="py-3 px-4 text-sm">
                <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                  apiCall.status === 'success' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {apiCall.status}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-500">
                {formatDateTime(apiCall.timestamp)}
              </td>
              <td className="py-3 px-4 text-sm text-gray-500">
                {apiCall.duration} ms
              </td>
              <td className="py-3 px-4 text-sm text-gray-500">
                {apiCall.creditsConsumed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiCallsList;