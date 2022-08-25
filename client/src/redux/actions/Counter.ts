import { AppThunk } from "../store/store";
import { incrementByAmount } from "../reducer/counterSlice";
import axios from 'axios';


// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount: number): AppThunk => async (dispatch, getState) => {
    /* const valueToState = getState().counter.value;
    if (valueToState % 2 === 1) {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos/1")
        console.log(data);
        setTimeout(() => dispatch(incrementByAmount(amount)), 1000)
    } */
};