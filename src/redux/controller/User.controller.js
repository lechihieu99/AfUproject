import axiosApi from "./Axios.api";

const userController = {
    getAllUser() {
        const url = '/get-all-user';
        return axiosApi.get(url);
    },
    getUser(tokenId) {
        const url = `/get-info-user/${tokenId}`;
        return axiosApi.get(url);
    },
    uploadAvatar(tokenId, formData) {
        const url = `/upload-avatar/${tokenId}`
        return axiosApi.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
    },
    getAvatar(tokenId) {
        const url = `/get-avatar/${tokenId}`
        return axiosApi.get(url)
    }
}

export default userController;