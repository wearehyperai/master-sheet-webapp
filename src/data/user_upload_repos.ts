'use client'
import ApiEndpoints from "@/config/api_endpoints";
import { IUserUploads } from "@/models/user_uploads";

class UserUploadsRepository {
    public userUploads: IUserUploads[];
    private storageKey = "userUploads";

    constructor(userUploads: IUserUploads[]) {
        this.userUploads = userUploads
        this.loadFromLocalStorage();
    }

    private loadFromLocalStorage() {
        if (typeof window === "undefined") return;
        const storedData = localStorage.getItem(this.storageKey);
        if (storedData) {
            this.userUploads = JSON.parse(storedData);
        }
    }

    private saveToLocalStorage(data: IUserUploads[]) {
        if (typeof window === "undefined") return;
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        this.userUploads = data;
    }

    public fetchUserUploads = async (id: string, fetchUpdated: boolean = false): Promise<IUserUploads[]> => {
        this.loadFromLocalStorage();
        if (this.userUploads.length > 0 && !fetchUpdated) {
            return this.userUploads;
        }
        try {
            const res = await fetch(`${ApiEndpoints.BASE_URL}/api/user_uploads?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) throw new Error("Failed to fetch user");
            const data: IUserUploads[] = await res.json();
            this.saveToLocalStorage(data);
            return data;
        } catch (error) {
            console.log("Error fetching user:", error);
            return [];
        }
    }
}
const userUploadsRepository = new UserUploadsRepository([]);
export default userUploadsRepository;