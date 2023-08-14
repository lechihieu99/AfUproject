import axios from 'axios'
import { API_HOST } from '../../constants/Pathname';

const axiosApi = axios.create({
    baseURL: API_HOST,
    headers: {
        'Content-type': 'application/json',
    },
});

export default axiosApi;