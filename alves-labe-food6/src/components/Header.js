import React from "react";
import { Box, Flex, GridItem, IconButton, Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GrPrevious } from 'react-icons/gr';
import { goBack } from "../routes/coordinator";


export default function Header() {
  const navigate = useNavigate();

  const defineTitle = () => {
    if (window.location.pathname.includes("/restaurant/")) {
        return (
            <Box justifySelf={"center"} h={"7vh"} textAlign={'center'} as='flex'><p>Restaurante</p></Box>
        )
    }
    if (window.location.pathname.includes("/editaddress")) {
      return (
          <Box justifySelf={"center"} h={"7vh"} textAlign={'center'} as='flex'><p>Endereço Atual</p></Box>
      )
  }
  if (window.location.pathname.includes("/editprofile")) {
    return (
        <Box justifySelf={"center"} h={"7vh"} textAlign={'center'} as='flex'><p>Editar Perfil</p></Box>

    )
}
if (window.location.pathname.includes("/profile")) {
  return (
      <Box justifySelf={"center"} h={"7vh"} textAlign={'center'} as='flex'><p>Meu Perfil</p></Box>
      
  )
}
  }
  return (
    <Grid
      templateRows='1'
      templateColumns='repeat(3,1fr)'
      alignItems={"center"}
      fontFamily={"Roboto"}
      justify={'center'}
      w={"100vw"}
      h={"7vh"}
      borderBottom={"1px solid #d0d0d0"}
    >
    <GridItem>
      <IconButton
        background={"#FFFFFF"}
        justifySelf={'flex-start'}
        onClick={()=>goBack(navigate)}
        icon={<GrPrevious />}
        fontSize="20px"
      ></IconButton>
      </GridItem>
    <GridItem>
      {defineTitle()}
      </GridItem>
    </Grid>

  );
}
