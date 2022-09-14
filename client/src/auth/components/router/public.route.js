import { Navigate, Outlet } from "react-router-dom";
import{  ARTIST_PROFILE, USER_PROFILE } from '../config/routes/paths';
import { useAuthContext } from "../../context/authContext";



export default function PublicRoute(){
    const {isAuth} = useAuthContext();
    
    // if(isAuth && JSON.parse(window.sessionStorage.getItem('Rol')) === "ADMIN"){
    //     return <Navigate to={PROFILE_ADMIN} />
    // }
    if(isAuth && JSON.parse(window.sessionStorage.getItem('Rol')) === 'ARTIST'){
        return <Navigate to={ARTIST_PROFILE} />
    }
    if(isAuth && JSON.parse(window.sessionStorage.getItem('Rol')) === 'USER'){
        return <Navigate to={USER_PROFILE} />
    }
    return(
        <div>
            <Outlet />
        </div>
    )
}