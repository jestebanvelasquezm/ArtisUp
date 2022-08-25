import React from 'react'
import img1  from '../../media/slice/slice1.svg'
import img2  from '../../media/slice/slice2.svg'
import img3  from '../../media/slice/slice5.svg'
import img4  from '../../media/slice/slice4.svg'
// import { useEffect } from 'react';




export default function Slice() {
  const array = [img1, img2, img3, img4]

  // useEffect(() = {

  // },[])

  return (
    
    <div id="carouselExampleSlidesOnly" className="carousel slide relative h-screen -z-10  " data-bs-ride="carousel">
      <div className="carousel-inner relative h-full w-full overflow-hidden mt-8">
        <div className="carousel-item active absolute float-left w-full ">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp"
            className="block w-full "
            alt="Wild Landscape"
          />
        </div>
        <div className="carousel-item absolute float-left w-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/042.webp"
            className="block w-full"
            alt="Camera"
          />
        </div>
        <div className="carousel-item absolute float-left w-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
            className="block w-full"
            alt="Exotic Fruits"
          />
        </div>
      </div>
    </div>
  )
}
