import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext";

export default function useToken() {

    let { token } =  useContext(AuthContext);

    if(!token) {

        token = localStorage.getItem('token');
    }

    return token;
  
}
