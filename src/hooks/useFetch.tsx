import { useState, useEffect } from "react";
import useToken from "./useToken";
import axios from "axios"

export default function useFetch(url : string) {
    
    const [data, setData] = useState([]);

    const token = useToken();

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

            console.log(err);
        })
    }

    useEffect(() => {

        getAllData();
        
    }, []);

    return data;
}
