import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import { AiOutlineHome,AiOutlineUser} from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import styled from "styled-components";

const Container = styled.div`
  width: inherit;
  height: 10vh;
`;
export default function NavBar() {
  return (
    <Container>
      <Icon as={AiOutlineHome} h="inherit" w="10vh" />
      <Icon as={CgShoppingCart} h="inherit" w="10vh" />
      <Icon as={AiOutlineUser} h="inherit" w="10vh"/>
    </Container>
  );
}
