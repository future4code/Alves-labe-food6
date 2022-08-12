import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../components/global/GlobalContext'
import styled from 'styled-components'
import { Input, InputGroup, InputLeftElement, Flex, Box, Alert, Image, AlertIcon, AlertTitle, AlertDescription, } from '@chakra-ui/react/'
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { goToAddress, goToLoginPage, goToRestaurant } from '../../routes/coordinator'
import NavBar from '../../components/NavBar'
import Header from '../../components/Header'
import Clock from '../../img/clock.svg'

const Title = styled.h1`
font-family: Roboto;
font-size: 1rem;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: -0.39px;
text-align: center;
color: #000;
margin: 1.25rem 5.75rem 0 5.813rem;
padding: 0.813rem 4.063rem 0.75rem;
width: 10.938rem;
height: 2.75rem;
`
const CardRest = styled.div`
 
  width: 20.5rem;
  height: 13rem;
  padding: 0 0 1rem;
  border: solid 1px #b8b8b8;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  img{
     width: 20.5rem;
  height: 7.5rem;
  margin: 0 0 0.75rem;
  object-fit: fill;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;

  }
  h2{
    color:#e8222e;
    width: 18.5rem;
  height: 1.125rem;
  margin: 0.75rem 1rem 0.25rem;
  font-family: Roboto;
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  }
  div{
    display: flex;
    justify-content: space-between;
    padding:1rem;
    p{
        width: 9.25rem;
        height: 1.125rem;
        margin: 0.25rem 0.5rem 0 1rem;
        font-family: Roboto;
        font-size: 1rem;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.39px;
        color:#b8b8b8;
    }
  }
`

const HomePage = () => {
    const { rest, profile, getRestaurantDetails, getActiveOrder, activeOrder, activeOrderInfo } = useContext(GlobalContext)
    const [filter, setFilter] = useState('')
    const [query, setQuery] = useState('')
    const [color, setColor] = useState(false)

    const navigate = useNavigate()
    useEffect(() => {
        getActiveOrder()
        profile.hasAddres === false && goToAddress(navigate);
        !localStorage.getItem("token") && goToLoginPage(navigate)
    }, [])

    const handleFilter = (category) => {
        if (filter === category) {
            setFilter('')
            setColor(false)
        } else {
            setFilter(category)
            setColor(true)
        }
    }
    const handleQuery = (e) => {
        setQuery(e.target.value)
    }

    const arrayCat = rest && rest.map((rest) => <Box
        as='button'
        height='24px'
        lineHeight='1.2'
        transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
        px='8px'
        border='none'
        fontSize='14px'
        fontWeight='semibold'
        bg='inherit'
        color='#000'
        _focus={{
            color: color ? '#E8222E' : '#000',
        }}
        onClick={() => handleFilter(rest.category)}
    >
        {rest.category}
    </Box>)

    return (
        <Flex flexDir={'column'}>
            <Header name={'Ifuture'} />
            <Flex flexDir={'column'} minH={'100vh'} justifyItems={'center'} alignItems={'center'} w={'100vw'} paddingTop={'0.5rem'}>
                <InputGroup h={'3.5rem'} w={'20.5rem'}>
                    <InputLeftElement
                        h={'3.5rem'}
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300' />}
                    />
                    <Input placeholder={'Restaurante'}
                        _placeholder={{ color: '#d0d0d0' }}
                        h={'3.5rem'} w={'20.5rem'}
                        type={'text'}
                        name={'query'}
                        value={query}
                        onChange={handleQuery}>
                    </Input>
                </InputGroup>
                <Flex w='100vw' padding='1rem' overflow={'scroll'}>
                    {rest && [...new Set(arrayCat)]}
                </Flex>
                <div>
                    {rest
                        .filter((rest) => {
                            if (filter !== '') {
                                return filter === rest.category
                            } else {
                                return true
                            }
                        })
                        .filter((rest) => {
                            if (query !== '') {
                                return rest.name.toLowerCase().includes(query.toLowerCase())
                            } else {
                                return true
                            }
                        })
                        .map((rest) => {
                            return (
                                <CardRest key={rest.id} onClick={() => getRestaurantDetails(rest.id)}>
                                    <img src={rest.logoUrl} />
                                    <h2>{rest.name}</h2>
                                    <div>
                                        <p>{rest.deliveryTime} - {rest.deliveryTime + 15} min</p>
                                        <p>Frete : R${rest.shipping},00</p>
                                    </div>
                                </CardRest>
                            )
                        })}
                </div>
            </Flex>
            {(activeOrder) && <Alert
                position='sticky'
                variant='subtle'
                padding='1.5rem'
                height='7.35rem'
                bottom='49'
                background='#e8222e'
                opacity='0.9'
            >
                <Image src={Clock} />
                <Flex flexDir={'column'} justifyContent={'left'} marginLeft={'1.5rem'}>
                    <AlertTitle fontFamily={'Roboto'} fontSize={'1rem'} color={'white'} fontWeight={'400'}>
                        Pedido em andamento
                    </AlertTitle>
                    <AlertDescription fontFamily={'Roboto'}>
                        {activeOrderInfo.restaurantName}
                    </AlertDescription>
                    <AlertDescription fontFamily={'Roboto'} fontWeight={'bold'} >
                        SUBTOTAL R${(activeOrderInfo.totalPrice.toString().includes('.')) ? (activeOrderInfo.totalPrice.toFixed(1) + '0') : (activeOrderInfo.totalPrice.toFixed(1) + '.00')}
                    </AlertDescription>
                </Flex>
            </Alert>}
            <NavBar page={'home'} />
        </Flex>
    )
}

export default HomePage