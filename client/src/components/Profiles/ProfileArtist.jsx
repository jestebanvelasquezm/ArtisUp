import React from 'react'
import Navbar from '../NavBar/NavBar'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileArtist } from '../../reduxToolkit/Actions/artistAction';
import EventsArtist from '../ShowDetail/Events/EventsArtist'
import Modal from '../Modal/Modal';
import Create from './Events/Create';


export default function ProfileArtist() {
    const dispatch = useDispatch()

    const profile = useSelector(state => state.artistsPrincipal.profile)

    useEffect(() => {
        dispatch(getProfileArtist())
    }, [])


    console.log(profile.shows);
    const rol = JSON.parse(window.localStorage.getItem('Rol'))



    return (
        <div className="flex  justify-center text-center my-20 h-auto bg-gradient-to-r from-indigo-700 to-yellow-500 ">
            <Navbar />

            {(profile) ? <div className="container flex flex-col items-center w-full h-screen " >
                {/* <div className="container flex flex-col items-center w-full h-screen"> */}
                <div className="flex flex-row items-center justify-center w-full h-full ">
                    <div className="relative flex flex-row bg-gray-50 shadow-2xl rounded-lg w-4/5 p-10">
                        <Link to={rol === 'ADMIN' ? `/admin/artists` : rol === 'ARTIST' ? `/artist/artists` : rol === 'USER' ? `/user/artists` : `/artists`} className="absolute flex items-center w-10 h-10 right-4 top-4 justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </Link>
                        <div className="flex flex-row items-center justify-center w-1/2">
                            <div className="w-full h-96">
                                <img src={profile.image} className="object-contain w-full h-full rounded-full" alt="" />
                            </div>
                        </div>
                        <div className="w-1/2 flex flex-col justify-between">
                            <div className="mb-5">
                                <p className="text-3xl font-extrabold text-zinc-500">Nombre Artista(s)</p>
                                <p className="text-2xl font-light text-zinc-500 capitalize">{profile.userName} {profile.lastName} </p>
                            </div>
                            <div className="mb-5">
                                <p className="text-6xl font-extrabold text-zinc-500 capitalize">{profile.nickName}</p>
                                {/* <p className="text-xl font-extrabold">Descripción del artista</p> */}
                                <p className='text-zinc-500'>{profile.descripcion ? profile.descripcion : 'No hay una descripción'}</p>
                            </div>
                            <div className="mb-5 flex flex-row items-center justify-between">
                                <div>
                                    <p className="text-xl font-extrabold text-zinc-500">Nacionalidad</p>
                                    <p className="text-base font-light capitalize text-zinc-500">{profile.city} - {profile.country}</p>
                                </div>
                                {/* <div>
                                        <button className="flex flex-row items-center justify-center px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-700 active:scale-95 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:cursor-not-allowed transition-colors duration-200">Me interesa <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg></button>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div> */}
                <div className="h-screen flex items-center justify-center m-10 space-y-10' ">
                    {/* <Link to='/artist/create' className="bg-neutral-200 px-12 py-4 text-2xl border-neutral-400 border-2 text-neutral-600 hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-blue-500 duration-[400ms,700ms] transition-[color,box-shadow]">
                        Crear Evento
                    </Link> */}
                    <Create />
                </div>
                <div className=' top-10 w-auto h-32 ' >
                    <EventsArtist events={profile.shows} />
                </div>
            </div> : ''}
        </div>
    )
}
// setTimeout( rol === 'ADMIN'? navigate("/admin/doctors", 1000) : rol === 'DOCTOR'? navigate("/admin/doctors", 1000) : rol === 'PATIENT'? navigate("/patient/doctors", 1000) :  navigate("/doctors", 1000));


//medicapp : va en el componente favoritos:
{/* <button onClick={()=>disableFav(ele.doctor.id)} className="absolute flex items-center w-10 h-10 right-4 top-4 justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button> */}