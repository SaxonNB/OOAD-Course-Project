import axios from 'axios';

const URL = {
    buyGoods: 'http://localhost:8082/order/create',
    getAllFood: 'http://localhost:8082/store/goods/1?includeHidden=true',
    getAvailableFood: 'http://localhost:8082/store/goods/1',
    getAllCreative:'http://localhost:8082/store/goods/2',
    getFoodRecord:'http://localhost:8082/order/list/1',
    getCreativeRecord:'http://localhost:8082/order/list/2',
};

const buyGoodsApi = async (goods) => {
    return axios.post(URL.buyGoods,goods, {
        headers: { 'Content-Type': 'application/json;charset=utf-8',
        'token' : `${localStorage.getItem('user_token')}`
        }
    });
};

const getAllFoodApi = async () => {
    return axios.get(URL.getAllFood, {
        headers: { 'Content-Type': 'application/json;charset=utf-8',
            'token' : `${localStorage.getItem('user_token')}`
        }
    });
};

const getAvailableFoodApi = async () => {
    return axios.get(URL.getAvailableFood, {
        headers: { 'Content-Type': 'application/json;charset=utf-8',
            'token' : `${localStorage.getItem('user_token')}`
        }
    });
};

const getAllCreativeApi = async ()=> {
    return axios.get(URL.getAllCreative, {
        headers: { 'Content-Type': 'application/json;charset=utf-8',
            'token' : `${localStorage.getItem('user_token')}`
        }
    });
};

const getFoodRecordApi = async ()=> {
    console.log(localStorage.getItem('user_token'))
    return axios.get(URL.getFoodRecord, {
        headers: { 'Content-Type': 'application/json;charset=utf-8',
            'token' : `${localStorage.getItem('user_token')}`
        }
    });
};
const getCreativeRecordApi = async ()=> {
    console.log(localStorage.getItem('user_token'))
    return axios.get(URL.getCreativeRecord, {
        headers: { 'Content-Type': 'application/json;charset=utf-8',
            'token' : `${localStorage.getItem('user_token')}`
        }
    });
};
export {
    buyGoodsApi,
    getAllFoodApi,
    getAvailableFoodApi,
    getAllCreativeApi,
    getFoodRecordApi,
    getCreativeRecordApi,
};
