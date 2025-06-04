import { useMutation, useQuery } from 'react-query';
import api from './api';

export const customerQuery = {
    useCreateCustomer() {
        return useMutation(customer => {
            return customers.save(customer)
        })
    },
    useGetAllCustomers() {
        return useQuery("customers", async () => await customers.getAll())
    },
    useGetCustomer(customerId) {
        return useQuery(['customer', customerId], async () => await customers.get(customerId))
    },
    useGetCustomerFutureBooks(customerId, onSuccess, enabled) {
        return useQuery(['futureBooks', customerId], async () => await customers.getFutureBooks(customerId), {
            onSuccess: onSuccess,
            enabled: enabled
        })
    },
    useGetCustomerTimeline(customerId) {
        return useQuery(['timeline', customerId], () => customers.getTimeline(customerId))
    },
    useGetCustomerTransactions(customerId) {
        return useQuery(["getTransactionsId", customerId], async () => await customers.getTransactions(customerId))
    }
}

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