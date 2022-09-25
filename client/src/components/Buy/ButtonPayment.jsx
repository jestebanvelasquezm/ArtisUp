import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ButtonPayment({state}) {

    const navigate = useNavigate()

    const handleCheckOut = async (e) => {
        try {
            window.localStorage.setItem(JSON.stringify(state))
            const response = await axios('http://localhost:4000/user/create-order',{
                method:'POST',
                headers: { Authorization :`Bearer ${JSON.parse(window.localStorage.getItem('auth-token'))}`},
                data: state
            })
            if(response.data.url)  return navigate('http://localhost:3000/user/checkout-success')
            
        } catch (error) {
            console.log(error);
        }
    }
    // const cart = JSON.parse(window.localStorage.getItem('cart'))


  return (
    <>
        <button onClick={(e) => handleCheckOut ()}>
            CheckOut
        </button>
    </>
  )
}

export default ButtonPayment