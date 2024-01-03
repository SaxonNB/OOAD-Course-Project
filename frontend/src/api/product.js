import axios from 'axios';

const URL = {
    AllProduct: 'http://localhost:8082/store/product/',
    EditProduct: 'http://localhost:8082/store/product/edit',
    AddProduct: 'http://localhost:8082/store/product/add',
    DeleteProduct: 'http://localhost:8082/store/product/delete',
};

const AllProducts = () => {
    return axios.get(URL.AllProduct, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const EditProducts = (data) => {
    return axios.post(URL.EditProduct, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const AddProducts = (data) => {
    return axios.post(URL.AddProduct, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const DeleteProducts = (name) => {
    return axios.post(URL.DeleteProduct, {name},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}


export {
    AllProducts,
    EditProducts,
    AddProducts,
    DeleteProducts,
};