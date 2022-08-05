import axios from "axios";
import { baseURL } from "../constants/baseURL";

export const getRestaurants = (setRest) => {
    const header =  { headers: { auth : localStorage.getItem("token") }}

    axios
        .get(baseURL+ "/restaurants", header)
        .then((resp)=>{
            setRest(resp.data.restaurants)
        })
        .catch((err)=>{
            console.log(err)
        })
}

export const getRestaurantsDetail = (setRestDetail, id) => {
    const header =  { headers: { auth : localStorage.getItem("token") }}

    axios
        .get(baseURL+ `/restaurants/${id}`, header)
        .then((resp)=>{
            setRestDetail(resp.data.restaurant)
        })
        .catch((err)=>{
            console.log(err)
        })
}