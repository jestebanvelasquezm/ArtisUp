import axios from "axios";
import { getCategories } from "../ReducerSlices/artistSlice";


export const getAllCategories = () => async (dispatch) => {
    try {
        const { data } = await axios.get('http://localhost:4000/categories');
        dispatch(getCategories(data.data));
    } catch (error) {
        console.log(error);
    }
}

