

import { Input, Stack, Button, Flex, Image, Heading, FormControl, FormHelperText, FormErrorMessage } from "@chakra-ui/react";
import Header from "../../components/Header";
import { useForm } from "../../hooks/useForm";
import Logo from "../../img/logo-future-eats-login.svg";
import { GlobalContext } from "../../components/global/GlobalContext";
import { useContext, useEffect} from "react";
import { goBack, goToLoginPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";


export const EditAddress = ()=>{
  const { userAddAddress, errors, address } = useContext(GlobalContext);
  const navigate = useNavigate()
        const {form, onChange} = useForm(
            {
                street: address && address.street,
                number: address && address.number,
                neighbourhood: address && address.neighbourhood,
                city: address && address.city,
                state: address && address.state,
                complement: address && address.complement,
              }
        )

        useEffect(()=>{
          !localStorage.getItem('token') && goToLoginPage(navigate)
        },[])
    const submitEdit = () =>{
        alert('Endereço alterado com sucesso!')
    } 
    return(
       
        <Stack spacing={12} >
              <Header/>

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
              value={form.street}
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
              value={form.number}
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
              value={form.complement}
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
              value={form.neighbourhood}
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
              value={form.city}
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
              value={form.state}
              name={"state"}
            ></Input>
            <FormErrorMessage>Estado é obrigatório.</FormErrorMessage>
          </FormControl>
          <Button
            background={"#E8222E"}
            borderRadius={"0"}
            h={"2.625rem"}
            fontWeight={"400"}
            onClick={() => {userAddAddress(form); submitEdit()}}
          >
            Salvar
          </Button>
          <Flex justify={"center"} marginTop={"0.75rem"}></Flex>
        </Flex>
      </Flex>
         
       </Stack>
    )

}
