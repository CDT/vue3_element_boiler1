import axios from 'axios'
import store from '../store'
import router from '../router'

const service = axios.create({
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        if (localStorage.getItem('access_token')) {
            config.headers['x-access-token'] = localStorage.getItem('access_token')
        }
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data
        } else {
            Promise.reject(error)
        }
    },
    error => {
        console.error(error)
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token')
            router.push('/login')
        }
        return Promise.reject(error)
    }
);

export default service;
