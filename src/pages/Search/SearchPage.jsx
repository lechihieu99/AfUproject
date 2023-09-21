// import { Heart, Pause, Play } from "@phosphor-icons/react";
// import Cookies from "js-cookie";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "../../components/searchInput/Search";
import { addFavouriteList, getFavouriteList, getInfoSong, getLyricsSong, removeFavouriteList, searchRecommendSong, searchSong, searchSongPage } from "../../redux/slice/Music.slice";

import './style.css'

const SearchPage = ({ isPlaying, setIsPlaying, playingList, setPlayingList, selectedId, setSelectedId }) => {

    const location = useLocation();
    // const navigate = useNavigate()
    const dispatch = useDispatch();

    const infoSong = useSelector((state) => state.music.songInfo)
    const search = useSelector((state) => state.music.searchPage)
    const lyricsSong = useSelector((state) => state.music.songLyrics);

    // const favouriteList = useSelector((state) => state.music.favouriteList)
    // const statusFav = useSelector((state) => state.music.statusFav)
    // const statusRemove = useSelector((state) => state.music.statusRemove)

    const key = localStorage.getItem('key')

    // const token = Cookies.get('tokenId')

    // const [arrayIdx, setArrayIdx] = useState([]);

    // useEffect(() => {
    //     dispatch(getFavouriteList({ id: token }))
    // }, [statusFav, statusRemove])

    useEffect(() => {
        dispatch(searchSongPage({ key: key }))
    }, [])

    useEffect(() => {
        dispatch(getInfoSong({ id: selectedId }))
        dispatch(getLyricsSong({ id: selectedId }))
    }, [selectedId])

    // useEffect(() => {
    //     let arr = []
    //     search?.data?.data?.songs?.map((item, idx) => {
    //         favouriteList?.data?.map((item2) => {
    //             item.encodeId === item2.encodeId && arr.push(idx)
    //         })
    //     })

    //     setArrayIdx(arr)
    // }, [search?.data?.data?.songs, favouriteList])

    return (
        <>
            <div className="w-full h-full flex gap-4">
                <div className="lg:w-[70%] sm:w-full h-full pb-16 sm:pb-0 bg-black-200 pt-4 px-6 rounded-sm overflow-y-auto">
                    <div className="w-full flex justify-center items-center gap-2 pb-2 border-b-2 border-white-200">
                        <div className="text-base sm:text-2xl w-1/2 text-gray-200">
                            <Link to="/afuproject/music">
                                Music Space
                            </Link>
                        </div>
                        <Search isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} />
                    </div>
                    <div className="w-full overflow-y-auto playlistSong" style={{ height: 'calc(100% - 52px)' }}>
                        <div className="w-full pt-4">
                            <div className="w-full text-xl font-bold text-gray-200 mb-2">Kết quả tìm kiếm hàng đầu</div>
                            {search?.data?.data?.top?.objectType === 'song' && (
                                <Link to={`/afuproject/music/track/${search?.data?.data?.top?.encodeId}`} className="w-full">
                                    <div className={`w-full flex hover:bg-greyblue`}>
                                        <div className="w-20 h-20 m-2" style={{ backgroundImage: `url(${search?.data?.data?.top?.thumbnail})`, backgroundSize: 'cover' }}></div>
                                        <div className="w-[60%] flex flex-col pl-2 justify-center">
                                            <p className="text-base text-white truncate">{search?.data?.data?.top?.title}</p>
                                            <p className="text-sm text-gray-400">{search?.data?.data?.top?.artistsNames}</p>
                                        </div>
                                        <div className="flex px-2 justify-end items-center gap-4 text-gray-200" style={{ width: 'calc(40% - 56px)' }}>
                                            {search?.data?.data?.top?.streamingStatus === 2 && (
                                                <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                            )}
                                            {/* <Heart size={18} weight="fill" className="cursor-pointer" /> */}

                                        </div>
                                    </div>
                                </Link>
                            )}
                            {search?.data?.data?.top?.objectType === 'artist' && (
                                // <Link to={`/music/track/${search?.data?.data?.top?.encodeId}`} className="w-full">
                                <div className={`w-full flex hover:bg-greyblue`}>
                                    <div className="w-20 h-20 m-2" style={{ backgroundImage: `url(${search?.data?.data?.top?.thumbnail})`, backgroundSize: 'cover' }}></div>
                                    <div className="w-[60%] flex flex-col pl-2 justify-center">
                                        {/* <p className="text-base text-white truncate">{search?.data?.data?.top?.title}</p> */}
                                        <p className="text-xl text-white truncate">{search?.data?.data?.top?.name}</p>
                                    </div>
                                    <div className="flex px-2 justify-end items-center gap-4 text-gray-200" style={{ width: 'calc(40% - 56px)' }}>
                                        {search?.data?.data?.top?.streamingStatus === 2 && (
                                            <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                        )}
                                        {/* <Heart size={18} weight="fill" className="cursor-pointer" /> */}

                                    </div>
                                </div>
                                // </Link>
                            )}
                            <div className="w-full mt-2">
                                <div className="w-full text-base font-bold text-gray-200 mb-2">{search && "Các playlist liên quan"}</div>
                                <div className="w-full h-fit pb-2 overflow-x-auto playlistSearch">
                                    <div className="flex items-start gap-4">
                                        {search?.data?.data?.playlists?.map((item) => (
                                            <Link to={`/afuproject/music/playlist/${item.encodeId}`} className="w-32 hover:brightness-125">
                                                <div className="w-28 h-28 xl:w-32 xl:h-32" style={{ backgroundImage: `url(${item.thumbnailM})`, backgroundSize: 'cover' }}></div>
                                                <div className="w-full text-gray-200 text-center">{item.title}</div>
                                                <div className="w-full text-sm text-gray-400 text-center">{item.artistsNames}</div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full text-base font-bold text-gray-200 mt-2">{search && "Các bài hát phổ biến"}</div>
                                <div className="w-full flex flex-col pb-2">
                                    {search?.data?.data?.songs?.map((item, idx) => (
                                        <Link to={`/afuproject/music/track/${item.encodeId}`} className="w-full">
                                            <div className={`w-full flex hover:bg-greyblue`}>
                                                <div className="w-14 h-14 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                                <div className={`flex flex-col pl-2 justify-center ${item.streamingStatus === 2 ? "premiumTrackPage" : "notPremiumTrackPage"}`} id="infoSong">
                                                    <p className="text-base text-gray-200 truncate">{item.title}</p>
                                                    <p className="text-sm text-gray-400">{item.artistsNames}</p>
                                                </div>
                                                <div className={`w-fit flex px-2 justify-end items-center gap-4 ${item.streamingStatus !== 2 && "hidden"}`}>
                                                    {item.streamingStatus === 2 && (
                                                        <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                                    )}
                                                    {/* {arrayIdx?.includes(idx) ? (
                                                    <Heart size={24} weight="fill" className="cursor-pointer text-pink-velvet" onClick={() => dispatch(removeFavouriteList({
                                                        userId: token,
                                                        encodeId: item.encodeId
                                                    }))} />
                                                ) : (
                                                    <Heart size={24} weight="fill" className="cursor-pointer text-gray-200" onClick={() => dispatch(addFavouriteList({
                                                        title: item.title,
                                                        artist: item.artistsNames,
                                                        image: item.thumbnailM ? item.thumbnailM : item.thumbnail,
                                                        userId: token,
                                                        encodeId: item.encodeId
                                                    }))} />

                                                )} */}

                                                    {/* <Heart size={24} weight="fill" className="cursor-pointer text-gray-200" /> */}


                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="w-[30%] hidden lg:block h-full bg-black-200 pt-2 px-2 rounded-sm">
                    {selectedId ? (

                        <div className="w-full h-full p-4 flex flex-col gap-4">
                            <div className="w-full h-1/2 relative border-b-[1px] border-gray-200">
                                <div className="w-full h-12 text-sm xl:text-lg text-bold text-gray-200">Thông tin bài hát bạn đang nghe</div>
                                <div className="w-full h-28 xl:h-36" style={{ backgroundImage: `url(${infoSong?.data?.data?.album?.thumbnail})`, backgroundSize: 'cover' }}></div>
                                <div className="w-full absolute top-24 2xl:top-24 xl:top-32 flex justify-center items-center">
                                    <div className="w-28 h-28 2xl:w-48 2xl:h-48 xl:w-32 xl:h-32 rounded-full border-2 border-gray-200" style={{ backgroundImage: `url(${infoSong?.data?.data?.thumbnailM})`, backgroundSize: 'cover' }}></div>
                                </div>
                                <div className="w-full mt-14 2xl:mt-24 xl:mt-20 overflow-y-auto" id="infoScroll" style={{ height: 'calc(100% - 288px)' }} >
                                    <div className="w-full flex flex-col pt-4">
                                        <div className="w-full text-center text-base font-bold text-white">{infoSong?.data?.data?.title}</div>
                                        <div className="w-full text-center text-sm font-semibold text-gray-400">{infoSong?.data?.data?.artistsNames}</div>
                                        <div className="w-full mt-4 flex flex-wrap text-sm text-gray-200">
                                            <div className="w-1/2 p-2">Album: {infoSong?.data?.data?.album?.title}</div>
                                            <div className="w-1/2 p-2">Ngày ra mắt: {infoSong?.data?.data?.album?.releaseDate}</div>
                                            <div className="w-1/2 p-2">Số lượt nghe: {infoSong?.data?.data?.listen}</div>
                                            <div className="w-1/2 p-2">Số lượt like: {infoSong?.data?.data?.like}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-1/2 py-2 overflow-y-auto" id="lyricsScroll">
                                <div className="w-full flex flex-col">
                                    {lyricsSong?.data?.data?.sentences ? lyricsSong?.data?.data?.sentences?.map((item) => (
                                        <div className="w-full text-center text-sm text-gray-200">{
                                            item.words.map((item2) => (
                                                <>{item2.data} </>
                                            ))
                                        }</div>
                                    )) : (
                                        <div className="w-full text-gray-400 text-center">Không có lời bài hát</div>
                                    )}
                                </div>

                            </div>
                        </div>

                    )
                        :
                        (
                            <div className="w-full text-center text-base font-semibold text-gray-200">Chưa có dữ liệu bài hát</div>
                        )}
                </div>
            </div>
        </>
    )
}

export default SearchPage;