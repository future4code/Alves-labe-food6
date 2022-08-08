import React, { useContext } from 'react'
import { Flex, Image, Heading, Text } from '@chakra-ui/react'
import { GlobalContext } from './global/GlobalContext'

export default function RestaurantCardProfile() {
    const { restaurantDetails } = useContext(GlobalContext)
    return (
        <Flex justify={'center'} flexDir={'column'} align={'center'} marginY={'0.5rem'}>
            <Image src={restaurantDetails.logoUrl} h={'7.5rem'} w={'90%'} borderTopRadius={'8px'}/>
            <Flex flexDir={'column'} w={'90%'} paddingTop={'0.75rem'} gap={'0.5rem'}>
                <Heading color={'#e8222e'} fontSize={'1rem'} fontWeight={'400'} fontFamily={'Roboto'} margin={0}>{restaurantDetails.name}</Heading>
                <Text fontFamily={'Roboto'} color={'#b8b8b8'}>{restaurantDetails.category}</Text>
                <Flex gap={'3rem'} color={'#b8b8b8'}>
                    <Text fontFamily={'Roboto'}>{(restaurantDetails.deliveryTime - 10) + ' - ' + (restaurantDetails.deliveryTime + 10) + ' min'}</Text>
                    <Text fontFamily={'Roboto'}>{'Frete R$' + (restaurantDetails.shipping) + ',00'}</Text>
                </Flex>
                <Text fontFamily={'Roboto'} color={'#b8b8b8'}>{restaurantDetails.address}</Text>
            </Flex>
        </Flex>
    )
}