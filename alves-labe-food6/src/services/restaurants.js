import axios from "axios";
import { baseURL } from "../constants/baseURL";

export const getRestaurants = (setRest) => {
    const header =  { headers: { auth : localStorage.getItem("token") }}

    axios
        .get(baseURL+ "/restaurants", header)
        .then((resp)=>{
            setRest(resp.data.restaurants)
        })
}