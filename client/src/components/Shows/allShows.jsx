//@ts-nocheck

import { useEffect} from "react";
// import { useSearchParams } from "react-router-dom";
import {  getAllArtists } from "../../reduxToolkit/Actions/artistAction";
import  {CardShows}  from "./cardShows";
import Navbar from "../NavBar/NavBar";
import { useSelector, useDispatch } from 'react-redux';




export default function AllShows() {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artistsPrincipal.artists);

    useEffect(() => {
        dispatch(getAllArtists());
    }, [dispatch]);


    return (
        <>
            <Navbar />
            {/* <div>
                {loginRole  ? <div className="container">
                <CardShows shows={shows} />
            </div> : <div><h1>no tienes permisos</h1></div>}
            </div> */}
            <div className="container" >
                <CardShows artists={artists} />
            </div>
        </>
    )
}