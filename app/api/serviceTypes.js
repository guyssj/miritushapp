import api from './api';


const serviceTypes = {
    getAll: async () => {
        const url = `/servicetypes`;
        console.log(url);
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {

            throw error;
        }
    }
}

export default serviceTypes;