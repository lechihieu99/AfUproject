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
    getAllFriend(tokenId) {
        const url = `/get-all-friend/${tokenId}`
        return axiosApi.get(url)
    },
    getAllFriendRequest(tokenId) {
        const url = `/get-all-friend-request/${tokenId}`
        return axiosApi.get(url)
    },
    getFriend(userId1, userId2) {
        const url = `/get-friend?userId1=${userId1}&userId2=${userId2}`
        return axiosApi.get(url)
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
    },
    updateInformationUser(tokenId, name, email, birthday, sex, education, habit) {
        const url = `/update-information/${tokenId}`
        const payload = {
            name: name,
            email: email,
            birthday: birthday,
            sex: sex,
            education: education,
            habit: habit
        }
        return axiosApi.post(url, payload)
    },
    sendFriendRequest(userId1, userId2) {
        const url = '/send-friend-request'
        const payload = {
            userId1: userId1,
            userId2: userId2
        }
        return axiosApi.post(url, payload)
    },
    acceptFriendRequest(id) {
        const url = '/accept-friend-request'
        const payload = {
            id: id
        }
        return axiosApi.post(url, payload)
    },
    cancelFriend(userId1, userId2) {
        const url = '/cancel-friend'
        const payload = {
            userId1: userId1,
            userId2: userId2
        }
        return axiosApi.post(url, payload)
    }
}

export default userController;