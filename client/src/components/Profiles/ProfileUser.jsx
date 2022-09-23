import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserProfile } from '../../reduxToolkit/Actions/usersActions'
import Navbar from '../NavBar/NavBar'

export default function ProfileUser() {

    const dispatch = useDispatch()

    const profile = useSelector(state => state.usersPrincipal.profile)

    useEffect(() => {
        dispatch(getUserProfile())
    }, [dispatch])


    console.log(profile.shows);
    const rol = JSON.parse(window.localStorage.getItem('Rol'))


  return (
    <div className="flex  justify-center text-center my-1 h-auto bg-gradient-to-r from-indigo-700 to-yellow-500 ">
            <Navbar />

            {(profile) ? <div className="container flex flex-col items-center w-full h-screen " >
                <div className="container flex flex-col items-center w-full h-screen">
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
                                <p className="text-2xl font-ligth text-zinc-500">Bienvenido</p>
                                <p className="text-3xl font-extrabold text-zinc-500 capitalize">{profile.userName}  </p>
                            </div>
                            <div className="mb-5">
                                {/* <p className="text-6xl font-extrabold text-zinc-500 capitalize">{profile.nickName}</p> */}
                            </div>
                            <div className="mb-5 flex flex-row items-center justify-between">
                                <div>
                                    <p className="text-xl font-extrabold text-zinc-500">Nacionalidad</p>
                                    <p className="text-base font-light capitalize text-zinc-500">{profile.city} - {profile.country}</p>
                                </div>
                            </div>
                        </div>
                <div className=" flex items-center justify-center m-2 ' ">
                    <Link to='/user' className="bg-zinc-500 px-8 py-1 rounded-xl text-1xl border-neutral-400 border-2 text-gray-200 hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-blue-500 duration-[400ms,700ms] transition-[color,box-shadow]">
                        Editar Perfil
                    </Link> 
                 
                </div>
                    </div>
                </div>
                </div>
            </div> : ''}
        </div>
  )
}
