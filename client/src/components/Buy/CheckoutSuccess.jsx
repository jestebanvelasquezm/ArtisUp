import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getUserPayment } from '../../reduxToolkit/Actions/usersActions';
import Footer from '../Footer/Footer'
import Header from '../Home/landin/Header'



export default function CheckoutSuccess() {
    const dispatch = useDispatch();
    const payment = useSelector(state => state.usersPrincipal.paymentSuccess)

    useEffect(() => {
        dispatch(getUserPayment())
    }, [dispatch])

    console.log(payment);

    const rol = JSON.parse(window.localStorage.getItem('Rol'))

    return (
        <>
            <Header />
            <main className="w-full  bg-black ">
                <section className="relative   flex justify-center items-center  " style={{ height: "500px" }}>
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover opacity-50 bg-black"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/esteban3232/image/upload/v1664933611/eventApp/marco-bicca-bpNr_FJNwrc-unsplash_ykupzo.jpg')"
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div className=' bg-zinc-700 rounded-xl   m-10  absolute pointer-events-none '>
                        <h2 className='text-zinc-200 text-4xl font-extrabold text-center lg:text-7xl m-5'> Compra Realizada</h2>
                    </div>
                    
                </section>
                {payment ?
                    <section className="relative mt-10 py-16 bg-black">
                        <div className="container mx-auto px-4 h-full">
                            <div className="relative  flex flex-col min-w-0 break-words  w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <Link to={rol === 'ADMIN' ? `/admin` : rol === 'ARTIST' ? `/artist` : rol === 'USER' ? `/user` : `/artists`} className="absolute flex items-center w-10 h-10 right-4 top-4 justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </Link>
                                <div className=" w-full flex flex-row lg:flex-col  justify-center items-center  p-5 bg-green-400 bg-opacity-90 rounded-3xl">
                                    <div className=" flex flex-col rounded-xl    lg:flex-row justify-center items-center w-full  ">
                                        <div className=" w-full  lg:w-auto m-5  ">
                                            <div className=" flex justify-center  items-center  w-full lg:w-60 rounded-full  ">
                                                <img
                                                    alt="..."
                                                    src={payment.event?.imagesEvent}
                                                    // className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-10  -ml-24 lg:ml-24"
                                                    className="  rounded-3xl shadow-black shadow-2xl"

                                                    style={{ maxWidth: "250px" }}
                                                />
                                            </div>
                                        </div>
                                        <div className=" text-center m-10 h-full w-full mt-5 pt-5 rounded-xl shadow-black shadow-2xl ">
                                            <h3 className="text-2xl  font-semibold leading-normal mb-2 text-zinc-900 capitalize">
                                                {payment.event?.eventName}
                                            </h3>
                                            
                                            <div className="text-xl leading-normal mt-0 mb-2 text-zinc-900   capitalize">
                                                
                                                Estado del Pago: {payment.payment_status} √√
                                            </div>
                                            <div className="text-xl leading-normal mt-0 mb-2 text-zinc-900   capitalize">
                                                <i className="fas fa-map-marker-alt mr-2 text-lg text-justify text-gray-500 "></i>{" "}
                                                Hora: {payment.event?.hour} 
                                            </div>
                                            <h3 className="text-xl   leading-normal mb-2 text-zinc-900  capitalize">
                                                {payment.event?.place}
                                            </h3>
                                        
                                        <div className="  h-full shadow-black shadow-2xl mb-5 m-5  flex flex-row items-center justify-center rounded-xl  bg-zinc-900">
                                                <p className='text-center text-gray-100'>{payment.event?.city} - {payment.event?.country}</p>
                                          
                                        </div>
                                        </div>

                                        <div className="  h-full w-full shadow-black shadow-2xl pt-5 bg-zinc-900 pb-5   rounded-2xl ">
                                            <h2 className=' text-center text-2xl text-zinc-100 '>Tickets Comprados:</h2>
                                            <div className="flex justify-evenly items-center lg:justify-evenly m-5 rounded text-green-900">
                                                <div className=" text-center bg-yellow-400 bg-opacity-50 w-20 m-2 rounded ">
                                                    <span className="text-3xl font-bold block uppercase tracking-wide text-zinc-100">
                                                        {payment.premium}
                                                    </span>
                                                    <span className="text-sm text-gray-100">Premium</span>
                                                </div>
                                                <div className=" text-center bg-blue-400 rounded bg-opacity-50 m-2 w-20">
                                                    <span className="text-3xl font-bold block uppercase tracking-wide text-zinc-100">
                                                        {payment.box}
                                                    </span>
                                                    <span className="text-sm text-gray-100">Box</span>
                                                </div>
                                                <div className="  text-center bg-green-400 rounded bg-opacity-50 m-2 w-20">
                                                    <span className="text-3xl font-bold block uppercase tracking-wide text-zinc-100">
                                                        {payment.general}
                                                    </span>
                                                    <span className="text-sm text-gray-100">General</span>
                                                </div>
                                            </div>

                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    :
                    null
                }
            </main>
            <Footer />
        </>
    )
}
