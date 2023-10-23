import { Modal } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ThumbsUp, ChatTeardropDots, Star, ShareFat, DotsThreeOutlineVertical } from "@phosphor-icons/react";
import { Parser } from "html-to-react";
import Cookies from "js-cookie";
import { getAllStarListByUser } from "../../redux/slice/Status.slice";
import { HOST } from "../../constants/Pathname";
import { images } from "../../constants/GetImages";

const ModalStarList = ({ show, setShow }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')

    const allStarList = useSelector((state) => state.status.allStarList)

    const htmlParser = new Parser();

    useEffect(() => {
        dispatch(getAllStarListByUser({ tokenId: token }))
    }, [])
    return (
        <Modal show={show} onClose={() => setShow(false)} className="modalEdit">
            <Modal.Header>
                <div className="text-gray-200">Đã lưu</div>
            </Modal.Header>
            <Modal.Body>
                {allStarList?.data?.map((item) => (
                    <Link to={`/afuproject/status/${item.linkStatus}`} target="_blank" className="w-full flex flex-col gap-2 border-b-[1px] border-white-200 py-4">
                        <div className="w-full flex gap-4 relative z-10">
                            <img src={item.avatar ? HOST + item.avatar : images.DefaultAvatar} className="w-10 h-10 rounded-full" />
                            <Link to={`/afuproject/${item.userId}`} className="text-gray-200 font-bold flex items-center">{item.name}</Link>
                            {/* {item.userId === token && (
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
                    )} */}

                        </div>
                        <div className="w-full px-4">
                            <div className="w-full flex">
                                <div className="w-[15%] flex flex-col items-start justify-start gap-4 p-4" >
                                    <div className="w-full flex gap-2 items-center">
                                        <ThumbsUp size={20} weight="fill" className={`text-gray-400 cursor-pointer`} />
                                        <div className="text-sm text-gray-200">{item.likeNumber}</div>
                                    </div>
                                    <div className="w-full flex gap-2 items-center">
                                        <ChatTeardropDots size={20} weight="fill" className={`text-blue-400 cursor-pointer`} />
                                        <div className="text-sm text-gray-200">{item.comment}</div>
                                    </div>
                                    <div className="w-full flex gap-2 items-center">
                                        <Star size={20} weight="fill" className={`text-yellow-400 cursor-pointer`} />
                                        <div className="text-sm text-gray-200">{item.star}</div>
                                    </div>
                                    <div className="w-full flex gap-2 items-center">
                                        <ShareFat size={20} weight="fill" className={`text-gray-400 cursor-pointer`} />
                                        <div className="text-sm text-gray-200">{item.share}</div>
                                    </div>
                                </div>
                                <div className={`w-[85%] cursor-pointer flex flex-col ${item.type === 'text' && "pl-4 border-l-[1px] border-white-200"}`}>
                                    {item.imageContent && item.type === 'image' && (
                                        <div className="w-full text-gray-200">{item.imageContent !== undefined && htmlParser.parse(item.imageContent)}</div>
                                    )}
                                    {item.type === 'image' && (
                                        <div className="w-full bg-black-200 flex justify-center items-center overflow-hidden cursor-pointer" style={{ maxHeight: '60vh' }}>

                                            <img src={HOST + item.image} className="object-contain" />

                                        </div>
                                    )}
                                    {item.type === 'text' && (
                                        <div className="w-full text-gray-200 text-sm cursor-pointer">{htmlParser.parse(item.content)}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </Modal.Body>

        </Modal>
    )
}

export default ModalStarList;