import axiosApi from "./Axios.api";

const gameController = {
    getAllGame() {
        const url = '/get-all-game';
        return axiosApi.get(url);
    },
    getGame(idGame) {
        const url = `/get-game/${idGame}`
        return axiosApi.get(url)
    },
    getCurrentGameList(id) {
        const url = `/get-current-game/${id}`
        return axiosApi.get(url)
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

        return axiosApi.post(urlApi, payload)
    },
}

export default gameController;