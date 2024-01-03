import axios from 'axios';

const URL = {
    AllCuisine: 'http://localhost:8082/store/product',
    EditCuisine: 'http://localhost:8082/store/edit',
    AddCuisine: 'http://localhost:8082/store/addGood/2',
    DeleteCuisine: 'http://localhost:8082/store/goods/delete',
};

const AllCuisines = () => {
    return axios.get(URL.AllCuisine, {
        headers: { 'Content-Type': 'application/json;charset=utf-8'
            ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const EditCuisines = (data) => {
    return axios.post(URL.EditCuisine, data,{
        headers: { 'Content-Type': 'multipart/form-data'
            ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const AddCuisines = (data) => {
    return axios.post(URL.AddCuisine, data,{
        headers: { 'Content-Type': 'multipart/form-data'
            ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const DeleteCuisine = (id) => {
    return axios.post(URL.DeleteCuisine, id,{
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