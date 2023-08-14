import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getGame } from "../../redux/slice/Game.slice";

const InfoGame = () => {
    const location = useLocation();
    const dispatch = useDispatch()

    const game = useSelector((state) => state.game.game)

    useEffect(() => {
        dispatch(getGame({ idGame: location?.pathname?.slice(7) }))
    }, [location?.pathname?.slice(7)])

    useEffect(() => {
        console.log(location?.pathname?.slice(7))
        console.log(game)
    }, [game])

    return (
        <div className="w-full h-full bg-black-200 p-4">
            <div className="w-full flex justify-start items-center gap-2 pb-2 border-b-2 border-white-200">
                <div className="text-2xl w-1/2 text-gray-200">Games Space</div>

            </div>
            <div className="w-full mt-4 pb-16 sm:pb-0 overflow-y-auto playlistSong" style={{ height: 'calc(100% - 56px)' }}>
                <div className="w-full pb-4">
                    <div className="w-20 h-20 my-2" style={{ backgroundImage: `url(${game?.data[0]?.image})`, backgroundSize: 'cover' }}></div>
                    <div className="w-full text-xl lg:text-base text-gray-200 font-semibold">
                        {game?.data[0]?.name}
                    </div>
                    <div className="w-full text-sm lg:text-xs text-gray-400">Mô tả: {game?.data[0]?.description}</div>
                </div>
                {/* <div style={{ position: 'relative', height: '0', paddingBottom: '56.25%' }}> */}
                <iframe id="embededGame" src={game?.data[0]?.url} scrolling="no" seamless="seamless" frameBorder="0" style={{ width: '100%', height: '100%' }}>Browser not compatible.</iframe>
                {/* </div> */}
            </div>
        </div>
    )
}

export default InfoGame;