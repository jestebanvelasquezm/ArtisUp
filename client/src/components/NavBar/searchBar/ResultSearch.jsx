import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../../Footer/Footer'
import Header from '../../Home/landin/Header'
import { CardShows } from '../../Shows/cardShows'

export default function ResultSearch() {

    const artists = useSelector(state => state.artistsPrincipal.name)


  return (
    <div className=" overflow-hidden">
            {/* <Navbar /> */}
            <Header />
            <div className="bg-black py-20 pt-[142px] pb-[60px] ">
            <CardShows artists={artists} />
            </div>
            <Footer />

        </div>
  )
}
