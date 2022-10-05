import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { getEventId } from '../../reduxToolkit/Actions/eventAction';
import Navbar from '../NavBar/NavBar'
import axios from 'axios';



export default function FormBuy() {
    // const navigate = useNavigate()
    const params = useParams();
    const dispatch = useDispatch()
    const event = useSelector(state => state.eventsPrincipal.id)

    useEffect(() => {
        dispatch(getEventId(params.id))
    }, [dispatch, params])

    let total 
    let price
    const [tickets, setTickets] = useState({
        eventId:'',
        imagesEvent:'',
        premiumTickets: 0,
        boxTickets: 0,
        generalTickets:0,
        priceOne:0,
        priceTwo:0,
        priceThree:0,
        totalTickets: 0,
        totalPrice: 0
    })
    total =  parseInt(tickets.premiumTickets?tickets.premiumTickets: 0 ) + parseInt(tickets.boxTickets? tickets.boxTickets : 0) + parseInt(tickets.generalTickets? tickets.generalTickets : 0)
    price= parseInt(tickets.premiumTickets? tickets.premiumTickets * event.priceOne: 0 ) + parseInt(tickets.boxTickets? tickets.boxTickets * event.priceTwo : 0) + parseInt(tickets.generalTickets? tickets.generalTickets * event.priceThree : 0) 

    const handleChange = (e) => {
        setTickets({
            ...tickets,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            tickets.id = event.id
            tickets.eventName = event.eventName
            tickets.imagesEvent = event.imagesEvent
            tickets.priceOne = event.priceOne
            tickets.priceTwo = event.priceTwo
            tickets.priceThree = event.priceThree
            tickets.totalTickets = total
            tickets.totalPrice = price
            console.log(tickets);
            window.localStorage.setItem('cart',JSON.stringify(tickets))
            const response = await axios('http://localhost:4000/user/create-order',{
                method:'POST',
                headers: { Authorization :`Bearer ${JSON.parse(window.localStorage.getItem('auth-token'))}`},
                data: tickets
            })
            if(response.data.url) window.location.href = response.data.url // return navigate('http://localhost:3000/user/checkout-success')
            
        } catch (error) {
            
        }
    }

    return (
        <div className="w-auto h-screen   font-medium   bg-gray-400">
            <div className="container  mx-auto">
                <Navbar />
                <div className="flex  px-2 my-2">
                    <div className="w-auto xl:w-6/4 lg:w-11/12 flex">
                        <div className="w-60"  />
                            <img className="  my-20 rounded-l-lg  "  src={event.imagesEvent} alt="" />
                        <div className="w-full  lg:w-7/12  my-20 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="text-2xl text-center pt-10 ">Tickets:</h3>
                            <form onSubmit={(e) => handleSubmit(e)} className="px-8 pt-10   bg-white rounded">
                                
                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" >
                                            Premium:  { Number(event.premiumTickets - tickets.premiumTickets)} 
                                        </label>
                                            <label className="block mb-2 text-sm font-bold text-center text-gray-700">1 =   ${event.priceOne} Usd</label>
                                        <input onChange={(e) => handleChange(e)} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="premiumTickets" type="number" placeholder="" />
                                    </div>

                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" htmlFor="lastName">
                                            Box:  { Number(event.boxTickets  - tickets.boxTickets)}
                                        </label>
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700">1 =  ${event.priceTwo} Usd</label>
                                        <input onChange={(e) => handleChange(e)} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="boxTickets" type="number" placeholder="" />
                                    </div>

                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" htmlFor="lastName">
                                            General: { Number(event.generalTickets - tickets.generalTickets)}
                                        </label>
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700">1 =   ${event.priceThree} Usd</label>
                                        
                                        <input onChange={(e) => handleChange(e)} className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="generalTickets" type="number" placeholder="" />
                                    </div>
                                </div>
                                <h3 className="pt-4 text-2xl text-center pb-12">Tu Compra:</h3>

                                {/* LISTADO DE LA COMPRA */}

                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" >
                                            tickets Premiun: 
                                        </label>
                                    </div>
                                    <div className="md:mr-2">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" htmlFor="lastName">
                                            {tickets.premiumTickets}
                                        </label>
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" htmlFor="lastName">
                                            ${Number(tickets.premiumTickets * event.priceOne)}
                                        </label>
                                    </div>
                                </div>
                                <hr className="mb-6 border-t" />

                                <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" >
                                            tickets Box: 
                                        </label>
                                    </div>
                                    <div className="md:ml-6">
                                        <label className="block mb-2  text-sm font-bold text-center text-gray-700" htmlFor="lastName">
                                            {tickets.boxTickets}
                                        </label>
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" htmlFor="lastName">
                                            ${Number(tickets.boxTickets * event.priceTwo)}
                                        </label>
                                    </div>
                                </div>

                                <hr className="mb-6 border-t" />

                                <div className="mb-4 md:flex md:justify-between ">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" >
                                            tickets General: 
                                        </label>
                                    </div>
                                    <div className="md:mr-2">
                                        <label className="block mb-2  text-sm font-bold text-gray-700" htmlFor="lastName">
                                            {tickets.generalTickets}
                                        </label>
                                    </div>
                                    <div className="md:ml-2 content-center">
                                        <label className="block mb-2 text-sm font-bold text-center text-gray-700" htmlFor="lastName">
                                            ${Number(tickets.generalTickets * event.priceThree)}
                                        </label>
                                    </div>
                                </div>

                                <hr className="mb-6 border-t" />

                                {/* Valor Compra */}

                                <div className="mb-4 md:flex md:justify-between bg">
                                <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-lg font-bold text-gray-800" >
                                            Total Compra: 
                                        </label>
                                    </div>
                                    <div className="md:mr-2">
                                        <label className="block mb-2 text-lg font-bold text-gray-800" htmlFor="lastName">
                                        {total}
                                        </label>
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-lg font-bold text-gray-800" htmlFor="lastName">
                                        ${price}
                                        </label>
                                    </div>
                                </div>
                                <hr className="mb-6 border-t" />
                                
                                {/* <div className="mb-4 md:flex md:justify-between">
                                    <div className="mb-4 md:mr-2 md:mb-0">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                            Total Valor: 
                                        </label>
                                        <input onChange={(e) => handleChange(e)} value={user.password} className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="******************" />
                                        <p className="text-xs italic text-red-500">Please choose a password.</p> border-red-500 
                                    </div>
                                    <div className="md:ml-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="c_password">
                                            
                                        </label>
                                        <input onChange={(e) => handleChange(e)} value={user.c_password} className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name="c_password" type="password" placeholder="******************" />
                                    </div>
                                </div> */}
                                <div className="mb-6 text-center">
                                    <button  className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
                                        Pagar
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="mb-6 text-center">
                                    <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
