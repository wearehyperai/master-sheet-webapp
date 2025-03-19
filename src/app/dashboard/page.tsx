
'use client';
import FileUpload from "@/components/file_upload_component";
import StartWithBlank from "@/components/start_with_blank";
import UserHeader from "@/components/user_header";
import userRepo from "@/data/user_repo";
import userUploadsRepository from "@/data/user_upload_repos";
import { useSocketStore } from "@/hooks/useSocketService";
import { IUser } from "@/models/user";
import { IUserUploads } from "@/models/user_uploads";
import { SocketReceiveEvents } from "@/services/socket/socketEvents";
import { socketService } from "@/services/socket/socketService";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Card from "./components/card_components";

export default function Dashboard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isLoaded, user } = useUser();
    const [dbuser, setUser] = useState<IUser | null>(null);
    const [userUploads, setUserUploads] = useState<IUserUploads[]>([]);
    const [uploadFetched, setUploadFetched] = useState<boolean>(false);
    const progressData = useSocketStore((state) => state.eventData[SocketReceiveEvents.uploadProgress]);
    const [isUploading, setIsUploading] = useState(false);


    useEffect(() => {
        if (isLoaded && user) {
            console.log('User data has been loaded:', user);
            if (searchParams?.get("from") === "onboarding") {
                userRepo.saveUser(user).then(userData => {
                    if (userData) {
                        // console.log('User data saved:', userData._id);
                        socketService.connectToServer(userData._id);
                        setUser(userData);
                    }
                });
            }
            else {
                userRepo.fetchUser(user.id).then(userData => {
                    if (userData) {
                        // console.log('User data fetched:', userRepo.user == null);
                        socketService.connectToServer(userData._id);
                        setUser(userData);
                    }
                });
            }
        }
    }, [isLoaded, user, searchParams]);

    useEffect(() => {
        if (dbuser == null || uploadFetched)
            return;
        userUploadsRepository.fetchUserUploads(dbuser._id).then((uploads) => {
            if (uploads) {
                // console.log("User uploads: ", JSON.stringify(uploads));
                setUserUploads(uploads);
            }
            setUploadFetched(true);
        });
    }, [uploadFetched, dbuser]);

    return (
        <SignedIn>
            <div className="flex flex-col h-screen w-full">
                <UserHeader />
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <FileUpload userId={dbuser?._id ?? ''} isUploading={isUploading} setIsUploading={setIsUploading} progressData={progressData} />
                    {userUploads.length > 0 && !isUploading && <Card uploads={userUploads} onClickCard={function (index: number): void {
                        router.push(`/data?id=${userUploads[index]._id}`,);
                    }} />}
                    {!isUploading && (<StartWithBlank />)}
                </div>
            </div>
        </SignedIn>
    );
}