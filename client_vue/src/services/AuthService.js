import axios from 'axios';
import Axios from 'axios'
const url = 'http://localhost:2999/api/';

export default {
    login(credentials) {
        return axios
            .post(url + 'login/', credentials)
            .then(res => res.data);
    },

    signUp(credentials) {
        return axios
            .post(url + 'sign-up/', credentials)
            .then(res => res.data);
    },

    getSecret() {
        return axios
            .get(url + 'sercet/')
            .then(res => res.data);
    }
};