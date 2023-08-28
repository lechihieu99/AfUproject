import { Modal } from "flowbite-react";
import React from "react";
import { images } from "../../constants/GetImages";

const Modal404 = ({ show, setShow }) => {
    return (
        <Modal show={show} onClose={() => setShow(false)} className="modalEdit">
            <Modal.Header>
                <div className="text-gray-200">Chức năng đang phát triển</div>
            </Modal.Header>
            <Modal.Body>
                <div className="w-full flex flex-col justify-center items-center">
                    <img src={images.NotFound} className="object-cover scale-75" />
                    <div className="py-4 text-lg text-gray-200">Chức năng hiện đang được phát triển, vui lòng quay lại</div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Modal404