import axiosApi, { headersData } from "./Axios.api";

const gameController = {
    getAllGame() {
        const url = '/get-all-game';
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    getGame(idGame) {
        const url = `/get-game/${idGame}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getCurrentGameList(id) {
        const url = `/get-current-game/${id}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    addCurrentGameList(id, name, image, url, description, userId) {
        const urlApi = '/add-game-currentList'
        const payload = {
            id: id,
            name: name,
            image: image,
            url: url,
            description: description,
            userId: userId
        }

        return axiosApi.post(urlApi, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
}

export default gameController;