import { useQuery } from 'react-query';
import api from './api';

export const serviceTypesQuery = {
    useGetAllServiceTypes(onSuccess, enabled) {
        return useQuery(['serviceTypes'], async () => await serviceTypes.getAll(), {
            onSuccess: onSuccess,
            enabled: enabled
        })
    }
}

const serviceTypes = {
    getAll: async () => {
        const url = `/servicetypes`;
        console.log(url);
        try {
            const response = await api.get(url);
            return response.data;
        } catch (error) {

            throw error;
        }
    }
}

export default serviceTypes;