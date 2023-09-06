import React, { useEffect, useState } from "react";
import { ThumbsUp } from "@phosphor-icons/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComment, getAllCommentLikeList, likeComment, unLikeComment } from "../../redux/slice/Status.slice";
import Cookies from "js-cookie";

import { Parser } from "html-to-react";

const Comment = ({ data, show }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')

    const allCommentLikeList = useSelector((state) => state.status.allCommentLikeList)

    const [likeCmt, setLikeCmt] = useState(false)

    const htmlParser = new Parser();

    useEffect(() => {
        if (show)
            dispatch(getAllCommentLikeList({ link: data?.linkStatus }))
    }, [show])

    useEffect(() => {
        setLikeCmt(false)
    }, [])

    useEffect(() => {
        let count = 0;
        allCommentLikeList?.data?.map((item) => {
            if (item.linkStatus === data?.linkStatus && item.userLike === token && item.commentId === data?.commentId)
                count++
        })

        if (count === 0)
            setLikeCmt(false)
        else
            setLikeCmt(true)

    }, [allCommentLikeList])

    const handleLikeComment = async (item) => {
        if (!likeCmt) {

            await dispatch(likeComment({
                link: data?.linkStatus,
                commentId: item.commentId,
                owner: item.userComment,
                userLike: token
            }))
            // await dispatch(getUserStatus({ tokenId: data?.userId }))
            await dispatch(getAllCommentLikeList({ link: data?.linkStatus }))
            await dispatch(getAllComment({ link: data?.linkStatus }))

            setLikeCmt(true)
        }
        else {
            await dispatch(unLikeComment({
                link: data?.linkStatus,
                commentId: item.commentId,
                userLike: token
            }))
            // await dispatch(getUserStatus({ tokenId: data?.userId }))
            await dispatch(getAllCommentLikeList({ link: data?.linkStatus }))
            await dispatch(getAllComment({ link: data?.linkStatus }))

            setLikeCmt(false)
        }
    }
    return (
        <>
            <div className="w-full flex items-start gap-4 bg-black-200 px-4 py-2 rounded-lg">
                <img src={data?.avatar} className="w-10 h-10 rounded-full" />
                <div className="flex flex-col gap-2" style={{ width: 'calc(100% - 48px)' }}>
                    <div className="text-sm font-semibold text-gray-200">{data?.name}</div>
                    <div className="flex text-sm bg-white-200 p-2 rounded-lg items-center max-w-full ">{htmlParser.parse(data?.content)}</div>
                    <div className="w-fit flex gap-4 items-center bg-white-200 rounded-full cursor-pointer" onClick={() => handleLikeComment(data)}>
                        <div className="flex gap-2 items-center px-2">
                            <ThumbsUp size={16} weight="fill" className={`${likeCmt ? "text-pink-velvet" : "text-gray-200"}`} />
                            <div className="text-sm text-gray-200">{data?.likeNumber}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Comment;