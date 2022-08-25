import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks"
import { RootState } from '../../redux/store/store';
import { getShowByName } from "../../redux/actions/Shows";
import { getAllShows } from "../../redux/thunks/show";
import { ShowArgs } from "../../redux/reducer/showSlice";

import { CardShows } from "./cardShows";
import Navbar from "../Navbar";

export default function AllArtists() {

    const dispatch = useAppDispatch();
    const loginRole = useAppSelector((state:RootState)=> state.users.role.rol)
    console.log(loginRole);
    const showState = useAppSelector((state: RootState) => state.shows);
    const [shows, setShows] = useState<ShowArgs[]>([]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("name") !== null) {
            //Get Artists By Name
            dispatch(getShowByName(searchParams.get("name")?.toLowerCase()!));
        } else {
            dispatch(getAllShows());
        }
    }, [dispatch, searchParams]);

    useEffect(() => {
        setShows(showState.data);
    }, [showState]);


    return (
        <>
            <Navbar />
            {/* <div>
                {loginRole  ? <div className="container">
                <CardShows shows={shows} />
            </div> : <div><h1>no tienes permisos</h1></div>}
            </div> */}
            <div className="container">
                <CardShows shows={shows} />
            </div>
        </>
    )
}