import React from "react";
import { ThumbsUp, ChatTeardropDots, Star, ShareFat, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom'
import { Parser } from "html-to-react";
import { Link } from 'react-router-dom'


import { addStarItem, commentStatus, getAllComment, getAllCommentLikeList, getAllStarListByUser, getAllStatus, getStatus, getUserStatus, isExistInLikeList, likeComment, likeStatus, removeStarItem, unLikeComment, unLikeStatus, userLikeList } from "../../redux/slice/Status.slice";
import Cookies from "js-cookie";
import { images } from "../../constants/GetImages";
import { getUser } from "../../redux/slice/User.slice";
import Comment from "../../components/comment/Comment";
import ModalInfoSharing from "../../components/modalInfoSharing/ModalInfoSharing";

const DetailStatus = ({ setImage, setShowImage }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')
    const location = useLocation()

    const userLike = useSelector((state) => state.status.userLikeList)
    const user = useSelector((state) => state.user.user)
    const statusData = useSelector((state) => state.status.statusData)
    const allComment = useSelector((state) => state.status.allComment)
    const allStarList = useSelector((state) => state.status.allStarList)

    const [clickLike, setClickLike] = useState(false)
    const [clickStar, setClickStar] = useState(false)

    const [messComment, setMessComment] = useState()
    const [cmt, setCmt] = useState()

    const [linkStatus, setLinkStatus] = useState()

    const [showShare, setShowShare] = useState(false)

    const [statusId, setStatusId] = useState()
    const [show, setShow] = useState(true)
    const [showDropdown, setShowDropdown] = useState(false)

    const htmlParser = new Parser();

    useEffect(() => {
        dispatch(userLikeList({ tokenId: token }))
    }, [clickLike])

    useEffect(() => {
        dispatch(getAllStarListByUser({ tokenId: token }))
    }, [clickStar])

    useEffect(() => {
        setLinkStatus(location.pathname.slice(19))
        dispatch(getAllComment({ link: location.pathname.slice(19) }))

    }, [])

    useEffect(() => {
        dispatch(getUser({ tokenId: token }))
        dispatch(getStatus({ link: location.pathname.slice(19) }))
    }, [])

    useEffect(() => {
        if (cmt)
            setMessComment()
    }, [cmt])

    useEffect(() => {
        let count = 0;
        userLike?.data?.map((item) => {
            if (item.linkStatus === location.pathname.slice(19) && item.userId === token)
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
            if (item.linkStatus === location.pathname.slice(19) && item.tokenId === token)
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
            await dispatch(getStatus({ link: location.pathname.slice(19) }))


            setClickLike(false)
        }
        else {
            await dispatch(likeStatus({ tokenId: token, link: item }))
            // await dispatch(getUserStatus({ tokenId: data?.userId }))
            await dispatch(getAllStatus())
            await dispatch(getStatus({ link: location.pathname.slice(19) }))

            setClickLike(true)
        }
    }

    const handleStarItem = async () => {
        if (clickStar) {
            await dispatch(removeStarItem({
                link: location.pathname.slice(19),
                tokenId: token
            }))
            // await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            // if (type === 'all')
            await dispatch(getAllStatus())
            await dispatch(getStatus({ link: location.pathname.slice(19) }))
            setClickStar(false)
        }
        else {
            await dispatch(addStarItem({
                link: location.pathname.slice(19),
                tokenId: token,
                ownerId: statusData?.data[0]?.userId
            }))            // await dispatch(getUserStatus({ tokenId: location.pathname.slice(12) }))

            // if (type === 'all')
            await dispatch(getAllStatus())
            await dispatch(getStatus({ link: location.pathname.slice(19) }))

            setClickStar(true)
        }
    }

    const handleShowImage = () => {
        setImage(statusData?.data[0]?.image)
        setShowImage(true)
    }

    const handleChangeValue = (e) => {
        setCmt(e.target.value)
    }

    const handlePostComment = async () => {
        if (cmt) {
            setMessComment()
            await dispatch(commentStatus({
                link: statusData?.data[0]?.link,
                ownerId: statusData?.data[0]?.userId,
                userComment: token,
                content: cmt.replace(/\n\r?/g, '<br/>')
            }))
            setCmt()

            const textComment = document.getElementById('comment')
            textComment.value = ''

            await dispatch(getAllStatus())
            await dispatch(getStatus({ link: location.pathname.slice(19) }))
            // await dispatch(getUserStatus({ tokenId: data?.userId }))
            await dispatch(getAllComment({ link: linkStatus }))

        }
        else {
            setMessComment('Khổng thể gửi bình luận trống')
        }
    }

    const handleShare = () => {
        setStatusId(statusData?.data[0]?.link)
        setShowShare(true)
    }
    return (
        <>
            <div className="w-full h-full bg-black-200 flex gap-4">
                <div className="w-2/3 h-full border-r-[1px] border-white-200 p-4">
                    <div className="w-full flex gap-4 relative z-10">
                        <img src={user?.data[0]?.avatar} className="w-10 h-10 rounded-full" />
                        <Link to={`/afuproject/${statusData?.data[0]?.userId}`} className="text-gray-200 font-bold flex items-center">{statusData?.data[0]?.name}</Link>
                        {statusData?.data[0]?.userId === token && (
                            <div className="absolute top-2 right-2">
                                <DotsThreeOutlineVertical size={20} weight="fill" className="text-gray-200 cursor-pointer" onClick={() => setShowDropdown(!showDropdown)} />
                                <ul className={`w-32 bg-white rounded-lg text-sm text-gray-700 dark:text-gray-200 absolute top-8 right-0 ${!showDropdown && "hidden"}`} aria-labelledby="dropdownDefaultButton">
                                    <li>
                                        <a href="#" className="flex rounded-t-lg px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Xóa bài viết</a>
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
                        <div className="w-full flex flex-col">
                            <div className="w-1/2 flex items-start justify-start gap-4 p-4" >
                                <div className="w-full flex gap-2 items-center">
                                    <ThumbsUp size={20} weight="fill" className={`${clickLike ? "text-pink-velvet" : "text-gray-400"} cursor-pointer`} onClick={() => handleLike(statusData?.data[0]?.link)} />
                                    <div className="text-sm text-gray-200">{statusData?.data[0]?.likeNumber}</div>
                                </div>
                                <div className="w-full flex gap-2 items-center">
                                    <ChatTeardropDots size={20} weight="fill" className={`text-blue-400 cursor-pointer`} />
                                    <div className="text-sm text-gray-200">{statusData?.data[0]?.comment}</div>
                                </div>
                                <div className="w-full flex gap-2 items-center">
                                    <Star size={20} weight="fill" className={`${clickStar ? "text-yellow-400" : "text-gray-400"} cursor-pointer`} onClick={handleStarItem} />
                                    <div className="text-sm text-gray-200">{statusData?.data[0]?.star}</div>
                                </div>
                                <div className="w-full flex gap-2 items-center">
                                    <ShareFat size={20} weight="fill" className={`text-gray-400 cursor-pointer`} onClick={handleShare} />
                                    <div className="text-sm text-gray-200">{statusData?.data[0]?.share}</div>
                                </div>
                            </div>
                            <div className={`w-full cursor-pointer flex flex-col ${statusData?.data[0]?.type === 'text' && "pl-4 border-l-[1px] border-white-200"}`}>
                                {statusData?.data[0]?.imageContent && statusData?.data[0]?.type === 'image' && (
                                    <div className="w-full text-gray-200">{statusData?.data[0]?.imageContent !== undefined && htmlParser.parse(statusData?.data[0]?.imageContent)}</div>
                                )}
                                {statusData?.data[0]?.type === 'image' && (
                                    <div className="w-full bg-black-200 flex justify-center items-center overflow-hidden cursor-pointer" style={{ maxHeight: '80vh' }}>

                                        <img src={statusData?.data[0]?.image} className="object-contain" onClick={handleShowImage} />

                                    </div>
                                )}
                                {statusData?.data[0]?.type === 'text' && (
                                    <div className="w-full text-gray-200 text-sm cursor-pointer">{htmlParser.parse(statusData?.data[0]?.content)}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 h-full p-4">
                    <div className="w-full overflow-y-auto" style={{ maxHeight: 'calc(100% - 80px)' }}>
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
                    <div className="w-full h-20 pt-2 flex justify-center items-start gap-4">
                        <img src={user?.data[0]?.avatar ? user?.data[0]?.avatar : images.DefaultAvatar} className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col gap-2" style={{ width: 'calc(100% - 48px)' }}>
                            <textarea id="comment" value={cmt} onChange={handleChangeValue} rows="1" style={{ resize: 'none' }} className="w-full bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block min-h-[30px] max-h-[40vh] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" placeholder="Viết suy nghĩ của bạn ra đây..."></textarea>
                            {messComment && (
                                <div className="text-red-400">{messComment}</div>
                            )}
                            <div className="w-fit flex justify-center items-center px-2 py-[2px] rounded-lg text-xs text-gray-200 bg-pink-velvet cursor-pointer" onClick={handlePostComment}>Gửi bình luận</div>
                        </div>

                    </div>
                </div>

            </div>
            <ModalInfoSharing show={showShare} setShow={setShowShare} statusId={statusId} />
        </>
    )
}

export default DetailStatus;