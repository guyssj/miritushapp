import { useMutation } from 'react-query';
import api from './api';

export const usersQuery = {
    useLogin() {
        return useMutation(payload => {
            return users.login(payload)
        })
    }
}

const users = {
    login: async (userData) => {
        const url = `authenticate/login`;
        console.log(url);
        const payload = {
            grant_type: "password",
            username: userData.userName,
            password: userData.password,
        }
        try {
            const response = await api.post(url, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    userinfo: async () => {
        const url = `my/details`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default users;