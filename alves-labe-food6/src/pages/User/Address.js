import React, { useContext, useEffect } from "react";
import {
  Flex,
  Input,
  Button,
  Heading,
  Image,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import Logo from "../../img/logo-future-eats-login.svg";
import { useForm } from "../../hooks/useForm";
import { GlobalContext } from "../../components/global/GlobalContext";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { goToHome } from "../../routes/coordinator";

export default function Address() {
  const { form, onChange } = useForm({
    street: "",
    number: "",
    neighbourhood: "",
    city: "",
    state: "",
    complement: "",
  });
  const { userAddAddress, errors, profile } = useContext(GlobalContext);
  const navigate = useNavigate()
  useEffect(()=>{
    profile.hasAddress && goToHome(navigate)
 },[])
  return (
    <Flex
      flexDir={"column"}
      align={"center"}
      fontFamily={"Roboto"}
      w={"100%"}
      gap={"1.5rem"}
    >
      <Header page="/signup"></Header>
      <Flex
        flexDir={"center"}
        justify={"center"}
        align={"center"}
        fontFamily={"Roboto"}
        w={"100%"}
      >
        <Flex flexDir={"column"} gap={"1rem"} w={"90%"}>
          <Image src={Logo} w={"30%"} alignSelf={"center"} />
          <Heading
            alignSelf={"center"}
            fontSize={"1.125rem"}
            paddingY={"0.75rem"}
            fontWeight={"400"}
            fontFamily={"Roboto"}
          >
            Meu endereço
          </Heading>
          <FormControl id="street" isRequired isInvalid={errors.street}>
            <FormHelperText marginBottom={"5px"}>Logradouro*</FormHelperText>
            <Input
              placeholder={"Rua/Av."}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"text"}
              name={"street"}
            ></Input>
            <FormErrorMessage>Logradouro é obrigatório</FormErrorMessage>
          </FormControl>
          <FormControl id="number" isRequired isInvalid={errors.number}>
            <FormHelperText marginBottom={"5px"}>Número*</FormHelperText>
            <Input
              placeholder={"Número"}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"number"}
              name={"number"}
            ></Input>
            <FormErrorMessage>Número é obrigatório</FormErrorMessage>
          </FormControl>
          <FormControl id="complement" isInvalid={errors.complement}>
            <FormHelperText marginBottom={"5px"}>Complemento</FormHelperText>
            <Input
              placeholder={"Apto./Bloco."}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"text"}
              name={"complement"}
            ></Input>
            <FormErrorMessage>Complemento é inválido.</FormErrorMessage>
          </FormControl>
          <FormControl
            id="neighbourhood"
            isRequired
            isInvalid={errors.neighbourhood}
          >
            <FormHelperText marginBottom={"5px"}>Bairro*</FormHelperText>
            <Input
              placeholder={"Bairro"}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"text"}
              name={"neighbourhood"}
            ></Input>
            <FormErrorMessage>Bairro é obrigatório.</FormErrorMessage>
          </FormControl>
          <FormControl id="city" isRequired isInvalid={errors.city}>
            <FormHelperText marginBottom={"5px"}>Cidade*</FormHelperText>
            <Input
              placeholder={"Cidade"}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"text"}
              name={"city"}
            ></Input>
            <FormErrorMessage>Cidade é obrigatório.</FormErrorMessage>
          </FormControl>
          <FormControl id="state" isRequired isInvalid={errors.state}>
            <FormHelperText marginBottom={"5px"}>Estado*</FormHelperText>
            <Input
              placeholder={"Estado"}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"text"}
              name={"state"}
            ></Input>
            <FormErrorMessage>Estado é obrigatório.</FormErrorMessage>
          </FormControl>
          <Button
            background={"#E8222E"}
            borderRadius={"0"}
            h={"2.625rem"}
            fontWeight={"400"}
            onClick={() => userAddAddress(form)}
          >
            Salvar
          </Button>
          <Flex justify={"center"} marginTop={"0.75rem"}></Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
