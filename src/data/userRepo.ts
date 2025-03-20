'use client'
import ApiEndpoints from "@/config/apiEndpoints";
import { IUser } from "@/models/user";
import { UserResource } from '@clerk/types';

class UserRepo {
    private storageKey = "userRepo";

    public user: IUser | null;

    constructor(user: IUser | null) {
        this.user = user
    }

    private loadFromLocalStorage() {
        if (typeof window === "undefined") return;
        const storedData = localStorage.getItem(this.storageKey);
        if (storedData) {
            this.user = JSON.parse(storedData);
        }
    }

    private saveToLocalStorage(data: IUser) {
        if (typeof window === "undefined") return;
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        this.user = data;
    }

    saveUser = async (clerkUser: UserResource): Promise<IUser | null> => {
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
            this.saveToLocalStorage(data);
            return data;
        } catch (error) {
            console.log("Error fetching user:", error);
            return null;
        }
    }

    fetchUser = async (clerkId: string): Promise<IUser | null> => {
        this.loadFromLocalStorage();
        if (this.user) {
            return this.user;
        }
        try {
            const res = await fetch(`${ApiEndpoints.BASE_URL}/api/user?id=${clerkId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error("Failed to fetch user");
            const data: IUser = await res.json();
            this.saveToLocalStorage(data);
            return data;
        } catch (error) {
            console.log("Error fetching user:", error);
            return null;
        }
    }

}

const userRepo = new UserRepo(null);
export default userRepo;