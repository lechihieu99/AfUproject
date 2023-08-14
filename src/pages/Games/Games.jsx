import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCurrentGameList, getAllGame } from "../../redux/slice/Game.slice";

const Games = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const gameList = useSelector((state) => state.game.gameList)

    const token = Cookies.get('tokenId')
    useEffect(() => {
        dispatch(getAllGame())
    }, [])

    return (
        <div className="w-full h-full bg-black-200 p-4 overflow-y-auto playlistSong">
            <div className="w-full flex justify-start items-center gap-2 pb-2 border-b-2 border-white-200">
                <div className="text-2xl w-1/2 text-gray-200">Games Space</div>

            </div>
            <div className="w-full mt-4" style={{ height: 'calc(100% - 56px)' }}>
                <div className="w-full flex flex-wrap pb-16 sm:pb-0">
                    {gameList?.data?.map((item) => (
                        <div className="w-full sm:w-1/2 cursor-pointer" onClick={() => dispatch(addCurrentGameList({
                            id: item.id,
                            name: item.name,
                            image: item.image,
                            url: item.url,
                            description: item.description,
                            userId: token
                        })) && navigate({ pathname: `/games/${item.id}` })}>
                            <div className="w-full hover:bg-greyblue gap-4 p-2 flex justify-start items-center">
                                <div className="w-20 h-20 lg:w-16 lg:h-16" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover' }}></div>
                                <div>
                                    {item.adFree === 1 && (
                                        <div className="text-xs lg:text-sm px-2 bg-green-400 text-gray-50 w-fit rounded-md">AdFree</div>
                                    )}
                                    <div className="text-sm 2xl:text-xl xl:text-base lg:text-sm text-gray-200 font-semibold">{item.name}</div>

                                </div>
                            </div>

                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Games;