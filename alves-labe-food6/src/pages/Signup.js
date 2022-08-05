import React, { useContext } from "react";
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
import Logo from "../img/logo-future-eats-login.svg";
import { useForm } from "../hooks/useForm";
import { GlobalContext } from "../components/global/GlobalContext";
import Header from "../components/Header";

export default function Signup() {
  const { form, onChange } = useForm({
    name: "",
    email: "",
    cpf: "",
    password: "",
  });
  const { userSignUp, errors } = useContext(GlobalContext);


  
  return (
    <Flex
      flexDir={"column"}
      align={"center"}
      fontFamily={"Roboto"}
      w={"100%"}
      gap={"1.5rem"}
    >
      <Header page="/login"></Header>
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
            Cadastrar
          </Heading>
          <FormControl id="name" isRequired isInvalid={errors.name}>
            <FormHelperText marginBottom={"5px"}>Nome*</FormHelperText>
            <Input
              placeholder={"Nome Completo"}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"text"}
              name={"name"}
            ></Input>
            <FormErrorMessage>Nome é obrigatório</FormErrorMessage>
          </FormControl>
          <FormControl id="email" isRequired isInvalid={errors.email}>
            <FormHelperText marginBottom={"5px"}>Email*</FormHelperText>
            <Input
              placeholder={"email@email.com"}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"e-mail"}
              name={"email"}
            ></Input>
            <FormErrorMessage>E-mail inválido.</FormErrorMessage>
          </FormControl>
          <FormControl id="CPF" isRequired isInvalid={errors.cpf}>
            <FormHelperText marginBottom={"5px"}>CPF*</FormHelperText>
            <Input
              placeholder={"CPF"}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"number"}
              name={"cpf"}
            ></Input>
            <FormErrorMessage>
            O CPF precisa conter no mínimo 11 dígitos!
            </FormErrorMessage>
          </FormControl>
          
          <FormControl id="senha" isRequired isInvalid={errors.password}>
            <FormHelperText marginBottom={"5px"}>Senha*</FormHelperText>
            <Input
              placeholder={"Mínimo 6 caracteres"}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"password"}
              name={"password"}
            ></Input>
            <FormErrorMessage>Senha inválida.</FormErrorMessage>
          </FormControl>
          <FormControl id="Confirmar" isRequired isInvalid={errors.password}>
            <FormHelperText marginBottom={"5px"}>Confirmar*</FormHelperText>
            <Input
              placeholder={"Confirmar senha"}
              _placeholder={{ color: "#d0d0d0" }}
              h={"3.5rem"}
              onChange={onChange}
              type={"password"}
              name={"password"}
            ></Input>
            <FormErrorMessage>
              Deve ser a mesma que a anterior.
            </FormErrorMessage>
          </FormControl>
          <Button
            background={"#E8222E"}
            borderRadius={"0"}
            h={"2.625rem"}
            fontWeight={"400"}
            onClick={() => userSignUp(form)}
          >
            Criar
          </Button>
          <Flex justify={"center"} marginTop={"0.75rem"}></Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
