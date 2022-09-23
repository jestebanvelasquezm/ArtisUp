import {createSlice} from '@reduxjs/toolkit';

export const artistSlice = createSlice({
    name: "artistsPrincipal",
    initialState:{
        profile:{},
        name:[],
        artists:[],
        detail:{},
        artistByName: [],
        categories:[]
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
        },
        getProfile: (state, action) =>{
            state.profile = action.payload
        },
        getName: (state, action) =>{
            state.name = action.payload
        },
        getCategories: (state, action) =>{
            state.categories = action.payload
        }
    }
})

export const {getArtists, getArtistsId, getByName, getProfile, getName, getCategories} = artistSlice.actions

export default artistSlice.reducer