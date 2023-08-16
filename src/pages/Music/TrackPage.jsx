import { Heart, Pause, Play } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "../../components/searchInput/Search";
import { getInfoSong, getLyricsSong, searchRecommendSong, searchSong, searchByArtist, getFavouriteList, removeFavouriteList, addFavouriteList } from "../../redux/slice/Music.slice";


const TrackPage = ({ isPlaying, setIsPlaying, playingList, setPlayingList, selectedId, setSelectedId }) => {

    const location = useLocation();
    // const navigate = useNavigate()
    const dispatch = useDispatch();

    const infoSong = useSelector((state) => state.music.songInfo)
    const search = useSelector((state) => state.music.searchRecommend)
    const searchArtist = useSelector((state) => state.music.searchByArtist)
    const lyricsSong = useSelector((state) => state.music.songLyrics);

    const favouriteList = useSelector((state) => state.music.favouriteList)
    const statusFav = useSelector((state) => state.music.statusFav)
    const statusRemove = useSelector((state) => state.music.statusRemove)

    const [valueSearch, setValueSearch] = useState();
    const [array, setArray] = useState()

    const [result, setResult] = useState();

    let temp = playingList?.playlist?.length === 100 ? [] : playingList?.playlist;

    const token = Cookies.get('tokenId')

    const [arrayIdx, setArrayIdx] = useState([]);

    useEffect(() => {
        dispatch(getFavouriteList({ id: token }))
    }, [statusFav, statusRemove])

    useEffect(() => {
        dispatch(getInfoSong({ id: location?.pathname?.slice(24) }))
        dispatch(getLyricsSong({ id: location?.pathname?.slice(24) }))
    }, [location?.pathname?.slice(24)])

    useEffect(() => {
        dispatch(searchRecommendSong({ key: infoSong?.data?.data?.title }))
        infoSong?.data?.data?.artistsNames && dispatch(searchByArtist({ key: infoSong?.data?.data?.artistsNames }))
    }, [infoSong, infoSong?.data?.data?.artistsNames, location?.pathname?.slice(24)])

    useEffect(() => {
        if (array) {
            // console.log(array[0].item)
            // temp.push(array[0].item)
            // console.log(temp)
            let count = 0;
            temp?.map((item) => {
                if (item.encodeId === array.encodeId)
                    count++;
            })
            count === 0 && temp.push(array)

        }
        setResult(temp)
    }, [array])

    useEffect(() => {
        array && array.streamingStatus !== 2 && setPlayingList({ playlist: result, item: array }) && setIsPlaying(true)
    }, [array, result])

    useEffect(() => {
        let arr = []
        favouriteList?.data?.map((item2) => {
            location?.pathname?.slice(24) === item2.encodeId && arr.push(location?.pathname?.slice(24))
        })

        setArrayIdx(arr)
    }, [location?.pathname?.slice(24), favouriteList])

    useEffect(() => {
        console.log(lyricsSong)
        console.log(search)
        console.log(searchArtist)
    }, [search, searchArtist, lyricsSong])


    return (
        <>
            <div className="w-full h-full flex gap-4">

                <div className="w-full lg:w-[70%] sm:w-full h-full bg-black-200 pt-4 px-6 rounded-sm">
                    <div className="w-full flex justify-center items-start gap-2 pb-2 border-b-2 border-white-200">
                        <div className="text-xl sm:text-2xl w-1/2 text-gray-200">
                            <Link to="/music">
                                Music Space
                            </Link>
                        </div>
                        <Search isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} />
                    </div>
                    <div className="w-full pb-16 sm:pb-0 overflow-y-auto playlistSong" style={{ height: 'calc(100% - 52px)' }}>

                        <div className="w-full relative">
                            <div className="w-full h-32 xl:h-40 relative" style={{ backgroundImage: `url(${infoSong?.data?.data?.thumbnailM})`, backgroundSize: 'cover' }}>
                                <div className="absolute w-full h-full bg-black opacity-10"></div>
                            </div>
                            <div className="absolute left-4 sm:left-16 xl:left-20 top-16 flex items-end gap-4" style={{ width: window.innerWidth <= 640 ? 'calc(100% - 30px)' : 'calc(100% - 80px)' }}>
                                <div className="w-32 h-32 xl:w-40 xl:h-40 drop-shadow-xl" style={{ backgroundImage: `url(${infoSong?.data?.data?.thumbnailM})`, backgroundSize: 'cover' }}></div>
                                <div className="flex flex-col justify-start" style={{ width: window.innerWidth <= 1024 ? window.innerWidth <= 640 ? 'calc(100% - 158px)' : 'calc(100% - 228px)' : 'calc(100% - 288px)' }}>
                                    <p className="text-xl xl:text-2xl text-white font-bold w-full truncate">{infoSong?.data?.data?.title}</p>
                                    <p className="text-base text-semibold text-gray-200 w-full truncate">{infoSong?.data?.data?.artistsNames}</p>
                                </div>
                                <div className="w-12 hidden sm:flex h-full flex justify-right items-end gap-4">
                                    <div className="p-2 border-[1px] border-gray-200 text-gray-200 rounded-full">

                                        {arrayIdx?.includes(location?.pathname?.slice(24)) ? (
                                            <Heart size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer text-pink-velvet" onClick={() => dispatch(removeFavouriteList({
                                                userId: token,
                                                encodeId: location?.pathname?.slice(24)
                                            }))} />
                                        ) : (
                                            <Heart size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer" onClick={() => dispatch(addFavouriteList({
                                                title: infoSong?.data?.data?.title,
                                                artist: infoSong?.data?.data?.artistsNames,
                                                image: infoSong?.data?.data?.thumbnailM ? infoSong?.data?.data?.thumbnailM : infoSong?.data?.data?.thumbnail,
                                                userId: token,
                                                encodeId: location?.pathname?.slice(24)
                                            }))} />

                                        )}
                                    </div>

                                </div>
                                <div className="w-12 hidden sm:flex h-full flex justify-right items-end gap-4">
                                    <div className="p-2 border-[1px] border-gray-200 text-gray-200 rounded-full">

                                        {isPlaying && selectedId === location?.pathname?.slice(24) ? <Pause size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} /> :
                                            selectedId === location?.pathname?.slice(24) ?
                                                <Play size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} />
                                                :
                                                <Play size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer" onClick={() => setArray(infoSong?.data?.data)} />
                                        }

                                    </div>

                                </div>
                            </div>
                            <div className="w-full sm:hidden mt-20 flex gap-4">
                                <div className="p-2 border-[1px] border-gray-200 text-gray-200 rounded-full">

                                    {arrayIdx?.includes(location?.pathname?.slice(24)) ? (
                                        <Heart size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer text-pink-velvet" onClick={() => dispatch(removeFavouriteList({
                                            userId: token,
                                            encodeId: location?.pathname?.slice(24)
                                        }))} />
                                    ) : (
                                        <Heart size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer" onClick={() => dispatch(addFavouriteList({
                                            title: infoSong?.data?.data?.title,
                                            artist: infoSong?.data?.data?.artistsNames,
                                            image: infoSong?.data?.data?.thumbnailM ? infoSong?.data?.data?.thumbnailM : infoSong?.data?.data?.thumbnail,
                                            userId: token,
                                            encodeId: location?.pathname?.slice(24)
                                        }))} />

                                    )}
                                </div>
                                <div className="p-2 border-[1px] border-gray-200 text-gray-200 rounded-full">

                                    {isPlaying && selectedId === location?.pathname?.slice(24) ? <Pause size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} /> :
                                        selectedId === location?.pathname?.slice(24) ?
                                            <Play size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} />
                                            :
                                            <Play size={window.innerWidth <= 1024 ? 24 : 32} weight="fill" className="cursor-pointer" onClick={() => setArray(infoSong?.data?.data)} />
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:mt-20">
                            <div className="w-full flex flex-wrap text-sm text-gray-200">
                                <div className="w-1/2 p-2">Album: {infoSong?.data?.data?.album?.title}</div>
                                <div className="w-1/2 p-2">Ngày ra mắt: {infoSong?.data?.data?.album?.releaseDate}</div>
                                <div className="w-1/2 p-2">Số lượt nghe: {infoSong?.data?.data?.listen}</div>
                                <div className="w-1/2 p-2">Số lượt like: {infoSong?.data?.data?.like}</div>
                            </div>
                            <div className="mt-4 text-xl font-semibold text-white">Lời bài hát</div>
                            <div className="w-full flex flex-col mt-2">
                                {lyricsSong?.data?.data?.sentences ? lyricsSong?.data?.data?.sentences?.map((item) => (
                                    <div className="w-full text-sm text-gray-200">{
                                        item.words.map((item2) => (
                                            <>{item2.data} </>
                                        ))
                                    }</div>
                                )) : (
                                    <div className="w-full text-gray-400 text-center">Không có lời bài hát</div>
                                )}
                            </div>
                        </div>
                        <div className="w-full lg:hidden h-1/2 mt-4 rounded-sm">
                            <div className="w-full h-1/2">
                                <div className="w-full h-8 text-base text-gray-200">Các bài hát liên quan</div>
                                <div className="w-full mb-4 overflow-y-auto" style={{ height: 'calc(100% - 32px)' }}>
                                    {search?.data?.data?.songs?.map((item) => (
                                        <Link to={`/music/track/${item.encodeId}`} className="w-full" >
                                            <div className={`w-full flex hover:bg-greyblue`}>
                                                <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                                <div className="w-[60%] xl:w-[75%] flex flex-col pl-2 justify-center">
                                                    <p className="text-sm xl:text-base text-white truncate">{item.title}</p>
                                                    <p className="text-xs xl:text-sm text-gray-400">{item.artistsNames}</p>
                                                </div>
                                                <div className={`flex ${item.streamingStatus !== 2 && "hidden"} px-2 justify-end items-center gap-4 text-gray-200`} style={{ width: 'calc(40% - 56px)' }}>
                                                    {item.streamingStatus === 2 && (
                                                        <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                                    )}
                                                    {/* <Heart size={18} weight="fill" className="cursor-pointer" /> */}

                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full h-1/2 pb-2 pt-4 border-t-[1px] border-white-200">
                                <div className="w-full h-8 text-base text-gray-200">{infoSong?.data?.data?.artistsNames}'s Playlists</div>
                                <div className="w-full pb-2 overflow-y-auto" style={{ height: 'calc(100% - 32px)' }}>

                                    {searchArtist?.data?.data?.playlists?.map((item) => (
                                        <Link to={`/music/playlist/${item.encodeId}`} className="w-full"  >
                                            <div className={`w-full flex hover:bg-greyblue`}>
                                                <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                                <div className="flex w-[60%] xl:w-[75%] flex-col pl-2 justify-center">
                                                    <p className="text-sm xl:text-base text-white truncate">{item.title}</p>
                                                    <p className="text-xs xl:text-sm text-gray-400">{item.artistsNames}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[30%] hidden lg:block h-full bg-black-200 pt-4 px-6 rounded-sm">
                    <div className="w-full h-1/2">
                        <div className="w-full h-8 text-sm text-gray-200">Các bài hát liên quan</div>
                        <div className="w-full mb-4 overflow-y-auto" style={{ height: 'calc(100% - 32px)' }}>
                            {search?.data?.data?.songs?.map((item) => (
                                <Link to={`/music/track/${item.encodeId}`} className="w-full" >
                                    <div className={`w-full flex hover:bg-greyblue`}>
                                        <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                        <div className="w-[60%] xl:w-[75%] flex flex-col pl-2 justify-center">
                                            <p className="text-sm xl:text-base text-white truncate">{item.title}</p>
                                            <p className="text-xs xl:text-sm text-gray-400">{item.artistsNames}</p>
                                        </div>
                                        <div className={`flex ${item.streamingStatus !== 2 && "hidden"} px-2 justify-end items-center gap-4 text-gray-200`} style={{ width: 'calc(40% - 56px)' }}>
                                            {item.streamingStatus === 2 && (
                                                <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                            )}
                                            {/* <Heart size={18} weight="fill" className="cursor-pointer" /> */}

                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-1/2 pb-2 pt-4 border-t-[1px] border-white-200">
                        <div className="w-full h-8 text-sm text-gray-200">{infoSong?.data?.data?.artistsNames}'s Playlists</div>
                        <div className="w-full pb-2 overflow-y-auto" style={{ height: 'calc(100% - 32px)' }}>

                            {searchArtist?.data?.data?.playlists?.map((item) => (
                                <Link to={`/music/playlist/${item.encodeId}`} className="w-full"  >
                                    <div className={`w-full flex hover:bg-greyblue`}>
                                        <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                        <div className="flex w-[60%] xl:w-[75%] flex-col pl-2 justify-center">
                                            <p className="text-sm xl:text-base text-white truncate">{item.title}</p>
                                            <p className="text-xs xl:text-sm text-gray-400">{item.artistsNames}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackPage;