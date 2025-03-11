"use client"
import { useSocketStore } from '@/hooks/useSocketService';
import { SocketReceiveEvents } from '@/services/socket/socketEvents';
import { socketService } from '@/services/socket/socketService';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ProgressBar from './progress_bar';

export default function FileUpload() {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState<File>();
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const progressData = useSocketStore((state) => state.eventData[SocketReceiveEvents.uploadProgress]);
    const router = useRouter();
    const uploadCompleteData = useSocketStore((state) => state.eventData[SocketReceiveEvents.uploadComplete]);
    const setEventData = useSocketStore((state) => state.setEventData);

    useEffect(() => {
        if (uploadCompleteData) {
            console.log("Navigating to /data ");
            setEventData(SocketReceiveEvents.uploadComplete, null);
            router.push("/data");
        }
    }, [uploadCompleteData]);

    useEffect(() => {
        socketService.onConnectionChange((connected) => {
            setIsSocketConnected(connected);
        });
    },);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFile(droppedFiles[0]);
    }, []);

    const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);
        setIsUploading(true);
        try {
            if (!isSocketConnected) {
                throw new Error('Socket not connected');
            }
            await socketService.sendFile(selectedFiles[0]);
            setFile(selectedFiles[0]);
        } catch (error) {
            setIsUploading(false);
            console.error('Error sending file:', error);
        }
    }, [isSocketConnected]);

    if (isUploading && progressData) {
        return (
            <div className="space-y-4">
                <ProgressBar progress={progressData.progress} received={progressData.receivedSize} totalSize={file?.size ?? 0} />
            </div>
        );
    }

    return (
        <div className=" max-w-2xl p-6">
            <label
                className={`
                relative flex flex-col items-center justify-center flex-1 h-64
                border-2 border-dashed rounded-lg cursor-pointer
                transition-colors duration-200 px-8 py-0
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}
              `}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={handleFileSelect}
                />
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload
                        className={`w-12 h-12 mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
                    />
                    <p className={`mb-2 text-sm ${isDragging ? 'text-blue-500' : 'text-gray-500'}`}>
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className={`text-xs ${isDragging ? 'text-blue-400' : 'text-gray-400'}`}>
                        All file types supported
                    </p>
                </div>
            </label>
        </div>
    );
}