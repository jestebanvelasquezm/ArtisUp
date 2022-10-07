import React from 'react'
import { copyright } from '../../data';


export default function Footer() {

    const {copyText,social } = copyright;
    return (
        <footer className='pt-[142px] pb-[60px] bg-black'>
            <div className='container mx-auto '>
                <div className='flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left lg:justify-between gap-y-8'>
                </div>
                <hr
                    className='mt-10 mb-5'
                    data-aos='fade-up'
                    data-aos-offset='100'
                    data-aos-delay='200'
                />
                <div
                    className='flex  flex-col items-center gap-y-2 lg:flex-row lg:justify-between'
                    data-aos='fade-up'
                    data-aos-offset='0'
                    data-aos-delay='200'
                >
                    {/* links */}
                    <div className='flex gap-x-6'>
                        <p className='text-gray-50 '> © 2022 Esteban Velasquez. Todos los derechos reservados.</p>
                    </div>
                    {/* copyright text */}
                    <div>{copyText}</div>
                    {/* social icons */}
                    <ul className='flex gap-x-[12px]'>
                        {social.map((item, index) => {
                            // destructure icon
                            const { href, icon } = item;
                            return (
                                <li key={index}>
                                    <a href={href}>
                                        <img  src={icon} alt='' />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </footer>
    )
}
