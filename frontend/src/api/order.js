import axios from 'axios';

const URL = {
    finishOrder: 'http://localhost:8082/order/finish/{orderId}',
    getOrders: 'http://localhost:8082/order/listUnfinished'
};

const finishOrderApi = async (orderId) => {
    return axios.post(URL.finishOrder.replace('{orderId}', orderId), {}, {
        headers: { 'Content-Type': 'application/json;charset=utf-8',
            'token': `${localStorage.getItem('admin_user_token')}`}
    });
};

const getOrdersApi = async () => {
    return axios.get(URL.getOrders, {
        headers: { 'Content-Type': 'application/json;charset=utf-8',
            'token': `${localStorage.getItem('admin_user_token')}`}
    });
};

export {
    finishOrderApi,
    getOrdersApi
};
