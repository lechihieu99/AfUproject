import { Modal } from "flowbite-react";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStatus, getUserStatus, postImage, postStatus } from "../../redux/slice/Status.slice";

import { XCircle, Image, CircleNotch } from "@phosphor-icons/react";
import { getUser } from "../../redux/slice/User.slice";

const ModalStatus = ({ show, setShow, avatar, name }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')

    // const statusList = useSelector((state) => state.status.statusList)
    const statusPost = useSelector((state) => state.status.statusPost)

    const [fileImage, setFileImage] = useState()
    const [imageConfirm, setImageConfirm] = useState()
    const [value, setvalue] = useState()


    useEffect(() => {
        if (fileImage) {
            const reader = new FileReader();

            // Set the callback function to handle the file reading
            reader.onload = () => {
                // currentMapView.background = reader.result;
                // localStorage.setItem(currentMapView?.name, JSON.stringify(currentMapView));

                setImageConfirm(reader.result);
            };

            // Read the file as data URL
            reader.readAsDataURL(fileImage);
        }

    }, [fileImage])

    const handleChangeValue = (e) => {
        setvalue(e.target.value)
    }

    const onFinish = async () => {
        if (fileImage) {
            // Create a FileReader instan
            const formData = new FormData();
            formData.append('file', fileImage, encodeURI(fileImage.name.split(" ").join("")));

            // const content = document.getElementById('message')?.value;

            await dispatch(postStatus({
                tokenId: token,
                like: 0,
                comment: 0,
                star: 0,
                share: 0,
                content: value.replace(/\n\r?/g, '<br/>'),
                image: `https://192.168.137.1:3114/image/other/${token}_${encodeURI(fileImage.name.split(" ").join(""))}`,
                imageContent: value.replace(/\n\r?/g, '<br/>'),
                type: 'image'
            }))
            await dispatch(postImage({ tokenId: token, formData }))
            await dispatch(getUserStatus({ tokenId: token }))
            await dispatch(getAllStatus())
            setShow(false)

        }
        else {
            // const content = document.getElementById('message')?.value;

            await dispatch(postStatus({
                tokenId: token,
                like: 0,
                comment: 0,
                star: 0,
                share: 0,
                image: "none",
                content: value.replace(/\n\r?/g, '<br/>'),
                imageContent: value.replace(/\n\r?/g, '<br/>'),
                type: 'text'
            }))
            await dispatch(getUserStatus({ tokenId: token }))
            await dispatch(getAllStatus())
            setShow(false)
        }
    }

    const imageChange = (e) => {
        setFileImage(e.target.files[0]);
        // setSelectedImage(e.target.files[0])
    }

    return (
        <>
            <Modal show={show} onClose={() => setShow(false)} className="text-gray-200 modalEdit">
                <Modal.Header>
                    <div className="text-gray-200">Đăng trạng thái</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-full">
                        <div className="w-full flex gap-4 pb-2">
                            <img src={avatar} className="w-10 h-10 rounded-full" />
                            <div className="text-sm text-gray-200 font-bold flex items-center">{name}</div>
                        </div>
                        {/* <input type="text" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full min-h-[50px] max-h-[40vh] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" /> */}
                        <textarea id="message" onChange={handleChangeValue} rows="4" style={{ resize: 'none' }} className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full min-h-[50px] max-h-[40vh] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" placeholder="Viết suy nghĩ của bạn ra đây..."></textarea>
                        <div className="flex">
                            <label for="myFile" className="w-fit cursor-pointer mt-4">
                                <Image size={24} weight="fill" className="text-green-400" />
                            </label>
                            {/* <label for="myFile" className="w-10 cursor-pointer mt-4">
                                <Image size={24} weight="fill" className="text-green-400" />
                            </label>
                            <label for="myFile" className="w-10 cursor-pointer mt-4">
                                <Image size={24} weight="fill" className="text-green-400" />
                            </label> */}
                        </div>
                        <input type="file" accept="image/png, image/gif, image/jpeg" onChange={imageChange} id='myFile' className="hidden"></input>
                        {fileImage && (
                            <div className="relative w-full flex justify-center items-center border-white-200 bg-black-200 rounded-lg overflow-hidden cursor-pointer" style={{ borderWidth: '1px' }}>
                                <img
                                    src={imageConfirm}
                                    alt="Thumb"
                                // className="w-full h-full h-32 w-full object-cover"
                                />
                                <div className="w-fit absolute top-2 right-2" onClick={() => setFileImage()}>
                                    <XCircle size={20} weight="fill" className="text-pink-velvet" />
                                </div>
                            </div>
                        )}



                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {value || fileImage ? (
                        <button type="button" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onFinish}>
                            {statusPost === 'loading' ? (
                                <>
                                    <CircleNotch size={20} className="text-gray-200 animate-spin" />
                                </>
                            ) : "Đăng"}
                        </button>
                    ) : (
                        <button type="button" disabled className="cursor-not-allowed text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full opacity-70 text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng</button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalStatus;