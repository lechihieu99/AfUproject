import React from "react";
import { useState } from "react";
import { GameController, Guitar, SignOut, HouseLine } from '@phosphor-icons/react'
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const menu = [
    {
        id: 0,
        icon: <HouseLine size={window.innerWidth <= 1024 ? 20 : 28} weight="fill" />,
        title: 'Home',
        link: '/'
    },
    {
        id: 1,
        icon: <GameController size={window.innerWidth <= 1024 ? 20 : 28} weight='fill' />,
        title: 'Games',
        link: '/games'
    },
    {
        id: 2,
        icon: <Guitar size={window.innerWidth <= 1024 ? 20 : 28} weight="fill" />,
        title: 'Music Space',
        link: '/music'
    },
]

const Sidebar = ({ setLocation, setSelectedId, setIsPlaying }) => {
    const [hover, setHover] = useState(false)
    const navigate = useNavigate();

    let audio = document.getElementById("myAudio");

    const logOut = () => {
        Cookies.remove('tokenId');
        setSelectedId()
        setIsPlaying(false)
        navigate({ pathname: '/login' })
    }
    return (
        <div className={`${hover ? 'w-full xl:w-72 sm:w-56' : 'w-full xl:w-20 sm:w-14'} h-16 sm:h-screen bg-blue-velvet absolute left-0 bottom-0 sm:top-0 z-50`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div className="relative w-full h-full flex flex-row sm:flex-col justify-start items-center sm:p-4 lg:px-2 gap-8">
                <div className={`hidden sm:flex w-12 h-12 text-gray-200 text-xl border-[1px] border-pink-velvet justify-center items-center rounded-full`}>AfU</div>
                <div className="w-full flex flex-row sm:flex-col items-center gap-2">
                    {menu.map((item) => (
                        <>
                            <Link to={item.link} className='w-full' onClick={() => setHover(false)}>
                                <div className="w-full rounded-md flex flex-col sm:flex-row justify-center items-center gap-4 p-2 text-gray-200 hover:bg-greyblue hover:text-white cursor-pointer">
                                    <div className="w-fit hidden sm:block">
                                        {item.icon}
                                    </div>

                                    <div className="w-full block sm:hidden flex flex-col justify-center items-center">
                                        {item.icon}
                                        <div className="flex justify-start items-center lg:text-sm xl:text-base 2xl:text-base">{item.title}</div>
                                    </div>

                                    {hover && (
                                        <div className="flex justify-start items-center lg:text-sm xl:text-base 2xl:text-base">{item.title}</div>

                                    )}
                                </div>
                            </Link>
                        </>
                    ))}

                </div>
                <div className="w-full p-2 bg-greyblue flex justify-center items-center absolute bottom-0 left-0 cursor-pointer text-gray-200 gap-4 hidden sm:flex"
                    onClick={logOut}
                >
                    <SignOut size={24} weight="fill" />
                    {hover && (
                        <div className="flex justify-start items-center lg:text-sm xl:text-base 2xl:text-base">Logout</div>

                    )}
                </div>
            </div>

        </div>
    )
}

export default Sidebar;