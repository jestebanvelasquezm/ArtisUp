import React from 'react'
import {hero} from '../../../data'
import { HiOutlineChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';



export default function Hero() {
    const {title,subtitle,compText, btnText, image,} = hero;
  return (
    <section className='bg-black min-h-[900px] py-20'>
        <div className="container mx-auto min-h-[900px] flex justify-center items-center">
            <div className='flex  flex-col lg:gap-x-[30px] gap-y-8 lg:gap-y-0 lg:flex-row items-center justify-center text-center lg:text-center '>
                <div className='flex-1'>
                    <h1 className='title mb-2 lg:mb-5 text-white' data-aos='fade-down'
                        data-aos-delay='500'>{title}</h1>
                    <p className='lead mb-5 lg:mb10' data-aos='fade-down'
                        data-aos-delay='600'>{subtitle}</p>
                    <div className='flex items-center justify-center max-w-sm lg:max-w-full mx-auto lg:mx-0 gap-x-2 lg:gap-x-6' data-aos='fade-down'
                            data-aos-delay='700'>
                        <Link to='/artists' className='text-white btn btn-md lg:btn-lg btn-amber flex items-center justify-center lg:gap-x-4' >
                            {btnText}
                            <HiOutlineChevronDown/>
                        </Link>
                    </div>
                </div>
                <div className='flex-1' data-aos='fade-up' data-aos-delay='800' >
                    <img className='rounded-xl' src={image} alt="" />
                </div>
            </div>

        </div>
    </section>
  )
}
