import React, { useContext } from 'react'
import { Flex, Input, Button, Heading, Image, Text, Link, FormControl, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import Logo from '../img/logo-future-eats-login.svg'
import { useForm } from '../hooks/useForm'
import { GlobalContext } from '../components/global/GlobalContext'

export default function Login() {
    const { form, onChange } = useForm({ email: '', password: '' })
    const { userLogin, errors } = useContext(GlobalContext)

    return (
        <Flex flexDir={'center'} justify={'center'} align={'center'} paddingTop={'5.5rem'} fontFamily={'Roboto'}>
            <Flex flexDir={'column'} gap={'1rem'} w={'90%'}>
                <Image src={Logo} w={'30%'} alignSelf={'center'} />
                <Heading alignSelf={'center'} fontSize={'1.125rem'} paddingY={'0.75rem'} fontWeight={'400'} fontFamily={'Roboto'}>Entrar</Heading>
                <FormControl id='email' isRequired isInvalid={errors.email}>
                    <FormHelperText marginBottom={'5px'}>Email</FormHelperText>
                    <Input placeholder={'email@email.com'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'e-mail'} name={'email'}></Input>
                    <FormErrorMessage>E-mail inválido.</FormErrorMessage>
                </FormControl>
                <FormControl id='email' isRequired isInvalid={errors.password}>
                    <FormHelperText marginBottom={'5px'}>Senha</FormHelperText>
                    <Input placeholder={'Mínimo 6 caracteres'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} onChange={onChange} type={'password'} name={'password'}></Input>
                    <FormErrorMessage>Senha inválida.</FormErrorMessage>
                </FormControl> 
                <Button background={'#E8222E'} borderRadius={'0'} h={'2.625rem'} fontWeight={'400'} onClick={() => userLogin(form)}>Entrar</Button>
                <Flex justify={'center'} marginTop={'0.75rem'}>
                    <Text>Não possui cadastro? <Link>Clique aqui.</Link></Text>
                </Flex>
            </Flex>
        </Flex>
    )
}
