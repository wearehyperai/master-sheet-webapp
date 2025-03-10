import { serverURL } from '@/config/constants';
import { RecordData } from '@/models/csv_data';
import EventEmitter from 'events';
import { io, Socket } from 'socket.io-client';
import { SocketReceiveEvents, SocketSendEvents } from './socketEvents';

const CHUNK_SIZE = 64 * 1024; // 64KB

export class WebSocketService extends EventEmitter {
    private socket: Socket | null = null;
    private isConnected: boolean = false;
    private static instance: WebSocketService | null = null;
    private connectionCallbacks: Set<(connected: boolean) => void> = new Set();

    public chunks: string = '';

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    public onConnectionChange(callback: (connected: boolean) => void) {
        this.connectionCallbacks.add(callback);
        callback(this.isConnected);
        return () => this.connectionCallbacks.delete(callback);
    }

    private updateConnectionState(connected: boolean) {
        this.isConnected = connected;
        this.connectionCallbacks.forEach(cb => cb(connected));
    }

    public connectToServer(userId: string) {
        if (this.socket) return;
        console.log('Connecting to server ' + userId);
        this.socket = io(serverURL, {
            autoConnect: true,
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 5000,
            timeout: 1200000,
            query: {
                userId: userId,
            },
        });

        this.socket.on('connect', () => {
            console.log('Socket connected:', this.socket?.id);
            this.updateConnectionState(true);
        });

        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
            this.updateConnectionState(false);
        });


        this.socket.on("error", (error) => {
            this.updateConnectionState(false);
            console.log("Error from WebSocket server " + error);
        });

        this.socket.on("connect_error", (error) => {
            console.log("connect_error  " + error.message);
        });

        this.socket.on(SocketReceiveEvents.userData, (data) => {
            console.log(`SocketReceiveEvents.userData : ${data}`);
            this.emit(SocketReceiveEvents.userData, data);
        });

        this.socket.on(SocketReceiveEvents.uploadProgress, (data) => {
            this.emit(SocketReceiveEvents.uploadProgress, data);
        });

        this.socket.on(SocketReceiveEvents.uploadComplete, (data) => {
            console.log(`SocketReceiveEvents.uploadComplete : ${data}`);
            this.emit(SocketReceiveEvents.uploadComplete, data);
        });

        this.socket.on(SocketReceiveEvents.uploadFailed, (data) => {
            console.log(`SocketReceiveEvents.uploadFailed : ${data}`);
            this.emit(SocketReceiveEvents.uploadFailed, data);
        });

        this.socket.on(SocketReceiveEvents.parsedData, (data) => {
            this.chunks += data;
            this.emit(SocketReceiveEvents.parsedData, true);
        });

        this.socket.on(SocketReceiveEvents.parsedDataCompleted, (data) => {
            this.emit(SocketReceiveEvents.parsedData, false);
            if (data == null || data == undefined) {
                console.log(`parsedDataCompleted : ${this.chunks.length}`);
                this.emit(SocketReceiveEvents.parsedDataCompleted, this.chunks);
            }
            else {
                this.emit(SocketReceiveEvents.parsedDataCompleted, data);
            }
        });

        this.socket.on(SocketReceiveEvents.nameAPIResponse, (data) => {
            console.log(`SocketReceiveEvents.nameAPIResponse : ${data}`);
            this.emit(SocketReceiveEvents.nameAPIResponse, data);
        });

        this.socket.on(SocketReceiveEvents.linkedInResponse, (data) => {
            console.log(`SocketReceiveEvents.linkedInResponse : ${data}`);
            this.emit(SocketReceiveEvents.linkedInResponse, data);
        });
    }


    public async sendFile(file: File) {
        if (!this.isConnected || !this.socket) {
            throw new Error('Socket not connected');
        }
        const reader = file.stream().getReader();
        let offset = 0;
        console.log(`send : ${file.size}`);

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            if (value.length > CHUNK_SIZE) {
                let start = 0;
                while (start < value.length) {
                    const end = (start + CHUNK_SIZE) > value.length ? value.length : start + CHUNK_SIZE;
                    const sliced = value.slice(start, end);

                    this.socket!.emit(SocketSendEvents.uploadFile, {
                        'fileName': file.name,
                        'chunk': sliced,
                        'totalSize': file.size,
                        'receivedSize': offset + value.length,
                    });
                    start += CHUNK_SIZE;
                }
            }
            else {
                this.socket!.emit(SocketSendEvents.uploadFile, {
                    'fileName': file.name,
                    'chunk': value,
                    'totalSize': file.size,
                    'receivedSize': offset + value.length,
                });
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
            offset += value.length;
        }

        this.socket.emit(SocketSendEvents.uploadComplete, { 'fileName': file.name });
    }

    public async runNameAPI(recordData: RecordData[], responseFields: string[]) {
        if (!this.isConnected || !this.socket) {
            throw new Error('Socket not connected');
        }
        this.socket.emit(SocketSendEvents.nameAPICall, [recordData, responseFields]);
    }

    public async runLinkedInAPI(recordData: RecordData[], responseFields: string[]) {
        if (!this.isConnected || !this.socket) {
            throw new Error('Socket not connected');
        }
        this.socket.emit(SocketSendEvents.linkedInSearchAPICall, [recordData, responseFields]);
    }
}

export const socketService = WebSocketService.getInstance();