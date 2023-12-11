import { get, post } from '@/utils/http';

const URL = {
    adminLogin: '/admin/login',
    userList: '/user/list',
    detail: '/user/detail',
    create: '/user/create',
    update: '/user/update',
    delete: '/user/delete',
    userLogin: '/user/userLogin',
    userRegister: '/user/userRegister',
    updateUserPwd: '/user/updatePwd',
    updateUserInfo: '/user/updateUserInfo',
};

const adminLoginApi = async (data) => post({ url: URL.login, data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const listApi = async (params) => get({ url: URL.userList, params, data: {}, headers: {} });
const detailApi = async (params) => get({ url: URL.detail, params, data: {}, headers: {} });
const createApi = async (data) => post({ url: URL.create, params: {}, data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const updateApi = async (data) => post({ url: URL.update, data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const deleteApi = async (params) => post({ url: URL.delete, params, headers: {} });
const userLoginApi = async (data) => post({ url: URL.userLogin, data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const userRegisterApi = async (data) => post({ url: URL.userRegister, params: {}, data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });
const updateUserPwdApi = async (params) => post({ url: URL.updateUserPwd, params });
const updateUserInfoApi = async (data) => post({ url: URL.updateUserInfo, data, headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } });

export {
    adminLoginApi,
    listApi,
    detailApi,
    createApi,
    updateApi,
    deleteApi,
    userLoginApi,
    userRegisterApi,
    updateUserPwdApi,
    updateUserInfoApi
};
