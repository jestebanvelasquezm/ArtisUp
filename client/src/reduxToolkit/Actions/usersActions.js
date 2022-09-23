import axios from "axios";
import { 
    getUsersId,
    getProfile
 } from "../ReducerSlices/UserSlice";



export const getUserProfile = () => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/users/profile`,{
            headers:{ Authorization :`Bearer ${JSON.parse(window.localStorage.getItem('auth-token'))}`}
        });
        dispatch(getProfile(data.data));
    } catch (error) {
        console.log(error);
    }
};


export const getUserDetail = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/users/${id}`);
        dispatch(getUsersId(data.data));
    } catch (error) {
        console.log(error);
    }
};