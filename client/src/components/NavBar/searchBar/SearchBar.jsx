import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getArtistName } from '../../../reduxToolkit/Actions/artistAction'

export default function SearchBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const rol = JSON.parse(window.localStorage.getItem('Rol'))
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log(input);
            dispatch(getArtistName(input))
            navigate(rol === 'ADMIN' ? '/admin/results' : rol === 'ARTIST'? '/artist/results' : rol === 'USER' ? '/user/results' : '/results')
            setInput('')
        } catch (error) {
            return error
        }

    }


    return (
        <div className='  lg:w-full lg:pb-10 lg:mr-10'>
            <form onSubmit={(e) => handleSubmit(e)} className=' flex flex-col justify-center lg:flex-row lg:justify-start'>
                <div className="lg:absolute lg:w-96    lg:justify-end ">
                    {/* <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div> */}
                    <input value={input} onChange={(e) => handleChange(e)} type="search" id="default-search" className="lg:block h-11 w-auto lg:w-80  text-center text-lg text-gray-800 bg-gray-100 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..." required />
                </div>
                    <button type="submit" className="text-white    lg:absolute   top-0  bg-green-400 hover:bg-green-500 focus:ring-4  focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm  px-4 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </form>
        </div>

    )
}
