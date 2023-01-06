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
    cancelBook: async (id) => {
        console.log("ID", id)
        const url = `/calendar/book/${id}`;
        try {
            const response = await api.delete(url);
            return response.data;
        } catch (error) {
            throw error;

        }
    }
}

export default calendar;