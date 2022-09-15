import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import AllShows from "./components/Shows/allShows";
import ShowDetail from "./components/ShowDetail/ShowDetail";
import FormBuy from "./components/Buy/FormBuy";
import Login from "./components/Login/Login";
// import Register from "./components/Register/Register";
import ProfileArtist from "./components/Profiles/ProfileArtist";
import PublicRoute from './auth/components/router/public.route'
// import AdminRoute from './auth/components/router/admin.route'
import ArtistRoute from './auth/components/router/artist.route'
import UserRoute from "./auth/components/router/user.router";
import { 
    ARTISTS,ARTIST_ARTISTS, ARTIST_ARTIST_ID, HOME, LOGIN, //public
    ARTIST_PROFILE, ARTIST_HOME, ARTIST_ID,
    USER_PROFILE, USER_ARTISTS, USER_ARTIST_ID, USER_HOME, USER_LOGOUT, ARTIST_LOGOUT, USER_EVENT_TICKETS, ARTIST_EVENT_TICKETS, ARTIST_CREATE_EVENT,
} from "./auth/components/config/routes/paths";
import { AuthContextProvider } from "./auth/context/authContext";
import Logout from "./auth/components/Logout";
import Create from "./components/Profiles/Events/Create";





function App() {
    return (
        <AuthContextProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicRoute/>}>
                    <Route path={HOME} element={<Home />} />
                    <Route path={ARTISTS} element={<AllShows />} />
                    <Route path={ARTIST_ID} element={<ShowDetail />} />
                    <Route path={LOGIN} element={<Login />} />
                </Route>
                <Route path="/user" element={<UserRoute/>}>
                    <Route path={USER_PROFILE} element={<ProfileArtist />} />
                    <Route path={USER_HOME} element={<Home />} />
                    <Route path={USER_ARTISTS} element={<AllShows />} />
                    <Route path={USER_ARTIST_ID} element={<ShowDetail />} />
                    <Route path={USER_EVENT_TICKETS} element={<FormBuy />} />
                    <Route path={USER_LOGOUT} element={<Logout />} />

                </Route>

                <Route path="/artist" element={<ArtistRoute/>}>
                    <Route path={ARTIST_PROFILE} element={<ProfileArtist />} />
                    <Route path={ARTIST_HOME} element={<Home />} />
                    <Route path={ARTIST_ARTISTS} element={<AllShows />} />
                    <Route path={ARTIST_ARTIST_ID} element={<ShowDetail />} />
                    <Route path={ARTIST_CREATE_EVENT} element={<Create />} />
                    <Route path={ARTIST_EVENT_TICKETS} element={<FormBuy />} />
                    <Route path={ARTIST_LOGOUT} element={<Logout />} />

                </Route>

                {/* <Route path="/admin" element={AdminRoute}>

                </Route> */}
                {/* <Route path="*" elements/> */}
            </Routes>
        </BrowserRouter>
    </AuthContextProvider>
    );
}

export default App;
