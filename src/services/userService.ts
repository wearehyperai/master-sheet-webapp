import ApiEndpoints from '@/config/apiEndpoints';
import { IUser } from '@/models/user';
import { IUserUploads } from '@/models/user_uploads';
import { UserResource } from '@clerk/types';

export async function saveUser(clerkUser: UserResource): Promise<IUser | null> {
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

export async function fetchUser(clerkId: string): Promise<IUser | null> {
    try {
        const res = await fetch(`${ApiEndpoints.BASE_URL}/api/user?id=${clerkId}`, {
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

export async function fetchUserUploads(id: string): Promise<IUserUploads[] | null> {
    try {
        const res = await fetch(`${ApiEndpoints.BASE_URL}/api/user_uploads?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data: IUserUploads[] = await res.json();
        return data;
    } catch (error) {
        console.log("Error fetching user:", error);
        return null;
    }
}