import Vue from 'vue'
import axios from 'axios'


// Vue.use(axios);
Vue.prototype.axios = axios

const dataServerUrl = "http://localhost:8080";

function loginCheck(param, callback) {
    const url = `${dataServerUrl}/api/user/v1/login`
    axios.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}

function registerAccount(param, callback) {
    const url = `${dataServerUrl}/api/user/v1/register`
    axios.post(url, param)
        .then(resp => {
            callback(resp)
        }, errResp => {
            console.log(errResp)
        })
}


export default {
    loginCheck,
    registerAccount,
}