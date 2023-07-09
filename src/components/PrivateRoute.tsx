import { useContext } from "react"
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext"

export default function PrivateRoute() {

    const { token } =  useContext(AuthContext);

    //const token = localStorage.getItem('token');

    return(
        
        token ? <Outlet/> : <Navigate to="/"/>
    )
}
