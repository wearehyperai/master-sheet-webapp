
class ApiEndpoints {
    static readonly SERVER_URL = 'http://82.180.147.105:8567';
    static readonly CREATE_USER = `${this.SERVER_URL}/users`;
    static readonly BASE_URL = 'https://master-sheet-webapp.vercel.app';
    static readonly API_KEY = '1234567890';
    static readonly GET_USER_BY_ID = (id: string) => `${this.SERVER_URL}/users/${id}`;
    static readonly UPDATE_USER = (id: string) => `${this.SERVER_URL}/users/${id}`;
    static readonly DELETE_USER = (id: string) => `${this.SERVER_URL}/users/${id}`;
    static readonly GET_USER_UPLOADS = (id: string) => `${this.SERVER_URL}/user_uploads/${id}`;
}

export default ApiEndpoints;

