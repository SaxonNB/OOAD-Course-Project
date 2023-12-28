import axios from 'axios';

const URL = {
    AllBuilding: 'http://localhost:8082/building/',
    EditBuilding: 'http://localhost:8082/building/',
    AddBuilding: 'http://localhost:8082/building/',
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

const AddBuildings = (data1,data2) => {
    console.log(data1,data2);
    return axios.post(URL.AddBuilding, {data1,data2},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}


export {
    AllBuildings,
    EditBuildings,
    AddBuildings,
};