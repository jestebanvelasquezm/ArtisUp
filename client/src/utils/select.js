import React from 'react'
import Select from 'react-select';


export default function select(props) {
  return (
    <div >
            <Select
                key={props.filterby.map(el => el.name)}
                defaultValue={ { label: 'selecciona tu rol en la app', value: 'empty' }} 
                options={props.filterby.map(elemnt => ({label: elemnt.name, value:elemnt.value, }))}
                onChange={(e) => props.onChangefilterby(e)}
            /> 
        </div>
  )
}
