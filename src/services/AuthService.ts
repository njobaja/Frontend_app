import axios from 'axios';
import { authStore } from '../stores/authStore';

export default class AuthService {

    public static logout() {
        authStore.dispatch('clearToken');
    }

    public static async authenticate(username: string, password: string): Promise<{ success: boolean, responseData: any }> {
        try {
            const authResponse = await axios.post('https://internship2022-auth-api.mss.ba/api/User/authenticate', {
                username,
                password
            });
            
            authStore.dispatch('setToken', authResponse.data.token);
            return { success: true, responseData: authResponse.data };
        } catch (ex: any) {
            return { success: false, responseData: { message: ex.response?.data } };
        }
    }
}