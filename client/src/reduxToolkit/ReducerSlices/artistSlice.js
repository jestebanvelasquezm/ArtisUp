import {createSlice} from '@reduxjs/toolkit';

export const artistSlice = createSlice({
    name: "artistsPrincipal",
    initialState:{
        artists:[],
        detail:{},
        artistByName: []
    },
    reducers: {
        getArtists: (state, action) => {
            state.artists = action.payload
        },
        getArtistsId : (state, action) => {
            state.detail = action.payload
        },
        getByName: (state, action) =>{
            state.detail = action.payload
        }
    }
})

export const {getArtists, getArtistsId, getByName} = artistSlice.actions

export default artistSlice.reducer