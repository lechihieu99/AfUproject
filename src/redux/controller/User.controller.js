import axiosApi, { headersData } from "./Axios.api";

const userController = {
    getAllUser() {
        const url = '/get-all-user';
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    getUser(tokenId) {
        const url = `/get-info-user/${tokenId}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    getAllFriend(tokenId) {
        const url = `/get-all-friend/${tokenId}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getAllFriendRequest(tokenId) {
        const url = `/get-all-friend-request/${tokenId}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getFriend(userId1, userId2) {
        const url = `/get-friend?userId1=${userId1}&userId2=${userId2}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getAllNotification(tokenId) {
        const url = `/get-all-notification/${tokenId}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    uploadAvatar(tokenId, formData) {
        const url = `/upload-avatar/${tokenId}`
        return axiosApi.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "ngrok-skip-browser-warning": "69420",
                'Authorization': localStorage.getItem('accessToken')

            },
        })
    },
    getAvatar(tokenId) {
        const url = `/get-avatar/${tokenId}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
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
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    sendFriendRequest(userId1, userId2) {
        const url = '/send-friend-request'
        const payload = {
            userId1: userId1,
            userId2: userId2
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    acceptFriendRequest(id) {
        const url = '/accept-friend-request'
        const payload = {
            id: id
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    cancelFriend(userId1, userId2) {
        const url = '/cancel-friend'
        const payload = {
            userId1: userId1,
            userId2: userId2
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    postNotification(sendUser, receiveUser, type, link) {
        const url = '/post-notification'
        const payload = {
            sendUser: sendUser,
            receiveUser: receiveUser,
            type: type,
            link: link
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    seenNotification(linkNoti) {
        const url = '/seen-notification'
        const payload = {
            id: linkNoti
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    removeNotification(sendUser, receiveUser, type, link) {
        const url = '/remove-notification'
        const payload = {
            sendUser: sendUser,
            receiveUser: receiveUser,
            type: type,
            link: link
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    }
}

export default userController;