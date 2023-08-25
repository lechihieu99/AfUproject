import { Modal } from "flowbite-react";
import React from "react";

import './style.css'

const ModalEditUser = ({ show, setShow }) => {
    return (
        <>
            <Modal show={show} onClose={() => setShow(false)} className="text-gray-200 modalEdit">
                <Modal.Header>
                    <div className="text-gray-200">Chỉnh sửa thông tin cá nhân</div>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-full pb-2">
                        <div className="text-sm">Tên/Biệt danh</div>
                        {/* <input type="text" className="w-full" id="name" /> */}
                        <input type="text" id="name" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" required />

                    </div>
                    <div className="w-full pb-2">
                        <div className="text-sm">Email</div>
                        <input type="text" id="email" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" />
                    </div>
                    <div className="w-full pb-2">
                        <div className="text-sm">Ngày sinh</div>
                        <input type="text" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" id="birthday" />
                    </div>
                    <div className="w-full pb-2">
                        <div className="text-sm">Giới tính</div>
                        <select name="sex" id="sex" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div className="w-full pb-2">
                        <div className="text-sm">Học vấn</div>
                        <input type="text" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" id="education" />
                    </div>
                    <div className="w-full">
                        <div className="text-sm">Sở thích</div>
                        <input type="text" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" id="habit" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Lưu thay đổi</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser;