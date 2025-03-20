"use client";

import React from 'react';
import { Copy } from 'lucide-react';
import { ApiDocumentationProps } from '@/types/comps';

const ApiDocumentation: React.FC<ApiDocumentationProps> = ({ apiInfo, copied, onCopy }) => {
  const handleCopyCurl = () => {
    navigator.clipboard.writeText(apiInfo.curl);
    onCopy();
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 !h-[calc(100vh-180px)] !overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{apiInfo.title}</h2>
      <p className="text-gray-600 mb-6">{apiInfo.description}</p>
      
      {/* Endpoint */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-2">Endpoint</h3>
        <div className="flex items-center space-x-2 mb-1">
          <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-mono">
            {apiInfo.method}
          </span>
          <span className="font-mono text-sm">{apiInfo.endpoint}</span>
        </div>
      </div>
      
      {/* Parameters */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-2">Parameters</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {apiInfo.parameters.map((param, index) => (
                <tr key={index}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm font-mono">{param.name}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">{param.type}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    {param.required ? (
                      <span className="text-red-500">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-sm">{param.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* cURL Example */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base font-semibold">cURL Example</h3>
          <button 
            onClick={handleCopyCurl}
            className="text-emerald-600 hover:text-emerald-800 text-sm flex items-center"
          >
            <Copy className="h-4 w-4 mr-1" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
        <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm whitespace-pre-wrap overflow-x-auto">
          {apiInfo.curl}
        </div>
      </div>
      
      {/* Responses */}
      <div>
        <h3 className="text-base font-semibold mb-2">Responses</h3>
        {apiInfo.responses.map((response, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center mb-1">
              <span className={`px-2 py-0.5 rounded text-sm font-mono ${
                response.code.startsWith('2') ? 'bg-green-100 text-green-700' : 
                response.code.startsWith('4') ? 'bg-red-100 text-red-700' : 
                'bg-yellow-100 text-yellow-700'
              }`}>
                {response.code}
              </span>
              <span className="ml-2 text-sm text-gray-600">{response.description}</span>
            </div>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm overflow-x-auto">
              {response.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiDocumentation;