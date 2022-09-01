import React from "react";
import {Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import AllShows from "./components/Shows/allShows";
import ShowDetail from './components/ShowDetail/ShowDetail'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/artists' element={<AllShows />} />
        <Route path='/artists/detail/:id' element={<ShowDetail />} />



      </Routes>
    </>
  );
}

export default App;
