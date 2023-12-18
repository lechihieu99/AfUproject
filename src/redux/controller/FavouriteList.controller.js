import axiosApi, { headersData } from "./Axios.api";

const favouriteListController = {
    getAll(tokenId) {
        const url = `/get-all-favourite/${tokenId}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    addItem(songId) {
        const url = `/add-favourite-item`;
        const payload = { songId: songId };
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    removeItem(songId) {
        const url = `/delete-favourite-item`;
        const payload = { id: songId };
        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    }
}

export default favouriteListController;