import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "usersPrincipal",
    initialState:{
        profile:{},
        users:[],
        detailUser:{},
        mike:[]
    },
    reducers: {
        getProfile: (state, action) => {
            state.profile = action.payload
        },
        getUsers: (state, action) => {
            state.artists = action.payload
        },
        getUsersId : (state, action) => {
            state.detailUser = action.payload
        },
        filterbyOrder: (state, action) =>{
            //aca hacen el orden del filtro:
            return{
                
            }
        }
    }
})

export const {getUsers, getUsersId, getProfile} = userSlice.actions

export default userSlice.reducer