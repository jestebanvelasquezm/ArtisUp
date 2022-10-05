import React from 'react'
import Footer from '../Footer/Footer'
import Header from './landin/Header'
import Hero from './landin/Hero'
import OverView from './landin/OverView'

export default function Home() {
  return (
    <div className='bg-black'>
        {/* <Navbar /> */}
        <Header/>
        <Hero />
        <OverView />
        <Footer />
    </div>
  )
}
