import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentList, getHome, getTop100 } from "../../redux/slice/Music.slice";
import TopGame from "./TopGame";
import TopPlaylist from "./TopPlaylist";

import './style.css'
import { Carousel } from "flowbite-react";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentGameList } from "../../redux/slice/Game.slice";
import { SignOut } from "@phosphor-icons/react";

const Home = ({ selectedId, setIsPlaying, setSelectedId }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const currentList = useSelector((state) => state.music.currentList)
    const home = useSelector((state) => state.music.home)

    const currentGameList = useSelector((state) => state.game.currentGameList)


    const token = Cookies.get('tokenId')

    const [typeList, setTypeList] = useState('track')

    useEffect(() => {
        dispatch(getHome())
    }, [])

    useEffect(() => {
        dispatch(getCurrentList({ id: token }))
        dispatch(getCurrentGameList({ id: token }))
    }, [selectedId])

    const logOut = () => {
        Cookies.remove('tokenId');
        setSelectedId()
        setIsPlaying(false)
        navigate({ pathname: '/login' })
    }

    return (
        <>
            <div className="w-full h-full pb-16 sm:pb-0 overflow-y-auto lg:flex lg:gap-4 playlistSong">
                <div className="lg:w-[70%] lg:h-full sm:w-full bg-black-200 pt-4 px-6 rounded-sm overflow-y-auto">
                    <div className="w-full flex flex-col justify-center items-start gap-2 pb-2 border-b-2 border-white-200">
                        <div className="text-2xl text-gray-200">Admin</div>
                        <div className="text-base text-gray-200">admin@gmail.com</div>
                        <div className="w-full block sm:hidden p-2 bg-greyblue flex justify-center items-center cursor-pointer text-gray-200 gap-4"
                            onClick={logOut}
                        >
                            <SignOut size={24} weight="fill" />
                            <div className="flex justify-start items-center lg:text-sm xl:text-base 2xl:text-base">Logout</div>

                        </div>
                    </div>
                    <div className="w-full mt-4 mb-4 text-xl 2xl:text-3xl xl:text-2xl text-white flex justify-start items-center pb-2">
                        Are there any interesting today?
                    </div>
                    <div className="text-xl 2xl:text-2xl xl:text-xl text-pink-velvet font-semibold mb-4">Top Playlist</div>
                    <div className="w-full overflow-x-auto mb-4">
                        <TopPlaylist />
                    </div>
                    <div className="w-full mb-4">
                        <div className="text-xl 2xl:text-2xl xl:text-xl text-pink-velvet font-semibold mb-4">Trending color today?</div>
                        <div className="w-full flex flex-col justify-center items-start gap-2">
                            <div className="2xl:text-xl xl:text-lg text-gray-200">Purple Pink</div>
                            <div className="w-full h-8 text-sm text-white bg-purple-velvet flex justify-center items-center">
                                #964EC2
                            </div>
                            <div className="w-full pt-2 text-gray-200" style={{ fontSize: '13px' }}>
                                Purple pink is a color that inspires many beautiful love stories, unconditional love. Purple in love also shows lightness, softness. Hidden deep inside as a desire for fidelity.
                            </div>
                            <div className="w-full text-gray-200" style={{ fontSize: '13px' }}>
                                Purple pink is the color combined from red and blue. Purple symbolizes noble, luxurious and also associated with magical images, mysterious magic.                            </div>
                        </div>
                    </div>
                    <div className="w-full pt-4 mb-4">
                        <div className="text-xl 2xl:text-2xl xl:text-xl text-pink-velvet font-semibold my-4">Trending game</div>
                        <div className="w-full overflow-x-auto mb-4">
                            <TopGame />
                        </div>
                    </div>
                </div>
                <div className=" lg:w-[30%] lg:h-full w-full h-2/3 bg-black-200 pt-4 px-6 rounded-sm">
                    <div className="w-full h-2/3 border-b-[1px] border-gray-200">
                        <div className="w-full flex gap-2 mb-4" style={{ height: '25px' }}>
                            <div className="text-xs rounded-full 2xl:text-sm xl:text-xs bg-gray-200 px-4 flex justify-center items-center cursor-pointer" style={{ paddingBottom: '2px' }} onClick={() => setTypeList('track')}>Current Track</div>
                            <div className="text-xs rounded-full 2xl:text-sm xl:text-xs bg-gray-200 px-4 flex justify-center items-center cursor-pointer" style={{ paddingBottom: '2px' }} onClick={() => setTypeList('games')}>Current Games</div>
                        </div>
                        <div className="w-full overflow-y-auto" style={{ height: 'calc(100% - 41px)' }}>
                            {typeList === 'track' && currentList?.data?.map((item) => (
                                <Link to={`/music/track/${item.encodeId}`} className="w-full" >
                                    <div className={`w-full flex hover:bg-greyblue`}>
                                        <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                        <div className="flex flex-col pl-2 justify-center" style={{ width: 'calc(100% - 56px)' }}>
                                            <p className="text-sm 2xl:text-base xl:text-sm text-white truncate">{item.title}</p>
                                            <p className="text-xs 2xl:text-sm xl:text-xs text-gray-400">{item.artistsNames}</p>
                                        </div>

                                    </div>
                                </Link>
                            ))}

                            {typeList === 'games' && currentGameList?.data?.map((item) => (
                                <Link to={`/games/${item.id}`} className="w-full" >
                                    <div className={`w-full flex hover:bg-greyblue`}>
                                        <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover' }}></div>
                                        <div className="flex flex-col pl-2 justify-center" style={{ width: 'calc(100% - 56px)' }}>
                                            <p className="text-sm 2xl:text-base xl:text-sm text-white truncate">{item.name}</p>
                                            {item.adFree === 1 && (
                                                <div className="text-xs 2xl:text-sm xl:text-xs px-2 bg-green-400 text-gray-50 w-fit rounded-sm">AdFree</div>
                                            )}
                                        </div>

                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="w-full h-1/3 py-4">
                        <Carousel>
                            {home?.data?.data?.items[0]?.items?.map((item) =>
                                item.type === 1 ? (
                                    <Link to={`/music/track/${item.encodeId}`} className="w-full">
                                        <img
                                            alt="..."
                                            src={`${item.banner}`}
                                            className="rounded-sm"
                                        />
                                    </Link>
                                ) :
                                    item.type === 4 && (
                                        <Link to={`/music/playlist/${item.encodeId}`} className="w-full">
                                            <img
                                                alt="..."
                                                src={`${item.banner}`}
                                                className="rounded-sm"
                                            />
                                        </Link>
                                    )
                            )}
                        </Carousel>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home;