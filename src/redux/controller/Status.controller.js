import axiosApi, { headersData } from "./Axios.api";

const statusController = {
    getAllStatus() {
        const url = '/get-all-status'
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getStatus(link) {
        const url = `/get-status/${link}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getAllComment(link) {
        const url = `/get-all-comment/${link}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getAllCommentListLike(link) {
        const url = `/get-all-comment-like-list/${link}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getUserStatus(tokenId) {
        const url = `/get-user-status/${tokenId}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getUserLikeList(tokenId) {
        const url = `/get-like-list/${tokenId}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getAllStarListByUser(tokenId) {
        const url = `/get-star-list/${tokenId}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    postImage(tokenId, formData) {
        const url = `/upload-image/${tokenId}`
        return axiosApi.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "ngrok-skip-browser-warning": "69420",
                'Authorization': localStorage.getItem('accessToken')
            },
        })
    },
    postStatus(tokenId, like, comment, star, share, content, image, imageContent, type) {
        const url = `/post-status`
        const payload = {
            tokenId: tokenId,
            like: like,
            comment: comment,
            star: star,
            share: share,
            content: content,
            image: image,
            imageContent: imageContent,
            type: type
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    removeStatus(link) {
        const url = '/remove-status'
        const payload = {
            link: link
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    likeStatus(tokenId, link) {
        const url = `/add-like-status`
        const payload = {
            tokenId: tokenId,
            link: link
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    unLikeStatus(tokenId, link) {
        const url = `/remove-like-status`
        const payload = {
            tokenId: tokenId,
            link: link
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    isExistInLikeList(tokenId, link) {
        const url = `/is-exist-status`
        const payload = {
            tokenId: tokenId,
            link: link
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    postComment(link, ownerId, userComment, content) {
        const url = `/post-comment`
        const payload = {
            link: link,
            ownerId: ownerId,
            userComment: userComment,
            content: content
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    removeComment(link, tokenId) {
        const url = '/remove-comment'
        const payload = {
            link: link,
            tokenId: tokenId
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    likeComment(link, commentId, owner, userLike) {
        const url = '/like-comment'
        const payload = {
            link: link,
            commentId: commentId,
            owner: owner,
            userLike: userLike
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    removeLikeComment(link, commentId, userLike) {
        const url = '/remove-like-comment'
        const payload = {
            link: link,
            commentId: commentId,
            userLike: userLike
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    addStarItem(link, tokenId, ownerId) {
        const url = '/add-star-item'
        const payload = {
            link: link,
            tokenId: tokenId,
            ownerId: ownerId
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    removeStarItem(link, tokenId) {
        const url = '/remove-star-item'
        const payload = {
            link: link,
            tokenId: tokenId
        }
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    }

}

export default statusController;