import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import { MagnifyingGlass, Image, VideoCamera, Flag, X, Check } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from 'flowbite-react';

import { acceptFriendRequest, cancelFriend, getAllFriend, getAllFriendRequest, getAllUser, getUser } from "../../redux/slice/User.slice";
import Status from "./Status";
import { getAllStarListByUser, getAllStatus, userLikeList } from "../../redux/slice/Status.slice";
import ModalStatus from "../../components/modalStatus/ModalStatus";
import { useState } from "react";
import { images } from "../../constants/GetImages";
import Modal404 from "../../components/modal404/Modal404";
import ModalInfoSharing from "../../components/modalInfoSharing/ModalInfoSharing";
import ModalLikeList from "../../components/modalLikeList/ModalLikeList";
import ModalStarList from "../../components/modalStarList/ModalStarList";


const Community = ({ showImage, setShowImage, setImage }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')
    const user = useSelector((state) => state.user.user)
    const allStatus = useSelector((state) => state.status.allStatus)
    const userList = useSelector((state) => state.user.userList)
    const friendList = useSelector((state) => state.user.friendList)
    const friendListRequest = useSelector((state) => state.user.friendListRequest)

    const [showStatus, setShowStatus] = useState(false)
    const [showNotFound, setShowNotFound] = useState(false)
    const [hoverDropdown, setHoverDropdown] = useState(false)

    const [likeChange, setLikeChange] = useState(false)
    const [starChange, setStarChange] = useState(false)

    const [showModalLikeList, setShowModalLikeList] = useState(false)
    const [showModalStarList, setShowModalStarList] = useState(false)

    const [list, setList] = useState(false)
    const [list2, setList2] = useState(false)

    useEffect(() => {
        dispatch(getUser({ tokenId: token }))
        dispatch(getAllStatus())
        dispatch(getAllUser())
        dispatch(getAllFriend({ tokenId: token }))
        dispatch(getAllFriendRequest({ tokenId: token }))
    }, [])

    useEffect(() => {
        dispatch(userLikeList({ tokenId: token }))
    }, [likeChange])

    useEffect(() => {
        dispatch(getAllStarListByUser({ tokenId: token }))
    }, [starChange])

    useEffect(() => {
        let count = 0;
        friendList?.data?.map((item) => {
            if ((item.userId2 === token || item.userId1 === token) && item.isAccepted === '0')
                count++
        })

        if (count === 0)
            setList(false)
        else
            setList(true)
    }, [friendList])

    useEffect(() => {

        let count = 0;
        friendListRequest?.data?.map((item) => {
            if (item.userId1 === token && item.isAccepted === '1')
                count++
        })

        if (count === 0)
            setList2(false)
        else
            setList2(true)
    }, [friendListRequest])

    const handleSearch = () => {

    }

    const handleLeave = () => {
        setTimeout(() => {
            setHoverDropdown(false)
        }, 2000)
    }

    const handleCancelFriend = async (item) => {
        await dispatch(cancelFriend({
            userId1: token,
            userId2: item.userId2
        }))
        await dispatch(getAllFriend({ tokenId: token }))
        await dispatch(getAllFriendRequest({ tokenId: token }))
    }

    const handleAcceptedFriend = async (item) => {
        await dispatch(acceptFriendRequest({
            id: item.id
        }))
        await dispatch(getAllFriend({ tokenId: token }))
        await dispatch(getAllFriendRequest({ tokenId: token }))

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
                        <div className="w-full pt-4">
                            <div className="w-full text-gray-200 font-semibold">Phím tắt</div>

                        </div>
                    </div>

                </div>
                <div className="w-1/2 h-full px-2">
                    <div className="w-full h-full bg-black-200 overflow-y-auto rounded-t-md playlistSong">
                        <div className="w-full p-4 flex flex-col gap-2 z-20 sticky top-0 bg-black-200 backdrop-blur-md ">
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
                        <div className="w-full px-4 flex flex-col gap-4 z-10">
                            {allStatus?.data?.map((item) => (
                                <Status avatar={item.avatar ? item.avatar : images.DefaultAvatar} name={item.name} data={item} showImage={showImage} setShowImage={setShowImage} setImage={setImage} type="all"
                                    setLikeChange={setLikeChange} setStarChange={setStarChange}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/4 h-full pl-2">
                    <div className="w-full h-full bg-black-200 rounded-t-md p-4">
                        <div className="w-full flex flex-col items-center relative" onMouseEnter={() => setHoverDropdown(true)} onMouseLeave={() => setHoverDropdown(false)}>
                            <Link to={`/afuproject/${token}`} className="w-full flex justify-end py-2 pr-2 pl-4 gap-4 bg-gray-600 rounded-full" id="dropdownHover">
                                <div className="text-gray-200 text-sm flex flex-col items-end" style={{ width: 'calc(100% - 56px)' }}>
                                    <div className="font-semibold">{user?.data[0]?.name}</div>
                                    <div>{user?.data[0]?.email}</div>
                                </div>
                                <img src={user?.data[0]?.avatar ? user?.data[0]?.avatar : images.DefaultAvatar} className="w-10 h-10 rounded-full" />
                            </Link>
                            {hoverDropdown && (
                                <div className="absolute top-14 w-full flex flex-col gap-2 p-2 text-gray-200 bg-black-200 border-[1px] border-white-200 rounded-lg">
                                    <div className="w-full rounded-lg text-sm bg-blue-velvet flex justify-center items-center py-2 hover:bg-greyblue cursor-pointer" onClick={() => setShowModalLikeList(true)}>Đã thích</div>
                                    <div className="w-full rounded-lg text-sm bg-blue-velvet flex justify-center items-center py-2 hover:bg-greyblue cursor-pointer" onClick={() => setShowModalStarList(true)}>Đã lưu</div>
                                </div>
                            )}

                        </div>
                        <div className="w-full pt-4">
                            <div className="w-full text-gray-200 font-semibold">Lời mời kết bạn</div>
                            <div className="w-full flex flex-col overflow-y-auto max-h-[50vh] playlistSong">
                                {list2 ? friendListRequest?.data?.map((item) => item.isAccepted === '1' && item.userId1 === token && (
                                    <div className="w-full p-2 flex gap-4 hover:bg-greyblue rounded-lg">
                                        <img src={item.avatar ? item.avatar : images.DefaultAvatar} className="w-10 h-10 rounded-full" />
                                        <div className="flex flex-col">
                                            <Link to={`/afuproject/${item.userId2}`} target="_blank" className="w-full text-gray-200 text-sm font-semibold">{item.name}</Link>
                                            <p className="w-full text-xs text-gray-400">{item.email}</p>
                                            <div className="flex gap-2 pt-2">
                                                <div className="py-[2px] px-4 hover:bg-black-200 cursor-pointer text-xs text-red-400 flex justify-center items-center gap-2 rounded-full border-[1px] border-red-400" onClick={() => handleCancelFriend(item)}>
                                                    <X size={16} />
                                                    <div>Từ chối</div>
                                                </div>
                                                <div className="py-[2px] px-4 hover:bg-black-200 cursor-pointer text-xs text-green-400 flex justify-center items-center gap-2 rounded-full border-[1px] border-green-400" onClick={() => handleAcceptedFriend(item)}>
                                                    <Check size={16} />
                                                    <div>Chấp nhận</div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )) : (
                                    <div className="w-full text-sm text-center text-gray-400">Chưa có lời mời kết bạn</div>
                                )}
                            </div>
                        </div>
                        <div className="w-full pt-4">
                            <div className="w-full text-gray-200 font-semibold">Bạn bè</div>
                            <div className="w-full flex flex-col overflow-y-auto max-h-[50vh] playlistSong">
                                {list ? friendList?.data?.map((item) => item.isAccepted === '0' && user?.data[0]?.email !== item.email && (
                                    <Link to={`/afuproject/${item.userId1 !== token ? item.userId1 : item.userId2}`} target="_blank" className="w-full p-2 flex gap-4 hover:bg-greyblue rounded-lg">
                                        <img src={item.avatar ? item.avatar : images.DefaultAvatar} className="w-10 h-10 rounded-full" />
                                        <div className="flex flex-col">
                                            <p className="w-full text-gray-200 text-sm font-semibold">{item.name}</p>
                                            <p className="w-full text-xs text-gray-400">{item.email}</p>
                                        </div>
                                    </Link>
                                )) : (
                                    <div className="w-full text-sm text-center text-gray-400">Chưa có bạn bè</div>
                                )}
                            </div>
                        </div>
                        <div className="w-full pt-4">
                            <div className="w-full text-gray-200 font-semibold">Mọi người</div>
                            <div className="w-full flex flex-col overflow-y-auto playlistSong">
                                {userList?.data?.map((item) => (
                                    <Link to={`/afuproject/${item.tokenId}`} target="_blank" className="w-full p-2 flex gap-4 hover:bg-greyblue rounded-lg">
                                        <img src={item.avatar ? item.avatar : images.DefaultAvatar} className="w-10 h-10 rounded-full" />
                                        <div className="flex flex-col" style={{ width: 'calc(100% - 56px)' }}>
                                            <p className="w-full text-gray-200 text-sm font-semibold">{item.name}</p>
                                            <p className="w-full text-xs text-gray-400">{item.email}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <ModalStatus show={showStatus} setShow={setShowStatus} avatar={user?.data[0]?.avatar} name={user?.data[0]?.name} />
            <Modal404 show={showNotFound} setShow={setShowNotFound} />
            <ModalLikeList show={showModalLikeList} setShow={setShowModalLikeList} />
            <ModalStarList show={showModalStarList} setShow={setShowModalStarList} />
        </>
    )
}

export default Community