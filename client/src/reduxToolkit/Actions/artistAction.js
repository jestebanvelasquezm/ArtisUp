import axios from "axios";
import {
    getArtists,
    getByName,
    getArtistsId,
    getProfile,
    getName
} from "../ReducerSlices/artistSlice";

export const getShows = () => (dispatch) => {
    axios
        .get("http://localhost:4000/events")
        .then((res) => dispatch(getArtists(res.data.data)))
        .catch((e) => console.log(e));
};
export const getShowByName = (name) => async (dispatch) => {
    try {
        const { data } = await axios.get(
            `http://localhost:4000/events?name=${name}`,
            {}
        );
        dispatch(getByName(data));
    } catch (error) {
        console.log(error);
    }
};
export const getShowDetail = () => async (dispatch) => {
    const token = window.localStorage.getItem('auth-token')
    try {
        const { data } = await axios.get(`http://localhost:4000/events/:id`,{
            headers: token
        });
        dispatch(getArtistsId(data.data));
    } catch (error) {
        console.log(error);
    }
};


export const getProfileArtist = () => async (dispatch) => {

    try {
        const { data } = await axios.get(`http://localhost:4000/artist/:id`,{
            headers: { Authorization : JSON.parse(window.localStorage.getItem('auth-token'))}            
        });
        console.log(data.data);
        dispatch(getProfile(data.data));
    } catch (error) {
        console.log(error);
    }
};

export const getArtistName = (name) => async (dispatch) => {

    try {
        const { data } = await axios.get(`http://localhost:4000/artist?name=${name}`
        // ,{
        //     // headers: {Authorization : JSON.parse(window.localStorage.getItem('auth-token'))}
        // }
        );
        console.log(data.data);
        dispatch(getName(data.data));
    } catch (error) {
        console.log(error);
    }
};



