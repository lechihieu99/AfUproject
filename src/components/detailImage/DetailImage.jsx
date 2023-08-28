import React from "react";
import { XCircle } from "@phosphor-icons/react";


const DetailImage = ({ show, setShow, image }) => {
    return (
        <>
            <div className={` w-full h-full bg-black-200 relative p-8 z-50 ${!show && "hidden"}`}>
                <img src={image} className="object-contain w-full h-full" />
                <div className="w-fit absolute top-4 right-4 p-2 rounded-full text-gray-200 bg-black-200 hover:bg-gray-200 hover:text-black cursor-pointer" onClick={() => setShow(false)}>
                    <XCircle size={32} />
                </div>
            </div>
        </>
    )
}

export default DetailImage