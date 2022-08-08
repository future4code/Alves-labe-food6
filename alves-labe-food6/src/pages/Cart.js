import React, { useContext, useEffect, useState } from 'react'
import { Flex, Image, Heading, Text, RadioGroup, Radio, Button } from '@chakra-ui/react'
import { GlobalContext } from '../components/global/GlobalContext'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import ProductCardCart from '../components/ProductCardCart'
import { getProfile } from '../services/profile'

export default function Cart() {
    const { profile, restaurantDetails, setRestaurantDetails, cartProducts, setCartProducts, placeOrder, getActiveOrder, activeOrder } = useContext(GlobalContext)
    const [paymentMethod, setPaymentMethod] = useState('money')
    useEffect(() => {
        getActiveOrder()
        getProfile()
        if (localStorage.getItem('cartProducts')) {
            setCartProducts(JSON.parse(localStorage.getItem('cartProducts')))
        }
        if (localStorage.getItem('restaurantDetails')) {
            setRestaurantDetails(JSON.parse(localStorage.getItem('restaurantDetails')))
        }
        !localStorage.getItem('token') && goToLoginPage(navigate)
    }, [])

    const cartProductPrices = cartProducts.map((item) => { return (item.price * item.quantity) })
    const totalPrice = cartProductPrices.reduce((partialSum, a) => partialSum + a, 0).toFixed(1)

    return (
        <Flex flexDir={'column'} >
            <Header name={'Meu carrinho'}></Header>
            <Flex flexDir={'column'} minH={'100vh'}>
                <Flex w={'100%'} flexDir={'column'} h={'4.75rem'} padding={'1rem'} background={'#eeeeee'} fontFamily={'Roboto'}>
                    <Text color={'#b8b8b8'}>Endereço de entrega</Text>
                    <Text>{profile.address}</Text>
                </Flex>
                <Flex flexDir={'column'} padding={'1rem'} gap={'0.2rem'}>
                    <Heading color={'#e8222e'} fontSize={'1rem'} fontWeight={'400'} fontFamily={'Roboto'} margin={0}>{cartProducts.length > 0 && restaurantDetails.name}</Heading>
                    <Text color={'#b8b8b8'} fontFamily={'Roboto'}>{cartProducts.length > 0 && restaurantDetails.address}</Text>
                    <Text fontFamily={'Roboto'} color={'#b8b8b8'}>{cartProducts.length > 0 && (restaurantDetails.deliveryTime - 10) + ' - ' + (restaurantDetails.deliveryTime + 10) + ' min'}</Text>
                    {(activeOrder.totalPrice && cartProducts.length === 0) && <Text fontFamily={'Roboto'} align={"center"} >Pedido em andamento...</Text>}
                    {(cartProducts.length > 0 || activeOrder) ? cartProducts.map((product) => {
                        return <ProductCardCart
                            photoUrl={product.photoUrl}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            quantity={product.quantity}
                        />
                    }) :
                        <Text fontFamily={'Roboto'} align={"center"} >Carrinho vazio.</Text>}
                    <Text alignSelf={'flex-end'} fontFamily={'Roboto'} marginTop={'0.5rem'}>Frete R${cartProducts.length > 0 ? restaurantDetails.shipping + ',00' : '0.00'}</Text>
                    <Flex justify={'space-between'} fontFamily={'Roboto'}>
                        <Text>SUBTOTAL</Text>
                        <Text color={'#e8222e'} fontSize={'1.125rem'} fontWeight={'bold'}>R${(totalPrice.toString().includes('.')) ? (totalPrice + '0') : (totalPrice + '.00')}</Text>
                    </Flex>
                    <Text fontFamily={'Roboto'} borderBottom={'1px solid black'} paddingBottom={'0.2rem'}>Forma de pagamento</Text>
                    <RadioGroup onChange={setPaymentMethod} value={paymentMethod} defaultValue={'1'} display={'flex'} flexDir={'column'} fontFamily={'Roboto'} marginTop={'0.5rem'} gap={'0.4rem'}>
                        <Radio value={'money'} colorScheme={'red'} size={'md'} >Dinheiro</Radio>
                        <Radio value={'creditcard'} colorScheme={'red'} size={'md'} >Cartão de crédito</Radio>
                    </RadioGroup>
                    <Button background={'#E8222E'} borderRadius={'0'} h={'2.625rem'} fontWeight={'400'} fontFamily={'Roboto'} marginTop={'1rem'} onClick={() => placeOrder(paymentMethod, restaurantDetails.id)}>Confirmar</Button>
                </Flex>
            </Flex>
            <NavBar page={'cart'}></NavBar>
        </Flex>
    )
}