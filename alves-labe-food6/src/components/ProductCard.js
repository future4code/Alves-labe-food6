import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from './global/GlobalContext'
import {
    Button,
    Flex,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react'
import ConfirmProduct from './ConfirmProduct'

export default function ProductCard({ photoUrl, name, price, description, id }) {
    const [newPrice, setNewPrice] = useState('')
    const { setCartProducts, cartProducts } = useContext(GlobalContext)
    const [quantity, setQuantity] = useState(0)
    const [confirmProduct, setConfirmProduct] = useState(false)

    useEffect(() => {
        if (price.toString().includes('.')) {
            setNewPrice(price + '0')
        } else {
            setNewPrice(price + '.00')
        }
        if (localStorage.getItem(name)) {
            setQuantity(localStorage.getItem(name))
        }
    }, [])

    const handleClick = (qntInput) => {
        localStorage.setItem(name, qntInput)
        setQuantity(Number(qntInput))
        setConfirmProduct(false)
        const newCartProduct = {
            id: id,
            photoUrl: photoUrl,
            name: name,
            price: price,
            description: description,
            quantity: Number(qntInput)
        }
        setCartProducts([...cartProducts, newCartProduct])
    }

    useEffect(() => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
        if (!localStorage.getItem('cartProducts').includes(name)) {
            localStorage.removeItem(name)
        }
    }, [cartProducts])

    const handleRemove = (name) => {
        const newCartProducts = cartProducts.filter((item) => {
            return item.name !== name
        })
        setCartProducts(newCartProducts)
        setQuantity(0)
        localStorage.removeItem(name)
    }

    return (
        <Flex border={'1px solid #b8b8b8'} w={'90%'} borderRadius={'8px'} marginY={'0.25rem'}>
            <Image src={photoUrl} w={'6rem'} borderTopLeftRadius={'8px'} borderBottomLeftRadius={'8px'}></Image>
            <Flex flexDir={'column'} paddingLeft={'1rem'} gap={'0.5rem'} w={'100%'}>
                <Flex justify={'space-between'}>
                    <Heading color={'#e8222e'} fontSize={'1rem'} fontWeight={'400'} fontFamily={'Roboto'} marginTop={'1rem'} maxW={'70%'}>{name}</Heading>
                    {quantity !== 0 && <Text border={'1px solid #e8222e'} borderRadius={'8px'} color={'#e8222e'} fontFamily={'Roboto'} w={'2rem'} textAlign={'center'} paddingTop={'0.35rem'} h={'2.2rem'}>{quantity}</Text>}
                </Flex>
                <Text fontFamily={'Roboto'} color={'#b8b8b8'} fontSize={'0.75rem'}>{description}</Text>
                <Flex justify={'space-between'}>
                    <Text fontFamily={'Roboto'}>R${newPrice}</Text>
                    {quantity !== 0 ? <Button
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
                        onClick={() => handleRemove(name)}>remover</Button> :
                        <Button
                            w={'5.5rem'}
                            h={'1.9rem'}
                            marginTop={'0.5rem'}
                            background={'white'}
                            border={'1px solid black'}
                            borderRadius={'8px'}
                            fontSize={'0.75rem'}
                            fontFamily={'Roboto'}
                            letterSpacing={'0.7px'}
                            onClick={() => setConfirmProduct(true)}>adicionar</Button>}
                </Flex>
            </Flex>
            {confirmProduct && <ConfirmProduct handleClick={handleClick}></ConfirmProduct>}
        </Flex>
    )
}