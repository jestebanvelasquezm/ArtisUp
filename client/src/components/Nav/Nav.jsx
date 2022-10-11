import React from 'react'
import { Link } from 'react-router-dom'
import { nav } from '../../data'
import SearchBar from '../NavBar/searchBar/SearchBar'


export default function Nav() {

    const rol = JSON.parse(window.localStorage.getItem('Rol'))

    return (
        <nav>
            <ul className='flex justify-center items-center gap-x-10'>
                {nav.map((item, i) => {
                    return (
                        <li key={i} >
                            <Link to={rol === 'ADMIN' ? "/admin/artists" : rol === 'ARTIST' ? "/artist/artists" : rol === 'USER' ? "/user/artists" : "/artists"} className='hover:text-green-400 text-xl  trasnsition text-gray-100'> {item.name}</Link>
                        </li>
                    )
                })}
                
                    <SearchBar />
            </ul>
        </nav>
    )
}
