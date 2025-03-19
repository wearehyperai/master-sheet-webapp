import { SocketReceiveEvents } from "@/services/socket/socketEvents";
import { socketService } from "@/services/socket/socketService";
import { create } from "zustand";

interface SocketState {
    clearEventData: (event: SocketReceiveEvents,) => void;
    eventData: Record<SocketReceiveEvents, string>;
    setEventData: (event: SocketReceiveEvents, data: string) => void;
}

export const useSocketStore = create<SocketState>((set) => ({
    eventData: {} as Record<SocketReceiveEvents, string>,
    clearEventData: (event) =>
        set((state) => {
            const newEventData = { ...state.eventData };
            delete newEventData[event];
            return { eventData: newEventData };
        }),
    setEventData: (event, data) =>
        set((state) => ({
            eventData: { ...state.eventData, [event]: data },
        })),
}));

Object.values(SocketReceiveEvents).forEach((event) => {
    socketService.on(event, (data) => {
        useSocketStore.setState((state) => ({
            eventData: { ...state.eventData, [event]: data },
        }));
    });
});
