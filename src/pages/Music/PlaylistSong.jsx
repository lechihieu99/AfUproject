import React, { useState } from "react";
import { Heart, Pause, Play } from '@phosphor-icons/react'
import './style.css'
import { useEffect } from "react";
import { addFavouriteList, getFavouriteList, removeFavouriteList } from "../../redux/slice/Music.slice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
const PlaylistSong = ({ isPlaying, setIsPlaying, playlist, playingList, setPlayingList, selectedSong, setSelectedSong }) => {
    const token = Cookies.get('tokenId')

    const dispatch = useDispatch()

    const favouriteList = useSelector((state) => state.music.favouriteList)
    const statusFav = useSelector((state) => state.music.statusFav)
    const statusRemove = useSelector((state) => state.music.statusRemove)

    const [arrayIdx, setArrayIdx] = useState([]);

    useEffect(() => {
        dispatch(getFavouriteList({ id: token }))
    }, [statusFav, statusRemove])

    useEffect(() => {
        document.getElementById("playlistSong").scrollTo(0, 0)
    }, [playlist])

    useEffect(() => {
        let arr = []
        playlist?.map((item, idx) => {
            favouriteList?.data?.map((item2) => {
                item.encodeId === item2.encodeId && arr.push(idx)
            })
        })

        setArrayIdx(arr)
    }, [playlist, favouriteList])
    return (
        <div className="w-full mt-2 h-[85%] overflow-y-auto playlistSong" id="playlistSong">
            {playlist?.map((item, idx) => (
                <div className={`w-full flex ${selectedSong === item.encodeId ? "bg-greyblue hover:bg-grey-blue" : "hover:bg-blue-velvet"} `}>
                    <div className="w-14 h-14 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                    <div className={` flex flex-col pl-2 justify-center ${item.streamingStatus === 2 ? "premium" : "notPremium"}`}>
                        <Link to={`/afuproject/music/track/${item.encodeId}`} className="text-sm xl:text-base truncate">{item.title}</Link>
                        <p className="text-xs xl:text-sm text-gray-400">{item.artistsNames}</p>
                    </div>
                    <div className={`${item.streamingStatus === 2 ? "w-36" : "w-20"} flex px-2 justify-end items-center gap-4 `}>
                        {item.streamingStatus === 2 && (
                            <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                        )}
                        {arrayIdx?.includes(idx) ? (
                            <div className="w-fit">
                                <Heart size={24} weight="fill" className="cursor-pointer text-pink-velvet" onClick={() => dispatch(removeFavouriteList({
                                    userId: token,
                                    encodeId: item.encodeId
                                }))} />
                            </div>
                        ) : (
                            <div className="w-fit">
                                <Heart size={24} weight="fill" className="cursor-pointer" onClick={() => dispatch(addFavouriteList({
                                    title: item.title,
                                    artist: item.artistsNames,
                                    image: item.thumbnailM ? item.thumbnailM : item.thumbnail,
                                    userId: token,
                                    encodeId: item.encodeId
                                }))} />
                            </div>

                        )}
                        {/* <Heart size={24} weight="fill" className="cursor-pointer" /> */}
                        {selectedSong === item.encodeId ?
                            isPlaying ? (
                                <div className="w-fit">
                                    <Pause size={24} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(false)} />
                                </div>
                            ) : (
                                <div className="w-fit">
                                    <Play size={24} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(true)} />
                                </div>

                            )
                            : (
                                <div className="w-fit">
                                    <Play size={24} weight="fill" className="cursor-pointer" onClick={() => item.streamingStatus !== 2 && setPlayingList({ playlist: playlist?.filter(x => x.streamingStatus !== 2), item: item }) && setSelectedSong(item.encodeId) && setIsPlaying(true)} />
                                </div>

                            )}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default PlaylistSong;