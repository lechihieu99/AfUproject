import { Modal } from "flowbite-react";
import React from "react";
import { useEffect } from "react";

const ModalLogin = ({ statusLogin, show, setShow }) => {

    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <Modal.Header>
                {statusLogin === 'failed' && (
                    <div>Login Failed</div>
                )}
            </Modal.Header>
            <Modal.Body>
                {statusLogin === 'failed' && (
                    <div className="w-full text-center">Your information is incorrect. Please check again</div>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default ModalLogin;