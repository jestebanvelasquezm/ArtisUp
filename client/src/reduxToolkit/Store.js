import { configureStore } from "@reduxjs/toolkit";
import artistsPrincipal from './ReducerSlices/artistSlice'
import usersPrincipal from './ReducerSlices/UserSlice'
// import { categoriesPrincipal } from "module";//
export default configureStore({
    reducer :{
        artistsPrincipal : artistsPrincipal,
        usersPrincipal: usersPrincipal,
        // categoriesPrincipal: categoriesPrincipal
    }
})