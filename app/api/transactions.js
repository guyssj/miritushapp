import { useMutation, useQuery } from 'react-query';
import api from './api';

export const transactionsQuery = {
    useSaveTransactionItems() {
        return useMutation(items => {
            return transactions.saveItems(items);
        })
    },
    useGetAllCustomers() {
        return useQuery("products", () => products.getAll())
    },

    useSaveTransaction() {
        return useMutation(transaction => {
            return transactions.save(transaction)
        })
    }
}

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