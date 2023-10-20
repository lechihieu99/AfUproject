import axios from 'axios'
import { API_HOST } from '../../constants/Pathname';

const axiosApi = axios.create({
    baseURL: API_HOST,
    headers: {
        'Content-type': 'application/json',
        "ngrok-skip-browser-warning": "69420",
    },
});

export default axiosApi;