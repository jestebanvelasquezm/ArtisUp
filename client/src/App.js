import React from "react";
import {Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import AllShows from "./components/Shows/allShows";
import ShowDetail from './components/ShowDetail/ShowDetail'
import FormBuy from "./components/Buy/FormBuy";
import Login from "./components/Login/Login";
// import Register from "./components/Register/Register";
import ProfileArtist from "./components/Profiles/ProfileArtist";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/artists' element={<AllShows />} />
        <Route path='/artists/detail/:id' element={<ShowDetail />} />
        <Route path='/artists/contract/event/:id' element={<FormBuy />} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={<ProfileArtist />} />
      </Routes>
    </>
  );
}

export default App;
