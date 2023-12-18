import axiosApi, { headersData } from "./Axios.api";

const musicController = {
    getAllAlbum() {
        const url = '/get-top100';
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    getHome() {
        const url = '/get-home';
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    getChart() {
        const url = '/get-chart';
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    getPlaylist(id) {
        const url = `/get-playlist/${id}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getSong(id) {
        const url = `/get-song/${id}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getInfoSong(id) {
        const url = `/get-info-song/${id}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getLyrics(id) {
        const url = `/get-lyrics/${id}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    searchSong(key) {
        const url = `/search-song/${key}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    searchRecommendSong(key) {
        const url = `/search-song/${key}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    searchSongPage(key) {
        const url = `/search-song/${key}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    searchByArtist(key) {
        const url = `/search-song/${key}`;
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        });
    },
    getCurrentList(id) {
        const url = `/get-current-tracks/${id}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
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

        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    getFavouriteList(id) {
        const url = `/get-all-favourite/${id}`
        return axiosApi.get(url, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
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

        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
    removeFavouriteList(encodeId, userId) {
        const url = '/delete-favourite-item'
        const payload = {
            userId: userId,
            encodeId: encodeId
        }

        return axiosApi.post(url, payload, {
            headers: {
                ...headersData,
                'Authorization': localStorage.getItem('accessToken')
            }
        })
    },
}

export default musicController;