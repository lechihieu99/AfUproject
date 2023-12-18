import axios from "axios";
import axiosApi, { headersData } from "./Axios.api";

const authController = {
    signIn(name, email, password) {
        const url = '/auth';
        const payload = { name: name, email: email, password: password };
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    login(name, email, password) {
        const url = `/auth/login?email=${email}&name=${name}&password=${password}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    loginTest(username, password, refreshToken) {
        const payload = { username: username, password: password, refreshToken: refreshToken };
        const url = '/loginRefreshToken';
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    }
}

export default authController;