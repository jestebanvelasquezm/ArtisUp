//@ts-nocheck

import { useEffect } from "react";
// import { useSearchParams } from "react-router-dom";
import { getAllArtists } from "../../reduxToolkit/Actions/artistAction";
import { CardShows } from "./cardShows";
import { useSelector, useDispatch } from 'react-redux';
import Nav from "../Nav/Nav";
import Header from "../Home/landin/Header";
import Footer from "../Footer/Footer";




export default function AllShows() {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artistsPrincipal.artists);

    useEffect(() => {
        dispatch(getAllArtists());
    }, [dispatch]);


    return (
        <div className=" overflow-hidden">
            {/* <Navbar /> */}
            <Header />
            <div className="bg-black py-20 pt-[142px] pb-[60px] ">
            <CardShows artists={artists} />
            <Footer />
            </div>

        </div>
    )
}