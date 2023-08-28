import React from "react";
import { ThumbsUp, ChatTeardropDots, Star, ShareFat } from "@phosphor-icons/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'

import { getUserStatus, isExistInLikeList, likeStatus, unLikeStatus, userLikeList } from "../../redux/slice/Status.slice";
import Cookies from "js-cookie";
import { Modal } from "flowbite-react";
import DetailImage from "../detailImage/DetailImage";


const ModalDetailStatus = ({ avatar, name, data, show, setShow, showImage, setShowImage, setImage }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')
    const location = useLocation()

    const userLike = useSelector((state) => state.status.userLikeList)

    const [clickLike, setClickLike] = useState(false)
    const [clickStar, setClickStar] = useState(false)

    useEffect(() => {
        dispatch(userLikeList({ tokenId: token }))
    }, [clickLike])

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

    const handleLike = async (item) => {
        if (clickLike) {
            await dispatch(unLikeStatus({ tokenId: token, link: item }))
            await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            setClickLike(false)
        }
        else {
            await dispatch(likeStatus({ tokenId: token, link: item }))
            await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))
            setClickLike(true)
        }
    }

    const handleShowImage = () => {
        setImage(data?.image)
        setShowImage(true)
    }

    return (
        <>
            <Modal show={show} onClose={() => setShow(false)} className="text-gray-200 z-40 modalEdit">
                <Modal.Header>
                    <div className="text-gray-200">Chi tiết bài viết</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex gap-4">
                            <img src={avatar} className="w-10 h-10 rounded-full" />
                            <div className="text-gray-200 font-bold flex items-center">{name}</div>
                        </div>
                        <div className="w-full px-4">
                            <div className="w-full">

                                <div className={`w-full flex flex-col ${data?.type === 'text' && "pl-4 border-l-[1px] border-white-200"}`}>
                                    {data?.imageContent && data?.type === 'image' && (
                                        <div className="w-full text-gray-200">{data?.imageContent !== undefined && data?.imageContent}</div>
                                    )}
                                    {data?.type === 'image' && (
                                        <div className="w-full bg-black-200 flex justify-center items-center overflow-hidden cursor-pointer" style={{ maxHeight: '60vh' }} onClick={handleShowImage}>

                                            <img src={data?.image} className="object-contain" />

                                        </div>
                                    )}
                                    {data?.type === 'text' && (
                                        <div className="w-full text-gray-200 text-sm">{data?.content}</div>
                                    )}
                                </div>
                                <div className="w-full flex items-start justify-start gap-4 p-4" >
                                    <div className="w-full flex gap-2 items-center">
                                        <ThumbsUp size={20} weight="fill" className={`${clickLike ? "text-pink-velvet" : "text-gray-400"} cursor-pointer`} onClick={() => handleLike(data?.link)} />
                                        <div className="text-sm text-gray-200">{data?.likeNumber}</div>
                                    </div>
                                    <div className="w-full flex gap-2 items-center">
                                        <ChatTeardropDots size={20} weight="fill" className={`text-blue-400 cursor-pointer`} />
                                        <div className="text-sm text-gray-200">{data?.comment}</div>
                                    </div>
                                    <div className="w-full flex gap-2 items-center">
                                        <Star size={20} weight="fill" className={`${clickStar ? "text-yellow-400" : "text-gray-400"} cursor-pointer`} onClick={() => setClickStar(!clickStar)} />
                                        <div className="text-sm text-gray-200">{data?.star}</div>
                                    </div>
                                    <div className="w-full flex gap-2 items-center">
                                        <ShareFat size={20} weight="fill" className={`text-gray-400 cursor-pointer`} />
                                        <div className="text-sm text-gray-200">{data?.share}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default ModalDetailStatus;