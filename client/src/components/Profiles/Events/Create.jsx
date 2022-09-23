import axios from 'axios';
import React, { useState } from 'react'
import Modal from '../../Modal/Modal';
import Swal from 'sweetalert2';

export default function Create() {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);//mostrar carga user experience
    const [event, setEvent] = useState({
        eventName: '',
        description:'',
        imagesEvent: '',
        city:'',
        country:'',
        place:'',
        day:'',
        hour:'',
        finish:'',
        premiumTickets:0,
        boxTickets:0,
        generalTickets: 0,
        priceOne:0,
        priceTwo:0,
        priceTree:0,
        capacity: 0,
        categories: ''
    })


    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        })
    }

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append("upload_preset", 'example1');//nombre del folder
        setLoading(true)
        const res = await fetch(
            "https://api.cloudinary.com/v1_1/esteban3232/image/upload",{
                method:'POST',
                body: data,
            }
        )
        const file = await res.json()
        setEvent({
            ...event,
            imagesEvent: file.secure_url
        })
        setLoading(false)
    }


    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            event.capacity = Number(event.boxTickets) + Number(event.generalTickets) + Number(event.premiumTickets)
            console.log(event);
            const response = await axios('http://localhost:4000/events/create',{
                method:'POST',
                headers: { Authorization :`Bearer ${JSON.parse(window.localStorage.getItem('auth-token'))}`},
                data:event
            })
            console.log(response);
            Swal.fire(`evento ${event.eventName} creado con exito`)
        } catch (error) {
            Swal.fire(error.message)
        }




    }




  return (
    <div>
        <Modal 
            event={event}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showModal={showModal}
            setShowModal={setShowModal}
            uploadImage={uploadImage}
        />

    </div>
  )
}
