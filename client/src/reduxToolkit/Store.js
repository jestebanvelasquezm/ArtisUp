import { configureStore } from "@reduxjs/toolkit";
import artistsPrincipal from './ReducerSlices/artistSlice'
import usersPrincipal from './ReducerSlices/UserSlice'
import  eventsPrincipal  from "./ReducerSlices/EventSlice";//
export default configureStore({
    reducer :{
        artistsPrincipal : artistsPrincipal,
        usersPrincipal: usersPrincipal,
        eventsPrincipal: eventsPrincipal
        
    }
})