//@ts-nocheck
import axios from 'axios';
import { AppThunk } from "../store/store";
import {getRole} from '..//reducer/usersSlice'


export const getLogin = (user: {}): AppThunk => async (dispatch) => {
    try {
        const { data } = await axios({
                url: 'http://localhost:4000/signin',
                method: 'POST',
                data:user,
            
        });
        dispatch(getRole(data));
        
    } catch (error) {
        console.log(error);
    }
}