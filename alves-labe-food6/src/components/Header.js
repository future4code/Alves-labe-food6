import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GrPrevious } from 'react-icons/gr';


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
      <IconButton
        background={"#FFFFFF"}
        onClick={() => goBackTo(props.page)}
        icon={<GrPrevious />}
        fontSize='20px'
      >
      </IconButton>
      

    </Flex>
  );
}
