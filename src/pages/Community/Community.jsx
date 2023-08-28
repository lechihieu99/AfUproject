import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { MagnifyingGlass, Image, VideoCamera, Flag } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slice/User.slice";
import Status from "./Status";
import { getAllStatus } from "../../redux/slice/Status.slice";
import ModalStatus from "../../components/modalStatus/ModalStatus";
import { useState } from "react";
import { images } from "../../constants/GetImages";
import Modal404 from "../../components/modal404/Modal404";


const Community = ({ showImage, setShowImage, setImage }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')
    const user = useSelector((state) => state.user.user)
    const allStatus = useSelector((state) => state.status.allStatus)

    const [showStatus, setShowStatus] = useState(false)
    const [showNotFound, setShowNotFound] = useState(false)

    useEffect(() => {
        dispatch(getUser({ tokenId: token }))
        dispatch(getAllStatus())
    }, [])

    const handleSearch = () => {

    }

    return (
        <>
            <div className="w-full h-full flex">
                {/* <Link to={`/afuproject/${token}`} className="p-4 bg-gray-200">Trang ca nhan</Link> */}
                <div className="w-1/4 h-full pr-2">
                    <div className="w-full h-full bg-black-200 p-4 rounded-t-md">
                        <div className="w-full relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <MagnifyingGlass size={16} className="text-white" />
                            </div>
                            <input type="search" id="default-search"
                                onChange={handleSearch}
                                className="block w-full p-2 pl-10 text-sm text-white placeholder:text-gray-200 border border-blue-velvet rounded-lg bg-white-200 focus:ring-greyblue " placeHolder="Nhập từ khóa..." required />
                            {document.getElementById("default-search")?.value === '' || document.getElementById("default-search")?.value === null ? (
                                <button className="text-white absolute right-0 bottom-[1px] bg-gray-400  font-medium rounded-r-lg text-sm px-4 py-2" disabled
                                >
                                    Tìm
                                </button>
                            ) : (
                                <button className="text-white absolute right-0 bottom-[1px] bg-blue-velvet hover:bg-greyblue  font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

                                >
                                    Tìm
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-full px-2">
                    <div className="w-full h-full bg-black-200 overflow-y-auto rounded-t-md playlistSong">
                        <div className="w-full p-4 flex flex-col gap-2 sticky top-0 bg-black-200 backdrop-blur-md ">
                            <div className="w-full flex items-center gap-4">
                                <img className="w-10 h-10 rounded-full" src={user?.data[0]?.avatar ? user?.data[0]?.avatar : images.DefaultAvatar} />
                                <div className="h-8 bg-gray-400 flex justify-start items-center rounded-full text-gray-200 text-sm px-4 cursor-pointer" style={{ width: 'calc(100% - 48px)' }} onClick={() => setShowStatus(true)}>Bạn đang nghĩ gì?</div>
                            </div>
                            <div className="w-full grid grid-cols-3 gap-4">
                                <div className="flex justify-center items-center gap-4 cursor-pointer" onClick={() => setShowStatus(true)}>
                                    <Image size={24} weight="fill" className="text-green-400" />
                                    <div className="text-sm text-gray-200">Hình ảnh</div>
                                </div>
                                <div className="flex justify-center items-center gap-4 cursor-pointer" onClick={() => setShowNotFound(true)}>
                                    <VideoCamera size={24} weight="fill" className="text-red-400" />
                                    <div className="text-sm text-gray-200">Trực tiếp</div>
                                </div>
                                <div className="flex justify-center items-center gap-4 cursor-pointer" onClick={() => setShowNotFound(true)}>
                                    <Flag size={24} weight="fill" className="text-yellow-400" />
                                    <div className="text-sm text-gray-200">Sự kiện quan trọng</div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 flex flex-col gap-4">
                            {allStatus?.data?.map((item) => (
                                <Status avatar={item.avatar ? item.avatar : images.DefaultAvatar} name={item.name} data={item} showImage={showImage} setShowImage={setShowImage} setImage={setImage} type="all" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/4 h-full pl-2">
                    <div className="w-full h-full bg-black-200 rounded-t-md p-4">
                        <div className="w-full flex justify-end items-center">
                            <Link to={`/afuproject/${token}`} className="w-fit">
                                <img src={user?.data[0]?.avatar ? user?.data[0]?.avatar : images.DefaultAvatar} className="w-10 h-10 rounded-full" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <ModalStatus show={showStatus} setShow={setShowStatus} avatar={user?.data[0]?.avatar} name={user?.data[0]?.name} />
            <Modal404 show={showNotFound} setShow={setShowNotFound} />

        </>
    )
}

export default Community