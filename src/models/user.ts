export interface IUser {
    _id: string;
    clerkId: string;
    username: string | null;
    has_image: boolean;
    profile_image_url: string;
    email: string;
    phone_number: string;
    first_name?: string;
    last_name?: string;
    joined_timeStamp?: Date;
}