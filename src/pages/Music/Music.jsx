import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/searchInput/Search";
import { addFavouriteList, getChart, getFavouriteList, getHome, getTop100, removeFavouriteList } from "../../redux/slice/Music.slice";
import ApexCharts from "apexcharts";
import { useState } from "react";
import { Carousel, Tooltip } from "flowbite-react";
import { Link } from "react-router-dom";
import { Heart, Play, Pause, Article, ArrowRight } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import axiosApi from "../../redux/controller/Axios.api";
import { protectedAccount } from "../../redux/slice/Auth.slice";
const MusicPage = ({ isPlaying, setIsPlaying, playingList, setPlayingList, selectedId, setSelectedId }) => {

    const dispatch = useDispatch()
    const token = Cookies.get('tokenId')

    const home = useSelector((state) => state.music.home)
    const chart = useSelector((state) => state.music.chart)
    const favouriteList = useSelector((state) => state.music.favouriteList)
    const statusFav = useSelector((state) => state.music.statusFav)
    const statusRemove = useSelector((state) => state.music.statusRemove)

    const [dataTop1, setDataTop1] = useState();
    const [dataTop2, setDataTop2] = useState();
    const [dataTop3, setDataTop3] = useState();

    const [dataTime, setDataTime] = useState();
    const [type, setType] = useState('korea')

    const [check, setCheck] = useState(false)

    const [array, setArray] = useState()

    const [result, setResult] = useState();

    let temp = playingList?.playlist?.length === 100 ? [] : playingList?.playlist;

    const [arrayIdx, setArrayIdx] = useState([]);
    const [arrayIdx2, setArrayIdx2] = useState([]);

    // useEffect(() => {
    //     console.log(home)
    // }, [home])

    useEffect(() => {
        dispatch(getHome())
        dispatch(getChart())
    }, [])

    useEffect(() => {
        dispatch(getFavouriteList({ id: token }))
    }, [statusFav, statusRemove])


    useEffect(() => {
        if (array) {
            let count = 0;
            temp?.map((item) => {
                if (item.encodeId === array.encodeId)
                    count++;
            })
            count === 0 && temp.push(array)

        }
        setResult(temp)
    }, [array])

    useEffect(() => {
        array && array.streamingStatus !== 2 && setPlayingList({ playlist: result, item: array }) && setIsPlaying(true)
    }, [array, result])

    useEffect(() => {
        if (chart) setCheck(true)
    }, [chart])

    useEffect(() => {
        let arrayTop1 = []
        let arrayTop2 = []
        let arrayTop3 = []

        let arrayTime = []
        const dateTime = new Date();
        chart?.data?.data?.RTChart?.chart?.items[`${chart?.data?.data?.RTChart?.items[0]?.encodeId}`]?.map((item) => {
            arrayTop1.push(item.counter)
        })
        chart?.data?.data?.RTChart?.chart?.items[`${chart?.data?.data?.RTChart?.items[1]?.encodeId}`]?.map((item) => {
            arrayTop2.push(item.counter)
        })
        chart?.data?.data?.RTChart?.chart?.items[`${chart?.data?.data?.RTChart?.items[2]?.encodeId}`]?.map((item) => {
            arrayTop3.push(item.counter)
        })

        chart?.data?.data?.RTChart?.chart?.times?.map((item, idx) => {
            if (item.hour === '00') {
                const stringTime = `${item.hour}h ${dateTime.getDate()}/${dateTime.getMonth() + 1}`
                arrayTime.push(stringTime)
            }
            else {
                const stringTime = `${item.hour}h`
                arrayTime.push(stringTime)
            }

        })

        if (check === true) {
            setDataTop1(arrayTop1)
            setDataTop2(arrayTop2)
            setDataTop3(arrayTop3)
            setDataTime(arrayTime)
        }

    }, [check])

    useEffect(() => {
        let options = {
            // set this option to enable the tooltip for the chart, learn more here: https://apexcharts.com/docs/tooltip/
            tooltip: {
                enabled: true,
                x: {
                    show: true,
                },
                y: {
                    show: true,
                },
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: -26
                },
            },
            series: [
                {
                    name: `${chart?.data?.data?.RTChart?.items[0]?.title}`,
                    data: dataTop1,
                    color: "#1A56DB",
                },
                {
                    name: `${chart?.data?.data?.RTChart?.items[1]?.title}`,
                    data: dataTop2,
                    color: "#7E3BF2",
                },
                {
                    name: `${chart?.data?.data?.RTChart?.items[2]?.title}`,
                    data: dataTop3,
                    color: "#e0f542",
                },
            ],
            chart: {
                height: "100%",
                maxWidth: "100%",
                type: "area",
                fontFamily: "Inter, sans-serif",
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            legend: {
                show: true
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0,
                    shade: "#1C64F2",
                    gradientToColors: ["#1C64F2"],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
            },
            xaxis: {
                categories: dataTime,
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
                labels: {
                    formatter: function (value) {
                        return value + ' lượt nghe';
                    }
                }
            },
        }

        if (dataTop1) {
            if (document.getElementById("tooltip-chart") && typeof ApexCharts !== 'undefined') {
                const chartSong = new ApexCharts(document.getElementById("tooltip-chart"), options);
                chartSong.render();
            }
        }
    }, [dataTop1])


    useEffect(() => {
        let arr = []
        chart?.data?.data?.RTChart?.items?.map((item, idx) => {
            favouriteList?.data?.map((item2) => {
                item.encodeId === item2.encodeId && arr.push(idx)
            })
        })

        setArrayIdx(arr)
    }, [chart, favouriteList])

    useEffect(() => {
        let arr = []
        chart?.data?.data?.weekChart[`${type}`]?.items.map((item, idx) => {
            favouriteList?.data?.map((item2) => {
                item.encodeId === item2.encodeId && arr.push(idx)
            })
        })

        setArrayIdx2(arr)
    }, [chart, favouriteList, type])

    return (
        <>
            <div className="w-full h-full sm:overflow-y-auto lg:flex lg:gap-4 sm:playlistSong">
                <div className="w-full h-full pb-14 sm:pb-0 lg:w-[70%] lg:h-full bg-black-200 pt-4 px-6 rounded-sm">

                    <div className="w-full flex justify-center items-center gap-2 pb-2 border-b-2 border-white-200">
                        <div className="text-base sm:text-2xl w-1/2 text-gray-200">Music Space</div>
                        <Search />
                    </div>
                    <div className="w-full overflow-y-auto playlistSong" style={{ height: 'calc(100% - 52px)' }}>
                        <div className="w-full sm:py-4 2xl:h-80 sm:h-72 flex flex-col sm:flex-row">
                            <div className="w-full sm:w-1/2 h-56 sm:h-full sm:pr-2">
                                <Carousel>
                                    {home?.data?.data?.items[home?.data?.data?.items[0]?.sectionType === "banner" ? 0 : 1]?.items?.map((item) =>
                                        item.type === 1 ? (
                                            <Link to={`/afuproject/music/track/${item.encodeId}`} className="w-full">
                                                <img
                                                    alt="..."
                                                    src={`${item.banner}`}
                                                    className="rounded-sm"
                                                />
                                            </Link>
                                        ) : (
                                            <Link to={`/afuproject/music/playlist/${item.encodeId}`} className="w-full">
                                                <img
                                                    alt="..."
                                                    src={`${item.banner}`}
                                                    className="rounded-sm"
                                                />
                                            </Link>
                                        )
                                    )}

                                </Carousel>
                            </div>
                            <div className="w-full h-72 sm:w-1/2 sm:h-full sm:pl-2 py-2">
                                <div className="w-full h-8 flex">
                                    <div className="w-1/3 text-white text-sm lg:text-sm flex items-center font-semibold h-full">Week Chart</div>
                                    <div className="w-2/3 h-full flex">
                                        <div className={`w-1/3 h-full bg-black-200 ${type === 'korea' && "bg-orange-700"} cursor-pointer flex justify-center items-center rounded-l-lg text-xs lg:text-xs text-gray-200`} onClick={() => setType('korea')}>KOREA</div>
                                        <div className={`w-1/3 h-full bg-black-200 ${type === 'us' && "bg-greyblue"} border-x-[1px] border-white-200 cursor-pointer flex justify-center items-center text-xs lg:text-xs text-gray-200`} onClick={() => setType('us')}>US</div>
                                        <div className={`w-1/3 h-full bg-black-200 ${type === 'vn' && "bg-green-600"} cursor-pointer flex justify-center items-center rounded-r-lg text-xs lg:text-xs text-gray-200`} onClick={() => setType('vn')}>VIETNAM</div>
                                    </div>
                                </div>
                                <div className="w-full mt-4 overflow-y-auto playlistSong" style={{ height: 'calc(100% - 48px)' }}>
                                    {chart?.data?.data?.weekChart[`${type}`]?.items?.map((item, idx) => (
                                        // <Link to={`/music/track/${item.encodeId}`} className="w-full" >
                                        <div className={`w-full flex hover:bg-greyblue`}>
                                            {idx <= 2 ? (
                                                <div className={`w-[10%] text-2xl font-bold text-white-200 flex justify-center items-center`}
                                                    style={{ color: idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : "#CD7F32" }}
                                                >
                                                    {idx + 1}
                                                </div>
                                            ) : (
                                                <div className="w-[10%] text-base text-gray-400 flex justify-center items-center">{idx + 1}</div>
                                            )}
                                            <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                            <div className={`${item.streamingStatus === 2 ? "premiumWeek" : "notPremiumWeek"} flex flex-col pl-2 justify-center`}>
                                                <Link to={`/afuproject/music/track/${item.encodeId}`} className={`text-sm xl:text-base text-white truncate ${item.streamingStatus === 2 && "lg:w-[50%]"}`}>{item.title}</Link>
                                                <p className={`text-xs xl:text-sm text-gray-400 ${item.streamingStatus === 2 && "lg:w-[50%]"}`}>{item.artistsNames}</p>
                                            </div>
                                            <div className={`${item.streamingStatus === 2 ? "w-36" : "w-20"} flex px-2 justify-end items-center gap-4 text-gray-200`} >
                                                {item.streamingStatus === 2 && (
                                                    <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                                )}

                                                {arrayIdx2?.includes(idx) ? (
                                                    <div className="w-fit">
                                                        <Heart size={16} weight="fill" className="cursor-pointer text-pink-velvet" onClick={() => dispatch(removeFavouriteList({
                                                            userId: token,
                                                            encodeId: item.encodeId
                                                        }))} />
                                                    </div>
                                                ) : (
                                                    <div className="w-fit">
                                                        <Heart size={16} weight="fill" className="cursor-pointer" onClick={() => dispatch(addFavouriteList({
                                                            title: item.title,
                                                            artist: item.artistsNames,
                                                            image: item.thumbnailM ? item.thumbnailM : item.thumbnail,
                                                            userId: token,
                                                            encodeId: item.encodeId
                                                        }))} />
                                                    </div>

                                                )}
                                                {isPlaying && selectedId === item.encodeId ? <Pause size={16} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} /> :
                                                    selectedId === item.encodeId ?
                                                        <div className="w-fit"><Play size={16} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} /></div>
                                                        :
                                                        <div className="w-fit"><Play size={16} weight="fill" className="cursor-pointer" onClick={() => setArray(item)} /></div>
                                                }

                                            </div>
                                        </div>
                                        // </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-full text-xl font-semibold text-white pt-2 pb-4">Vietnam Top Chart</div>
                        <div className="w-full h-48 bg-black-200 rounded-lg shadow dark:bg-gray-800 p-4 sm:p-6">
                            <div className="flex justify-between mb-5">
                                {/* <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">$12,423</h5>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Sales this week</p>
                            </div>
                            <div
                                className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                                23%
                                <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                                </svg>
                            </div> */}
                            </div>
                            <div id="tooltip-chart" className="mb-4"></div>
                            <div className="w-full h-72 overflow-y-auto scroll-smooth lg:h-auto lg:overflow-y-none">

                                {chart?.data?.data?.RTChart?.items?.map((item, idx) => idx < 50 && (
                                    // <Link to={`/music/track/${item.encodeId}`} className="w-full" >
                                    <div className={`w-full flex hover:bg-greyblue`}>
                                        {idx <= 2 ? (
                                            <div className={`w-[7%] text-3xl font-bold text-white-200 flex justify-center items-center`}
                                                style={{ color: idx === 0 ? "#FFD700" : idx === 1 ? "#C0C0C0" : "#CD7F32" }}
                                            >
                                                {idx + 1}
                                            </div>
                                        ) : (
                                            <div className="w-[7%] text-base text-gray-400 flex justify-center items-center">{idx + 1}</div>
                                        )}
                                        <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                        <div className={` ${item.streamingStatus === 2 ? "premiumChart" : "notPremiumChart"} flex flex-col pl-2 justify-center`}>
                                            <p className="text-sm w-[90%] sm:w-full xl:text-base text-white truncate">{item.title}</p>
                                            <p className="text-xs w-[90%] sm:w-full xl:text-sm text-gray-400">{item.artistsNames}</p>
                                        </div>
                                        <div className={` ${item.streamingStatus === 2 ? "w-36" : "w-20"} flex px-2 justify-end items-center gap-4 text-gray-200`}>
                                            {item.streamingStatus === 2 && (
                                                <div className="text-yellow-200 px-2 bg-black-200 h-4 flex justify-center items-center rounded-full" style={{ fontSize: '8px' }} >Premium</div>
                                            )}
                                            <Link to={`/afuproject/music/track/${item.encodeId}`} className="w-fit">
                                                <Tooltip
                                                    content="Xem chi tiết"
                                                >
                                                    <Article size={16} />
                                                </Tooltip>
                                            </Link>
                                            {arrayIdx?.includes(idx) ? (
                                                <div className="w-fit">
                                                    <Heart size={16} weight="fill" className="cursor-pointer text-pink-velvet" onClick={() => dispatch(removeFavouriteList({
                                                        userId: token,
                                                        encodeId: item.encodeId
                                                    }))} />
                                                </div>
                                            ) : (
                                                <div className="w-fit">
                                                    <Heart size={16} weight="fill" className="cursor-pointer" onClick={() => dispatch(addFavouriteList({
                                                        title: item.title,
                                                        artist: item.artistsNames,
                                                        image: item.thumbnailM ? item.thumbnailM : item.thumbnail,
                                                        userId: token,
                                                        encodeId: item.encodeId
                                                    }))} />
                                                </div>

                                            )}

                                            {isPlaying && selectedId === item.encodeId ? <div className="w-fit"><Pause size={16} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} /></div> :
                                                selectedId === item.encodeId ?
                                                    <div className="w-fit"><Play size={16} weight="fill" className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)} /></div>
                                                    :
                                                    <div className="w-fit"><Play size={16} weight="fill" className="cursor-pointer" onClick={() => setArray(item)} /></div>
                                            }

                                        </div>
                                    </div>


                                ))}
                            </div>
                        </div>
                        <div className="w-full h-full lg:hidden lg:bg-black-200 mb-4 rounded-sm mt-80">
                            <div className="w-full rounded-sm bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
                                <div className="px-4 py-8 w-full text-center">
                                    <h1 className="w-full xl:text-2xl lg:text-xl font-bold text-white ">Chill cùng AfU</h1>
                                    <p className="w-full px-8 py-4 text-xs lg:hidden xl:text-base 2xl:text-base flex justify-center items-center font-normal text-gray-400">Hãy cùng tận hưởng những playlist với hơi hướng thư giãn và làm dịu tâm hồn nào.</p>
                                    <div className="flex flex-wrap w-full">
                                        {home?.data?.data?.items[home?.data?.data?.items[3]?.title === "Chill" ? 3 : 4]?.items?.map((item, idx) => idx <= 3 && (
                                            <div className="w-full xl:w-1/2 h-14 p-2"  >
                                                <Link to={`/afuproject/music/playlist/${item.encodeId}`} className="w-full h-full p-2 rounded-sm flex justify-center items-center text-white 2xl:text-base xl:text-sm lg:text-xs" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover', textShadow: '1px 0 0 black,0 1px 0 black,-1px 0 0 black,0 -1px 0 black' }}>
                                                    {item.title}
                                                </Link>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:text-xl xl:text-2xl font-semibold text-white mt-4">Playlist của bạn</div>
                            <div className="w-full py-2  h-10 flex gap-4 ">
                                <Link to={`/afuproject/music/current/${token}`} className="h-full px-2 xl:px-4 rounded-sm flex justify-center items-center bg-blue-velvet text-gray-200 text-xs xl:text-sm py-2 gap-2">Gần đây <ArrowRight size={18} className="text-gray-200" /> </Link>
                                <Link to={`/afuproject/music/favourite/${token}`} className="h-full px-2 xl:px-4 rounded-sm flex justify-center items-center bg-pink-velvet text-xs xl:text-sm py-2 gap-2">Yêu thích <ArrowRight size={18} /></Link>

                            </div>
                            <div className="w-full lg:text-xl xl:text-2xl font-semibold text-white mt-4">Mới phát hành</div>
                            <div className="w-full h-72 sm:h-[40%] overflow-y-auto py-2 border-b-[1px] border-white-200">
                                <div className="w-full">
                                    {home?.data?.data?.items[home?.data?.data?.items[2]?.sectionType === "new-release" ? 2 : 3]?.items?.all?.map((item) => (
                                        <Link to={`/afuproject/music/track/${item.encodeId}`} className="w-full flex hover:bg-greyblue">
                                            <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                            <div className="w-[65%] xl:w-[80%] flex flex-col pl-2 justify-center">
                                                <p className="text-sm xl:text-base text-white truncate">{item.title}</p>
                                                <p className="text-xs xl:text-sm text-gray-400">{item.artistsNames}</p>
                                            </div>

                                        </Link>
                                    ))}
                                </div>


                            </div>

                            <div className="w-full lg:text-xl xl:text-2xl font-semibold text-white mt-4">Album Hot</div>
                            <div className="w-full h-72 sm:h-[40%] overflow-y-auto py-2 mb-2 border-b-[1px] border-white-200">
                                <div className="w-full">
                                    {home?.data?.data?.items[home?.data?.data?.items[9]?.title === "Album Hot" ? 9 : 10]?.items?.map((item) => (
                                        <Link to={`/afuproject/music/playlist/${item.encodeId}`} className="w-full flex hover:bg-greyblue">
                                            <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                            <div className="w-[65%] xl:w-[80%] flex flex-col pl-2 justify-center">
                                                <p className="text-sm xl:text-base text-white truncate">{item.title}</p>
                                                <p className="text-xs xl:text-sm text-gray-400">{item.artistsNames}</p>
                                            </div>

                                        </Link>
                                    ))}
                                </div>


                            </div>

                        </div>
                    </div>


                </div>
                <div className="w-[30%] hidden lg:block h-full bg-black-200 pt-4 px-6 rounded-sm overflow-y-auto">
                    <div className="w-full rounded-sm bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
                        <div className="px-4 py-8 w-full text-center">
                            <h1 className="w-full 2xl:text-3xl xl:text-2xl lg:text-xl font-bold text-white ">Chill cùng AfU</h1>
                            <p className="w-full px-8 py-4 text-xs lg:hidden xl:text-base 2xl:text-base flex justify-center items-center font-normal text-gray-400">Hãy cùng tận hưởng những playlist với hơi hướng thư giãn và làm dịu tâm hồn nào.</p>
                            <div className="flex flex-wrap w-full">
                                {home?.data?.data?.items[home?.data?.data?.items[3]?.title === "Chill" ? 3 : 4]?.items?.map((item, idx) => idx <= 3 && (
                                    <div className="w-full xl:w-1/2 h-14 p-2"  >
                                        <Link to={`/afuproject/music/playlist/${item.encodeId}`} className="w-full h-full p-2 rounded-sm flex justify-center items-center text-white 2xl:text-base xl:text-sm lg:text-xs" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover', textShadow: '1px 0 0 black,0 1px 0 black,-1px 0 0 black,0 -1px 0 black' }}>
                                            {item.title}
                                        </Link>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:text-xl xl:text-2xl font-semibold text-white mt-4">Playlist của bạn</div>
                    <div className="w-full py-2  h-10 flex gap-4 ">
                        <Link to={`/afuproject/music/current/${token}`} className="h-full px-2 xl:px-4 rounded-sm flex justify-center items-center bg-blue-velvet text-gray-200 text-xs xl:text-sm py-2 gap-2">Gần đây <ArrowRight size={18} className="text-gray-200" /> </Link>
                        <Link to={`/afuproject/music/favourite/${token}`} className="h-full px-2 xl:px-4 rounded-sm flex justify-center items-center bg-pink-velvet text-xs xl:text-sm py-2 gap-2">Yêu thích <ArrowRight size={18} /></Link>

                    </div>
                    <div className="w-full lg:text-xl xl:text-2xl font-semibold text-white mt-4">Mới phát hành</div>
                    <div className="w-full h-[40%] overflow-y-auto py-2 border-b-[1px] border-white-200 playlistSong">
                        <div className="w-full">
                            {home?.data?.data?.items[home?.data?.data?.items[2]?.sectionType === "new-release" ? 2 : 3]?.items?.all?.map((item) => (
                                <Link to={`/afuproject/music/track/${item.encodeId}`} className="w-full flex hover:bg-greyblue">
                                    <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                    <div className="w-[65%] xl:w-[80%] flex flex-col pl-2 justify-center">
                                        <p className="text-sm xl:text-base text-white truncate">{item.title}</p>
                                        <p className="text-xs xl:text-sm text-gray-400">{item.artistsNames}</p>
                                    </div>

                                </Link>
                            ))}
                        </div>


                    </div>

                    <div className="w-full lg:text-xl xl:text-2xl font-semibold text-white mt-4">Album Hot</div>
                    <div className="w-full h-[40%] overflow-y-auto py-2 mb-2 border-b-[1px] border-white-200 playlistSong">
                        <div className="w-full">
                            {home?.data?.data?.items[home?.data?.data?.items[9]?.title === "Album Hot" ? 9 : 10]?.items?.map((item) => (
                                <Link to={`/afuproject/music/playlist/${item.encodeId}`} className="w-full flex hover:bg-greyblue">
                                    <div className="w-12 h-12 m-2" style={{ backgroundImage: `url(${item.thumbnail})`, backgroundSize: 'cover' }}></div>
                                    <div className="w-[65%] xl:w-[80%] flex flex-col pl-2 justify-center">
                                        <p className="text-sm xl:text-base text-white truncate">{item.title}</p>
                                        <p className="text-xs xl:text-sm text-gray-400">{item.artistsNames}</p>
                                    </div>

                                </Link>
                            ))}
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default MusicPage;