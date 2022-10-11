import React from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../../data'
import SearchBar from '../NavBar/searchBar/SearchBar'


export default function MobileNav() {

    const rol = JSON.parse(window.localStorage.getItem('Rol'))
    return (
        <div className='text-white bg-black w-full h-full opacity-90'>
            <div className='h-full flex flex-col justify-center items-center gap-y-8'>
            <SearchBar/>

                    <Link to={rol === 'ADMIN' ? "/admin/artists" : rol === 'ARTIST' ? "/artist/artists" : rol === 'USER' ? "/user/artists" : "/artists"} className='link text-white text-2xl hover:text-green-400' >Artistas</Link>
                    {
                    rol ? (
                            <Link to={rol === 'ADMIN' ? "/admin" : rol === 'ARTIST' ? "/artist" : rol === 'USER' ? "/user" : null} className='hover:text-green-400 link text-white text-2xl' > Profile</Link>
                        
                    )
                        :
                        null
                }
                {
                    rol === 'ADMIN' ?
                        <Link to='/admin/logout' className='btn btn-sm btn-outline  ' data-aos='fade-down' data-aos-delay='1000'>
                            Logout
                        </Link>
                        : rol === 'ARTIST' ?
                            <Link to='/artist/logout' className='btn btn-sm btn-outline  ' data-aos='fade-down' data-aos-delay='1000'>
                                Logout
                            </Link>
                            : rol === 'USER' ?
                                <Link to='/user/logout' className='btn btn-sm btn-outline  ' data-aos='fade-down' data-aos-delay='1000'>
                                    Logout
                                </Link>
                                :
                                <Link to='/login' className='btn btn-sm btn-outline  ' data-aos='fade-down' data-aos-delay='1000'>
                                    Iniciar sesion
                                </Link>
                }


            </div>
                {/* <SearchBar/> */}
        </div>
    )
}
