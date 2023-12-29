import axios from 'axios';

const URL = {
    AllStation: 'http://localhost:8082/goods/',
    EditStation: 'http://localhost:8082/goods/',
    AddStation: 'http://localhost:8082/goods/',
};

const AllStations = () => {
    return axios.get(URL.AllStation, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const EditStations = (data) => {
    return axios.post(URL.EditStation, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const AddStations = (data) => {
    return axios.post(URL.AddStation, {data},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}


export {
    AllStations,
    EditStations,
    AddStations,
};