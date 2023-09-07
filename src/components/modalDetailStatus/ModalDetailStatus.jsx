import React from "react";
import { ThumbsUp, ChatTeardropDots, Star, ShareFat, Article } from "@phosphor-icons/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Parser } from "html-to-react";

import { addStarItem, commentStatus, getAllComment, getAllCommentLikeList, getAllStarListByUser, getAllStatus, getUserStatus, isExistInLikeList, likeComment, likeStatus, removeStarItem, unLikeComment, unLikeStatus, userLikeList } from "../../redux/slice/Status.slice";
import Cookies from "js-cookie";
import { Modal } from "flowbite-react";
import { images } from "../../constants/GetImages";
import { getUser } from "../../redux/slice/User.slice";
import Comment from "../comment/Comment";
import ModalInfoSharing from "../modalInfoSharing/ModalInfoSharing";


const ModalDetailStatus = ({ avatar, name, data, show, setShow, showImage, setShowImage, setImage, isLoad }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')
    const location = useLocation()
    const navigate = useNavigate()

    const userLike = useSelector((state) => state.status.userLikeList)
    const user = useSelector((state) => state.user.user)
    const allComment = useSelector((state) => state.status.allComment)
    const allStarList = useSelector((state) => state.status.allStarList)

    const [clickLike, setClickLike] = useState(false)
    const [clickStar, setClickStar] = useState(false)

    const [messComment, setMessComment] = useState()
    const [cmt, setCmt] = useState()

    const [linkStatus, setLinkStatus] = useState()

    const [showShare, setShowShare] = useState(false)

    const [statusId, setStatusId] = useState()

    const htmlParser = new Parser();

    useEffect(() => {
        dispatch(userLikeList({ tokenId: token }))
    }, [clickLike])

    useEffect(() => {
        dispatch(getAllStarListByUser({ tokenId: token }))
    }, [clickStar])

    useEffect(() => {
        if (show) {
            setLinkStatus(data?.link)
            dispatch(getAllComment({ link: data?.link }))
        }
    }, [show])

    useEffect(() => {
        dispatch(getUser({ tokenId: token }))
    }, [])

    useEffect(() => {
        if (cmt)
            setMessComment()
    }, [cmt])

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
            // await dispatch(getUserStatus({ tokenId: data?.userId }))
            await dispatch(getAllStatus())

            setClickLike(false)
        }
        else {
            await dispatch(likeStatus({ tokenId: token, link: item }))
            // await dispatch(getUserStatus({ tokenId: data?.userId }))
            await dispatch(getAllStatus())
            setClickLike(true)
        }
    }

    const handleStarItem = async () => {
        if (clickStar) {
            await dispatch(removeStarItem({
                link: data?.link,
                tokenId: token
            }))
            // await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            // if (type === 'all')
            await dispatch(getAllStatus())
            setClickStar(false)
        }
        else {
            await dispatch(addStarItem({
                link: data?.link,
                tokenId: token,
                ownerId: data?.userId
            }))            // await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            // if (type === 'all')
            await dispatch(getAllStatus())
            setClickStar(true)
        }
    }

    const handleShowImage = () => {
        setImage(data?.image)
        setShowImage(true)
    }

    const handleChangeValue = (e) => {
        setCmt(e.target.value)
    }

    const handlePostComment = async () => {
        if (cmt) {
            setMessComment()
            await dispatch(commentStatus({
                link: data?.link,
                ownerId: data?.userId,
                userComment: token,
                content: cmt.replace(/\n\r?/g, '<br/>')
            }))
            setCmt()

            const textComment = document.getElementById('comment')
            textComment.value = ''

            await dispatch(getAllStatus())
            // await dispatch(getUserStatus({ tokenId: data?.userId }))
            await dispatch(getAllComment({ link: linkStatus }))

        }
        else {
            setMessComment('Khổng thể gửi bình luận trống')
        }
    }

    const handleShare = () => {
        setStatusId(data?.link)
        setShowShare(true)
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
                                        <div className="w-full text-gray-200">{data?.imageContent !== undefined && htmlParser.parse(data?.imageContent)}</div>
                                    )}
                                    {data?.type === 'image' && (
                                        <div className="w-full bg-black-200 flex justify-center items-center overflow-hidden cursor-pointer" style={{ maxHeight: '60vh' }} onClick={handleShowImage}>

                                            <img src={data?.image} className="object-contain" />

                                        </div>
                                    )}
                                    {data?.type === 'text' && (
                                        <div className="w-full text-gray-200 text-sm">{htmlParser.parse(data?.content)}</div>
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
                                        <Star size={20} weight="fill" className={`${clickStar ? "text-yellow-400" : "text-gray-400"} cursor-pointer`} onClick={handleStarItem} />
                                        <div className="text-sm text-gray-200">{data?.star}</div>
                                    </div>
                                    <div className="w-full flex gap-2 items-center">
                                        <ShareFat size={20} weight="fill" className={`text-gray-400 cursor-pointer`} onClick={handleShare} />
                                        <div className="text-sm text-gray-200">{data?.share}</div>
                                    </div>
                                    <Link to={`/afuproject/status/${data?.link}`} className="w-full flex gap-2 items-center">
                                        <Article size={20} weight="fill" className={`text-gray-400 cursor-pointer`} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="w-full text-gray-200 font-semibold pb-2">Bình luận</div>
                            <div className="w-full flex flex-col gap-2">
                                {allComment?.data?.length !== 0 && allComment?.data?.map((item) => (
                                    <Comment data={item} show={show} />
                                ))}
                            </div>

                            {allComment?.data?.length === 0 && (
                                <div className="w-full flex justify-center items-center text-gray-400 text-sm">Chưa có bình luận</div>
                            )}
                        </div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full flex justify-center items-start gap-4">
                        <img src={user?.data[0]?.avatar ? user?.data[0]?.avatar : images.DefaultAvatar} className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col gap-2" style={{ width: 'calc(100% - 48px)' }}>
                            <textarea id="comment" value={cmt} onChange={handleChangeValue} rows="1" style={{ resize: 'none' }} className="w-full bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block min-h-[30px] max-h-[40vh] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" placeholder="Viết suy nghĩ của bạn ra đây..."></textarea>
                            {messComment && (
                                <div className="text-red-400">{messComment}</div>
                            )}
                            <div className="w-fit flex justify-center items-center px-2 py-[2px] rounded-lg text-xs text-gray-200 bg-pink-velvet cursor-pointer" onClick={handlePostComment}>Gửi bình luận</div>
                        </div>

                    </div>
                </Modal.Footer>
            </Modal>
            <ModalInfoSharing show={showShare} setShow={setShowShare} statusId={statusId} />

        </>
    )
}

export default ModalDetailStatus;