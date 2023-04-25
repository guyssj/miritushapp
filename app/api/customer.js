import api from './api';


const customers = {
    getTransactions: async (id) => {
        const url = `/customer/${id}/transactions`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getFutureBooks: async (id) => {
        const url = `/customer/${id}/futurebooks`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getTimeline: async (id) => {
        const url = `/customer/${id}/timeline`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAll: async () => {
        const url = `/customer`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    get: async (customerId) => {
        const url = `/customer/${customerId}`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    save: async (customer) => {
        const url = `/customer`;
        try {
            const response = await api.post(url, customer);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default customers;