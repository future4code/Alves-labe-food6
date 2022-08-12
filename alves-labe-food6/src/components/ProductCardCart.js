import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from './global/GlobalContext'
import {
    Button,
    Flex,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react'

export default function ProductCardCart({ photoUrl, name, price, description, quantity }) {
    const [newPrice, setNewPrice] = useState('')
    const { cartProducts , setCartProducts } = useContext(GlobalContext)

    useEffect(() => {
        if (price.toString().includes('.')) {
            setNewPrice(price + '0')
        } else {
            setNewPrice(price + '.00')
        }
    }, [])


    const handleRemove = () => {
        const newCartProducts = cartProducts.filter((item) => {
            return item.name !== name
        }) 
        localStorage.removeItem(name)
        localStorage.setItem('cartProducts', JSON.stringify(newCartProducts))
        setCartProducts(newCartProducts)
    }
    return (
        <Flex border={'1px solid #b8b8b8'} w={'100%'} borderRadius={'8px'} marginY={'0.25rem'}>
            <Image src={photoUrl} w={'6rem'} borderTopLeftRadius={'8px'} borderBottomLeftRadius={'8px'}></Image>
            <Flex flexDir={'column'} paddingLeft={'1rem'} gap={'0.5rem'} w={'100%'}>
                <Flex justify={'space-between'}>
                    <Heading color={'#e8222e'} fontSize={'1rem'} fontWeight={'400'} fontFamily={'Roboto'} marginTop={'1rem'} maxW={'70%'}>{name}</Heading>
                    <Text border={'1px solid #e8222e'} borderRadius={'8px'} color={'#e8222e'} fontFamily={'Roboto'} w={'2rem'} textAlign={'center'} paddingTop={'0.35rem'} h={'2.2rem'}>{quantity}</Text>
                </Flex>
                <Text fontFamily={'Roboto'} color={'#b8b8b8'} fontSize={'0.75rem'}>{description}</Text>
                <Flex justify={'space-between'}>
                    <Text fontFamily={'Roboto'}>R${newPrice}</Text>
                   <Button
                        w={'5.5rem'}
                        h={'1.9rem'}
                        marginTop={'0.5rem'}
                        background={'white'}
                        border={'1px solid #e8222e'}
                        borderRadius={'8px'}
                        fontSize={'0.75rem'}
                        fontFamily={'Roboto'}
                        color={'#e8222e'}
                        letterSpacing={'0.7px'}
                        onClick={handleRemove}
                        >remover</Button>
                </Flex>
            </Flex>
        </Flex>
    )
}