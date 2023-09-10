import { Modal } from "flowbite-react";
import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateInforUser } from "../../redux/slice/User.slice";

import './style.css'

const ModalEditUser = ({ show, setShow }) => {
    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')

    const user = useSelector((state) => state.user.user)

    const [errorName, setErrorName] = useState()
    const [errorEmail, setErrorEmail] = useState()

    useEffect(() => {
        if (show)
            dispatch(getUser({ tokenId: token }))
    }, [show])

    const onFinish = async () => {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const birthday = document.getElementById('birthday').value
        let sex = document.getElementById('sex').value
        const education = document.getElementById('education').value
        const habit = document.getElementById('habit').value

        if (sex === 'male')
            sex = 'Nam'
        else if (sex === 'female')
            sex = 'Nữ'
        else
            sex = 'Khác'

        if (name && email) {
            await dispatch(updateInforUser({
                tokenId: token,
                name: name,
                email: email,
                birthday: birthday,
                sex: sex,
                education: education,
                habit: habit
            }))
            setErrorName()
            setErrorEmail()
            setShow(false)
        }
        else {
            !name && setErrorName('Tên không được để trống')
            !email && setErrorEmail('Email không được để trống')
        }
    }
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
                        <input type="text" defaultValue={user?.data[0]?.name} id="name" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" required />
                        {errorName && (
                            <div className="w-full text-sm text-pink-velvet">{errorName}</div>
                        )}
                    </div>
                    <div className="w-full pb-2">
                        <div className="text-sm">Email</div>
                        <input type="email" defaultValue={user?.data[0]?.email} id="email" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" />
                        {errorEmail && (
                            <div className="w-full text-sm text-pink-velvet">{errorEmail}</div>
                        )}
                    </div>
                    <div className="w-full pb-2">
                        <div className="text-sm">Ngày sinh</div>
                        <input type="text" defaultValue={user?.data[0]?.birthday} className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" id="birthday" />
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
                        <input type="text" defaultValue={user?.data[0]?.education} className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" id="education" />
                    </div>
                    <div className="w-full">
                        <div className="text-sm">Sở thích</div>
                        <input type="text" defaultValue={user?.data[0]?.habit} className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" id="habit" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" onClick={onFinish} class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Lưu thay đổi</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser;