import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Navbar from '../NavBar/NavBar'
import axios from 'axios'
import Modal from '../Modal/Modal'
import { useAuthContext } from '../../auth/context/authContext'

const Validate = (input) => {
    let errors = {};
    if (!input.email) errors.email = "el email es obligatorio";
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email) ===false)
        errors.email = "email debe ser de la forma: example@gmail.com";
    if (!input.password) errors.password = "debe ingresar una contraseña";
    return errors
}

export default function Login() {
    const {login} = useAuthContext()
    // const navigate = useNavigate()

    const [input, setInput] = useState({
        email:'',
        password:''
    })

    const [error, setError] = useState({
        email:'email required'
    })
    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        let errorsResult = Validate({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(errorsResult)
    }

    const loginSubmit = async (e) =>{
        e.preventDefault()
        try {
            const response = await axios('http://localhost:4000/signin',{
                method:'POST',
                data:input
            })
            window.localStorage.setItem('auth-token', JSON.stringify( response.data.token));
            window.localStorage.setItem('User', JSON.stringify( response.data));
            window.sessionStorage.setItem('Rol', JSON.stringify(response.data.rol))
            window.sessionStorage.setItem('isAuth', true)

            setInput({
                email:'',
                password:''
            })
            login()
        } catch (error) {
            console.log(error);
        }
    } 
    



    return (
        <div>
        <Navbar/>
            <section className="h-screen">
                <div className="container px-6 py-12 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="w-full"
                                alt="Phone"
                            />
                        </div>
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                            <form onSubmit={(e)=>loginSubmit(e)} >

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={input.email}
                                        name='email'
                                        id='email'
                                        onChange={(e)=>handleChange(e)}
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                    />
                                    {error && error.email ? <span className="text-red-600"> {error.email} </span> : null}

                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        value={input.password}
                                        name='password'
                                        id='password'
                                        onChange={(e)=>handleChange(e)}
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                    />
                                    {error && error.password ? <span className="text-red-600"> {error.password} </span> : null}

                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <Link
                                        to='/'
                                        className="text-blue-400 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                                    >Forgot password?</Link>
                                </div>

                                
                                    <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    disabled= {Object.keys(error).length === 0 ? false : true}
                                >
                                    Sign in
                                </button>

                                

                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>

                                <Link
                                    className="px-7 py-3 bg-slate-600 hover:bg-slate-700 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                                    to='/signup'
                                    // role="button"
                                    // data-mdb-ripple="true"
                                    // data-mdb-ripple-color="light"
                                >
                                        Register
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
