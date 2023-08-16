import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTop100 } from "../../redux/slice/Music.slice";
import { MinusSquare } from '@phosphor-icons/react'
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const TopPlaylist = () => {
    const dispatch = useDispatch();

    const musicList = useSelector((state) => state.music.musicList);

    const [setList, setSetlist] = useState();

    const array = ['#0000004d', '#313466', '#504096', '#964EC2', '#FE9677']

    useEffect(() => {
        dispatch(getTop100())
    }, [])

    return (
        <>
            <div className="flex gap-4 mb-2">
                {musicList?.data?.data?.map((item, idx) => (
                    <>

                        <div className="w-24 h-16 2xl:w-32 2xl:h-28 xl:w-28 xl:h-24 lg:w-24 lg:h-20 rounded-sm border-[1px] border-white-200 text-gray-200 flex text-center justify-center items-center lg:text-base sm:text-sm px-2 cursor-pointer"
                            onClick={() => setSetlist(item.items)}
                            style={{ backgroundColor: `${idx <= array.length && array[idx]}` }}
                        >
                            <div className="w-full h-full flex text-center justify-center items-center text-sm 2xl:text-base xl:text-sm lg:text-xs px-2 cursor-pointer" onClick={() => Cookies.set('genre', item.genre.name)}>
                                {item.title}
                            </div>

                        </div>
                    </>
                ))}
            </div>
            <div className={`relative w-full rounded-sm flex gap-4 p-4 mb-4 flex-wrap ${setList && "border-2 border-white-200"}`}>
                {setList?.map((item) => (
                    <>
                        <Link to={`/afuproject/music/playlist/${item.encodeId}`} className="lg:w-24 lg:h-20 sm:w-20 sm:h-16">
                            <div className=" w-20 h-16 lg:w-24 lg:h-20 rounded-sm overflow-hidden text-gray-200 border-[1px] border-white-200 flex justify-center items-center px-2 text-center" style={{ fontSize: '10px' }}
                            >
                                {(item.title.slice(8)).slice(-(item.title.length), -9)}
                            </div>
                        </Link>


                    </>
                ))}
                <div className={`${!setList && "hidden"} absolute right-0 top-0 text-gray-200 cursor-pointer`} onClick={() => setSetlist()}>
                    <MinusSquare size={14} />
                </div>
            </div>

        </>
    )
}

export default TopPlaylist;