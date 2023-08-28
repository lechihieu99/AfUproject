import React from "react";
import { ThumbsUp, ChatTeardropDots, Star, ShareFat } from "@phosphor-icons/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import { getAllStatus, getUserStatus, isExistInLikeList, likeStatus, unLikeStatus, userLikeList } from "../../redux/slice/Status.slice";
import Cookies from "js-cookie";
import ModalDetailStatus from "../../components/modalDetailStatus/ModalDetailStatus";
import { Link } from 'react-router-dom'

const Status = ({ avatar, name, data, showImage, setShowImage, setImage, type }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')
    const location = useLocation()

    const userLike = useSelector((state) => state.status.userLikeList)

    const [clickLike, setClickLike] = useState(false)
    const [clickStar, setClickStar] = useState(false)

    const [show, setShow] = useState(false)

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

            if (type === 'all')
                await dispatch(getAllStatus())
            setClickLike(false)
        }
        else {
            await dispatch(likeStatus({ tokenId: token, link: item }))
            await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            if (type === 'all')
                await dispatch(getAllStatus())
            setClickLike(true)
        }
    }
    return (
        <>
            <div className="w-full flex flex-col gap-2 border-b-[1px] border-white-200 py-4">
                <div className="w-full flex gap-4">
                    <img src={avatar} className="w-10 h-10 rounded-full" />
                    <Link to={`/afuproject/${data?.userId}`} className="text-gray-200 font-bold flex items-center">{name}</Link>
                </div>
                <div className="w-full px-4">
                    <div className="w-full flex">
                        <div className="w-[15%] flex flex-col items-start justify-start gap-4 p-4" >
                            <div className="w-full flex gap-2 items-center">
                                <ThumbsUp size={20} weight="fill" className={`${clickLike ? "text-pink-velvet" : "text-gray-400"} cursor-pointer`} onClick={() => handleLike(data?.link)} />
                                <div className="text-sm text-gray-200">{data?.likeNumber}</div>
                            </div>
                            <div className="w-full flex gap-2 items-center" onClick={() => setShow(true)}>
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
                        <div className={`w-[85%] cursor-pointer flex flex-col ${data?.type === 'text' && "pl-4 border-l-[1px] border-white-200"}`} onClick={() => setShow(true)}>
                            {data?.imageContent && data?.type === 'image' && (
                                <div className="w-full text-gray-200">{data?.imageContent !== undefined && data?.imageContent}</div>
                            )}
                            {data?.type === 'image' && (
                                <div className="w-full bg-black-200 flex justify-center items-center overflow-hidden cursor-pointer" style={{ maxHeight: '60vh' }}>

                                    <img src={data?.image} className="object-contain" />

                                </div>
                            )}
                            {data?.type === 'text' && (
                                <div className="w-full text-gray-200 text-sm cursor-pointer">{data?.content}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ModalDetailStatus avatar={avatar} name={name} data={data} show={show} setShow={setShow} showImage={showImage} setShowImage={setShowImage} setImage={setImage} />
        </>
    )
}

export default Status;