import axiosApi from "./Axios.api";

const musicController = {
    getAllAlbum() {
        const url = '/get-top100';
        return axiosApi.get(url);
    },
    getHome() {
        const url = '/get-home';
        return axiosApi.get(url);
    },
    getChart() {
        const url = '/get-chart';
        return axiosApi.get(url);
    },
    getPlaylist(id) {
        const url = `/get-playlist/${id}`;
        return axiosApi.get(url)
    },
    getSong(id) {
        const url = `/get-song/${id}`;
        return axiosApi.get(url)
    },
    getInfoSong(id) {
        const url = `/get-info-song/${id}`;
        return axiosApi.get(url)
    },
    getLyrics(id) {
        const url = `/get-lyrics/${id}`;
        return axiosApi.get(url)
    },
    searchSong(key) {
        const url = `/search-song/${key}`;
        return axiosApi.get(url);
    },
    searchRecommendSong(key) {
        const url = `/search-song/${key}`;
        return axiosApi.get(url);
    },
    searchSongPage(key) {
        const url = `/search-song/${key}`;
        return axiosApi.get(url);
    },
    searchByArtist(key) {
        const url = `/search-song/${key}`;
        return axiosApi.get(url);
    },
    getCurrentList(id) {
        const url = `/get-current-tracks/${id}`
        return axiosApi.get(url)
    }
    ,
    addCurrentList(title, artist, image, userId, encodeId) {
        const url = '/add-song-currentlist'
        const payload = {
            title: title,
            artist: artist,
            image: image,
            userId: userId,
            encodeId: encodeId
        }

        return axiosApi.post(url, payload)
    },
    getFavouriteList(id) {
        const url = `/get-all-favourite/${id}`
        return axiosApi.get(url)
    },
    addFavouriteList(title, artist, image, userId, encodeId) {
        const url = '/add-favourite-item'
        const payload = {
            title: title,
            artist: artist,
            image: image,
            userId: userId,
            encodeId: encodeId
        }

        return axiosApi.post(url, payload)
    },
    removeFavouriteList(encodeId, userId) {
        const url = '/delete-favourite-item'
        const payload = {
            userId: userId,
            encodeId: encodeId
        }

        return axiosApi.post(url, payload)
    },
}

export default musicController;