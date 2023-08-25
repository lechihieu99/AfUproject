import React from "react";
import { ThumbsUp, ChatTeardropDots, Star, ShareFat } from "@phosphor-icons/react";
import { useState } from "react";


const Status = ({ avatar, name, type }) => {
    const [clickLike, setClickLike] = useState(false)
    const [clickStar, setClickStar] = useState(false)
    return (
        <>
            <div className="w-full flex flex-col gap-2 border-b-[1px] border-white-200 py-4">
                <div className="w-full flex gap-4">
                    <img src={avatar} className="w-10 h-10 rounded-full" />
                    <div className="text-sm text-gray-200 font-bold flex items-center">{name}</div>
                </div>
                <div className="w-full px-4">
                    <div className="w-full flex">
                        <div className="w-[15%] flex flex-col items-start justify-start gap-4 p-4">
                            <div className="w-full flex gap-2 items-center">
                                <ThumbsUp size={20} weight="fill" className={`${clickLike ? "text-pink-velvet" : "text-gray-400"} cursor-pointer`} onClick={() => setClickLike(!clickLike)} />
                                <div className="text-sm text-gray-200">200</div>
                            </div>
                            <div className="w-full flex gap-2 items-center">
                                <ChatTeardropDots size={20} weight="fill" className={`text-blue-400 cursor-pointer`} />
                                <div className="text-sm text-gray-200">200</div>
                            </div>
                            <div className="w-full flex gap-2 items-center">
                                <Star size={20} weight="fill" className={`${clickStar ? "text-yellow-400" : "text-gray-400"} cursor-pointer`} onClick={() => setClickStar(!clickStar)} />
                                <div className="text-sm text-gray-200">200</div>
                            </div>
                            <div className="w-full flex gap-2 items-center">
                                <ShareFat size={20} weight="fill" className={`text-gray-400 cursor-pointer`} />
                                <div className="text-sm text-gray-200">200</div>
                            </div>
                        </div>
                        <div className={`w-[85%] ${type === 'image' && "bg-black-200 flex text-center justify-center items-center"} ${type === 'text' && "pl-4 border-l-[1px] border-white-200"} overflow-hidden`} style={{ maxHeight: '60vh' }}>
                            {type === 'image' && (
                                <img src={avatar} className="object-contain" />
                            )}
                            {type === 'text' && (
                                <div className="w-full text-gray-200 text-sm">Xin chào mọi người
                                    Mình tên là Lê Chí Hiếu</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Status;