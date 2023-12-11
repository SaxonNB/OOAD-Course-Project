import axios from 'axios';
import { ADMIN_USER_TOKEN, USER_TOKEN, BASE_URL } from '@/store/constants';

const service = axios.create({
    baseURL: BASE_URL + '',
    timeout: 15000,
});

// axios实例拦截请求
service.interceptors.request.use(
    (config) => {
        config.headers.ADMINTOKEN = localStorage.getItem(ADMIN_USER_TOKEN);
        config.headers.TOKEN = localStorage.getItem(USER_TOKEN);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// axios实例拦截响应
service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            if (response.data.code === 0 || response.data.code === 200) {
                return response;
            } else {
                return Promise.reject(response.data);
            }
        } else {
            return Promise.reject(response.data);
        }
    },
    // 请求失败
    (error) => {
        console.log(error.response.status);
        if (error.response.status === 404) {
            // todo
        } else if (error.response.status === 403) {
            // todo
        }
        return Promise.reject(error);
    },
);

const request = (config) => {
    const conf = config;
    return new Promise((resolve, reject) => {
        service
            .request(conf)
            .then((res) => {
                const data = res.data;
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export function get(config) {
    return request({ ...config, method: 'GET' });
}

export function post(config) {
    return request({ ...config, method: 'POST' });
}

export default request;
