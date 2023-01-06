import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const httpClient = axios.create({
    baseURL: 'http://localhost:5000/api/v1'
});


httpClient.interceptors.request.use(request => {
    console.log('\u001b[' + 32 + 'm' + 'Starting Request : ' + '\u001b[0m');
    console.log(request)
    // console.log(request.url)
    // console.log(request.data)
    console.log('\u001b[' + 32 + 'm' + '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + '\u001b[0m');
    console.log(' ');
    return request;
})

httpClient.interceptors.response.use(response => {
    console.log('\u001b[' + 32 + 'm' + 'Response : ' + '\u001b[0m');
    // console.log(response)
    console.log(response.status)
    console.log(response.data)
    console.log('\u001b[' + 32 + 'm' + '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~' + '\u001b[0m');
    console.log(' ');
    return response;
})
const getConfig = async (headers) => {
    const config = {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        // cancelToken: source.token
    }
    var token = await AsyncStorage.getItem('accessToken');

    //set token in authorization header
    if (token) config.headers.authorization = `Bearer ${token}`;
    return config;
}


const api = {
    get: async (url, headers) => {
        var config = await getConfig(headers);
        try {

            const response = await httpClient.get(url, config)
            return response;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }

            console.log(error?.response?.status)
            throw error.response;
        }
    },
    post: async (url, payload, headers) => {
        var config = await getConfig(headers);
        const response = await httpClient.post(url, payload, config);
        return response;
    },
    delete: async (url, headers) => {
        var config = await getConfig(headers);
        const response = await httpClient.delete(url, config);
        return response;
    },
}

export default api;