import { useState, useEffect } from "react";
import useToken from "./useToken";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function useFetch(url : string) {
    
    const [data, setData] = useState([]);

    const token = useToken();

    const navigate = useNavigate();

    const getAllData = () => {

        axios.get(url, {
            headers: {
            "Accept": "application/json",
            "Authorization": "Bearer "+ token
            }
        })
        .then(res => {
            
            if(res.status === 200) {

                setData(res.data.data);
            }
        })
        .catch(err => {

            if(err.response.status === 401) {

                navigate('/');
            }
        })
    }

    useEffect(() => {

        getAllData();
        
    }, []);

    const reload = () => {
        getAllData();
    }

    return { data, reload };
}
