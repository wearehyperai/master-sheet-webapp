"use client";

import React from 'react';
import { X } from 'lucide-react';
import { InputField } from '@/types/workflow';

interface InputRowProps {
  input: InputField;
  value: string;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const InputRow: React.FC<InputRowProps> = ({
  input,
  value,
  index,
  onChange,
  onRemove,
  canRemove
}) => {
  return (
    <div className="flex items-center space-x-2 mb-2">
      {input.type === 'dropdown' ? (
        <select 
          className="flex-1 p-2 border rounded focus:ring-emerald-500 focus:border-emerald-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={input.required}
        >
          <option value="">{input.placeholder || `Select ${input.label}`}</option>
          {input.options?.map((option, optIdx) => (
            <option key={optIdx} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : input.type === 'checkbox' ? (
        <div className="flex-1 space-y-2">
          {input.options?.map((option, optIdx) => (
            <div key={optIdx} className="flex items-center">
              <input 
                type="checkbox" 
                id={`checkbox-${index}-${optIdx}`}
                className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label 
                htmlFor={`checkbox-${index}-${optIdx}`}
                className="ml-2 text-sm text-gray-700"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <input 
          type="text" 
          placeholder={input.placeholder || `Enter ${input.label}`}
          className="flex-1 p-2 border rounded focus:ring-emerald-500 focus:border-emerald-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={input.required}
        />
      )}
      
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700 p-1"
          aria-label="Remove row"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
};

export default InputRow;