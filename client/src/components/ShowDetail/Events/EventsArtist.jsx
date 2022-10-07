import React from 'react'
import { Link } from 'react-router-dom';
import { ARTIST_EVENT_TICKETS, USER_EVENT_TICKETS, } from '../../../auth/components/config/routes/paths';

export default function EventsArtist({ events }) {

    const rol = JSON.parse(window.localStorage.getItem('Rol'))
    const arrayVacio = (arr) => !Array.isArray(arr) || arr.length === 0
    // console.log(rol);

    return (
        <>
            <div className=' w-full bg-opacity-40 bg-black  '   >

                <div className=" w-full flex flex-row  flex-wrap ">
                    {events? events.map((ele) => {

                        return (
                            <div key={ele.id} className="flex flex-row flex-wrap w-full lg:w-96  ">
                                <div className="flex flex-col items-center w-full h-5/6 overflow-auto m-9 bg-gray-100 rounded-xl shadow-md duration-300 hover:scale-105 hover:shadow-xl" data-aos='fade-up' data-aos-offset='300'>
                                    <div className="w-full h-80  bg-green-500">
                                        <img src={ele.event.imagesEvent} className="w-full h-full p-7 rounded-xl" alt="" />
                                    </div>
                                    <div className="flex flex-col w-full h-full p-7">
                                        <div className="mb-5">
                                            {/* <p className="text-2xl font-light">Nombre del evento</p> */}
                                            <p className="text-3xl text-center font-extrabold capitalize">{ele.event.eventName}</p>
                                        </div>
                                        <div className="mb-5">
                                            <p className="text-2xl text-center font-light">Descripción:</p>
                                            <p className='text-center'>{ele.event.description !== '' ? ele.event.description : 'No hay una descripción'}</p>
                                        </div>
                                        <div className="mb-5">
                                            <p className="text-2xl text-center font-light">Fecha || Hora</p>
                                            <p className="text-xl text-center font-extrabold">{ele.event.day}</p>
                                            <p className="text-xl text-center font-extrabold">{ele.event.hour}</p>
                                        </div>
                                        <div className="mb-5">
                                            <p className="text-2xl m-2 text-center font-light">Tickets:</p>
                                            <div
                                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                            >
                                            </div>                                        <div className='flex '>
                                                <p className="text-xl flex-1 font-mono"> Premium:  </p>
                                                <p className="text-lg flex-1 text-center font-mono"> ${ele.event.priceOne}  Unidad.</p>
                                            </div>
                                            <div
                                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                            >
                                            </div>                                        <div className='flex '>
                                                <p className="text-xl flex-1 font-mono"> Box: </p>
                                                <p className="text-lg flex-1 text-center  font-mono">${ele.event.priceTwo} Unidad.</p>
                                            </div>
                                            <div
                                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                            >
                                            </div>
                                            <div className='flex '>
                                                <p className="text-xl flex-1 font-mono"> General: </p>
                                                <p className="text-lg flex-1 text-center font-mono">  ${ele.event.priceThree}  Unidad.</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-center">
                                            {
                                                ele.event.isActive ? <Link to={rol === 'ADMIN' ? '/' : rol === 'ARTIST' ? `/artist/event/tickets/${ele.eventId}` : rol === 'USER' ? `/user/event/tickets/${ele.eventId}` : '/login'} className="px-10 py-2 mt-3 text-sm font-medium text-white bg-green-400 rounded-lg border border-green-500 active:scale-95 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:cursor-not-allowed transition-colors duration-200">Comprar</Link> : <button className="px-10 py-2 mt-3 text-sm font-medium text-white bg-red-500 rounded-lg border border-red-700 active:scale-95 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:cursor-not-allowed transition-colors duration-200" disabled>Este evento no está disponible</button>
                                            }
                                        </div>
                                        {/* <div className="mb-5">
                                        <p className="text-xl font-extrabold">Categorias del evento</p>
                                        <ul className="list-disc ml-3">
                                            {event.categories.map((el) => {
                                                return (
                                                    <li key={el.category.id}>{el.category.name}</li>
                                                );
                                            })}
                                        </ul>
                                    </div> */}
                                        {/* <div className="mb-5">
                                        <p className="text-xl font-extrabold">Estado del evento</p>
                                        <p>{event.show.isActive ? <strong className="text-green-500">Activo</strong> : <strong className="text-red-500">Inactivo</strong>}</p>
                                    </div> */}
                                        {/* <div className="mb-5">
                                        <p className="text-xl font-extrabold">Lugar del evento</p>
                                        <p>{event.lugar}</p>
                                    </div> */}
                                        {/* <div className="mb-5">
                                        <p className="text-xl font-extrabold">Precio del evento</p>
                                        <p>${event.show.priceDay} USD.</p>
                                    </div>
                                    <div className="mb-5">
                                        <p className="text-xl font-extrabold">Tiempo del evento</p>
                                        <p>{event.show.duration} horas</p>
                                    </div>
                                    <div className="flex flex-row justify-center">
                                        {
                                            event.show.isActive ? <Link to={ rol === 'ADMIN'? '/' : rol === 'ARTIST'? ARTIST_EVENT_TICKETS : rol === 'USER'?  USER_EVENT_TICKETS : '/login' } className="px-10 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-700 active:scale-95 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:cursor-not-allowed transition-colors duration-200">Comprar</Link> : <button className="px-10 py-2 mt-3 text-sm font-medium text-white bg-red-500 rounded-lg border border-red-700 active:scale-95 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:cursor-not-allowed transition-colors duration-200" disabled>Este evento no está disponible</button>
                                        }
                                    </div> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                        : (
                            <div className="flex flex-col w-full justify-center items-center my-10" data-aos='fade-rigth' data-aos-offset='300'>
                                <p className="text-4xl text-green-400 text-center p-5 font-light">Este artista no tiene eventos disponibles</p>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-36 w-36 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        )
                    }
                </div>
            </div>


        </>
    )
}

