import { Heart, MagnifyingGlass, Play } from "@phosphor-icons/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchSong, searchSongPage } from "../../redux/slice/Music.slice";

const Search = ({ isPlaying, setIsPlaying, playingList, setPlayingList }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchList = useSelector((state) => state.music.search)

    const [array, setArray] = useState()

    const [result, setResult] = useState();

    const [isFocus, setIsFocus] = useState(false)

    const [valueSearch, setValueSearch] = useState();

    let temp = playingList?.playlist?.length === 100 ? [] : playingList?.playlist;

    const key = localStorage.getItem('key')

    useEffect(() => {
        document.getElementById("default-search").value = key;
    }, [key])

    useEffect(() => {
        if (array) {
            // console.log(array[0].item)
            // temp.push(array[0].item)
            // console.log(temp)
            temp.push(array)

        }
        setResult(temp)
    }, [array])

    useEffect(() => {
        array && array.streamingStatus !== 2 && setPlayingList({ playlist: result, item: array }) && setIsPlaying(true)
    }, [result, array])

    useEffect(() => {
        const keyDownHandler = event => {

            if (event.key === 'Enter') {
                event.preventDefault();

                // 👇️ your logic here
                dispatch(searchSongPage({ key: document.getElementById("default-search")?.value }))
                navigate({ pathname: `/music/search/${document.getElementById("default-search")?.value}` })
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    const handleSearch = (e) => {
        localStorage.setItem('key', e.target.value)
        e.target.value ? setIsFocus(true) : setIsFocus(false)
        // setIsFocus(true)
        dispatch(searchSong({ key: e.target.value }))
    }
    return (
        <>

            <div className="w-full relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlass size={16} className="text-white" />
                </div>
                <input type="search" id="default-search"
                    onChange={handleSearch}
                    onFocus={() => document.getElementById("default-search")?.value !== '' ? setIsFocus(true) : setIsFocus(false)}
                    onBlur={() => setIsFocus(false)}
                    className="block w-full p-2 pl-10 text-sm text-white placeholder:text-gray-200 border border-blue-velvet rounded-lg bg-white-200 focus:ring-greyblue " placeHolder="Search Song, Artist..." required />
                {document.getElementById("default-search")?.value === '' || document.getElementById("default-search")?.value === null ? (
                    <button className="text-white absolute right-0 bottom-[1px] bg-gray-400  font-medium rounded-r-lg text-sm px-4 py-2" disabled
                    >
                        Search
                    </button>
                ) : (
                    <button className="text-white absolute right-0 bottom-[1px] bg-blue-velvet hover:bg-greyblue  font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => dispatch(searchSongPage({ key: document.getElementById("default-search")?.value })) && navigate({ pathname: `/music/search/${document.getElementById("default-search")?.value}` })}
                    >
                        Tìm
                    </button>
                )}


                <div className={`${isFocus === false && "h-0"} z-50 w-full max-h-80 overflow-y-auto absolute left-0 top-12`} onFocus={() => document.getElementById("default-search")?.value !== '' ? setIsFocus(true) : setIsFocus(false)}
                >
                    <div className="bg-blue-velvet flex flex-col p-2" >
                        {searchList?.data?.data?.songs?.map((item, idx) => (
                            <Link to={`/music/track/${item.encodeId}`} className="w-full" onClick={() => setIsFocus(false)} >
                                <div key={idx} className={`w-full flex hover:bg-greyblue`}>
                                    <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                    <div className="w-[60%] flex flex-col pl-2 justify-center">
                                        <p className="text-base text-white truncate">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.artistsNames}</p>
                                    </div>
                                    <div className="flex px-2 justify-end items-center gap-4 text-gray-200" style={{ width: 'calc(40% - 56px)' }}>
                                        {item.streamingStatus === 2 && (
                                            <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                        )}
                                        {/* <Heart size={18} weight="fill" className="cursor-pointer" /> */}

                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>

                </div>
            </div>


        </>
    )
}

export default Search;