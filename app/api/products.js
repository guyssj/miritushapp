import { useQuery } from 'react-query';
import api from './api';

export const productsQuery = {
    /**
     * Get all products
     */
    useGetProducts() {
        return useQuery("products", async () => await products.getAll())
    }
}

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