//@ts-nocheck
import { Link } from "react-router-dom";
// import { ShowArgs } from "../../redux/reducer/showSlice";



export const CardShows= ({ artists }) => {

const rol = JSON.parse(window.sessionStorage.getItem('Rol'))
    return (
        <div className="flex flex-row flex-wrap bg-gray-100 "  style={{zIndex: '0'}}>
        {artists && artists.length > 0 ? artists.map((ele, i) => {
            // console.log(ele.members.map(el => el.user.email));
            return (
                <div key={i} className="flex flex-row flex-wrap w-1/3 " style={{zIndex: '1'}}>
                    <div className="flex flex-col items-center w-full m-9 bg-white rounde-md shadow-md duration-300 hover:scale-105 hover:shadow-xl">
                        <div className="w-full h-80">
                            <img src={ele.image} className="w-full h-full object-cover object-top rounded-full p-7" alt="" />
                        </div>
                        <div className="flex flex-col items-center w-full h-full p-7">
                            <p className="text-3xl text-gray-900 m-2 font-bold">{ele.nickName}</p>
                            
                            <div key={i} className="flex flex-col items-center w-full h-full p-7">
                                <Link to={ rol === 'ADMIN'? `/admin/artists/${ele.id}` : rol === 'ARTIST'? `/artist/${ele.id}`: rol === 'USER' ? `/user/artist/${ele.id}` :`/artists/${ele.id}`} className="px-6 py-1 mt-5 text-lg font-medium text-white bg-blue-500 rounded-lg border border-blue-700 active:scale-95 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:cursor-not-allowed transition-colors duration-200">Ver Eventos</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }) : ''}

    </div>
    )
}