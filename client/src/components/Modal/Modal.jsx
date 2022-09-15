import React from "react";
import { useState } from "react";

export default function Modal({handleChange, handleSubmit, event, showModal, setShowModal, uploadImage }) {
    // const [showModal, setShowModal] = useState(true);


    // const [event, setEvent] = useState({
    //     eventName: '',
    //     imagesEvent: '',
    //     description:'',
    //     duration:'',
    //     day:'',
    //     hour:'',
    //     lugar:'',
    //     ciudad:'',
    //     premiumTickets:0,
    //     boxTickets:0,
    //     generalTickets:0,
    //     capacity: 0,
    //     categories: ''
    // })




    return (
        <>
            <button
                className="bg-blue-500 text-white active:bg-blue-700 font-bold uppercase text-sm px-6 py-4 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Crear Evento
            </button>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative  w-auto my-6 mx-auto max-w-4xl">

                            <div className=" border-0 bg-slate-100 rounded-lg shadow-lg relative flex flex-col w-full bg-border-slate-200 outline-none focus:outline-none">
                                <div className="flex items-start  justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Events App
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>

                                <div class="py-8 px-6 lg:px-8  ">
                                    <h3 class="mb-4 text-xl font-medium  text-gray-900 dark:text-white"> Crea Tu Evento</h3>
                                    <form  onSubmit={(e) => handleSubmit (e)} class="space-y-6" action="#">
                                        <div className=" shadow-md bg-gray-400 rounded px-1 pt-1 pb-1 mb-1 flex flex-row my-2">
                                            <div className="m-3" >
                                                <label for="email" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">nombre del evento</label>
                                                <input type="email" name="eventName" id="email" value={event.eventName} onChange={(e) => handleChange (e) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                            </div>
                                            <div className="m-3">
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">fecha</label>
                                                <input type="date" name="day" id="text" placeholder="" value={event.day} onChange={(e) => handleChange (e) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>
                                            
                                            <div className="m-3" >
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">hora inicio</label>
                                                <input type="time"  name="hour" id="text" placeholder="" value={event.hour}  onChange={(e) => handleChange (e) } className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>
                                        </div>

                                        <div className=" shadow-md bg-gray-400 rounded px-1 pt-1 pb-1 mb-1 flex flex-row my-2">
                                            <div className='m-3'>
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">hora finalizacion</label>
                                                <input type="time" name="duration" id="text" placeholder="" value={event.duration} onChange={(e) => handleChange (e) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>
                                            <div className='m-3'>
                                                <label for="password" className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">lugar</label>
                                                <input type="text" name="lugar" id="text" placeholder="" value={event.lugar} onChange={(e) => handleChange (e) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>
                                            <div className='m-3'>
                                                <label  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">ciudad</label>
                                                <input type="text" name="ciudad" id="text" placeholder="ciudad" value={event.ciudad} onChange={(e) => handleChange (e) } class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>

                                        </div>

                                            <div className='m-3'>
                                                <label  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">descripcion</label>
                                                <textarea type="text" name="description" id="text" placeholder="breve description" value={event.description} onChange={(e) => handleChange (e) } class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>
                                            <div  className='m-3'>

                                        <label for="underline_select" className="sr-only">Underline select</label>
                                        <select id="underline_select" onChange={(e) => handleChange (e) } className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-gray-100 border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                            <option selected>Selecciona la Categoria</option>
                                            <option value="1">pelicula</option>
                                            <option value="2">pintura</option>
                                            <option value="3">obra teatral</option>
                                            <option value="4">concierto</option>
                                        </select>
                                            </div>

                                        <div className=" shadow-md bg-gray-400 rounded px-1 pt-1 pb-1 mb-1 flex flex-row my-2">
                                            <div className='m-3'>
                                                <label  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Premium Tickets</label>
                                                <input type="number" name="premiumTickets" value={event.premiumTickets} onChange={(e) => handleChange (e) } id="text" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>
                                            <div className='m-3'>
                                                <label  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Box Tickets</label>
                                                <input type="number" name="boxTickets"  value={event.boxTickets} onChange={(e) => handleChange (e) } id="text" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>
                                            <div className='m-3'>
                                                <label  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">General Tickets</label>
                                                <input type="number" name="generalTickets" value={event.generalTickets} onChange={(e) => handleChange (e) } id="text" placeholder="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                            </div>
                                        </div>

                                        <div className='m-3'>
                                            <label className=" mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">poster evento</label>
                                            <input type="file" name="imagesEvent" id="text" placeholder=""  onChange={(e) => uploadImage (e) } className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                        </div>

                                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className=" bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Omitir
                                    </button>
                                    <button
                                        className=" bg-blue-700 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"
                                        onSubmit={(e) => handleSubmit  (e)}
                                        // onClick={() => setShowModal(false)}
                                    >
                                        ¡Crear!
                                    </button>
                                </div>
                                    </form>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
