// // @ts-nocheck
import { Link, } from "react-router-dom";
import { HiOutlineChevronDown } from 'react-icons/hi';



export const CardShows = ({ artists }) => {

    const rol = JSON.parse(window.localStorage.getItem('Rol'))
    return (
        <section className="   min-h-[900px]  pb[55px]   ">
            <div className="container  mx-auto px-2  flex flex-col justify-between   lg:flex lg:flex-row lg:justify-between lg:flex-wrap items-center    " style={{ zIndex: '0' }}>
                {artists && artists.length > 0 ? artists.map((ele, i) => {
                    return (
                            <div className="duration-200 hover:transform hover:scale-105 hover:shadow-white ">
                        <div className=" w-auto rounded-lg  m-9 flex bg-green-400   flex-col items-center      rounde-md shadow-md  " data-aos='fade-down'
                            data-aos-delay='300'>
                            <div className="w-[300px] h-[400px]  rounded-lg  ">
                            <Link to={ rol === 'ADMIN'? `/admin/artists/${ele.id}` : rol === 'ARTIST'? `/artist/${ele.id}`: rol === 'USER' ? `/user/artist/${ele.id}` :`/artists/${ele.id}`}>
                                <img src={ele.image} className=" bg-cover  object-cover object-top h-96 w-96 rounded-full p-3" alt="" data-aos='fade-up' data-aos-delay='400' />
                            </Link>
                            </div>
                            <div className="flex flex-row   items-center  justify-center   w-full max-h-[160px] ">
                                <p className="lg:text-3xl text-xl capitalize text-gray-800 m-2 font-bold">{ele.nickName}</p>
                            </div>
                            <div className=' items-center   justify-center max-w-sm lg:max-w-full mx-auto lg:mx-0 gap-x-2 lg:gap-x-6' data-aos='fade-down'
                                data-aos-delay='700'>
                                <Link  to={ rol === 'ADMIN'? `/admin/artists/${ele.id}` : rol === 'ARTIST'? `/artist/${ele.id}`: rol === 'USER' ? `/user/artist/${ele.id}` :`/artists/${ele.id}`} className=' text-gray-600 text-center text-xl hover:text-gray-50 btn btn-md lg:btn-lg   flex items-center justify-center lg:gap-x-4' >
                                    Ver Eventos
                                    <HiOutlineChevronDown/>
                                </Link>
                            </div>
                            </div>
                        </div>
                    )
                }) : ''}
            </div>
        </section>
    )
}