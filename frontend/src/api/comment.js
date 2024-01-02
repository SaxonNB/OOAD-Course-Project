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

const BlockComments = (data) => {
    console.log(name)
    return axios.post(URL.BlockComment, data,{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const UnBlockComments = (commentId) => {
    console.log(commentId)
    return axios.post(URL.UnBlockComment, commentId,{
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

export {
    getComments,
    BlockComments,
    UnBlockComments,
};
