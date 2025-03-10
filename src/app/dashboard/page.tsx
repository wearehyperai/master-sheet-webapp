
'use client';
import FileUpload from "@/components/file_upload_component";
import ApiEndpoints from "@/config/api_endpoints";
import { IUser } from "@/models/user";
import { socketService } from "@/services/socket/socketService";
import { SignedIn, useUser } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

async function saveUser(clerkUser: UserResource): Promise<IUser | null> {
    try {
        const user: IUser = {
            _id: "",
            clerkId: clerkUser.id ?? "",
            username: clerkUser.username,
            has_image: clerkUser.hasImage,
            profile_image_url: clerkUser.imageUrl,
            email: clerkUser.emailAddresses[0].emailAddress,
            phone_number: clerkUser.phoneNumbers[0].phoneNumber,
            first_name: clerkUser.firstName ?? "",
            last_name: clerkUser.lastName ?? ""
        }
        const res = await fetch(ApiEndpoints.BASE_URL + "/api/user", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching user:", error);
        return null;
    }
}

async function fetchUser(clerkId: string): Promise<IUser | null> {
    try {
        const res = await fetch(`${ApiEndpoints.BASE_URL}/api/user/${clerkId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data: IUser = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching user:", error);
        return null;
    }
}

export default function Dashboard() {
    const searchParams = useSearchParams();
    const { isLoaded, user } = useUser();

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
    }, [isLoaded, user]);

    const [dbuser, setUser] = useState<IUser | null>(null);

    return (
        <SignedIn>
            <FileUpload />
        </SignedIn>
    );
}
