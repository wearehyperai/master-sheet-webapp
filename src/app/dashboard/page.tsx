
'use client';
import FileUpload from "@/components/file_upload_component";
import StartWithBlank from "@/components/start_with_blank";
import UserHeader from "@/components/user_header";
import { IUser } from "@/models/user";
import { IUserUploads } from "@/models/user_uploads";
import { socketService } from "@/services/socket/socketService";
import { fetchUser, fetchUserUploads, saveUser } from "@/services/userService";
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

    useEffect(() => {
        if (isLoaded && user) {
            console.log('User data has been loaded:', user);
            if (searchParams?.get("from") === "onboarding") {
                saveUser(user).then(userData => {
                    if (userData) {
                        console.log('User data saved:', userData._id);
                        socketService.connectToServer(userData._id);
                        setUser(userData);
                    }
                });
            }
            else {
                fetchUser(user.id).then(userData => {
                    if (userData) {
                        console.log('User data fetched:', userData._id);
                        socketService.connectToServer(userData._id);
                        setUser(userData);
                    }

                });
            }
        }
    }, [isLoaded, user, searchParams]);

    useEffect(() => {
        if (dbuser && !uploadFetched) {
            fetchUserUploads(dbuser._id).then((uploads) => {
                console.log("User uploads: ", JSON.stringify(uploads));
                if (uploads) {
                    setUserUploads(uploads);
                }
                setUploadFetched(true);
            });
        }
    }, [uploadFetched, dbuser]);

    return (
        <SignedIn>
            <div className="flex flex-col h-screen w-full">
                <UserHeader />
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <FileUpload />
                    {userUploads.length > 0 && <Card uploads={userUploads} onClickCard={function (index: number): void {
                        router.push(`/data?file=${userUploads[index].fileName}`,);
                    }} />}
                    <StartWithBlank />
                </div>
            </div>
        </SignedIn>
    );
}
