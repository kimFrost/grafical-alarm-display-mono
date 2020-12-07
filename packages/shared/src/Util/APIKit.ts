import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class APIKit {
    private instance: AxiosInstance
    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
    }
    public get(url: string, config?: AxiosRequestConfig) {
        return this.instance.get(url, config)
    }
    public post(url: string, data?: any, config?: AxiosRequestConfig) {
        return this.instance.post(url, data, config)
    }
    public delete(url: string, config?: AxiosRequestConfig) {
        return this.instance.delete(url, config)
    }
    public setClientToken(token: string) {
        this.instance.interceptors.request.use(function (config) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        });
        localStorage.setItem('token', token)
    }
    public clearClientToken() {
        this.instance.interceptors.request.use(function (config) {
            config.headers.Authorization = null;
            return config;
        });
        localStorage.removeItem('token')
    }
}

export default APIKit;