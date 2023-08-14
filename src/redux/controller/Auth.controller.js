import axios from "axios";
import axiosApi from "./Axios.api";

const authController = {
    signIn(name, email, password) {
        const url = '/auth';
        const payload = { name: name, email: email, password: password };
        return axiosApi.post(url, payload)
    },
    login(name, email, password) {
        const url = `/auth/login?email=${email}&name=${name}&password=${password}`
        return axiosApi.get(url);
    }
}

export default authController;