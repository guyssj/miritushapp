import api from './api';


const calendar = {
    getAll: async () => {
        const url = `/calendar/book`;
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {

            console.log('error: ', error.toJSON())
        }
    }
}

export default calendar;