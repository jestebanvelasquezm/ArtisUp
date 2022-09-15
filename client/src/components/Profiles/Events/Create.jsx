import React, { useState } from 'react'
import Modal from '../../Modal/Modal'

export default function Create() {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [event, setEvent] = useState({
        eventName: '',
        imagesEvent: '',
        description:'',
        duration:'',
        day:'',
        hour:'',
        lugar:'',
        ciudad:'',
        premiumTickets:0,
        boxTickets:0,
        generalTickets:0,
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
        console.log(file);
        setEvent({
            ...event,
            imagesEvent: file.secure_url
        })
        setLoading(false)
    }

    console.log(event);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(event);
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
