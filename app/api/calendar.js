import { useMutation, useQuery } from 'react-query';
import api from './api';

export const calendarQuery = {
    /**
     * Get all close days
     */
    useGetAllCloseDays(onSuccess = null) {
        return useQuery("close-days", async () => await calendar.getAllCloseDays(), {
            onSuccess: onSuccess
        })
    },
    useDeleteCloseDay() {
        return useMutation(id => {
            return calendar.deleteCloseDay(id)
        })
    },
    useSaveCloseDay() {
        return useMutation(closeDay => {
            return calendar.saveCloseDay(closeDay)
        })
    },
    useCancelBook() {
        return useMutation(bookId => {
            return calendar.cancelBook(bookId)
        })
    },
    useGetAllEvents(onSuccess) {
        return useQuery("events", async () => await calendar.getAll(), {
            onSuccess: onSuccess
        })
    },
    useGetAllLockHours(onSuccess) {
        return useQuery("lockHours", async () => await calendar.getAllLockHours(), {
            onSuccess: onSuccess
        })
    },
    useGetTransactionByBook(bookId, onError) {
        return useQuery(['transaction', bookId], async () => await calendar.getTransactionByBook(bookId), {
            onError: onError
        })
    }
}

const calendar = {
    getAll: async () => {
        const url = `/calendar/book`;
        try {
            const response = await api.get(url);
            return response.data.map(item => {
                return {
                    title: item.title,
                    start: new Date(item.start),
                    customer: item.customer,
                    end: new Date(item.end),
                    color: item.customer.color,
                    meta: item.meta,
                    serviceType: item.serviceType
                }
            })
            //return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllLockHours: async () => {
        const url = `/lockhours`;
        try {
            const response = await api.get(url);
            return response.data.map(item => {
                return {
                    title: item.title,
                    start: new Date(item.startTime),
                    end: new Date(item.endTime),
                    meta: item.meta
                }
            })
            //return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllCloseDays: async () => {
        const url = `/calendar/closedays`;
        try {
            const response = await api.get(url);
            return response.data;
            //return response.data;
        } catch (error) {
            throw error;
        }
    },
    getTransactionByBook: async (bookId) => {
        const url = `calendar/book/${bookId}/transaction`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    cancelBook: async (id) => {
        const url = `/calendar/book/${id}`;
        try {
            const response = await api.delete(url);
            return response.data;
        } catch (error) {
            throw error;

        }
    },
    deleteCloseDay: async (id) => {
        const url = `/calendar/closeDays/${id}`;
        try {
            const response = await api.delete(url);
            return response.data;
        } catch (error) {
            throw error;

        }
    },
    saveCloseDay: async (closeday) => {
        const url = `/calendar/closeDays`;
        try {
            const response = await api.post(url, closeday);
            return response.data;
        } catch (error) {
            throw error;

        }
    }
}

export default calendar;