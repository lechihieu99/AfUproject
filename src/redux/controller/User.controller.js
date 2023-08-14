import axiosApi from "./Axios.api";

const userController = {
    getAllUser() {
        const url = '/get-all-user';
        return axiosApi.get(url);
    },
    getUser(tokenId) {
        const url = `/get-info-user/${tokenId}`;
        return axiosApi.get(url);
    }
}

export default userController;