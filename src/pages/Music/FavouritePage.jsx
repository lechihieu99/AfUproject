import { Heart } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "../../components/searchInput/Search";
import { getFavouriteList, getInfoSong, getLyricsSong } from "../../redux/slice/Music.slice";
import PlaylistSong from "./PlaylistSong";



const FavouritePage = ({ isPlaying, setIsPlaying, playingList, setPlayingList, selectedId, setSelectedId }) => {

    // const location = useLocation();
    // const navigate = useNavigate()
    const dispatch = useDispatch();

    // const musicList = useSelector((state) => state.music.musicList);

    // const playlist = useSelector((state) => state.music.playlist)

    const favouriteList = useSelector((state) => state.music.favouriteList)
    const infoSong = useSelector((state) => state.music.songInfo)
    const lyricsSong = useSelector((state) => state.music.songLyrics);

    const token = Cookies.get('tokenId')
    // const genre = Cookies.get('genre');

    // const [list, setList] = useState()

    useEffect(() => {
        document.getElementById("lyricsScroll")?.scrollTo(0, 0);
        document.getElementById("infoScroll")?.scrollTo(0, 0);
    }, [selectedId])

    useEffect(() => {
        dispatch(getFavouriteList({ id: token }))
    }, [])

    useEffect(() => {
        dispatch(getInfoSong({ id: selectedId }))
        dispatch(getLyricsSong({ id: selectedId }))
    }, [selectedId])

    // useEffect(() => {
    //     let data = [];
    //     musicList?.data?.data?.map((item) => {
    //         item.genre.name === genre && item.items.map((item2) => {
    //             item2.encodeId !== location?.pathname.slice(16) &&
    //                 data.push(item2)
    //         })
    //     })
    //     setList(data);
    // }, [musicList])

    return (
        <>
            <div className="w-full h-full flex gap-4">
                <div className="w-[70%] h-full bg-black-200 pt-4 px-6 rounded-sm overflow-y-auto">
                    <div className="w-full flex justify-center items-center gap-2 pb-2 border-b-2 border-white-200">
                        <div className="text-base sm:text-2xl w-1/2 text-gray-200">
                            <Link to="/afuproject/music">
                                Music Space
                            </Link>

                        </div>
                        <Search isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} />
                    </div>
                    <div className="w-full text-3xl text-white flex justify-start items-center pb-2 gap-4" style={{ height: 'calc(100% - 50px)' }}>
                        <div className="w-1/3 h-full flex flex-col pt-4 ">
                            <div className="w-full h-2/3 overflow-y-auto">
                                <div className="w-full h-2/3 bg-blue-velvet flex justify-center items-center" >
                                    <Heart size={32} weight="fill" className="text-pink-velvet" />
                                </div>
                                <div className="w-full pt-2 text-xl font-semibold text-gray-200 text-center">Danh sách yêu thích</div>
                                <div className="w-full pt-2 text-sm font-semibold text-gray-400 text-center">Nhiều nghệ sĩ</div>

                            </div>
                            {/* <div className="w-full h-1/3 border-t-[1px] border-white-200 pt-4">
                                <div className="w-full text-base text-gray-200 underline font-semibold">Recommend other playlists</div>
                                <div className="w-full pt-2 overflow-y-auto" style={{ height: 'calc(100% - 24px)' }}>
                                    <div className="w-full flex flex-col gap-2">
                                        {list?.map((item) => (
                                            (
                                                <div className="w-full cursor-pointer text-base flex items-center text-gray-400 hover:text-gray-200"
                                                    onClick={() => navigate({ pathname: `/music/playlist/${item.encodeId}` })}
                                                >
                                                    {item.title}
                                                </div>
                                            )
                                        ))}
                                    </div>

                                </div>
                            </div> */}
                        </div>
                        <div className="w-2/3 h-full pt-2">
                            <div className="w-full h-[15%] overflow-y-auto text-gray-200 pb-2 border-b-[1px] border-white-200">
                                <div className="text-sm">
                                    <span className="font-bold text-base">Mô tả: </span>Playlist bao gồm các bài hát mà bạn đã nghe qua
                                </div>
                            </div>
                            <PlaylistSong playlist={favouriteList?.data} isPlaying={isPlaying} playingList={playingList} setPlayingList={setPlayingList} setIsPlaying={setIsPlaying}
                                selectedSong={selectedId} setSelectedSong={setSelectedId} />
                        </div>
                    </div>
                </div>
                <div className="w-[30%] h-full bg-black-200 pt-2 px-2 rounded-sm">
                    {selectedId ? (

                        <div className="w-full h-full p-4 flex flex-col gap-4">
                            <div className="w-full h-1/2 relative border-b-[1px] border-gray-200">
                                <div className="w-full h-12 text-lg text-bold text-gray-200">Thông tin bài hát bạn đang nghe</div>
                                <div className="w-full h-36" style={{ backgroundImage: `url(${infoSong?.data?.data?.album?.thumbnail})`, backgroundSize: 'cover' }}></div>
                                <div className="w-full absolute 2xl:top-24 xl:top-32 flex justify-center items-center">
                                    <div className="2xl:w-48 2xl:h-48 xl:w-32 xl:h-32 rounded-full border-2 border-gray-200" style={{ backgroundImage: `url(${infoSong?.data?.data?.thumbnailM})`, backgroundSize: 'cover' }}></div>
                                </div>
                                <div className="w-full 2xl:mt-24 xl:mt-20 overflow-y-auto" id="infoScroll" style={{ height: 'calc(100% - 288px)' }}>
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

export default FavouritePage;