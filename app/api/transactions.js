import api from './api';


const transactions = {
    getAll: async () => {
        const url = `/transaction`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {

            throw error;
        }
    },
    saveItems: async (transactions) => {
        const url = `/transaction/items`;
        try {
            const response = await api.post(url, transactions);
            return response.data;
        } catch (error) {

            throw error;
        }
    },
    save: async (payload) => {
        const url = `/transaction`;

        const payloadSend = payload
        try {
            const response = await api.post(url, payloadSend);
            return response.data;
        } catch (error) {

            throw error;
        }
    }
}

export default transactions;