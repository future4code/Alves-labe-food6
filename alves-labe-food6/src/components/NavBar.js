import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import { AiOutlineHome,AiOutlineUser} from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import styled from "styled-components";
import { goToHome, goToProfile } from "../routes/coordinator";

const Container = styled.div`
  width:100vw;
  height:3.062rem;
  position:fixed;
  top:38.838rem;
  display:flex;
  justify-content:space-evenly;
  background-color:white;
  align-items:center;
`;
export default function NavBar() {

  const [colorHome,setColorHome] = useState(false)
  const [colorCart,setColorCart] = useState(false)
  const [colorProfile,setColorProfile] = useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    if (window.location.pathname==="/") {
        setColorHome(true)
  }else if(window.location.pathname==="/profile"){
    setColorProfile(true)
  }else if(window.location.pathname==="/cart"){
    setColorCart(true)
  }
  },[])
  return (
    <Container>
      <Icon as={AiOutlineHome} onClick={()=>{goToHome(navigate)}} h="1.638rem" w="1.638rem" color={ colorHome ? '#E8222E' : '#b8b8b8'}/>
      <Icon as={CgShoppingCart} onClick={'go to carrinho'} h="1.638rem" w="1.638rem" color={colorCart ? '#E8222E' : '#b8b8b8'}/>
      <Icon as={AiOutlineUser} onClick={()=>goToProfile(navigate)} h="1.638rem" w="1.638rem" color={colorProfile ? '#E8222E' : '#b8b8b8'}/>
    </Container>
  );
}
