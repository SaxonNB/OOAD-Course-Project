import axios from 'axios';

const URL = {
    buyGoods: 'http://localhost:8082/order/create',
    getAllGoods: 'http://localhost:8082/store/goods/{storeId}?includeHidden=true',
    getAvailableGoods: 'http://localhost:8082/store/goods/{storeId}',
    getOrders:'http://localhost:8082/order/list/{storeId}',
    cancelOrder:'http://localhost:8082/order/cancel/{orderId}',
};

const buyGoodsApi = async (goods) => {
    return axios.post(URL.buyGoods,goods, {
        headers: { 'Content-Type': 'application/json;charset=utf-8',
        'token' : `${localStorage.getItem('user_token')}`
        }
    });
};

const getAllGoodsApi = async (storeId) => {
    return axios.get(
        URL.getAllGoods.replace('{storeId}', storeId),
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'token' : `${localStorage.getItem('user_token')}`
            }
        }
    );
};

const getAvailableGoodsApi = async (storeId) => {
    return axios.get(
        URL.getAvailableGoods.replace('{storeId}', storeId),
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'token' : `${localStorage.getItem('user_token')}`
            }
        }
    );
};

const getOrdersApi = async (storeId)=> {
    return axios.get(
        URL.getOrders.replace('{storeId}', storeId),
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'token' : `${localStorage.getItem('user_token')}`
            }
        }
    );
};

const cancelOrderApi = async (orderId)=> {
    return axios.post(
        URL.cancelOrder.replace('{orderId}', orderId), {},
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'token' : `${localStorage.getItem('user_token')}`
            }
        }
    );
};

export {
    buyGoodsApi,
    getAllGoodsApi,
    getAvailableGoodsApi,
    getOrdersApi,
    cancelOrderApi
};
