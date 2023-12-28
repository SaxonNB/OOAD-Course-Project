import axios from 'axios';

const URL = {
    AllBuilding: 'http://localhost:8082/building/',
    EditBuilding: 'http://localhost:8082/building/',
    AddBuilding: 'http://localhost:8082/building/add',
};

const AllBuildings = () => {
    return axios.get(URL.AllBuilding, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const EditBuildings = (data) => {
    return axios.post(URL.EditBuilding, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const AddBuildings = (data) => {
    console.log(data);
    return axios.post(URL.AddBuilding, data,{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}


export {
    AllBuildings,
    EditBuildings,
    AddBuildings,
};