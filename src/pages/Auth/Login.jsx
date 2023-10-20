import axios from "axios";
import { Carousel, Modal } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ModalLogin from "../../components/modalLogin/ModalLogin";
import ModalSignIn from "../../components/modalSignUp/ModalSignUp";
import { images } from "../../constants/GetImages";
import { loginAccount, signinAccount } from "../../redux/slice/Auth.slice";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeSlash } from '@phosphor-icons/react'

import './style.css'
import Cookies from "js-cookie";

const Login = ({ setSelectedId, setIsPlaying }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = Cookies.get('tokenId')

    const status = useSelector((state) => state.auth.status)
    const statusCreate = useSelector((state) => state.auth.statusCreate)

    const [errName, setErrName] = useState();
    const [errEmail, setErrEmail] = useState();
    const [errPassword, setErrPassword] = useState();
    const [errRepeatPass, setErrRepeatPass] = useState();

    const [showSignIn, setShowSignIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const [type, setType] = useState('login')

    const [check, setCheck] = useState(false)

    const [show, setShow] = useState(false)

    const [visiblePassLogin, setVisiblePassLogin] = useState(false)
    const [visibleRepeatSignin, setVisibleRepeatSignin] = useState(false)

    useEffect(() => {
        setShow(true)
    }, [])

    useEffect(() => {
        if (type === 'login') {
            setErrEmail();
            setErrName();
            setErrPassword();
        }
        else {
            setErrName()
            setErrEmail()
            setErrPassword()
            setErrRepeatPass()
        }
    }, [type])

    useEffect(() => {
        const keyDownHandler = event => {

            if (event.key === 'Enter') {
                event.preventDefault();

                // 👇️ your logic here
                onFinish()
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [type]);

    // useEffect(() => {
    //     if (status === 'success') {
    //         setSelectedId()
    //         setIsPlaying(false)
    //     }
    // }, [status])

    const goToLogin = () => {
        setType('login');
        setShowLogin(false)
        setCheck(false)
    }

    const onFinish = () => {
        if (type === 'login') {
            setErrEmail();
            setErrName();
            setErrPassword();

            const name = document.getElementById('username')?.value;
            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;

            if (name && email && password) {
                const payload = {
                    name: name,
                    email: email,
                    password: password
                }
                dispatch(loginAccount(payload))
                setShowLogin(true)
            }
            else {
                !name ? setErrName('This field is required') : setErrName()
                !email ? setErrEmail('Email is required') : setErrEmail()
                !password ? setErrPassword('Password is required') : setErrPassword()
            }
        }
        else {
            setErrName()
            setErrEmail()
            setErrPassword()
            setErrRepeatPass()

            const name = document.getElementById('username')?.value;
            const email = document.getElementById('email')?.value;
            const password = document.getElementById('password')?.value;
            const repeatPassword = document.getElementById('repeat-password')?.value;

            if (name && email && password && repeatPassword && password === repeatPassword) {
                const payload = {
                    name: name,
                    email: email,
                    password: password
                }
                dispatch(signinAccount(payload))
                setShowSignIn(true);
            }
            else {
                !name ? setErrName('This field is required') : setErrName()
                !email ? setErrEmail('Email is required') : setErrEmail()
                !password ? setErrPassword('Password is required') : setErrPassword()
                repeatPassword !== password ? setErrRepeatPass('Repeat password and password is not the same') : setErrRepeatPass()
            }
        }

    }
    return (

        <>
            <div className="w-full h-screen bg-cover flex before:block before:absolute before:w-full before:h-full before:bg-[#00000033] before:z-10" style={{ backgroundImage: `url(${images.LoginBackground})` }}>
                <div className="w-full lg:w-1/2 sm:w-full h-full z-20 flex justify-center items-center">
                    <div className="w-[85%] sm:w-[65%] bg-black-200 backdrop-blur-sm p-8 rounded-lg">
                        <div className="font-semibold text-4xl pb-8 title text-center w-full">Welcome to AfU - "All for You"</div>
                        {type === 'login' ? (
                            <div className="font-semibold text-2xl pb-4 text-gray-200">Login</div>
                        )
                            :
                            (
                                <div className="font-semibold text-2xl pb-4 text-gray-200">Create Account</div>
                            )
                        }
                        <div className="mb-4">
                            <label for="username" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Your name</label>
                            <input type="username" id="username" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" placeHolder="name" required />
                            <div className="text-sm text-pink-velvet">{errName}</div>
                        </div>
                        <div className="mb-4">
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Email</label>
                            <input type="email" id="email" className="bg-black-200 border border-black text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" placeHolder="name@flowbite.com" required />
                            <div className="text-sm text-pink-velvet">{errEmail}</div>
                        </div>
                        <div className="mb-4">
                            <label for="password" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Password</label>
                            <div className="w-full relative">
                                <input type={visiblePassLogin ? "text" : "password"} id="password" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" required />
                                <div className="absolute top-3 right-2 cursor-pointer w-fit text-pink-velvet" onClick={() => setVisiblePassLogin(!visiblePassLogin)}>
                                    {visiblePassLogin ? (
                                        <Eye size={18} />
                                    ) : (
                                        <EyeSlash size={18} />
                                    )}
                                </div>
                            </div>
                            <div className="text-sm text-pink-velvet">{errPassword}</div>
                        </div>
                        {type === 'login' ? (
                            <>

                                {/* <div class="flex items-start mb-4">
                                    <div class="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" class="w-4 h-4 cursor-pointer border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                    </div>
                                    <label for="remember" class="cursor-pointer ml-2 text-sm text-gray-300 font-medium dark:text-gray-300">Remember me?</label>
                                </div> */}
                            </>

                        )
                            :
                            (
                                <div className="mb-4">
                                    <label for="repeat-password" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Repeat Password</label>
                                    <div className="w-full relative">
                                        <input type={visibleRepeatSignin ? "text" : "password"} id="repeat-password" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" required />
                                        <div className="absolute top-3 right-2 cursor-pointer w-fit text-pink-velvet" onClick={() => setVisibleRepeatSignin(!visiblePassLogin)}>
                                            {visibleRepeatSignin ? (
                                                <Eye size={18} />
                                            ) : (
                                                <EyeSlash size={18} />
                                            )}
                                        </div>
                                    </div>
                                    {/* <input type="password" id="repeat-password" className="bg-black-200 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-white-200" required /> */}
                                    <div className="text-sm text-pink-velvet">{errRepeatPass}</div>
                                </div>
                            )}

                        <div className="mb-6 flex justify-center items-center w-full">
                            <div className="flex w-full text-sm gap-2">
                                {type === 'login' ? (
                                    <>
                                        <div className='text-gray-200'>Don't have any account? </div>
                                        <div className="text-pink-velvet cursor-pointer" onClick={() => setType('signup')}>Sign up now!</div>
                                    </>
                                )
                                    :
                                    (
                                        <>
                                            <div className='text-gray-200'>Have an account? </div>
                                            <div className="text-pink-velvet cursor-pointer" onClick={goToLogin}>Login now!</div>
                                        </>
                                    )}

                            </div>
                        </div>
                        <button onClick={onFinish} className="text-white bg-greyblue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full">{type === 'login' ? "Login" : "Create an account"}</button>

                    </div>

                </div>
                <div className="hidden w-1/2 lg:block sm:hidden h-full z-20 bg-gradient-to-l from-black to-transparent">
                    <Carousel className="carousel">
                        <div className="relative mb-6">
                            <img
                                alt="..."
                                className="scale-50"
                                src={images.Slide1}
                            />
                            <div className="text-4xl absolute top-[40%] right-[45%] italic text-white">Light as a feather</div>
                            <div className="w-[35%] text-3xl absolute bottom-[27%] left-[53%] italic text-white">Immerse yourself in sophistication</div>
                        </div>

                        <div className="relative">
                            <img
                                alt="..."
                                className="scale-90 -rotate-45"
                                src={images.Test}
                            />
                            <div className="w-[80%] h-[40%] absolute top-[30%] left-[10%] text-center text-5xl font-bold flex justify-center items-center text-slide2">Discover the magic like the universe</div>
                        </div>

                        <div className="relative">
                            <img
                                alt="..."
                                className="scale-75"
                                src={images.Slide3}
                            />
                            <div className="absolute w-[80%] h-[40%] left-[10%] top-[30%] flex justify-center items-center text-3xl font-bold text-gray-200 text-center">Feel free to express all your preferences</div>
                        </div>

                        <div className="relative">
                            <img
                                alt="..."
                                className="scale-75"
                                src={images.Slide4}
                            />
                            <div className="absolute w-[10%] h-[40%] right-[25%] top-[20%] flex justify-center items-center text-2xl font-semibold italic text-gray-200 text-right">Happiness is the best</div>
                            <div className="absolute w-[80%] h-[20%] left-[10%] top-[10%] flex justify-center items-center text-4xl font-bold text-gray-200 text-center">Remember every moment</div>

                        </div>

                    </Carousel>
                </div>
            </div>
            {statusCreate && type !== 'login' && (
                <ModalSignIn setType={setType} show={showSignIn} setShow={setShowSignIn} statusLogin={statusCreate} />
            )}

            {status === 'failed' && type === 'login' && (
                <ModalLogin statusLogin={status} show={showLogin} setShow={setShowLogin} />
            )}

            {/* {show && ( */}
            <Modal show={show} onClose={() => setShow(false)}>
                <Modal.Header>
                    Warning
                </Modal.Header>
                <Modal.Body>
                    <div>Vui lòng thực hiện các bước sau để trang web được hoạt động</div>
                    <div>Bước 1: Truy cập đường link sau: <Link to="https://2a8e-14-169-8-253.ngrok-free.app/api" target="_blank" className="cursor-pointer text-blue-200">Link</Link></div>
                    <div>Bước 2: Chấp nhận kết nối: <span className="font-bold">Nâng cao (Advanced)</span> - <span className="font-bold">Tiếp tục truy cập (không an toàn)/Proceed to connection (unsafe)</span></div>
                    <div>Bước 3: Khi nhận được thông báo chấp nhận, quay về trang web và thực hiện đăng nhập</div>
                    <div className="text-red-400">Nếu bạn đã chấp nhận kết nối rồi thì có thể bỏ qua thông báo này</div>
                </Modal.Body>
            </Modal>
            {/* )} */}
        </>

    )
}

export default Login;