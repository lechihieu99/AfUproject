import React from "react";
import { ThumbsUp, ChatTeardropDots, Star, ShareFat, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import { addStarItem, getAllStarListByUser, getAllStatus, getUserStatus, isExistInLikeList, likeStatus, removeStarItem, removeStatus, unLikeStatus, userLikeList } from "../../redux/slice/Status.slice";
import Cookies from "js-cookie";
import ModalDetailStatus from "../../components/modalDetailStatus/ModalDetailStatus";
import { Link } from 'react-router-dom'
import { HOST } from "../../constants/Pathname";

import { Parser } from "html-to-react";
import ModalInfoSharing from "../../components/modalInfoSharing/ModalInfoSharing";
import { getAllNotification, postNotification, removeNotification } from "../../redux/slice/User.slice";

const Status = ({ avatar, name, data, showImage, setShowImage, setImage, type, setLikeChange, setStarChange }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')
    const location = useLocation()

    const userLike = useSelector((state) => state.status.userLikeList)
    const allStarList = useSelector((state) => state.status.allStarList)

    const [clickLike, setClickLike] = useState(false)
    const [clickStar, setClickStar] = useState(false)

    const [show, setShow] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [showShare, setShowShare] = useState(false)

    const [statusId, setStatusId] = useState()

    const htmlParser = new Parser();

    // useEffect(() => {
    //     dispatch(userLikeList({ tokenId: token }))
    // }, [clickLike])

    // useEffect(() => {
    //     dispatch(getAllStarListByUser({ tokenId: token }))
    // }, [clickStar])

    // useEffect(() => {

    //     console.log(htmlParser.parse(data?.content))
    // }, [data])

    useEffect(() => {
        let count = 0;
        userLike?.data?.map((item) => {
            if (item.linkStatus === data?.link && item.userId === token)
                count++
        })

        if (count === 0)
            setClickLike(false)
        else
            setClickLike(true)

    }, [userLike])

    useEffect(() => {
        let count = 0;
        allStarList?.data?.map((item) => {
            if (item.linkStatus === data?.link && item.tokenId === token)
                count++
        })

        if (count === 0)
            setClickStar(false)
        else
            setClickStar(true)

    }, [allStarList])

    const handleLike = async (item) => {
        if (clickLike) {
            await dispatch(unLikeStatus({ tokenId: token, link: item }))
            // await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            if (type === 'all')
                await dispatch(getAllStatus())

            if (data?.userId !== token) {
                await dispatch(removeNotification({
                    sendUser: token,
                    receiveUser: data?.userId,
                    type: 'like',
                    link: item
                }))
            }

            setClickLike(false)
            setLikeChange(false)

            await dispatch(getAllNotification({ tokenId: token }))

        }
        else {
            await dispatch(likeStatus({ tokenId: token, link: item }))
            // await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            if (type === 'all')
                await dispatch(getAllStatus())

            if (data?.userId !== token) {
                await dispatch(postNotification({
                    sendUser: token,
                    receiveUser: data?.userId,
                    type: 'like',
                    link: item
                }))
            }

            setClickLike(true)
            setLikeChange(true)

            await dispatch(getAllNotification({ tokenId: token }))

        }
    }

    const handleRemoveStatus = async () => {
        // console.log(data?.link)
        await dispatch(removeStatus({ link: data?.link }))
        if (type === 'all')
            await dispatch(getAllStatus())

        setShowDropdown(false)
    }



    const handleStarItem = async () => {
        if (clickStar) {
            await dispatch(removeStarItem({
                link: data?.link,
                tokenId: token
            }))
            // await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            if (type === 'all')
                await dispatch(getAllStatus())
            setClickStar(false)
            setStarChange(false)
        }
        else {
            await dispatch(addStarItem({
                link: data?.link,
                tokenId: token,
                ownerId: data?.userId
            }))            // await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            if (type === 'all')
                await dispatch(getAllStatus())
            setClickStar(true)
            setStarChange(true)
        }
    }

    const handleShare = () => {
        setStatusId(data?.link)
        setShowShare(true)
    }

    // const convertStringToHTML = htmlString => {
    //     const parser = new DOMParser();
    //     const html = parser.parseFromString(htmlString, 'text/html');

    //     return html;
    // }
    return (
        <>
            <div className="w-full flex flex-col gap-2 border-b-[1px] border-white-200 py-4">
                <div className="w-full flex gap-4 relative z-10">
                    <img src={avatar} className="w-10 h-10 rounded-full" />
                    <Link to={`/afuproject/${data?.userId}`} className="text-gray-200 font-bold flex items-center">{name}</Link>
                    {data?.userId === token && (
                        <div className="absolute top-2 right-2">
                            <DotsThreeOutlineVertical size={20} weight="fill" className="text-gray-200 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} />
                            <ul className={`w-32 bg-white rounded-lg text-sm text-gray-700 dark:text-gray-200 absolute top-8 right-0 ${!showDropdown && "hidden"}`} aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <a href="#" className="flex rounded-t-lg px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleRemoveStatus}>Xóa bài viết</a>
                                </li>
                                <li>
                                    <a href="#" className="flex px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                                </li>
                                <li>
                                    <a href="#" className="flex rounded-b-lg px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                                </li>
                            </ul>
                        </div>
                    )}

                </div>
                <div className="w-full px-4">
                    <div className="w-full flex flex-col sm:flex-row">
                        <div className="w-full sm:w-[15%] flex sm:flex-col items-start justify-start gap-4 p-4" >
                            <div className="sm:w-full flex gap-2 items-center">
                                <div className="w-fit"><ThumbsUp size={20} weight="fill" className={`${clickLike ? "text-pink-velvet" : "text-gray-400"} cursor-pointer`} onClick={() => handleLike(data?.link)} /></div>
                                <div className="text-sm text-gray-200">{data?.likeNumber}</div>
                            </div>
                            <div className="sm:w-full flex gap-2 items-center" onClick={() => setShow(true)}>
                                <ChatTeardropDots size={20} weight="fill" className={`text-blue-400 cursor-pointer`} />
                                <div className="text-sm text-gray-200">{data?.comment}</div>
                            </div>
                            <div className="sm:w-full flex gap-2 items-center">
                                <Star size={20} weight="fill" className={`${clickStar ? "text-yellow-400" : "text-gray-400"} cursor-pointer`} onClick={handleStarItem} />
                                <div className="text-sm text-gray-200">{data?.star}</div>
                            </div>
                            <div className="sm:w-full flex gap-2 items-center">
                                <ShareFat size={20} weight="fill" className={`text-gray-400 cursor-pointer`} onClick={handleShare} />
                                <div className="text-sm text-gray-200">{data?.share}</div>
                            </div>
                        </div>
                        <div className={`w-full sm:w-[85%] cursor-pointer flex flex-col ${data?.type === 'text' && "pl-4 border-l-[1px] border-white-200"}`} onClick={() => setShow(true)}>
                            {data?.imageContent && data?.type === 'image' && (
                                <div className="w-full text-gray-200">{data?.imageContent !== undefined && htmlParser.parse(data?.imageContent)}</div>
                            )}
                            {data?.type === 'image' && (
                                <div className="w-full bg-black-200 flex justify-center items-center overflow-hidden cursor-pointer" style={{ maxHeight: '60vh' }}>

                                    <img src={HOST + data?.image} className="object-contain" />

                                </div>
                            )}
                            {data?.type === 'text' && (
                                <div className="w-full text-gray-200 text-sm cursor-pointer">{htmlParser.parse(data?.content)}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ModalDetailStatus avatar={avatar} name={name} data={data} show={show} setShow={setShow} showImage={showImage} setShowImage={setShowImage} setImage={setImage} />
            <ModalInfoSharing show={showShare} setShow={setShowShare} statusId={statusId} />
        </>
    )
}

export default Status;