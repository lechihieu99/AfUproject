import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Layout from "../components/layout/Main";
import Player from "../components/player/Player";
import Login from "../pages/Auth/Login";
import Games from "../pages/Games/Games";
import InfoGame from "../pages/Games/InfoGame";
import Home from "../pages/Home/Home";
import CurrentPage from "../pages/Music/CurrentPage";
import FavouritePage from "../pages/Music/FavouritePage";
import MusicPage from "../pages/Music/Music";
import PlaylistPage from "../pages/Music/PlaylistPage";
import TrackPage from "../pages/Music/TrackPage";
import SearchPage from "../pages/Search/SearchPage";
const Router = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [selectedId, setSelectedId] = useState();
    const [isPlaying, setIsPlaying] = useState(false)

    const [isOpen, setIsOpen] = useState(false)

    const status = useSelector((state) => state.auth.status)

    const [playingList, setPlayingList] = useState(
        {
            playlist: [],
            item: null
        }
    );
    const token = Cookies.get('tokenId');
    const tokenSlice = useSelector((state) => state.auth.token)

    useEffect(() => {
        // if ((token === undefined) && location?.pathname !== '/login') {
        //     navigate({ pathname: '/' })
        // }
        token && location?.pathname === '/' && navigate({ pathname: '/' })
    }, [token, tokenSlice])

    useEffect(() => {
        if (status === 'loading') {
            setSelectedId()
            setPlayingList({
                playlist: [],
                item: null
            })
            setIsPlaying(false)
            navigate({ pathname: '/' })
        }
    }, [status])


    return (

        <>

            {token !== undefined && (
                <div className={`${isOpen ? "w-full" : 'w-16'} lg:w-16 xl:hover:w-1/4 lg:hover:w-1/3 sm:hover:w-1/2 flex flex-col items-end justify-center absolute bottom-16 right-0 -translate-y-2 sm:bottom-4 sm:right-4 sm:translate-y-0 z-50`}>
                    <Player isOpen={isOpen} setIsOpen={setIsOpen} isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} selectedId={selectedId} setSelectedId={setSelectedId} />
                </div>
            )}

            {token === undefined ? (
                <Routes>
                    <Route path="" element={<Login setIsPlaying={setIsPlaying} setSelectedId={setSelectedId} />} />
                    <Route path="login" element={<Login setIsPlaying={setIsPlaying} setSelectedId={setSelectedId} />} />
                    <Route path="*" element={<Login setIsPlaying={setIsPlaying} setSelectedId={setSelectedId} />} />

                </Routes>
            )
                :
                (
                    <Routes>
                        <Route path="">
                            <Route path="" element={<Layout element={<Home selectedId={selectedId} setIsPlaying={setIsPlaying} setSelectedId={setSelectedId} />} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setSelectedId={setSelectedId} />} />
                            {/* <Route path="/login" element={<Layout element={<Home selectedId={selectedId} />} isPlaying={isPlaying} setIsPlaying={setIsPlaying} setSelectedId={setSelectedId} />} /> */}

                            <Route path="games" element={<Layout element={<Games />} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />} />
                            <Route path="games/:id" element={<Layout element={<InfoGame />} />} />
                            <Route path="music" element={<Layout element={<MusicPage isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} selectedId={selectedId} setSelectedId={setSelectedId} />} setSelectedId={setSelectedId} setIsPlaying={setIsPlaying} />} />
                            <Route path="music/playlist/:id" element={<Layout element={<PlaylistPage isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} selectedId={selectedId} setSelectedId={setSelectedId} />} setSelectedId={setSelectedId} setIsPlaying={setIsPlaying} />} />
                            <Route path="music/track/:id" element={<Layout element={<TrackPage isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} selectedId={selectedId} setSelectedId={setSelectedId} />} setSelectedId={setSelectedId} setIsPlaying={setIsPlaying} />} />
                            <Route path="music/search/:id" element={<Layout element={<SearchPage isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} selectedId={selectedId} setSelectedId={setSelectedId} />} setSelectedId={setSelectedId} setIsPlaying={setIsPlaying} />} />
                            <Route path="music/current/:id" element={<Layout element={<CurrentPage isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} selectedId={selectedId} setSelectedId={setSelectedId} />} setSelectedId={setSelectedId} setIsPlaying={setIsPlaying} />} />
                            <Route path="music/favourite/:id" element={<Layout element={<FavouritePage isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} selectedId={selectedId} setSelectedId={setSelectedId} />} setSelectedId={setSelectedId} setIsPlaying={setIsPlaying} />} />

                        </Route>
                    </Routes>
                )
            }

        </>

    )
}

export default Router;