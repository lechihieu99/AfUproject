import React from "react"
import { useState } from "react"
import { images } from "../../constants/GetImages";
import Player from "../player/Player";
import Sidebar from "./Sidebar"
const Layout = ({ element, isPlaying, setIsPlaying, playingList, setPlayingList, setSelectedId }) => {
    return (
        <div className="w-full h-screen relative">
            <Sidebar setSelectedId={setSelectedId} setIsPlaying={setIsPlaying} />
            <div className=" relative w-full h-full" style={{ backgroundImage: `url(${images.LoginBackground})`, backgroundSize: 'cover' }}>
                <div className="w-full h-full absolute top-0 left-0 z-10 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full xl:pl-24 sm:pl-20 sm:pt-4 sm:pr-4 z-30">
                {element}
            </div>
            {/* {isPlaying && (
                <div className="w-1/2 h-40 absolute bottom-0 right-0 bg-blue-500">
                    <Player isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                </div>
            )} */}

        </div>
    )
}

export default Layout;