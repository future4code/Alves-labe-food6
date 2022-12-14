import React, { useContext, useEffect } from "react";
import {
  Flex,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { useForm } from "../../hooks/useForm";
import { GlobalContext } from "../../components/global/GlobalContext";
import Header from "../../components/Header";
import { goToLoginPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";


export default function EditProfile() {
  const { userEditProfile, errors, profile } = useContext(GlobalContext);
  const { form, onChange } = useForm({
    name: profile && profile.name,
    email: profile && profile.email,
    cpf: profile && profile.cpf
  });
  const [show, setShow] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleClickConfirmation = () => setShowConfirmation(!showConfirmation);

  const navigate = useNavigate();
  useEffect(() => {
    !localStorage.getItem('token') && goToLoginPage(navigate)
  }, [])
  const submitEdit = () => {
    alert('Perfil alterado com sucesso!')
  }
  return (
    <div>
      <Header name={'Editar'} onEdit={true}></Header>
      <Flex
        flexDir={"column"}
        align={"center"}
        fontFamily={"Roboto"}
        w={"100%"}
        marginTop={'0.5rem'}
      >
        <Flex
          flexDir={"center"}
          justify={"center"}
          align={"center"}
          fontFamily={"Roboto"}
          w={"100%"}
        >
          <Flex flexDir={"column"} w={"90%"}>
            <FormControl id="name" isRequired isInvalid={errors.name}>
              <FormHelperText marginBottom={"5px"}>Nome*</FormHelperText>
              <Input
                placeholder={"Nome Completo"}
                _placeholder={{ color: "#d0d0d0" }}
                h={"3.5rem"}
                onChange={onChange}
                type={"text"}
                value={form.name}
                name={"name"}
              ></Input>
              <FormErrorMessage>Nome ?? obrigat??rio</FormErrorMessage>
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
                value={form.email}
              ></Input>
              <FormErrorMessage>E-mail inv??lido.</FormErrorMessage>
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
                value={form.cpf}
              ></Input>
              <FormErrorMessage>
                O CPF precisa conter no m??ximo 11 d??gitos!
              </FormErrorMessage>
            </FormControl>
            <Button
              background={"#E8222E"}
              marginTop={'1rem'}
              borderRadius={"0"}
              h={"2.625rem"}
              fontWeight={"400"}
              onClick={() => { userEditProfile(form); submitEdit() }}
            >
              Salvar
            </Button>
            <Flex justify={"center"} marginTop={"0.75rem"}></Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>

  )
}
