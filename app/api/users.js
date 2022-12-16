import api from './api';


const users = {
    login: async (username, password) => {
        const url = `authenticate/login`;
        console.log(url);

        const payload = {
            grant_type: "password",
            username: username,
            password: password,
        }
        try {
            const response = await api.post(url, payload);
            return response.data;
        } catch (error) {
            console.log('error: ', error.toJSON())
        }
    }
}

export default users;