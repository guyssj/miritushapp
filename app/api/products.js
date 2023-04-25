import api from './api';


const products = {
    getAll: async () => {
        const url = `/product`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default products;