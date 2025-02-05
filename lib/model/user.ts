export interface User {
    id: number;
    email: string;
    name?: string;
    password_hash: string;
    auth_token?: string;
    access_token?: string;
    refresh_token?: string;
    joined_timeStamp: Date;
}
