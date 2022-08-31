import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "usersPrincipal",
    initialState:{
        users:[],
        detailUser:{},
        mike:[]
    },
    reducers: {
        getUsers: (state, action) => {
            state.artists = action.payload
        },
        getUsersId : (state, action) => {
            state.detail = action.payload
        },
        filterbyOrder: (state, action) =>{
            //aca hacen el orden del filtro:
            return{
                
            }
        }
    }
})

export const {getUsers, getUsersId} = userSlice.actions

export default userSlice.reducer