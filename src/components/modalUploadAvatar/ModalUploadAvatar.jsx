import { Modal } from "flowbite-react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAvatar, uploadAvatar } from "../../redux/slice/User.slice";
import { useLocation } from 'react-router-dom'

const ModalUploadAvatar = ({ show, setShow, fileImage, setFileImage, imageConfirm, setImageConfirm }) => {

    const dispatch = useDispatch()
    const location = useLocation()

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
        }
    }, [fileImage])
    const imageChange = (e) => {
        setFileImage(e.target.files[0]);
        // setSelectedImage(e.target.files[0])
    }

    const handleClose = () => {
        setImageConfirm()
        setShow(false)
    }

    const handleUpload = async () => {
        if (fileImage) {
            // // Create a FileReader instance
            // const reader = new FileReader();


            // // Set the callback function to handle the file reading
            // reader.onload = () => {
            //     // currentMapView.background = reader.result;
            //     // localStorage.setItem(currentMapView?.name, JSON.stringify(currentMapView));

            //     setImageConfirm(reader.result);
            // };

            // // Read the file as data URL
            // reader.readAsDataURL(fileImage);

            const formData = new FormData();
            formData.append('file', fileImage);

            await dispatch(uploadAvatar({ tokenId: location.pathname.slice(12), formData }))
            await dispatch(getAvatar({ tokenId: location.pathname.slice(12) }))
            handleClose()

        }
    }
    return (
        <>
            <Modal show={show} onClose={handleClose} className="text-gray-200 modalEdit">
                <Modal.Header>
                    <div className="text-gray-200">Upload ảnh đại diện</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-full">
                        {!imageConfirm ? (
                            <>
                                <label for="myFile" className="w-full rounded-lg bg-black-200 text-gray-200 h-[30vh] flex justify-center items-center cursor-pointer">Chọn ảnh tải lên</label>
                                <input type="file" className="hidden" onChange={imageChange} id='myFile' name="myFile"></input>
                            </>
                        ) : (
                            <div className=" w-full flex justify-center items-center border-gray-200 rounded-lg overflow-hidden cursor-pointer" style={{ borderWidth: '1px' }}>
                                <img
                                    src={imageConfirm}
                                    alt="Thumb"
                                // className="w-full h-full h-32 w-full object-cover"
                                />
                            </div>
                        )}

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={handleUpload} className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Lưu thay đổi
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUploadAvatar;