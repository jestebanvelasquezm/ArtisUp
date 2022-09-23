import {createSlice} from '@reduxjs/toolkit';

export const eventSlice = createSlice({
    name: "eventsPrincipal",
    initialState:{
        all:[],
        id:{},
        // detailUser:{},
        // mike:[]
    },
    reducers: {
        getAll: (state, action) => {
            state.all = action.payload
        },
        getId: (state, action) => {
            state.id = action.payload
        },
        
    }
})

export const {getAll, getId} = eventSlice.actions

export default eventSlice.reducer