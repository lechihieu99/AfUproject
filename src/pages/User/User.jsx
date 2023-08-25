import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EnvelopeOpen, Cake, UserFocus, Image, VideoCamera, Flag, Sliders } from "@phosphor-icons/react";

import { getAvatar, getUser, uploadAvatar } from "../../redux/slice/User.slice";
import Status from "./Status";
import ModalEditUser from "../../components/modalEditUser/ModalEditUser";

const User = () => {

    const [fileImage, setFileImage] = useState()
    const [imageConfirm, setImageConfirm] = useState()
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')

    const avatar = useSelector((state) => state.user.avatar)
    const user = useSelector((state) => state.user.user)

    useEffect(() => {
        dispatch(getUser({ tokenId: token }))
    })
    useEffect(() => {
        dispatch(getAvatar({ tokenId: token }))
    }, [fileImage])

    useEffect(() => {
        if (fileImage) {
            // Create a FileReader instance
            const reader = new FileReader();


            // Set the callback function to handle the file reading
            reader.onload = () => {
                // currentMapView.background = reader.result;
                // localStorage.setItem(currentMapView?.name, JSON.stringify(currentMapView));

                setImageConfirm(reader.result);
            };

            // Read the file as data URL
            reader.readAsDataURL(fileImage);

            const formData = new FormData();
            formData.append('file', fileImage);

            dispatch(uploadAvatar({ tokenId: token, formData }))
        }
    }, [fileImage])

    const imageChange = (e) => {
        setFileImage(e.target.files[0]);
        // setSelectedImage(e.target.files[0])
    }
    return (
        <>
            <div className="w-full h-full flex gap-4">
                <div className="w-1/3 h-full overflow-y-auto playlistSong">
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full bg-black-200 rounded-sm flex items-center gap-4 p-4">
                            <img className="w-28 h-28 rounded-full" src={avatar?.data[0]?.avatar} />
                            <div className="h-full flex flex-col justify-center">
                                <div className="text-bold text-2xl text-gray-200">{user?.data[0]?.name}</div>
                                <div className="text-sm text-gray-400 pb-2">1.3k bạn bè</div>
                                <div className="text-sm rounded-full text-gray-200 bg-blue-velvet py-[2px] px-4 hover:bg-greyblue cursor-pointer" onClick={() => setShow(true)}>Chỉnh sửa trang cá nhân</div>
                            </div>
                        </div>
                        <div className="w-full p-4 bg-black-200 rounded-sm flex flex-col gap-4">
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
                        </div>
                        <div className="w-full p-4 bg-black-200 flex flex-col gap-4 rounded-md">
                            <div className="w-full text-xl text-gray-200">Thư viện</div>

                            <div className="grid grid-cols-4 gap-4 w-full overflow-y-auto playlistSong" style={{ height: 'calc(50vh)' }}>
                                <div>
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="" />
                                </div>
                                <div>
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="" />
                                </div>
                                <div >
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="" />
                                </div>
                                <div >
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="" />
                                </div>
                                <div >
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="" />
                                </div>
                                <div >
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="" />
                                </div>
                                <div >
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" />
                                </div>
                                <div >
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" />
                                </div>
                                <div >
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="" />
                                </div>
                                <div >
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="" />
                                </div>
                                <div >
                                    <img className="h-32 w-full object-cover rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="" />
                                </div>
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
                    <div className="w-full h-[15%] pb-2">
                        <div className="w-full h-full bg-black-200 p-4 flex flex-col gap-2">
                            <div className="w-full h-1/2 flex items-center gap-4">
                                <img className="w-10 h-10 rounded-full" src={avatar?.data[0]?.avatar} />
                                <div className="h-8 bg-gray-400 flex justify-start items-center rounded-full text-gray-200 text-sm px-4" style={{ width: 'calc(100% - 48px)' }}>Bạn đang nghĩ gì?</div>
                            </div>
                            <div className="w-full h-1/2 grid grid-cols-3 gap-4">
                                <div className="flex justify-center items-center gap-4">
                                    <Image size={24} weight="fill" className="text-green-400" />
                                    <div className="text-sm text-gray-200">Hình ảnh</div>
                                </div>
                                <div className="flex justify-center items-center gap-4">
                                    <VideoCamera size={24} weight="fill" className="text-red-400" />
                                    <div className="text-sm text-gray-200">Trực tiếp</div>
                                </div>
                                <div className="flex justify-center items-center gap-4">
                                    <Flag size={24} weight="fill" className="text-yellow-400" />
                                    <div className="text-sm text-gray-200">Sự kiện quan trọng</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[85%] pt-2">
                        <div className="w-full h-full px-4 pt-4 bg-black-200 overflow-y-auto playlistSong">
                            <div className="w-full flex flex-col gap-4">
                                <div className="w-full flex gap-4 items-center">
                                    <Sliders size={24} weight="fill" className="text-gray-400" />
                                    <div className="text-gray-200 text-sm">Bộ lọc</div>
                                </div>
                                <div className="w-full">
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="text" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />
                                    <Status avatar={avatar?.data[0]?.avatar} name={user?.data[0]?.name} type="image" />

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalEditUser show={show} setShow={setShow} />
        </>
    )
}

export default User;