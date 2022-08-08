import axios from "axios";
import { baseURL } from "../constants/baseURL";

export const getAddress = (setAddress)=>{

    
    axios.get(baseURL + "/profile/address",{
        headers:{
        auth:localStorage.getItem("token")
        } 
    })
    .then((res)=>{
        setAddress(res.data.address)
    })
}
export const getProfile = (setProfile) => {
    axios
      .get(baseURL + "/profile", {
        headers: {
          auth: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProfile(response.data.user);
      })
  };