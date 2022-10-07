import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileArtist } from '../../reduxToolkit/Actions/artistAction';
import EventsArtist from '../ShowDetail/Events/EventsArtist'
import Create from './Events/Create';
import Header from '../Home/landin/Header';
import Footer from '../Footer/Footer';


export default function ProfileArtist() {
    const dispatch = useDispatch()

    const profile = useSelector(state => state.artistsPrincipal.profile)

    useEffect(() => {
        dispatch(getProfileArtist())
    }, [])


    console.log(profile.shows);
    const rol = JSON.parse(window.localStorage.getItem('Rol'))



    return (
        <>
            <Header />
            <div className='bg-black '>


                {/* <div className="container mx-auto     bg-gradient-to-r from-indigo-700 to-yellow-500 "> */}

                {(profile) ? <div className="  container mx-auto bg-gradient-to-br bg-black " >
                    <div className="flex flex-row items-center justify-center  ">
                        <div className=" flex flex-col lg:flex-row max-w-full mt-32 bg-green-400 drop-shadow-2xl  rounded-lg " data-aos='zoom-out'
                            data-aos-offset='300'
                            data-aos-delay='delay'>
                            <Link to={rol === 'ADMIN' ? `/admin/artists` : rol === 'ARTIST' ? `/artist/artists` : rol === 'USER' ? `/user/artists` : `/artists`} className="absolute flex items-center w-10 h-10 right-4 top-4 justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Link>
                            <div className=" flex flex-col items-center lg:flex-row justify-center w-full lg:w-1/2">
                                <div className="lg:w-full w-[300px]  mt-5 lg:mt-0 lg:h-96 " data-aos='fade-up' data-aos-offset='400'>
                                    <img src={profile.image} className="object-contain w-full h-full rounded-l-full rounded-3xl lg:rounded-full" alt="" />
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 flex flex-col lg:flex-col  justify-between">
                                <div className="flex flex-col items-center justify-center mb-10 my-10 w-full   ">
                                    <p className="lg:text-8xl text-6xl text-center font-extrabold drop-shadow-lg  text-green-700 [text-shadow:_0_1px_0_rgb(0_0_0_/_60%)] capitalize ">{profile.nickName}</p>
                                </div>
                                <div className="mb-5 w-full p-5 ">
                                    <p className="text-1xl font-extrabold text-center text-zinc-100 capitalize ">Integrante(s)</p>
                                    <p className="text-3xl font-light text-center text-zinc-100 capitalize">{profile.userName}  {profile.lastName} </p>
                                </div>
                                <div className="mb-5 flex flex-col items-center justify-between">
                                    {/* <div className='flex flex-col justify-center items-center'> */}
                                    <p className="text-xl font-extrabold text-center text-zinc-100 capitalize">Nacionalidad</p>
                                    <p className="text-base font-light text-center text-zinc-300 capitalize">{profile.city} - {profile.country}</p>
                                    {/* </div> */}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center ">
                        <Create />
                    </div>
                    <div className="mb-10 my-10 lg:my-32 ">
                        <p className="text-6xl text-center font-extrabold text-zinc-200 capitalize sticky "> Eventos:</p>
                    </div>
                    {/* <div className='  w-full ' > */}
                    <EventsArtist events={profile.shows} />
                    {/* </div> */}
                </div> : ''}
                {/* </div> */}
            </div>
            <Footer />
        </>
    )
}
// setTimeout( rol === 'ADMIN'? navigate("/admin/doctors", 1000) : rol === 'DOCTOR'? navigate("/admin/doctors", 1000) : rol === 'PATIENT'? navigate("/patient/doctors", 1000) :  navigate("/doctors", 1000));


