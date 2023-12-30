import axios from 'axios';

const URL = {
    adminLogin: 'http://localhost:8082/user/adminlogin',
    userLogin: 'http://localhost:8082/user/userlogin',
    userRegister: 'http://localhost:8082/user/register',
    getAllBuildings: 'http://localhost:8082/building/buildingCover',
    getBusRoute: 'http://localhost:8082/route/planRoute',
    getBuildingDetail: 'http://localhost:8082/building/',
    getBuildingComment: 'http://localhost:8082/comment/building/',
    sendComment: 'http://localhost:8082/comment/add'
};

const sendCommentApi = async (data) => {
    return axios.post(URL.sendComment, data, {
        headers: { 'Content-Type': 'application/json;charset=utf-8'
            ,'token': `${localStorage.getItem('user_token')}`}
    });
};

const getBuildingCommentApi = async (buildingId) => {
    return axios.get(URL.getBuildingComment+buildingId, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' }
    });
};

const adminLoginApi = async (data) => {
    return axios.post(URL.adminLogin, data, {
        headers: { 'Content-Type': 'application/json;charset=utf-8'
            ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
};

const getBuildingApi = async (id) => {
    return axios.get(URL.getBuildingDetail+id,{
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        params: {id : id}
    });
}


const userLoginApi = (data) => {
    return axios.post(URL.userLogin, data, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
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

const getBusRoute = (buildingId1,buildingId2) => {
    return axios.get(URL.getBusRoute,{
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        params: {
            buildingId1: buildingId1,
            buildingId2: buildingId2
        }
    });
}

export {
    adminLoginApi,
    userLoginApi,
    userRegisterApi,
    getAllBuildings,
    getBusRoute,
    getBuildingApi,
    getBuildingCommentApi,
    sendCommentApi
};
