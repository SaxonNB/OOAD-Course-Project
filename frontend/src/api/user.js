import axios from 'axios';

const URL = {
    adminLogin: 'http://localhost:8082/user/adminlogin',
    userLogin: 'http://localhost:8082/user/userlogin',
    userRegister: 'http://localhost:8082/user/userRegister',
    getAllBuildings: 'http://localhost:8082/building/buildingCover',
    getBusRoute: 'http://localhost:8082/route/planRoute'
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

const getAllBuildings = () => {
    return axios.get(URL.getAllBuildings,{
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
    });
}

// const getBusRoute = (data) => {
//     return axios.get(URL.getAllBuildings,{
//         headers: { 'Content-Type': 'application/json;charset=utf-8' }
//     });
// }

export {
    adminLoginApi,
    userLoginApi,
    userRegisterApi,
    getAllBuildings,
};
