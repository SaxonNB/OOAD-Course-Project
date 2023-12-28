import axios from 'axios';

const URL = {
    AllCuisine: 'http://localhost:8082/goods/',
    EditCuisine: 'http://localhost:8082/goods/',
    AddCuisine: 'http://localhost:8082/goods/',
    DeleteCuisine: 'http://localhost:8082/goods/',
};

const AllCuisines = () => {
    return axios.get(URL.AllBuilding, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const EditCuisines = (data) => {
    return axios.post(URL.EditBuilding, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const AddCuisines = (data1,data2) => {
    console.log(data1,data2);
    return axios.post(URL.AddBuilding, {data1,data2},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const DeleteCuisine = (data1,data2) => {
    console.log(data1,data2);
    return axios.post(URL.AddBuilding, {data1,data2},{
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