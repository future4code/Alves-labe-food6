import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();

  const goBackTo = (page) => {
    navigate(page);
  };

  return (
    <Flex
      flexDir={"row"}
      justify={"flex-start"}
      align={"center"}
      fontFamily={"Roboto"}
      w={"100%"}
      borderBottom={"1px solid #d0d0d0"}
    >
      <Button
        background={"#FFFFFF"}
        borderRadius={"0"}
        h={"2.625rem"}
        fontWeight={"400"}
        onClick={() => goBackTo(props.page)}
      >
        Voltar
      </Button>
    </Flex>
  );
}
