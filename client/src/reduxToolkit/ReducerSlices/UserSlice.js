import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "usersPrincipal",
    initialState:{
        profile:{},
        users:[],
        detailUser:{},
        mike:[],
        paymentSuccess:{}
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
        getPaymentId : (state, action) => {
            state.paymentSuccess = action.payload
        },
        filterbyOrder: (state, action) =>{
            //aca hacen el orden del filtro:
            return{
                
            }
        }
    }
})

export const {getUsers, getUsersId, getProfile, getPaymentId} = userSlice.actions

export default userSlice.reducer