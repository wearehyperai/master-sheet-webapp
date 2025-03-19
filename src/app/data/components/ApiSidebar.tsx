"use client"

import React, { useState } from 'react';

export interface ApiResponseField {
    id: string;
    name: string;
    checked: boolean;
}

export interface ApiRequestParam {
    id: string;
    name: string;
    selectedColumn: string;
}

export interface ApiDefinition {
    id: string;
    name: string;
    description: string;
    requestParams: string[];
    responseFields: string[];
}

export interface ApiSidebarProps {
    isOpen: boolean;
    availableApis: ApiDefinition[];
    tableColumns: string[];
    onClose: () => void;
    onRunApi: (apiId: string, params: Record<string, string>, responseFields: string[]) => void;
}

const ApiSidebar: React.FC<ApiSidebarProps> = ({
    isOpen,
    availableApis,
    tableColumns,
    onClose,
    onRunApi,
}) => {
    const [availableTableColumns, setAvailableTableColumns] = useState<string[]>([]);
    const [selectedApi, setSelectedApi] = useState<ApiDefinition | null>(null);
    const [selectedColumns, setSelectedColumns] = useState<Record<string, string>>({});
    const [selectedResponseFields, setSelectedResponseFields] = useState<Record<string, boolean>>({});
    // const [canRunApi, setCanRunApi] = useState<boolean>(false);

    const selectApi = (api: ApiDefinition) => {
        setSelectedApi(api);

        const initialColumns: Record<string, string> = {};
        api.requestParams.forEach(param => {
            initialColumns[param] = '';
        });
        setSelectedColumns(initialColumns);

        const initialResponseFields: Record<string, boolean> = {};
        api.responseFields.forEach(field => {
            initialResponseFields[field] = true;
        });
        setSelectedResponseFields(initialResponseFields);
        setAvailableTableColumns(tableColumns);
    };

    const handleColumnSelect = (param: string, value: string) => {
        setSelectedColumns({
            ...selectedColumns,
            [param]: value
        });
        setAvailableTableColumns(availableTableColumns.filter((key) => key !== value));
    };

    const handleResponseFieldToggle = (field: string) => {
        setSelectedResponseFields({
            ...selectedResponseFields,
            [field]: !selectedResponseFields[field]
        });
    };

    const handleRunApi = () => {
        if (!selectedApi) return;

        // Filter selected response fields to get only the ones that are checked
        const enabledResponseFields = Object.entries(selectedResponseFields)
            .filter(([, isSelected]) => isSelected)
            .map(([fieldName]) => fieldName);

        onRunApi(selectedApi.id, selectedColumns, enabledResponseFields);
    };

    return (
        <div
            className={`z-1 fixed top-0 right-0 w-64 h-full bg-gray-100 p-4 overflow-y-auto transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Available APIs</h2>
                <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    ×
                </button>
            </div>

            <ul className="mb-4">
                {availableApis.map((api) => (
                    <li key={api.id} className="mb-2">
                        <button
                            className={`w-full text-left p-2 rounded hover:bg-gray-200 ${selectedApi?.id === api.id ? 'bg-gray-200' : ''
                                }`}
                            onClick={() => selectApi(api)}
                        >
                            {api.name}
                        </button>
                    </li>
                ))}
            </ul>

            {selectedApi && (
                <div className="mt-4 p-4 bg-white rounded shadow">
                    <h3 className="font-bold text-lg mb-2">{selectedApi.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{selectedApi.description}</p>

                    <div className="mb-4">
                        <h4 className="font-medium mb-2">Request Parameters</h4>
                        {selectedApi.requestParams.map((param) => {
                            return (
                                <div key={param} className="mb-2">
                                    <label className="block text-sm font-medium mb-1">{param}</label>
                                    <select
                                        className="w-full p-2 border rounded"
                                        value={selectedColumns[param]}
                                        onChange={(e) => handleColumnSelect(param, e.target.value)}
                                    >
                                        <option value="">Select column</option>
                                        {selectedColumns[param] != "" && (<option value={selectedColumns[param]}>{selectedColumns[param]}</option>)}
                                        {availableTableColumns.map((column) => (
                                            <option key={column} value={column}>
                                                {column}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium mb-2">Response Fields</h4>
                        {selectedApi.responseFields.map((field) => (
                            <div key={field} className="flex items-center mb-1">
                                <input
                                    type="checkbox"
                                    id={`field-${field}`}
                                    checked={selectedResponseFields[field]}
                                    onChange={() => handleResponseFieldToggle(field)}
                                    className="mr-2"
                                />
                                <label htmlFor={`field-${field}`} className="text-sm">
                                    {field}
                                </label>
                            </div>
                        ))}
                    </div>

                    <button
                        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={handleRunApi}
                    >
                        Run API
                    </button>
                </div>
            )}
            { }
        </div>
    );
};

export default ApiSidebar;