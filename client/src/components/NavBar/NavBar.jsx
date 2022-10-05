import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchBar from './searchBar/SearchBar';
// import logo from "../../assets/nav/logoE.png";


export default function Navbar() {

    const rol = JSON.parse(window.localStorage.getItem('Rol'))
    

    // const logOut = ()=>{
    //     localStorage.clear()
    //     navigate('/login')
    // }
    const navLinkStyles = ({ isActive }) => {
        return {
            color: isActive ? "#f7c614" : "",
            fontWeight: isActive ? "bold" : "bold"
        };
    };

    return (
        <>
            <div className="w-full bg-gray-100 py-1 px-5  flex items-center fixed top-0 right-0 left-0 shadow lg:flex-row lg:flex-nowrap lg:justify-start z-50">
                <div className="w-full py-3 mx-auto flex items-center justify-between lg:flex-nowrap xl:max-w-screen-xl">
                    <Link to={rol === 'ADMIN'? "/" : rol === 'ARTIST'? "/artist/home" : rol === 'USER'? "/user/home" : "/"} >
                        <p className="text-3xl text-stone-800  inline-block py-1.5 mr-4 leading-none font-bold whitespace-nowrap tracking-widest">Events App</p>
                    </Link>
                    <div className="flex basis-auto flex-grow items-center">
                        <ul className="flex flex-row items-center ml-auto pl-0 list-none my-0">
                            <li className="mr-8">
                            
                                <NavLink to={rol === 'ADMIN'? "/admin/artists" : rol === 'ARTIST' ? "/artist/artists" : rol === 'USER'? "/user/artists" : "/artists"} style={navLinkStyles} className="flex items-center text-gray-900 text-lg py-1.5 px-4 rounded-3xl transition-all duration-75 ease-linear delay-75 hover:bg-gray-400 hover:bg-opacity-20">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg> */}
                                    Artistas
                                </NavLink>
                            </li>

                            

                            
                            <li className="mr-4">

                            <SearchBar />
                            </li>


                            <li className="mr-4" >
                                {rol ?
                                <NavLink to={rol === 'ADMIN'? "/admin" : rol === 'ARTIST'? "/artist" : rol === 'USER'? "/user" : null } style={navLinkStyles} className="flex items-center text-gray-900 text-lg py-1.5 px-4 rounded-3xl transition-all duration-75 ease-linear delay-75 hover:bg-gray-400 hover:bg-opacity-20"  >
                                    
                                    Profile
                                </NavLink>
                                    :
                                    null
                                }               
                            </li>

                            <li className="mr-4">
                            {rol === 'ADMIN'? 
                                <Link to="/admin/logout" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Link>
                            : rol === 'ARTIST'? 
                            <Link to="/artist/logout" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Link>
                            : rol === 'USER'? 
                                <Link to="/user/logout" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</Link>
                            :

                                <NavLink to='/login' style={navLinkStyles} className="flex items-center text-gray-800 text-lg py-1.5 px-4 rounded-3xl transition-all duration-75 ease-linear delay-75 hover:bg-gray-400 hover:bg-opacity-20">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Ingresar
                                </NavLink>
                                
                                }               
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>

        
        

        
    )
}