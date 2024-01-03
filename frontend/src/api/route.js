import axios from 'axios';

const URL = {
    AllRoute: 'http://localhost:8082/route/',
    EditRoute: 'http://localhost:8082/route',
    AddRoute: 'http://localhost:8082/route',
};

const AllRoutes = () => {
    return axios.get(URL.AllRoute, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const EditRoutes = (data) => {
    return axios.post(URL.EditRoute, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const AddRoutes = (data) => {
    return axios.post(URL.AddRoute, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}


export {
    AllRoutes,
    EditRoutes,
    AddRoutes,
};