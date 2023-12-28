import axios from 'axios';

const URL = {
    AllProduct: 'http://localhost:8082/goods/',
    EditCuisine: 'http://localhost:8082/goods/',
    AddCuisine: 'http://localhost:8082/goods/',
    DeleteCuisine: 'http://localhost:8082/goods/',
};

const AllCuisines = () => {
    return axios.get(URL.AllCuisine, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const EditCuisines = (data) => {
    return axios.post(URL.EditCuisine, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const AddCuisines = (data) => {
    return axios.post(URL.AddCuisine, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const DeleteCuisine = (name) => {
    return axios.post(URL.DeleteCuisine, {name},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}


export {
    AllCuisines,
    EditCuisines,
    AddCuisines,
    DeleteCuisine,
};