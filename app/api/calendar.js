import api from './api';


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