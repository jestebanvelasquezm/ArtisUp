import { Navigate, Outlet } from "react-router-dom";
import{ LOGIN } from '../config/routes/paths';
import { useAuthContext } from "../../context/authContext";


export default function UserRoute(){
    const {isAuth} = useAuthContext();
    
    if(!isAuth ){
        return <Navigate to={LOGIN} />
    }
    
    return(
        <div>
            <Outlet />
        </div>
    )
}