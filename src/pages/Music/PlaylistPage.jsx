import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Search from "../../components/searchInput/Search";
import { getInfoSong, getLyricsSong, getPlaylist, getTop100 } from "../../redux/slice/Music.slice";
import PlaylistSong from "./PlaylistSong";


const PlaylistPage = ({ isPlaying, setIsPlaying, playingList, setPlayingList, selectedId, setSelectedId }) => {

    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const musicList = useSelector((state) => state.music.musicList);

    const playlist = useSelector((state) => state.music.playlist)

    const infoSong = useSelector((state) => state.music.songInfo)
    const lyricsSong = useSelector((state) => state.music.songLyrics);

    const genre = Cookies.get('genre');

    const [list, setList] = useState()

    useEffect(() => {
        dispatch(getPlaylist({ id: location?.pathname.slice(27) }))
        dispatch(getTop100())
    }, [location?.pathname.slice(27)])

    useEffect(() => {
        document.getElementById("lyricsScroll")?.scrollTo(0, 0);
        document.getElementById("infoScroll")?.scrollTo(0, 0);
    }, [selectedId])

    // useEffect(() => {
    //     console.log(selectedId)
    // }, [selectedId])

    useEffect(() => {
        dispatch(getInfoSong({ id: selectedId }))
        dispatch(getLyricsSong({ id: selectedId }))
    }, [selectedId])

    useEffect(() => {
        let data = [];
        musicList?.data?.data?.map((item) => {
            item.genre.name === genre && item.items.map((item2) => {
                item2.encodeId !== location?.pathname.slice(27) &&
                    data.push(item2)
            })
        })
        setList(data);
    }, [musicList])

    return (
        <>
            <div className="w-full h-full flex gap-4">
                <div className="w-full lg:w-[70%] h-full pb-16 sm:pb-0 bg-black-200 pt-4 px-6 rounded-sm overflow-y-auto">
                    <div className="w-full flex justify-center items-center gap-2 pb-2 border-b-2 border-white-200">
                        <div className="text-base sm:text-2xl w-1/2 text-gray-200">
                            <Link to="/afuproject/music">
                                Music Space
                            </Link>

                        </div>
                        <Search isPlaying={isPlaying} setIsPlaying={setIsPlaying} playingList={playingList} setPlayingList={setPlayingList} />
                    </div>
                    <div className="w-full text-3xl text-white flex justify-start items-center pb-2 gap-4" style={{ height: 'calc(100% - 50px)' }}>
                        <div className="hidden sm:flex w-1/3 h-full flex flex-col pt-4 ">
                            <div className="w-full lg:h-2/3 sm:h-1/2 overflow-y-auto">
                                <div className="w-full h-1/2 lg:h-2/3" style={{ backgroundImage: `url(${playlist?.data?.encodeId === location?.pathname.slice(27) && playlist?.data?.thumbnailM})`, backgroundSize: 'cover' }}></div>
                                <div className="w-full pt-2 text-lg xl:text-xl font-semibold text-gray-200 text-center">{playlist?.data?.title}</div>
                                <div className="w-full pt-2 text-xs xl:text-sm font-semibold text-gray-400 text-center">{playlist?.data?.artistsNames},...</div>

                            </div>
                            <div className="hidden sm:block w-full lg:h-1/3 sm:h-1/2 border-t-[1px] border-white-200 pt-4">
                                <div className="w-full text-sm xl:text-base text-gray-200 underline font-semibold">Gợi ý các playlist khác</div>
                                <div className="w-full pt-2 overflow-y-auto" style={{ height: 'calc(100% - 24px)' }}>
                                    <div className="w-full flex flex-col gap-2">
                                        {list?.map((item) => (
                                            (
                                                <div className="w-full cursor-pointer text-sm xl:text-base flex items-center text-gray-400 hover:text-gray-200"
                                                    onClick={() => navigate({ pathname: `/afuproject/music/playlist/${item.encodeId}` })}
                                                >
                                                    {item.title}
                                                </div>
                                            )
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-2/3 h-full pt-2">
                            <div className="w-full h-[15%] overflow-y-auto text-gray-200 pb-2 border-b-[1px] border-white-200">
                                <div className="text-xs">
                                    <div className="sm:hidden h-16 w-16 m-auto" style={{ backgroundImage: `url(${playlist?.data?.encodeId === location?.pathname.slice(27) && playlist?.data?.thumbnailM})`, backgroundSize: 'cover' }}></div>
                                    <div className="w-full sm:hidden pt-2 text-lg xl:text-xl font-semibold text-gray-200 text-center">{playlist?.data?.title}</div>
                                    <div className="w-full sm:hidden pt-2 text-xs xl:text-sm font-semibold text-gray-400 text-center">{playlist?.data?.artistsNames},...</div>

                                    <span className="font-bold hidden sm:block text-sm xl:text-base">Mô tả: </span>{playlist?.data?.sortDescription}
                                </div>
                            </div>
                            <PlaylistSong playlist={playlist?.data?.song?.items} isPlaying={isPlaying} playingList={playingList} setPlayingList={setPlayingList} setIsPlaying={setIsPlaying}
                                selectedSong={selectedId} setSelectedSong={setSelectedId} />
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
                                <div className="w-full mt-14 2xl:mt-24 xl:mt-20 overflow-y-auto" id="infoScroll" style={{ height: window.innerWidth <= 1024 ? 'calc(100% - 228px)' : 'calc(100% - 288px)' }}>
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

export default PlaylistPage;