import { Modal } from "flowbite-react";
import React from "react";

const ModalSignIn = ({ statusLogin, show, setShow, setType }) => {

    const goToLogin = () => {
        setType('login')
        setShow(false)
    }
    return (
        <Modal show={show} onClose={() => setShow(false)}>
            <Modal.Header>
                {statusLogin === 'success' ? (
                    <div>Create account successfully</div>
                ) : (
                    <div>Failed</div>
                )}
            </Modal.Header>
            <Modal.Body>
                {statusLogin === 'success' ? (
                    <div className='w-full flex flex-col justify-center items-center gap-4'>
                        <div className="cursor-pointer" >Click button to back login page</div>
                        <button onClick={goToLogin} className="text-white bg-greyblue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full">Back to Login</button>
                    </div>
                ) : (
                    <div className="cursor-pointer w-full text-center">Your information is exist. Please check your information again.</div>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default ModalSignIn;