import React, { useEffect } from 'react'
import Header from '../../Home/landin/Header'
import Footer from '../../Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../../reduxToolkit/Actions/categoryAction'


export default function Form({ handleChange, handleSubmit, event, uploadImage, errors }) {

    const categories = useSelector(state => state.artistsPrincipal.categories)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllCategories())
    }, [])



    return (
        <>
            <Header />
            <div className=" flex bg-black flex-col  items-center justify-center">
                <div className="  container mx-auto  mt-32 " data-aos='fade-left' data-aos-offset=''>

                    <div className="mb-5  flex flex-col items-center justify-center mt-10   ">
                        <p className="text-6xl text-center font-extrabold text-green-500 capitalize  " data-aos='fade-down' data-aos-offset='300'>Crea Tú Evento</p>
                    </div>
                    <div className="   rounded-lg flex flex-col flex-wrap lg:flex-row justify-center items-center w-full">

                        <form onSubmit={(e) => handleSubmit(e)} className=' w-full mt-10 bg-zinc-800 rounded-2xl mb-10 '>
                            {/* <div className=" shadow-md bg-gray-400 rounded flex justify-center items-center"> */}
                            <div className="   rounded flex flex-col  lg:flex-row items.center justify-between">
                                <div className="m-4 flex flex-col  lg:justify-center lg:items-center  w-auto lg:w-60 " >
                                    <label className="block mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">nombre del evento
                                    { errors.eventName ? <span className="text-red-600 text-center"> {errors.eventName} </span> : null}
                                    </label>
                                    <input value={event.eventName} onChange={(e) => handleChange(e)} type="text" name="eventName" id="eventName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="nombre evento..." required />
                                </div>
                                <div className="m-4 flex flex-col lg:justify-center lg:items-center w-60 lg:w-60 ">
                                    <label className="block  mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">fecha
                                    { errors.day ? <span className="text-red-600 text-center"> {errors.day} </span> : null}
                                    
                                    </label>
                                    <input value={event.day} onChange={(e) => handleChange(e)} type="date" name="day" id="text" placeholder="" className="bg-gray-50 border   w-[324px] lg:w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>

                                <div className="m-4 flex flex-col lg:justify-center lg:items-center w-auto lg:w-60 " >
                                    <label className="block mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">hora inicio
                                    { errors.hour ? <span className="text-red-600 text-center"> {errors.hour} </span> : null}
                                    
                                    </label>
                                    <input value={event.hour} onChange={(e) => handleChange(e)} type="time" name="hour" id="text" placeholder="" className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <div className='m-4 flex flex-col lg:justify-center lg:items-center w-auto lg:w-60  '>
                                    <label className="block mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">hora finalizacion
                                    { errors.finish ? <span className="text-red-600 text-center"> {errors.finish} </span> : null}
                                    
                                    </label>
                                    <input value={event.finish} onChange={(e) => handleChange(e)} type="time" name="finish" id="finish" placeholder="" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                            </div>

                            <div className="  flex flex-col  lg:flex-row items.center justify-between rounded px-1 pt-1 pb-1 mb-1 ">
                                <div className='m-4 flex flex-col lg:justify-center lg:items-center  w-80 lg:w-60 '>
                                    <label className="block mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">lugar
                                    { errors.place ? <span className="text-red-600 text-center"> {errors.place} </span> : null}
                                    
                                    </label>
                                    <input value={event.place} onChange={(e) => handleChange(e)} type="text" name="place" id="text" placeholder=" lugar del evento" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <div className='m-4 flex flex-col lg:justify-center lg:items-center w-80 lg:w-60 '>
                                    <label className="block mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">ciudad 
                                    { errors.city ? <span className="text-red-600 text-center"> {errors.city} </span> : null}
                                    
                                    </label>
                                    <input value={event.city} onChange={(e) => handleChange(e)} type="text" name="city" id="text" placeholder="ciudad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <div className='m-4 flex flex-col lg:justify-center lg:items-center  w-80 lg:w-60 '>
                                    <label className=" mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">Pais
                                    { errors.country ? <span className="text-red-600 text-center"> {errors.country} </span> : null}
                                    
                                    </label>
                                    <input value={event.country} onChange={(e) => handleChange(e)} type="text" name="country" id="text" placeholder="ciudad" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                <div className='m-4 flex flex-col lg:justify-center lg:items-center  w-80 lg:w-60 '>
                                    <label className="block mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">Selecciona Una Categoria
                                    { errors.categories ? <span className="text-red-600 text-center"> {errors.categories} </span> : null}
                                    
                                    </label>
                                    <select id="underline_select" name="categories" onChange={(e) => handleChange(e)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer rounded-lg">
                                        <option selected className='text-center'>Selecciona la Categoria</option>
                                        {categories.map((el, i) => {
                                            return (
                                                <option key={i} value={el.id}>{el.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>

                            </div>

                            <div className='flex flex-col  lg:flex-row items.center  justify-around  '>


                                <div className='m-4 flex flex-col lg:justify-center lg:items-center   w-80 lg:w-full'>
                                    <label className="block mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">descripcion
                                    { errors.description ? <span className="text-red-600 text-center"> {errors.description} </span> : null}
                                    
                                    </label>
                                    <textarea value={event.description} onChange={(e) => handleChange(e)} type="text" name="description" id="text" placeholder="breve description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                                
                            </div>
                            <div className="flex items-center mt-5 justify-center p-6 border-t border-solid border-slate-400 rounded-b" />
                            <div className="mb-5  flex flex-col items-center justify-center    ">
                                <p className="text-6xl text-center font-extrabold text-green-500 capitalize  " data-aos='fade-up' data-aos-offset='300'>Tus Tickets</p>
                            </div>

                            <div className=" mt-5 flex flex-col rounded-t-3xl lg:flex-row items.center  justify-around w-full  ">
                                <div className='m-4 pt-10 rounded-t-3xl flex flex-col lg:justify-center lg:items-center bg-yellow-400 bg-opacity-50   w-80 lg:w-60 '>
                                    <label className="block mb-2   text-lg text-center font-medium text-zinc-100 dark:text-gray-300">Premium Tickets
                                    { errors.premiumTickets ? <span className="text-red-600 text-center"> {errors.premiumTickets} </span> : null}
                                    
                                    </label>
                                    <input type="number" name="premiumTickets" value={event.premiumTickets} onChange={(e) => handleChange(e)} id="text" placeholder="cantidad" class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    <label className="mt-2 block mb-2 text-lg text-center font-medium text-zinc-100 dark:text-gray-300">Precio
                                    { errors.priceOne ? <span className="text-red-600 text-center"> {errors.priceOne} </span> : null}
                                    
                                    </label>

                                    <input type="number" name="priceOne" value={event.priceOne} onChange={(e) => handleChange(e)} id="text" placeholder="precio" class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />

                                </div>
                                <div className='m-4 pt-10 rounded-t-3xl bg-blue-400 bg-opacity-50  flex flex-col lg:justify-center lg:items-center   w-80 lg:w-60'>
                                    <label class="block mb-2 text-lg text-center font-medium text-zinc-100 dark:text-gray-300">Box Tickets
                                    { errors.boxTickets ? <span className="text-red-600 text-center"> {errors.boxTickets} </span> : null}
                                    
                                    </label>
                                    <input type="number" name="boxTickets" value={event.boxTickets} onChange={(e) => handleChange(e)} id="text" placeholder="cantidad" class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    <label class="mt-2 block mb-2 text-lg text-center font-medium text-zinc-100 dark:text-gray-300">Precio
                                    { errors.priceTwo ? <span className="text-red-600 text-center"> {errors.priceTwo} </span> : null}

                                    </label>
                                    <input type="number" name="priceTwo" value={event.priceTwo} onChange={(e) => handleChange(e)} id="text" placeholder="precio" class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />

                                </div>
                                <div className='m-4 pt-10 rounded-t-3xl bg-green-400 bg-opacity-50   flex flex-col lg:justify-center lg:items-center   w-80 lg:w-60'>
                                    <label class="block mb-2 text-lg text-center font-medium text-zinc-100 dark:text-gray-300">General Tickets
                                    { errors.generalTickets ? <span className="text-red-600 text-center"> {errors.generalTickets} </span> : null}
                                    
                                    </label>
                                    <input type="number" name="generalTickets" value={event.generalTickets} onChange={(e) => handleChange(e)} id="text" placeholder="cantidad" class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    <label class=" mt-2 block mb-2 text-lg text-center font-medium text-zinc-100 dark:text-gray-300">Precio
                                    { errors.priceThree ? <span className="text-red-600 text-center"> {errors.priceThree} </span> : null}
                                    
                                    </label>
                                    <input type="number"  name="priceThree" value={event.priceThree} onChange={(e) => handleChange(e)} id="text" placeholder="precio" class="bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                </div>
                            </div>

                            <div className='m-3 mt-5 flex flex-col justify-center items-center'>
                                <label className=" mb-2 text-lg font-medium text-zinc-100 dark:text-gray-300">Poster Evento
                                {/* { errors.imagesEvent ? <span className="text-red-600 text-center"> {errors.imagesEvent} </span> : null} */}
                                
                                </label>
                                <input type="file" name="imagesEvent" id="text" placeholder="" onChange={(e) => uploadImage(e)} className=" lg:w-96 text-sm text-green-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-xl file:border-0
                                        file:text-sm file:font-semibold file:bg-green-500  file:text-white  hover:file:bg-green-600" required />
                            </div>

                            <div className="flex items-center mt-5 justify-center p-6 border-t border-solid border-slate-400 rounded-b">

                                <button
                                    className=" bg-green-500 text-white hover:bg-green-600 active:bg-green-600 font-bold uppercase text-lg px-16 py-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                    onSubmit={(e) => handleSubmit(e)}
                                    // disabled={!Object.keys(errors).length? false : true}
                                >
                                    ¡Crear!
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
