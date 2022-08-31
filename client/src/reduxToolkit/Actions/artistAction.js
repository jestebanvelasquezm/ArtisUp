import axios from "axios";
import {
    getArtists,
    getByName,
    getArtistsId,
} from "../ReducerSlices/artistSlice";

export const getShows = () => (dispatch) => {
    axios
        .get("http://localhost:4000/shows")
        .then((res) => dispatch(getArtists(res.data.data)))
        .catch((e) => console.log(e));
};
export const getShowByName = (name) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            `http://localhost:4000/shows?name=${name}`,
            {}
        );
        dispatch(getByName(data));
    } catch (error) {
        console.log(error);
    }
};
export const getShowDetail = (id) => async (dispatch) => {
    try {
        const { data } = await axios.get(`http://localhost:4000/shows/${id}`);
        dispatch(getArtistsId(data.data));
    } catch (error) {
        console.log(error);
    }
};
