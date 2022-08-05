

import { Input, Stack, Button } from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../constants/baseURL";
import Header from "../components/Header";


export const EditAddress = ()=>{



    const Edit = () =>{

        axios.put(baseURL,"/address",{
            headers:{
            auth:localStorage.getItem("token")
            } 
        })
        .then((res)=>{
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err.res)
        })
    
    }

    return(
       
        <Stack spacing={12} >
              <Header/>
           <p>Endereço Atual</p>

           <Input variant={"flushed"} placeholder={"Rua*"}/>
           <Input variant={"flushed"} placeholder={"Número*"}/>
           <Input variant={"flushed"} placeholder={"Complemento*"}/>
           <Input variant={"flushed"} placeholder={"Bairro*"}/>
           <Input variant={"flushed"} placeholder={"Cidade*"}/>
           <Input variant={"flushed"} placeholder={"Estado*"}/>

           <Button colorScheme='red' onClick={Edit}>Adicionar</Button>
         
       </Stack>
    )

}
