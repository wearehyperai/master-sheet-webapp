'use client';

import userRepo from '@/data/user_repo';
import userUploadsRepository from '@/data/user_upload_repos';
import { useSocketStore } from '@/hooks/useSocketService';
import { CSVDataList, RecordData } from '@/models/csv_data';
import { IUser } from '@/models/user';
import { IUserUploads } from '@/models/user_uploads';
import { SocketReceiveEvents } from '@/services/socket/socketEvents';
import { socketService } from '@/services/socket/socketService';
import { APIProviderIds, apiProviders } from '@/utils/api_provider_data';
import { useUser } from '@clerk/nextjs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ApiSidebar from './components/ApiSidebar';
import DataTable from './components/DataTable';
import ProgressIndicator from './components/ProgressIndicator';

export default function DataPage() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [processedData, setProcessedData] = useState<number>(0);
    const [columns, setColumns] = useState<string[]>([]);
    const [responseFields, setResponseFields] = useState<string[]>([]);
    const isParsing = useSocketStore((state) => state.eventData[SocketReceiveEvents.parsedData]);
    const parsedData = useSocketStore((state) => state.eventData[SocketReceiveEvents.parsedDataCompleted]);
    const [recordData, setRecordData] = useState<RecordData[]>([]);
    const nameResponseData = useSocketStore((state) => state.eventData[SocketReceiveEvents.nameAPIResponse]);
    const linkedInResponseData = useSocketStore((state) => state.eventData[SocketReceiveEvents.linkedInResponse]);
    const userData = useSocketStore((state) => state.eventData[SocketReceiveEvents.userData]);
    const [isLoading, setIsLoading] = useState(true);
    const clearEventData = useSocketStore((state) => state.clearEventData);
    const [userUpload, setUserUpload] = useState<IUserUploads[]>([]);
    const [userDetails, setUserDetails] = useState<IUser | null>(null);
    const [uploadId, setUploadId] = useState<string>('');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { isLoaded, user } = useUser();


    useEffect(() => {
        if (!userDetails) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("source");
            console.log('params ', params.toString());
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [userDetails]);

    useEffect(() => {
        function fetchData() {
            const uploadId = searchParams?.get("id");
            const source = searchParams?.get("source");
            console.log("Socket onConnectionChange:", uploadId);
            if (uploadId && uploadId.length > 0) {
                console.log("Socket connected, requesting data for file:", uploadId);
                if (source != 'upload') {
                    socketService.askForData(uploadId);
                }
                setUploadId(uploadId);
            }
        }

        function askForData() {
            setUserDetails(userRepo.user);
            socketService.connectToServer(userRepo.user!._id);
            if (socketService.IsConnected) {
                fetchData();
            }
            socketService.onConnectionChange((connected) => {
                if (connected) {
                    fetchData();
                }
            });
        }

        if (!userDetails && userRepo.user) {
            askForData();
        }
        else if (!userRepo.user && user) {
            userRepo.fetchUser(user.id).then(userData => {
                if (userData) {
                    askForData();
                }
            });
        }
    }, [userDetails, userRepo.user, isLoaded, user]);


    useEffect(() => {
        if (userUpload.length == 0 && userUploadsRepository.userUploads.length > 0) {
            setUserUpload(userUploadsRepository.userUploads);
        }
    }, [userUpload, userUploadsRepository.userUploads]);

    useEffect(() => {
        setIsLoading(isParsing);
    }, [isParsing])

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        if (userData) {
            const data = JSON.parse(userData);
            if (!data) return;
            if (data.hasOwnProperty('status') && data.status == 'Loading') {
                setIsLoading(true);
                return;
            }
            const records: RecordData[] = data;
            if (records.length > 0) {
                setRecordData(records);
                setIsLoading(false);
                setColumns(Object.keys(records[0].keyValuePairs));
            }
        }
    }, [userData]);

    useEffect(() => {
        if (parsedData) {
            const responseData: RecordData[] = JSON.parse(parsedData);
            const newRecordData = [...recordData, ...responseData];
            setRecordData(newRecordData);
            setIsLoading(false);
            console.log(`parsed recordData ${responseData.length} ${newRecordData.length}`);
            if (responseData.length > 0) {
                setColumns(Object.keys(responseData[0].keyValuePairs));
            }
        }
    }, [parsedData]);

    useEffect(() => {
        if (nameResponseData) {
            const newDataChunk: CSVDataList = JSON.parse(nameResponseData);
            const chunkId = newDataChunk.id ?? 0;

            const chunkSize = newDataChunk.data.length;
            const startIndex = chunkId * chunkSize;

            console.log(`Processing chunk ${chunkId} (records ${startIndex} to ${startIndex + chunkSize - 1})`);
            if (!newDataChunk.loadingData) {
                setProcessedData(processedData + chunkSize);
            }
            setRecordData(prevData => {
                const updatedData = [...prevData];

                newDataChunk.data.forEach((item, index) => {
                    const arrayIndex = startIndex + index;

                    if (arrayIndex >= updatedData.length) return;

                    updatedData[arrayIndex] = {
                        keyValuePairs: {
                            ...updatedData[arrayIndex].keyValuePairs,
                        }
                    };
                    if (responseFields.includes('full_name')) {
                        updatedData[arrayIndex].keyValuePairs['FullName'] = item.keyValuePairs['full_name'] || '';
                    }
                    if (responseFields.includes('initials')) {
                        updatedData[arrayIndex].keyValuePairs['initials'] = item.keyValuePairs['initials'] || '';
                    }
                });

                setTimeout(() => {
                    clearEventData(SocketReceiveEvents.nameAPIResponse);
                }, 500);
                return updatedData;
            });
        }
    }, [nameResponseData, clearEventData]);

    useEffect(() => {
        if (linkedInResponseData) {
            const newDataChunk: CSVDataList = JSON.parse(linkedInResponseData);

            const chunkId = newDataChunk.id ?? 0;
            const chunkSize = newDataChunk.data.length;
            const startIndex = chunkId * chunkSize;

            setRecordData(prevData => {
                const updatedData = [...prevData];

                newDataChunk.data.forEach((item, index) => {
                    const arrayIndex = startIndex + index;

                    if (arrayIndex >= updatedData.length) return;

                    updatedData[arrayIndex] = {
                        keyValuePairs: {
                            ...updatedData[arrayIndex].keyValuePairs,
                            'owner_name': item.keyValuePairs.owner_name,
                            'owner_linkedin': item.keyValuePairs.owner_linkedin,
                            'founder_name': item.keyValuePairs.founder_name,
                            'founder_linkedin': item.keyValuePairs.founder_linkedin,
                            'ceo_name': item.keyValuePairs.ceo_name,
                            'ceo_linkedin': item.keyValuePairs.ceo_linkedin,
                            'president_name': item.keyValuePairs.president_name,
                            'president_linkedin': item.keyValuePairs.president_linkedin,
                        }
                    };
                });

                setTimeout(() => {
                    clearEventData(SocketReceiveEvents.nameAPIResponse);
                }, 500);
                return updatedData;
            });
        }
    }, [linkedInResponseData, clearEventData]);

    const handleRunApi = (
        apiId: string,
        params: Record<string, string>, //{first_name: 'First Name', last_name: 'Last Name'}
        responseFields: string[]
    ) => {
        if (responseFields.length == 0) {
            console.log('select at least one response');
            return;
        }
        console.log('responseFields ' + responseFields);
        setResponseFields(responseFields);
        const provider = apiProviders.find((t) => t.id == apiId);
        if (!provider) return;

        const requestData: RecordData[] = recordData.map((record) => {
            const keyValuePairs: Record<string, string> = {};

            Object.entries(params).forEach(([newKey, oldKey]) => {
                if (record.keyValuePairs[oldKey] !== undefined) {
                    keyValuePairs[newKey] = record.keyValuePairs[oldKey];
                }
            });

            return { keyValuePairs };
        });
        setProcessedData(0);
        console.log("runNameAPI uploadId ", uploadId);
        if (provider.id == APIProviderIds.nameAPI) {
            socketService.runNameAPI(requestData, responseFields, uploadId);
        }
        else if (provider.id == APIProviderIds.linkedinAPI) {
            socketService.runLinkedInAPI(requestData, responseFields, uploadId);
        }
    };

    return (
        <main className="container mx-auto py-8">
            <div className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'mr-64' : 'mr-0'}`}>
                <div className="mb-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Data Table</h1>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={toggleSidebar}
                    >
                        {sidebarOpen ? 'Hide API Panel' : 'Show API Panel'}
                    </button>
                </div>
            </div>

            {isLoading && (
                <div className="text-black px-2 py-1 text-xs inline-block mb-2">
                    Loading chunks...
                </div>
            )}

            {!isLoading && (<DataTable recordData={recordData} />)}
            <ProgressIndicator processed={processedData} total={recordData.length} />

            <ApiSidebar
                isOpen={sidebarOpen}
                availableApis={apiProviders}
                tableColumns={columns}
                onClose={toggleSidebar}
                onRunApi={handleRunApi}
            />
        </main >
    );
}