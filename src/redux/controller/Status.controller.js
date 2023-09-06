import axiosApi from "./Axios.api";

const statusController = {
    getAllStatus() {
        const url = '/get-all-status'
        return axiosApi.get(url)
    },
    getAllComment(link) {
        const url = `/get-all-comment/${link}`
        return axiosApi.get(url)
    },
    getAllCommentListLike(link) {
        const url = `/get-all-comment-like-list/${link}`
        return axiosApi.get(url)
    },
    getUserStatus(tokenId) {
        const url = `/get-user-status/${tokenId}`
        return axiosApi.get(url)
    },
    getUserLikeList(tokenId) {
        const url = `/get-like-list/${tokenId}`
        return axiosApi.get(url)
    },
    getAllStarListByUser(tokenId) {
        const url = `/get-star-list/${tokenId}`
        return axiosApi.get(url)
    },
    postImage(tokenId, formData) {
        const url = `/upload-image/${tokenId}`
        return axiosApi.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
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
        return axiosApi.post(url, payload)
    },
    removeStatus(link) {
        const url = '/remove-status'
        const payload = {
            link: link
        }
        return axiosApi.post(url, payload)
    },
    likeStatus(tokenId, link) {
        const url = `/add-like-status`
        const payload = {
            tokenId: tokenId,
            link: link
        }
        return axiosApi.post(url, payload)
    },
    unLikeStatus(tokenId, link) {
        const url = `/remove-like-status`
        const payload = {
            tokenId: tokenId,
            link: link
        }
        return axiosApi.post(url, payload)
    },
    isExistInLikeList(tokenId, link) {
        const url = `/is-exist-status`
        const payload = {
            tokenId: tokenId,
            link: link
        }
        return axiosApi.post(url, payload)
    },
    postComment(link, ownerId, userComment, content) {
        const url = `/post-comment`
        const payload = {
            link: link,
            ownerId: ownerId,
            userComment: userComment,
            content: content
        }
        return axiosApi.post(url, payload)
    },
    removeComment(link, tokenId) {
        const url = '/remove-comment'
        const payload = {
            link: link,
            tokenId: tokenId
        }
        return axiosApi.post(url, payload)
    },
    likeComment(link, commentId, owner, userLike) {
        const url = '/like-comment'
        const payload = {
            link: link,
            commentId: commentId,
            owner: owner,
            userLike: userLike
        }
        return axiosApi.post(url, payload)
    },
    removeLikeComment(link, commentId, userLike) {
        const url = '/remove-like-comment'
        const payload = {
            link: link,
            commentId: commentId,
            userLike: userLike
        }
        return axiosApi.post(url, payload)
    },
    addStarItem(link, tokenId, ownerId) {
        const url = '/add-star-item'
        const payload = {
            link: link,
            tokenId: tokenId,
            ownerId: ownerId
        }
        return axiosApi.post(url, payload)
    },
    removeStarItem(link, tokenId) {
        const url = '/remove-star-item'
        const payload = {
            link: link,
            tokenId: tokenId
        }
        return axiosApi.post(url, payload)
    }

}

export default statusController;