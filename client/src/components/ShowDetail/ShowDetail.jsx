import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getShowDetail } from '../../reduxToolkit/Actions/artistAction';
import { getUserDetail } from "../../reduxToolkit/Actions/usersActions";
import { Link } from 'react-router-dom';
import EventsArtist from './Events/EventsArtist'
import Header from '../Home/landin/Header';
import Footer from '../Footer/Footer';


export default function ShowDetail() {
    const dispatch = useDispatch();
    const params = useParams();
    const detailUser = useSelector(state => state.usersPrincipal.detailUser);
    useEffect(() => {
        dispatch(getUserDetail(params.id));
    }, [dispatch, params]);

    // console.log(detailUser);
    const rol = JSON.parse(window.localStorage.getItem('Rol'))

    return (
        <>
            <Header />
            <div className=" bg-black  flex flex-col w-full max-w-full  ">
                {/* <Navbar /> */}
                {/* {(detailUser) ? <div className="  bg-black   " > */}
                {/* <div className="container flex flex-col items-center w-full h-screen"> */}
                <div className="flex flex-row items-center justify-center   lg:flex-col my-32 ">
                    <div className=" flex flex-col lg:flex-row mb-10 bg-green-400 drop-shadow-2xl  rounded-lg w-4/5 p-10" data-aos='zoom-out'
                        data-aos-offset='300'
                        data-aos-delay='delay'>
                        <Link to={rol === 'ADMIN' ? `/admin/artists` : rol === 'ARTIST' ? `/artist/artists` : rol === 'USER' ? `/user/artists` : `/artists`} className="absolute flex items-center w-10 h-10 right-4 top-4 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                        <div className=" flex flex-col items-center lg:flex-row justify-center w-full lg:w-1/2">
                            <div className="lg:w-full w-[300px] lg:h-96 " data-aos='fade-up' data-aos-offset='400'>
                                <img src={detailUser.image} className="object-contain w-full h-full rounded-full" alt="" />
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col lg:flex-col  justify-between">
                            <div className="flex flex-col items-center justify-center mb-10 my-10 w-full   ">
                                <p className="lg:text-8xl text-6xl text-center font-extrabold text-zinc-700 [text-shadow:_0_1px_0_rgb(0_0_0_/_60%)] capitalize ">{detailUser.nickName}</p>
                            </div>
                            <div className="mb-5 w-full p-5 ">
                                <p className="text-1xl font-extrabold text-center text-zinc-700 capitalize ">Integrante(s)</p>
                                <p className="text-3xl font-light text-center text-zinc-700 capitalize">{detailUser.userName}  {detailUser.lastName} </p>
                            </div>
                            <div className="mb-5 flex flex-col items-center justify-between">
                                {/* <div className='flex flex-col justify-center items-center'> */}
                                <p className="text-xl font-extrabold text-center text-zinc-700 capitalize">Nacionalidad</p>
                                <p className="text-base font-light text-center text-zinc-700 capitalize">{detailUser.city} - {detailUser.country}</p>
                                {/* </div> */}

                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
                <div className="mb-10 my-10  ">
                    <p className="text-6xl text-center font-extrabold text-zinc-200 capitalize sticky ">Proximos Eventos:</p>
                </div>
                <div className='container mx-auto w-auto ' >
                    <EventsArtist events={detailUser.shows} />
                </div>

            </div>
            <Footer />
        </>
    )
}