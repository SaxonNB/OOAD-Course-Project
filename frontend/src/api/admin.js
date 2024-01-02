import axios from 'axios';

const URL = {
    AllUser: 'http://localhost:8082/user/allusers',
    BlockUser: 'http://localhost:8082/user/mute',
    UnBlockUser: 'http://localhost:8082/user/unmute',
    AddUser: 'http://localhost:8082/user/batchregister',
};

const getAllUsers = () => {
    // console.log(localStorage)
    // console.log(localStorage.getItem('admin_user_token'))
    return axios.get(URL.AllUser, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const blockUser = (name) => {
    console.log(name)
    return axios.post(URL.BlockUser, {name},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const unblockUser = (name) => {
    console.log(name)
    return axios.post(URL.UnBlockUser, {name},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const addUser = (data) => {
    console.log(data)
    return axios.post(URL.AddUser, data,{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

export {
    getAllUsers,
    blockUser,
    unblockUser,
    addUser
};
