import axiosApi from "./Axios.api";

const favouriteListController = {
    getAll(tokenId) {
        const url = `/get-all-favourite/${tokenId}`;
        return axiosApi.get(url)
    },
    addItem(songId) {
        const url = `/add-favourite-item`;
        const payload = { songId: songId };
        return axiosApi.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
    },
    removeItem(songId) {
        const url = `/delete-favourite-item`;
        const payload = { id: songId };
        return axiosApi.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
    }
}

export default favouriteListController;