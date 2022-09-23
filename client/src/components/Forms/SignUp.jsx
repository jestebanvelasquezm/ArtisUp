import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../NavBar/NavBar'
import { uploadImage } from '../../utils/cloudInary'
import Select from '../../utils/select'
import axios from 'axios'
import { useAuthContext } from '../../auth/context/authContext'

export default function SignUp() {

    const {login} = useAuthContext()

    const [rol, setRol] = useState('')
    const [user, setUser] = useState({
        nickName: '',
        image: '',
        userName: '',
        email: '',
        phone: 0,
        city: '',
        country: '',
        password: '',
        c_password: '',
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const upImage = async (e) => {
        try {
            const img = await uploadImage(e)
            setUser({
                ...user,
                image: img
            })
        } catch (error) {
            return (error);
        }

    }

    const onChangefilterby = (e) => {
        setRol(e.value)
        setUser({
            ...user,
            rol: e.value
        })
    }
    const filterby = [
        { name: 'Artista', value: 'ARTIST' },
        { name: 'Usuario', value: 'USER' },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(user);
        try {
            const User = await axios('http://localhost:4000/signup', {
                method:'POST',
                data: user
            })
            console.log(User);
            
            window.localStorage.setItem('auth-token', JSON.stringify(User.data.token));
            window.localStorage.setItem('User', JSON.stringify(User.data));
            window.localStorage.setItem('Rol', JSON.stringify(User.data.rol))
            window.localStorage.setItem('isAuth', true)

            setUser({
                nickName: '',
                image: '',
                userName: '',
                email: '',
                phone: '',
                city: '',
                country: '',
                password: '',
                c_password: '',
            })
            login()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="w-auto h-screen justify-center font-medium   bg-gray-400">
            <div className="container  mx-auto">
                <Navbar />
                <div className="flex justify-center  px-2 my-2">
                    <div className="w-auto xl:w-3/4 lg:w-11/12 flex">
                        <div className="w-full h-5/6 my-16 bg-gray-00 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg" style={!user.image ? { backgroundImage: 'url("https://res.cloudinary.com/esteban3232/image/upload/v1663402682/eventApp/naoeqrchrcvv2tg9u5cj.jpg")' } : { backgroundImage: `url(${user.image})` }} />
                        <div className="w-full h-5/6 lg:w-7/12  my-16 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                            <form onSubmit={(e) => handleSubmit(e)} className="px-8 pt-10 pb-8 mb-4 bg-white rounded">
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" >
                                            Nombre & Apellido
                                        </label>
                                        <input onChange={(e) => handleChange(e)} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="userName" type="text" placeholder="user name" />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                                            Email
                                        </label>
                                        <input onChange={(e) => handleChange(e)} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="email" type="text" placeholder="email" />
                                    </div>
                                </div>
                                {
                                    rol === 'ARTIST' ?
                                        <div className="mb-4 ">
                                            <label className="block mb-2 text-sm text-center font-bold text-gray-700" >
                                                Nombre Artistico
                                            </label>
                                            <input onChange={(e) => handleChange(e)} value={user.nickName} className="w-full px-3 py-2 text-center text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="nickName" type="text" placeholder="Nombre Artistico" />
                                        </div>
                                        : null
                                }
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" >
                                            Ciudad
                                        </label>
                                        <input onChange={(e) => handleChange(e)} value={user.city} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="city" type="text" placeholder="city" />
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                                            País
                                        </label>
                                        <input onChange={(e) => handleChange(e)} value={user.country} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="country" type="text" placeholder="country" />
                                    </div>
                                </div>

                                <div className="mb-4 ">
                                    <Select
                                        filterby={filterby}
                                        onChangefilterby={onChangefilterby}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" type="email">
                                        Telefono
                                    </label>
                                    <input onChange={(e) => handleChange(e)} value={user.phone} className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="phone" type="number" placeholder="phone" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        Imagen Perfil
                                    </label>
                                    <input className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-70  hover:file:bg-violet-100"
                                        name="image"
                                        type="file" placeholder="image profile"
                                        onChange={(e) => upImage(e)}
                                    />

                                </div>
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                            Contraseña
                                        </label>
                                        <input onChange={(e) => handleChange(e)} value={user.password} className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************" />
                                        {/* <p className="text-xs italic text-red-500">Please choose a password.</p> border-red-500  */}
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                                            Confirme Contraseña
                                        </label>
                                        <input onChange={(e) => handleChange(e)} value={user.c_password} className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="c_password" type="password" placeholder="******************" />
                                    </div>
                                </div>
                                <div className="mb-6 text-center">
                                    <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                                        Registrar Cuenta
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />

                                <div className="text-center">
                                    <Link to='/login' className="inline-block  text-base  text-blue-500 align-baseline hover:text-blue-800" >
                                        Ya Tienes Una Cuenta? Login!
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
