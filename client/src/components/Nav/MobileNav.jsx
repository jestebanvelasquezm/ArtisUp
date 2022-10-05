import React from 'react'
import { Link } from 'react-router-dom'
import {nav} from '../../data'


export default function MobileNav() {
  return (
    <div className='text-white bg-black w-full h-full opacity-90'>
        <ul className='h-full flex flex-col justify-center items-center gap-y-8'>
            {nav.map((item, i) =>{
                
                return (
                    <li key={i}>
                        <Link to='/' className='link text-white text-2xl'>{item.name}</Link>
                    </li>
                )
            })}
        </ul>
    </div>
  )
}
