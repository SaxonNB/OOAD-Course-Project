import axios from 'axios';

const URL = {
    getComment: 'http://localhost:8082/user/allusers',
    BlockComment: 'http://localhost:8082/user/mute',
    UnBlockComment: 'http://localhost:8082/user/unmute',
};

const getComments = () => {
    // console.log(localStorage)
    // console.log(localStorage.getItem('admin_user_token'))
    return axios.get(URL.getComment, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const BlockComments = (name) => {
    console.log(name)
    return axios.post(URL.BlockComment, {name},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const UnBlockComments = (name) => {
    console.log(name)
    return axios.post(URL.UnBlockComment, {name},{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

export {
    getComments,
    BlockComments,
    UnBlockComments,
};
