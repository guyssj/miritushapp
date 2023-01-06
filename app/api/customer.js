import api from './api';


const customers = {
    getTransactions: async (id) => {
        const url = `/customer/${id}/transactions`;
        console.log(url);
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {

            console.log('error: ', error.toJSON())
        }
    }
}

export default customers;