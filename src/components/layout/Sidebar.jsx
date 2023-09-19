import React from "react";
import { useState } from "react";
import { GameController, Guitar, SignOut, HouseLine, List, X, UserCircle, UsersThree } from '@phosphor-icons/react'
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const menu = [
    {
        id: 0,
        icon: <HouseLine size={window.innerWidth <= 1024 ? 20 : 28} weight="fill" />,
        title: 'Home',
        link: '/afuproject'
    },
    {
        id: 1,
        icon: <GameController size={window.innerWidth <= 1024 ? 20 : 28} weight='fill' />,
        title: 'Games',
        link: '/afuproject/games'
    },
    {
        id: 2,
        icon: <Guitar size={window.innerWidth <= 1024 ? 20 : 28} weight="fill" />,
        title: 'Music',
        link: '/afuproject/music'
    },
    {
        id: 3,
        icon: <UsersThree size={window.innerWidth <= 1024 ? 20 : 28} weight="fill" />,
        title: 'Cộng đồng',
        link: `/afuproject/community`
    },
]

const Sidebar = ({ setLocation, setSelectedId, setIsPlaying }) => {
    const [hover, setHover] = useState(false)
    const navigate = useNavigate();

    const [open, setOpen] = useState(false)

    let audio = document.getElementById("myAudio");

    const logOut = () => {
        Cookies.remove('tokenId');
        setSelectedId()
        setIsPlaying(false)
        navigate({ pathname: '/afuproject/login' })
    }
    return (
        <>

            {/* <div className="w-[10%] text-gray-200 sm:hidden absolute bottom-20 right-0 z-50">
                {!open ? (
                    <List size={32} onClick={() => setOpen(true)} />
                ) : (
                    <X size={32} onClick={() => setOpen(false)} />
                )}
            </div> */}


            <div className="fixed sm:hidden bottom-0 left-0 z-50 w-full h-16 bg-blue-velvet border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    {menu.map((item) => (
                        <>
                            <Link to={item.link} className='inline-flex flex-col items-center justify-center hover:bg-greyblue dark:hover:bg-gray-800 group' onClick={() => setHover(false)}>
                                <div className="w-full rounded-md flex flex-col sm:flex-row justify-center items-center gap-4 p-2 text-gray-200 hover:bg-greyblue hover:text-white cursor-pointer">
                                    <div className="w-fit hidden sm:block">
                                        {item.icon}
                                    </div>

                                    <div className="w-full block sm:hidden flex flex-col justify-center items-center">
                                        {item.icon}
                                        <div className="flex justify-start items-center text-xs lg:text-sm xl:text-base 2xl:text-base">{item.title}</div>
                                    </div>

                                    {hover && (
                                        <div className="flex justify-start items-center lg:text-sm xl:text-base 2xl:text-base">{item.title}</div>

                                    )}
                                </div>
                            </Link>
                        </>
                    ))}
                    {/* <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Home</span>
                    </button>
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                            <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Wallet</span>
                    </button>
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Settings</span>
                    </button>
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Profile</span>
                    </button> */}
                </div>
            </div>


            {/* <div className={`${open ? 'w-[80%] xl:w-72 sm:w-56' : 'hidden w-full xl:w-20 sm:w-14'} h-16 sm:h-screen bg-blue-velvet rounded-md absolute left-4 bottom-16 sm:hidden sm:top-0 z-40`}
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
                                            <div className="flex justify-start items-center text-xs lg:text-sm xl:text-base 2xl:text-base">{item.title}</div>
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

            </div> */}

            <div className={`${hover ? 'w-full xl:w-72 sm:w-56' : 'w-full xl:w-20 sm:w-14'} h-16 sm:h-screen bg-blue-velvet absolute left-0 hidden sm:block sm:top-0 z-40`}
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
        </>
    )
}

export default Sidebar;