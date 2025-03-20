import { WorkflowInput } from '@/types/workflow';
import React from 'react';

interface InputFieldProps {
  input: WorkflowInput;
}

const InputField: React.FC<InputFieldProps> = ({ input }) => {
  if (input.type === 'dropdown') {
    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mt-3">{input.label}</label>
        <select className="mt-1 block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md border">
          <option value="">{input.placeholder}</option>
          {input.options?.map((option, idx) => (
            <option key={idx} value={option}>{option}</option>
          ))}
        </select>
      </div>
    );
  }
  
  if (input.type === 'checkbox' && input.options) {
    return (
      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mt-3">{input.label}</label>
        <div className="mt-2 space-y-2">
          {input.options.map((option, idx) => (
            <div key={idx} className="flex items-center">
              <input 
                type="checkbox" 
                id={`checkbox-${option.replace(/\s+/g, '-').toLowerCase()}`}
                className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label 
                htmlFor={`checkbox-${option.replace(/\s+/g, '-').toLowerCase()}`}
                className="ml-2 text-xs text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // Default is a text input
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-700 mt-3">{input.label}</label>
      <input 
        type="text" 
        placeholder={input.placeholder}
        className="mt-1 block w-full pl-2 pr-8 py-1.5 text-xs border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md border"
      />
    </div>
  );
};

export default InputField;