import axios from 'axios';

const URL = {
    getComment: 'http://localhost:8082/comment/all',
    BlockComment: 'http://localhost:8082/comment/reject',
    UnBlockComment: 'http://localhost:8082/comment/approve',
};

const getComments = () => {
    // console.log(localStorage)
    // console.log(localStorage.getItem('admin_user_token'))
    return axios.get(URL.getComment, {
        headers: { 'Content-Type': 'application/json;charset=utf-8' 
        ,'token': `${localStorage.getItem('admin_user_token')}`}
    });
}

const BlockComments = (commentId) => {
    return axios.post(URL.BlockComment, commentId,{
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
