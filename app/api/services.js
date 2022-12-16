import api from './api';


const services = {
    getAll: async () => {
        const url = `/services`;
        console.log(url);
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {

            console.log('error: ', error.toJSON())
        }
    }
}

export default services;