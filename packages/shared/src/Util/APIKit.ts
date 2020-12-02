import axios from 'axios';

const APIKit = axios.create({
    baseURL: 'http://localhost:8083/api',
    timeout: 5000,
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = token => {
    APIKit.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
    localStorage.setItem('token', token)
};

export const clearClientToken = () => {
    APIKit.interceptors.request.use(function (config) {
        config.headers.Authorization = null;
        return config;
    });
    localStorage.removeItem('token')
}

export default APIKit;