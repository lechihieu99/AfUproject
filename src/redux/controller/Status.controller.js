import axiosApi from "./Axios.api";

const statusController = {
    getAllStatus() {
        const url = '/get-all-status'
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
    }
}

export default statusController;