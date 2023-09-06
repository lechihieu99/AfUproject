import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { EnvelopeOpen, Cake, UserFocus, Image, VideoCamera, Flag, Sliders, GraduationCap, Sparkle } from "@phosphor-icons/react";

import { getAvatar, getUser, uploadAvatar } from "../../redux/slice/User.slice";
import Status from "./Status";
import ModalEditUser from "../../components/modalEditUser/ModalEditUser";
import ModalStatus from "../../components/modalStatus/ModalStatus";
import { getUserStatus } from "../../redux/slice/Status.slice";
import ModalUploadAvatar from "../../components/modalUploadAvatar/ModalUploadAvatar";
import { images } from "../../constants/GetImages";
import Modal404 from "../../components/modal404/Modal404";

const User = ({ showImage, setShowImage, setImage }) => {

    const [fileImage, setFileImage] = useState()
    const [imageConfirm, setImageConfirm] = useState()
    const [show, setShow] = useState(false)
    const [showStatus, setShowStatus] = useState(false)
    const [showAvatar, setShowAvatar] = useState(false)
    const [showNotFound, setShowNotFound] = useState(false)

    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')
    const location = useLocation()

    const avatar = useSelector((state) => state.user.avatar)
    const user = useSelector((state) => state.user.user)
    const statusList = useSelector((state) => state.status.statusList)

    useEffect(() => {
        dispatch(getUser({ tokenId: location.pathname.slice(12) }))
        dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))
    }, [user])

    useEffect(() => {
        dispatch(getAvatar({ tokenId: location.pathname.slice(12) }))
    }, [fileImage])

    const handleShowImage = (data) => {
        setImage(data?.image)
        setShowImage(true)
    }

    return (
        <>
            <div className="w-full h-full flex gap-4">
                <div className="w-1/3 h-full overflow-y-auto playlistSong">
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full bg-black-200 rounded-lg flex items-center gap-4 p-4">
                            <img className="w-28 h-28 rounded-full cursor-pointer" src={avatar?.data[0]?.avatar ? avatar?.data[0]?.avatar : images.DefaultAvatar} onClick={() => setShowAvatar(true)} />
                            <div className="h-full flex flex-col justify-center">
                                <div className="text-bold text-2xl text-gray-200">{user?.data[0]?.name}</div>
                                <div className="text-sm text-gray-400 pb-2">1.3k bạn bè</div>
                                {location.pathname.slice(12) === token && (
                                    <div className="text-sm rounded-full text-gray-200 bg-blue-velvet py-[2px] px-4 hover:bg-greyblue cursor-pointer" onClick={() => setShow(true)}>Chỉnh sửa trang cá nhân</div>

                                )}
                            </div>
                        </div>
                        <div className="w-full p-4 bg-black-200 rounded-lg flex flex-col gap-4">
                            <div className="w-full flex gap-2 text-sm items-center">
                                <div className="text-gray-400">
                                    <EnvelopeOpen size={24} weight="fill" />
                                </div>
                                <div className="text-gray-200">{user?.data[0]?.email}</div>
                            </div>
                            <div className="w-full flex gap-2 text-sm items-center">
                                <div className="text-gray-400">
                                    <Cake size={24} weight="fill" />
                                </div>
                                <div className="text-gray-200">{user?.data[0]?.birthday ? user?.data[0]?.birthday : "None"}</div>
                            </div>
                            <div className="w-full flex gap-2 text-sm items-center">
                                <div className="text-gray-400">
                                    <UserFocus size={24} weight="fill" />
                                </div>
                                <div className="text-gray-200">{user?.data[0]?.sex ? user?.data[0]?.sex : "None"}</div>
                            </div>
                            <div className="w-full flex gap-2 text-sm items-center">
                                <div className="text-gray-400">
                                    <GraduationCap size={24} weight="fill" />
                                </div>
                                <div className="text-gray-200">{user?.data[0]?.education ? user?.data[0]?.education : "None"}</div>
                            </div>
                            <div className="w-full flex gap-2 text-sm items-center">
                                <div className="text-gray-400">
                                    <Sparkle size={24} weight="fill" />
                                </div>
                                <div className="text-gray-200">{user?.data[0]?.habit ? user?.data[0]?.habit : "None"}</div>
                            </div>
                        </div>
                        <div className="w-full p-4 bg-black-200 flex flex-col gap-4 rounded-md">
                            <div className="w-full text-xl text-gray-200">Thư viện</div>

                            <div className="grid grid-cols-4 gap-4 w-full overflow-y-auto playlistSong" style={{ maxHeight: 'calc(50vh)' }}>
                                {statusList?.data?.map((item) =>
                                    item.type === 'image' && (
                                        <div>
                                            <img className="h-32 w-full object-cover rounded-lg cursor-pointer" src={item.image} alt="" onClick={() => handleShowImage(item)} />
                                        </div>
                                    )
                                )}

                            </div>

                        </div>
                    </div>
                    {/* <input type="file" multiple="multiple" onChange={imageChange} id='myFile'></input>
                <div className=" w-full flex justify-center items-center border-gray-200 rounded-lg overflow-hidden cursor-pointer" style={{ borderWidth: '1px' }}>
                    <img
                        src={imageConfirm}
                        alt="Thumb"
                    // className="w-full h-full h-32 w-full object-cover"
                    />
                </div>
                <img className="w-full" src={avatar?.data[0]?.avatar} /> */}

                </div>
                <div className="w-2/3 h-full">
                    {location.pathname.slice(12) === token && (
                        <div className="w-full h-[15%] pb-2">
                            <div className="w-full h-full bg-black-200 p-4 flex flex-col gap-2 rounded-lg">
                                <div className="w-full h-1/2 flex items-center gap-4">
                                    <img className="w-10 h-10 rounded-full" src={avatar?.data[0]?.avatar ? avatar?.data[0]?.avatar : images.DefaultAvatar} />
                                    <div className="h-8 bg-gray-400 flex justify-start items-center rounded-full text-gray-200 text-sm px-4 cursor-pointer" style={{ width: 'calc(100% - 48px)' }} onClick={() => setShowStatus(true)}>Bạn đang nghĩ gì?</div>
                                </div>
                                <div className="w-full h-1/2 grid grid-cols-3 gap-4">
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
                        </div>
                    )}

                    <div className={`w-full ${location.pathname.slice(12) === token ? "h-[85%]" : "h-full"} pt-2`}>
                        <div className="w-full h-full px-4 pt-4 bg-black-200 overflow-y-auto rounded-t-lg scroll-smooth playlistSong">
                            <div className="w-full flex flex-col gap-4">
                                <div className="w-full flex gap-4 items-center">
                                    <Sliders size={24} weight="fill" className="text-gray-400" />
                                    <div className="text-gray-200 text-sm">Bộ lọc</div>
                                </div>
                                <div className="w-full border-t-[1px] border-white-200">
                                    {statusList?.data?.map((item) => (
                                        <Status avatar={avatar?.data[0]?.avatar ? avatar?.data[0]?.avatar : images.DefaultAvatar} name={user?.data[0]?.name} data={item} showImage={showImage} setShowImage={setShowImage} setImage={setImage} />

                                    ))}
                                    {statusList?.data?.length === 0 && (
                                        <div className="w-full flex justify-center items-center text-gray-400">Không có bài viết</div>
                                    )}
                                    {/* <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="text" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" /> */}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalEditUser show={show} setShow={setShow} />
            <ModalStatus show={showStatus} setShow={setShowStatus} avatar={avatar?.data[0]?.avatar ? avatar?.data[0]?.avatar : images.DefaultAvatar} name={user?.data[0]?.name} />
            <ModalUploadAvatar show={showAvatar} setShow={setShowAvatar} fileImage={fileImage} setFileImage={setFileImage} imageConfirm={imageConfirm} setImageConfirm={setImageConfirm} />
            <Modal404 show={showNotFound} setShow={setShowNotFound} />
        </>
    )
}

export default User;