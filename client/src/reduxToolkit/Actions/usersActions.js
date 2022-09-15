import axios from "axios";
import { getUsersId } from "../ReducerSlices/UserSlice";

export const getUserDetail = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/users/${id}`);
        console.log(data.data);
        dispatch(getUsersId(data.data));
    } catch (error) {
        console.log(error);
    }
};