import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {header} from '../../../data'
import{HiMenuAlt4, HiOutlineX} from 'react-icons/hi'
import Nav from '../../Nav/Nav';
import MobileNav from '../../Nav/MobileNav';

export default function Header() {
    const [mobileNav, setMobileNav] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const {btnText, logo} = header;

    useEffect(() =>{
        window.addEventListener('scroll', () =>{
            window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
        })
    })

    const rol = JSON.parse(window.localStorage.getItem('Rol'))

  return (
    <header className={`${isActive ? 'bg-black' : 'bg-dark'} py-6 lg:py-4 fixed w-full transition-all z-10 shadow-black shadow-xl `}>
        <div className='container mx-auto flex justify-between items-center' >
            <Link to={rol === 'ADMIN' ? "/admin/home" : rol === 'ARTIST' ? "/artist/home" : rol === 'USER' ? "/user/home" : "/"} data-aos='fade-down' data-aos-delay='600'>
                <p className={`${isActive ? 'text-gray-50' : 'text-gray-200'} `}>Events App</p>
            </Link>
            <div className='hidden xs:flex justify-center items-center lg:flex' data-aos='fade-down' data-aos-delay='800'>
            {
                    rol ? (
                            <Link to={rol === 'ADMIN' ? "/admin" : rol === 'ARTIST' ? "/artist" : rol === 'USER' ? "/user" : null} className='hover:text-green-400 px-4 text-xl trasnsition text-gray-100' data-aos='fade-down' data-aos-delay='500'> Profile</Link>
                        
                    )
                        :
                        null
                }
                <Nav />
            </div>
            {
                rol==='ADMIN'?
                <Link to='/admin/logout' className='btn btn-sm btn-outline hidden  lg:flex' data-aos='fade-down' data-aos-delay='1000'>
                    Logout
                </Link>
                :rol==='ARTIST'?
                <Link to='/artist/logout' className='btn btn-sm btn-outline hidden lg:flex' data-aos='fade-down' data-aos-delay='1000'>
                    Logout
                </Link>
                :rol==='USER'?
                 <Link to='/user/logout' className='btn btn-sm btn-outline hidden  lg:flex' data-aos='fade-down' data-aos-delay='1000'>
                    Logout
                </Link>
                :
            <Link to='/login' className='btn btn-sm btn-outline hidden lg:flex' data-aos='fade-down' data-aos-delay='1000'>
                {btnText}
            </Link>
            }
            <button className='lg:hidden' onClick={() =>{ setMobileNav(!mobileNav)}}>
                {mobileNav ? (
                        <HiOutlineX  className='text-3xl text-green-400'/>
                    ): (
                        <HiMenuAlt4 className='text-3xl text-white' />
                    )
                }
            </button>

            <div className={`${mobileNav? 'left-0' : 'left-full' } fixed top-0 bottom-0 w-[60vw] lg:hidden transition-all  `}>
                <MobileNav  />
            </div>
        </div>
    </header>
  )
}
