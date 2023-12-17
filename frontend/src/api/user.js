import axios from 'axios';

const URL = {
    adminLogin: 'http://localhost:8082/user/adminlogin',
    userLogin: 'http://localhost:8082/user/userlogin',
    userRegister: '/user/userRegister',
};

const adminLoginApi = async (data) => {
    return axios.post(URL.adminLogin, data, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
    });
};


const userLoginApi = (data) => {
    return axios.post(URL.userLogin, data, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
    });
};

const userRegisterApi = (data) => {
    return axios.post(URL.userRegister, data, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
    });
};

export {
    adminLoginApi,
    userLoginApi,
    userRegisterApi
};
