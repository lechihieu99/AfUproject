import { Modal } from "flowbite-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ModalInfoSharing = ({ show, setShow, statusId }) => {
    const [linkStatus, setLinkStatus] = useState()

    const [showCopy, setShowCopy] = useState(false)

    useEffect(() => {
        setLinkStatus(`https://lechihieu99.github.io/afuproject/status/${statusId}`)
    }, [show])

    const handleCopyText = () => {
        let copyText = document.getElementById("text");

        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);

        setShowCopy(true)

        setTimeout(() => {
            setShowCopy(false)
        }, 3000)
    }

    return (
        <Modal show={show} onClose={() => setShow(false)} className="text-gray-200 modalEdit">
            <Modal.Header>
                <div className="text-gray-200">Chia sẻ bài viết</div>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full flex flex-col">
                    <div className="w-full flex gap-4 items-center">
                        <input id="text" type="text" disabled value={linkStatus} className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full min-h-[50px] max-h-[40vh] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200 w-[80%]" />
                        <div className="w-[20%] pl-2">
                            <div onClick={handleCopyText} className="w-full h-10 flex justify-center items-center rounded-lg text-gray-200 bg-black-200 cursor-pointer">Copy</div>
                        </div>
                    </div>
                    {showCopy && (
                        <div className="w-full text-sm bg-blue-velvet text-gray-200">Đã copy vào bộ nhớ</div>

                    )}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalInfoSharing;