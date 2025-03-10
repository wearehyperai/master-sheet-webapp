
class ApiEndpoints {
    static readonly SERVER_URL = 'http://127.0.0.1:8686';
    static readonly CREATE_USER = `${this.SERVER_URL}/users`;
    static readonly BASE_URL = 'http://localhost:3000';
    static readonly API_KEY = '1234567890';
    static readonly GET_USER_BY_ID = (id: string) => `${this.SERVER_URL}/users/${id}`;
    static readonly UPDATE_USER = (id: string) => `${this.SERVER_URL}/users/${id}`;
    static readonly DELETE_USER = (id: string) => `${this.SERVER_URL}/users/${id}`;
}

export default ApiEndpoints;

