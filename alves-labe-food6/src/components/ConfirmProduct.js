import React, { useContext, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Button,
    useNumberInput,
    Input,
    HStack
} from '@chakra-ui/react'
import { GlobalContext } from './global/GlobalContext';

export default function ConfirmProduct({ handleClick }) {
    const { setConfirmProduct } = useContext(GlobalContext)
    const { isOpen, onClose, onOpen } = useDisclosure()
    const {qntInput, setQntInput} = useState('')
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <>
            <Modal isOpen={onOpen} isCentered={true} size={'md'} >
                <ModalOverlay />
                <ModalContent alignItems={'center'} fontFamily={'Roboto'} justifyContent={'center'} w={'90%'} h={'13.5rem'} paddingY={'1rem'}>
                    <ModalHeader fontSize={'1rem'}>Selecione a quantidade desejada</ModalHeader>
                    <ModalBody display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <HStack maxW='10rem' fontFamily={'Roboto'}>
                            <Button {...dec} backgroundColor={'white'} color={'#e8222e'}>-</Button>
                            <Input {...input} textAlign={'center'}/>
                            <Button {...inc} backgroundColor={'white'} color={'#e8222e'}>+</Button>
                        </HStack>
                    </ModalBody>
                    <Button onClick={() => handleClick(input.value)} background={'white'} color={'blue.300'} fontFamily={'Roboto'} alignSelf={'flex-end'}>ADICIONAR AO CARRINHO</Button>
                </ModalContent>
            </Modal>
        </>
    )
}