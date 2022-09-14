//@ts-nocheck
import { Link } from "react-router-dom";
// import { ShowArgs } from "../../redux/reducer/showSlice";



export const CardShows= ({ shows }) => {

const rol = JSON.parse(window.sessionStorage.getItem('Rol'))
    return (
        <div className="flex flex-row flex-wrap bg-gray-100 "  style={{zIndex: '0'}}>
        {shows && shows.length > 0 ? shows.map((ele, i) => {
            // console.log(ele.members.map(el => el.user.email));
            return (
                <div key={i} className="flex flex-row flex-wrap w-1/3 " style={{zIndex: '1'}}>
                    <div className="flex flex-col items-center w-full m-9 bg-white rounde-md shadow-md duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-full h-80">
                            <img src={ele.imagesEvent[0]} className="w-full h-full object-cover object-top rounded-full p-7" alt="" />
                        </div>
                        <div className="flex flex-col items-center w-full h-full p-7">
                            <p className="text-3xl text-gray-900 m-2 font-bold">{ele.nickName}</p>
                            {ele.members.map((el, i) => {
                                return (
                                    <div key={i}>
                                        <Link to={ rol === 'ADMIN'? `/admin/artists/${el.user.id}` : rol === 'ARTIST'? `/artist/${el.user.id}`: rol === 'USER' ? `/user/artist/${el.user.id}` :`/artists/${el.user.id}`} className="px-10 py-2 mt-3 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-700 active:scale-95 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:cursor-not-allowed transition-colors duration-200">Ver Eventos</Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }) : ''}

    </div>
    )
}