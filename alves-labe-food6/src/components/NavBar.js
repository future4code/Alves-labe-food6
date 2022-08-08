import React from 'react'
import { Flex, Image, Heading, Text, Divider, Grid } from '@chakra-ui/react'
import HomeIcon from '../img/homepage.svg'
import HomeIconActive from '../img/homepage-active.svg'
import ProfileIcon from '../img/avatar.svg'
import ProfileIconActive from '../img/avatar-active.svg'
import CartIcon from '../img/shopping-cart.svg'
import CartIconActive from '../img/shopping-cart-active.svg'
import { goToHome, goToProfile, goToCart } from '../routes/coordinator'
import { useNavigate } from 'react-router-dom'
export default function NavBar({ page }) {
    const navigate = useNavigate()
    return (
        <Grid templateColumns={'1fr 1fr 1fr'} position={'sticky'} bottom={'0'} w={'100%'} background={'#fff'} h={'3.1rem'} boxShadow={'0 -1px 3px 0 rgba(0, 0, 0, 0.2), 0 -2px 1px -1px rgba(0, 0, 0, 0.12), 0 -1px 1px 0 rgba(0, 0, 0, 0.14)'}>
            {page === 'home' ? <Image src={HomeIconActive} alignSelf={'center'} justifySelf={'center'} onClick={() => goToHome(navigate)} /> : <Image src={HomeIcon} alignSelf={'center'} justifySelf={'center'} onClick={() => goToHome(navigate)} />}
            {page === 'cart' ? <Image src={CartIconActive} alignSelf={'center'} justifySelf={'center'} onClick={() => goToCart(navigate)} /> : <Image src={CartIcon} alignSelf={'center'} justifySelf={'center'} onClick={() => goToCart(navigate)} />}
            {page === 'profile' ? <Image src={ProfileIconActive} alignSelf={'center'} justifySelf={'center'} onClick={() => goToProfile(navigate)} /> : <Image src={ProfileIcon} alignSelf={'center'} justifySelf={'center'} onClick={() => goToProfile(navigate)} />}
        </Grid>
    )
}
