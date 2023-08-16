import { CircleNotch, Heart, Pause, Play, RepeatOnce, SkipBack, SkipForward, SpeakerHigh } from "@phosphor-icons/react";
import { Button } from "flowbite-react";
import Cookies from "js-cookie";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentList, addFavouriteList, getFavouriteList, getSong, removeFavouriteList } from "../../redux/slice/Music.slice";

const Player = ({ isOpen, setIsOpen, isPlaying, setIsPlaying, playingList, setPlayingList, selectedId, setSelectedId }) => {
    const dispatch = useDispatch();
    const wrapperRef = useRef(null);
    const song = useSelector((state) => state.music.song)
    const favouriteList = useSelector((state) => state.music.favouriteList)
    const statusFav = useSelector((state) => state.music.statusFav)
    const statusRemove = useSelector((state) => state.music.statusRemove)

    const [selectedSong, setSelectedSong] = useState();

    const [valueAudio, setValueAudio] = useState();
    const [valueVolume, setValueVolume] = useState();

    const [hover, setHover] = useState(false);
    const [duration, setDuration] = useState()

    const [arrayList, setArrayList] = useState()

    const [isRepeatOnce, setIsRepeatOnce] = useState(false)

    let audio = document.getElementById('myAudio');

    const token = Cookies.get('tokenId')

    const [arrayIdx, setArrayIdx] = useState([]);

    useEffect(() => {
        dispatch(getFavouriteList({ id: token }))
    }, [statusFav, statusRemove, playingList])

    useEffect(() => {
        selectedSong && audio?.play() && setIsPlaying(true)
    }, [selectedSong])

    useEffect(() => {
        isPlaying ? audio?.play() : audio?.pause()
    }, [isPlaying])

    useEffect(() => {
        const loop = setInterval(() => {
            setValueAudio(audio?.currentTime)
        }, 1000)

    }, [audio])

    useEffect(() => {
        setSelectedId(playingList?.item?.encodeId)
        dispatch(getSong({ id: playingList?.item?.encodeId }))
        playingList?.item?.encodeId && dispatch(addCurrentList({
            title: playingList?.item?.title,
            artist: playingList?.item?.artistsNames,
            image: playingList?.item?.thumbnailM ? playingList?.item?.thumbnailM : playingList?.item?.thumbnail,
            userId: token,
            encodeId: playingList?.item?.encodeId
        }))
    }, [playingList?.item?.encodeId])

    useEffect(() => {
        if (song?.data?.data) {
            setSelectedSong(song?.data?.data[128])
        }
    }, [playingList?.item?.encodeId, song])

    useEffect(() => {
        setDuration(document.getElementById("myAudio")?.duration)
    }, [playingList, document.getElementById("myAudio")?.duration])

    useEffect(() => {
        setArrayList(playingList?.playlist?.filter(x => x.streamingStatus !== 2))
    }, [playingList?.playlist, selectedId])

    useEffect(() => {
        let arr = []
        playingList?.playlist?.map((item, idx) => {
            favouriteList?.data?.map((item2) => {
                item.encodeId === item2.encodeId && arr.push(idx)
            })
        })

        setArrayIdx(arr)
    }, [playingList, favouriteList])

    useEffect(() => {
        console.log(selectedSong)
    }, [selectedSong])

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                // alert("You clicked outside of me!");
                console.log("You clicked outside of me!")
                setIsOpen(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);


    const repeatAudio = () => {
        audio.currentTime = '0'
        audio.play()
    }
    const handleNextSong = () => {
        let nextIndex = 0;
        playingList?.playlist?.map((item, idx) => {
            if (item.encodeId === playingList?.item?.encodeId)
                nextIndex = idx;
        })
        if (playingList?.playlist?.length - 1 === nextIndex) {
            setPlayingList({ ...playingList, item: playingList?.playlist[0] })
        }
        else
            setPlayingList({ ...playingList, item: playingList?.playlist[nextIndex + 1] })


    }

    const handlePreSong = () => {

        let nextIndex = 0;
        playingList?.playlist?.map((item, idx) => {
            if (item.encodeId === playingList?.item?.encodeId)
                nextIndex = idx;
        })

        if (nextIndex === 0) {
            setPlayingList({ ...playingList, item: playingList?.playlist[playingList?.playlist?.length - 1] })
        }
        else
            setPlayingList({ ...playingList, item: playingList?.playlist[nextIndex - 1] })

    }

    const setValue = (e) => {
        audio?.pause()
        audio.currentTime = e.target.value
        setValueAudio(e.target.value)
    }

    const setVolumn = (e) => {
        audio.volume = parseInt(e.target.value) / 100;
        setValueVolume(parseInt(e.target.value))
    }

    const handleClick = () => {
        setIsOpen(true)
    }

    return (
        <>
            {token && selectedId && (
                <>
                    <audio className="" id="myAudio" controls src={`${selectedSong}`} onEnded={isRepeatOnce ? repeatAudio : handleNextSong} >
                    </audio>
                    {hover && (
                        <div className={`hidden sm:block w-full h-56 rounded-md bg-black p-2 overflow-y-auto`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                            {playingList?.playlist?.map((item, idx) => (
                                <div className={`w-full flex ${selectedId === item.encodeId ? "bg-greyblue hover:bg-grey-blue" : "hover:bg-blue-velvet"} `}>
                                    <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                    <div className="w-[60%] flex flex-col pl-2 justify-center">
                                        <p className="text-base text-white truncate">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.artistsNames}</p>
                                    </div>
                                    <div className="flex px-2 justify-end items-center gap-4 text-gray-200" style={{ width: 'calc(40% - 56px)' }}>
                                        {item.streamingStatus === 2 && (
                                            <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                        )}

                                        {arrayIdx?.includes(idx) ? (
                                            <Heart size={18} weight="fill" className="cursor-pointer text-pink-velvet" onClick={() => dispatch(removeFavouriteList({
                                                userId: token,
                                                encodeId: item.encodeId
                                            }))} />
                                        ) : (
                                            <Heart size={18} weight="fill" className="cursor-pointer" onClick={() => dispatch(addFavouriteList({
                                                title: item.title,
                                                artist: item.artistsNames,
                                                image: item.thumbnailM ? item.thumbnailM : item.thumbnail,
                                                userId: token,
                                                encodeId: item.encodeId
                                            }))} />

                                        )}

                                        {/* <Heart size={18} weight="fill" className="cursor-pointer" /> */}
                                        {selectedId === item.encodeId ?
                                            isPlaying ? (
                                                <Pause size={18} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(false)} />
                                            ) : (
                                                <Play size={18} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(true)} />

                                            )
                                            : (
                                                <Play size={18} weight="fill" className="cursor-pointer" onClick={() => item.streamingStatus !== 2 && setPlayingList({ playlist: arrayList, item: item }) && setIsPlaying(true)} />

                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className={`hidden sm:flex overflow-hidden justify-center gap-2 items-center transition-all duration-300 p-2 ease-in-out h-16 bg-white rounded-full ${hover ? "w-full opacity-100" : "w-16 opacity-30"}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <div className="w-12 h-12 rounded-full" style={{ backgroundImage: `url(${playingList?.item?.thumbnail})`, backgroundSize: 'cover' }} ></div>
                        {hover && (
                            <>
                                <div className="h-full flex flex-col justify-center w-[30%]" onClick={() => setHover(true)}>
                                    <p className="text-base truncate">{playingList?.item?.title}</p>
                                    <p className="text-sm text-gray-400 truncate">{playingList?.item?.artistsNames}</p>
                                </div>
                                <div className="flex flex-col gap-2 h-full justify-center items-center w-[30%]" onClick={() => setHover(true)}>
                                    <div className="w-full relative flex justify-start items-center">
                                        <SpeakerHigh size={16} weight="fill" className="cursor-pointer" />
                                        <input type="range"
                                            className="w-14"
                                            value={valueVolume ? valueVolume : 100}
                                            onChange={setVolumn} id="volume" name="volume" min="0" max="100" />
                                        {isRepeatOnce ? (
                                            <RepeatOnce size={16} className="cursor-pointer absolute right-0 top-0" onClick={() => setIsRepeatOnce(!isRepeatOnce)} />

                                        ) : (
                                            <RepeatOnce size={16} className="cursor-pointer text-gray-400 absolute right-0 top-0" onClick={() => setIsRepeatOnce(!isRepeatOnce)} />

                                        )}

                                    </div>
                                    <input type="range" onMouseUp={() => audio?.play()}
                                        value={valueAudio}
                                        className="w-full"
                                        onChange={setValue} id="slideAudio" name="vslideAudio" min="0" max={`${audio?.duration}`} />

                                </div>
                                <div className="h-full flex hover:flex justify-center items-center" style={{ width: 'calc(40% - 56px)' }}>
                                    {duration ? (
                                        <SkipBack size={24} weight="fill" className="cursor-pointer" onClick={handlePreSong} />

                                    ) : (
                                        <SkipBack size={24} weight="fill" className="cursor-pointer text-gray-400" />

                                    )}
                                    {duration ?
                                        isPlaying ? <Pause size={24} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} /> : <Play size={24} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} />

                                        :
                                        (
                                            <div className="animate-spin">
                                                <CircleNotch size={24} />
                                            </div>
                                        )
                                    }

                                    {duration ? (
                                        <SkipForward size={24} weight="fill" className="cursor-pointer" onClick={handleNextSong} />

                                    ) : (
                                        <SkipForward size={24} weight="fill" className="cursor-pointer text-gray-400" />
                                    )}

                                </div>
                            </>
                        )}
                    </div>

                    <div ref={wrapperRef} className={`w-full ${isOpen ? "opacity-100" : "opacity-30"} sm:hidden`} onClick={handleClick} >
                        {isOpen && (
                            <div className={`w-full h-56 rounded-md bg-black p-2 overflow-y-auto`}>
                                {playingList?.playlist?.map((item, idx) => (
                                    <div className={`w-full flex ${selectedId === item.encodeId ? "bg-greyblue hover:bg-grey-blue" : "hover:bg-blue-velvet"} `}>
                                        <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                        <div className="w-[60%] flex flex-col pl-2 justify-center">
                                            <p className="text-base text-white truncate">{item.title}</p>
                                            <p className="text-sm text-gray-400">{item.artistsNames}</p>
                                        </div>
                                        <div className="flex px-2 justify-end items-center gap-4 text-gray-200" style={{ width: 'calc(40% - 56px)' }}>
                                            {item.streamingStatus === 2 && (
                                                <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                            )}

                                            {arrayIdx?.includes(idx) ? (
                                                <Heart size={18} weight="fill" className="cursor-pointer text-pink-velvet" onClick={() => dispatch(removeFavouriteList({
                                                    userId: token,
                                                    encodeId: item.encodeId
                                                }))} />
                                            ) : (
                                                <Heart size={18} weight="fill" className="cursor-pointer" onClick={() => dispatch(addFavouriteList({
                                                    title: item.title,
                                                    artist: item.artistsNames,
                                                    image: item.thumbnailM ? item.thumbnailM : item.thumbnail,
                                                    userId: token,
                                                    encodeId: item.encodeId
                                                }))} />

                                            )}

                                            {/* <Heart size={18} weight="fill" className="cursor-pointer" /> */}
                                            {selectedId === item.encodeId ?
                                                isPlaying ? (
                                                    <Pause size={18} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(false)} />
                                                ) : (
                                                    <Play size={18} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(true)} />

                                                )
                                                : (
                                                    <Play size={18} weight="fill" className="cursor-pointer" onClick={() => item.streamingStatus !== 2 && setPlayingList({ playlist: arrayList, item: item }) && setIsPlaying(true)} />

                                                )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className={`flex overflow-hidden justify-center gap-2 items-center transition-all duration-300 p-2 ease-in-out h-16 bg-white rounded-full `} >
                            <div className="w-12 h-12 rounded-full" style={{ backgroundImage: `url(${playingList?.item?.thumbnail})`, backgroundSize: 'cover' }} ></div>
                            {isOpen && (
                                <>
                                    <div className="h-full flex flex-col justify-center w-[30%]" onClick={() => setHover(true)}>
                                        <p className="text-base truncate">{playingList?.item?.title}</p>
                                        <p className="text-sm text-gray-400 truncate">{playingList?.item?.artistsNames}</p>
                                    </div>
                                    <div className="flex flex-col gap-2 h-full justify-center items-center w-[30%]" onClick={() => setHover(true)}>
                                        <div className="w-full relative flex justify-start items-center">
                                            <SpeakerHigh size={16} weight="fill" className="cursor-pointer" />
                                            <input type="range"
                                                className="w-14"
                                                value={valueVolume ? valueVolume : 100}
                                                onChange={setVolumn} id="volume" name="volume" min="0" max="100" />
                                            {isRepeatOnce ? (
                                                <RepeatOnce size={16} className="cursor-pointer absolute right-0 top-0" onClick={() => setIsRepeatOnce(!isRepeatOnce)} />

                                            ) : (
                                                <RepeatOnce size={16} className="cursor-pointer text-gray-400 absolute right-0 top-0" onClick={() => setIsRepeatOnce(!isRepeatOnce)} />

                                            )}

                                        </div>
                                        <input type="range" onMouseUp={() => audio?.play()}
                                            value={valueAudio}
                                            className="w-full"
                                            onChange={setValue} id="slideAudio" name="vslideAudio" min="0" max={`${audio?.duration}`} />

                                    </div>
                                    <div className="h-full flex hover:flex justify-center items-center" style={{ width: 'calc(40% - 56px)' }}>
                                        {duration ? (
                                            <SkipBack size={24} weight="fill" className="cursor-pointer" onClick={handlePreSong} />

                                        ) : (
                                            <SkipBack size={24} weight="fill" className="cursor-pointer text-gray-400" />

                                        )}
                                        {duration ?
                                            isPlaying ? <Pause size={24} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} /> : <Play size={24} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} />

                                            :
                                            (
                                                <div className="animate-spin">
                                                    <CircleNotch size={24} />
                                                </div>
                                            )
                                        }

                                        {duration ? (
                                            <SkipForward size={24} weight="fill" className="cursor-pointer" onClick={handleNextSong} />

                                        ) : (
                                            <SkipForward size={24} weight="fill" className="cursor-pointer text-gray-400" />
                                        )}

                                    </div>
                                </>
                            )}


                        </div>
                    </div>

                </>
            )}


        </>
    )
}

export default Player;