import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { getArtistName } from '../../../reduxToolkit/Actions/artistAction'

export default function SearchBar() {

    const dispatch = useDispatch()
    const[input, setInput] = useState('')

    const handleChange = (e) =>{
        setInput(e.target.value)
    }

    
    const handleSubmit = (e)=>{
        e.preventDefault();
        try {
            console.log(input);
            dispatch(getArtistName(input))
            
        } catch (error) {
            return error
        }

    }


  return (
    <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <input 
                type="text"
                placeholder='search artist...'
                value={input}
                onChange={(e) => handleChange (e)}
            />
            <button>buscar</button>
        </form>
    </div>
  )
}
