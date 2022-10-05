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

  return (
    <header className={`${isActive ? 'bg-black' : 'bg-dark'} py-6 lg:py-4 fixed w-full transition-all z-10 shadow-black shadow-xl `}>
        <div className='container mx-auto flex justify-between items-center' >
            <Link to='/' data-aos='fade-down' data-aos-delay='600'>
                <p className={`${isActive ? 'text-gray-50' : 'text-gray-200'} `}>Events App</p>
            </Link>
            <div className='hidden lg:flex' data-aos='fade-down' data-aos-delay='800'>
                <Nav />
            </div>
            <Link to='/login' className='btn btn-sm btn-outline hidden lg:flex' data-aos='fade-down' data-aos-delay='1000'>
                {btnText}
            </Link>
            <button className='lg:hidden' onClick={() =>{ setMobileNav(!mobileNav)}}>
                {mobileNav ? (
                        <HiOutlineX  className='text-3xl text-accent'/>
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
