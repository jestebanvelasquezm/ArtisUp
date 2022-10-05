import React from 'react'
import { Link } from 'react-router-dom'
import {nav} from '../../data'
import SearchBar from '../NavBar/searchBar/SearchBar'


export default function Nav() {
  return (
    <nav>
        <ul className='flex gap-x-10'>
            {nav.map((item, i)=> {
                return(
                    <li key={i}>
                        <Link to={item.href} className='hover:text-amber-400 trasnsition text-gray-100'> {item.name}</Link>
                    </li>
                )
            })}
            <div>
                <SearchBar  />
            </div>

        </ul>
    </nav>
  )
}
