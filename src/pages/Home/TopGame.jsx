import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllGame } from "../../redux/slice/Game.slice";

import './style.css'
const TopGame = () => {

    const dispatch = useDispatch()
    const gameList = useSelector((state) => state.game.gameList)

    const [setList, setSetList] = useState();

    useEffect(() => {
        dispatch(getAllGame())
    }, [])

    return (
        <>
            <div className="flex gap-4 ">
                {gameList?.data?.map((item) => (
                    <Link to={`/afuproject/games/${item.id}`} className="w-32 p-2 flex flex-col items-center justify-start">
                        <div className="w-20 h-20 lg:w-24 lg:h-24" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover' }}></div>
                        <div className="w-full pt-2 text-center text-xs lg:text-sm text-white">{item.name}</div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default TopGame;