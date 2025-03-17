"use client";

import React, { useState } from 'react';
import { Upload, X, Table } from 'lucide-react';

const FileUploadSection = () => {
  const [file, setFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null);
  };
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-6">
      <h3 className="text-base font-medium mb-3">Upload Data File (Optional)</h3>
      
      {!file ? (
        <div className="relative bg-gray-50 border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
          <Upload className="h-8 w-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-1">Drag & drop a CSV file here, or click to browse</p>
          <p className="text-xs text-gray-400">Your data will be used as input for the workflow</p>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-blue-100 rounded-md p-2 mr-3">
              <Table className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <button 
            onClick={handleRemoveFile}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;