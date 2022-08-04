import React, { useContext } from 'react'
import { GlobalContext } from '../../components/global/GlobalContext'
import Filtro from './Filtro'
import styled from 'styled-components'
import { Input, InputGroup, InputLeftElement, Flex } from '@chakra-ui/react/'
import { SearchIcon } from '@chakra-ui/icons'

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
    const { rest } = useContext(GlobalContext)
    console.log(rest)
    return (
        <Flex flexDir={'column'} justifyItems={'center'} alignItems={'center'}>
            <div>Ifuture</div>
            <InputGroup alignSelf={'center'} >
                <InputLeftElement
                    h={'3.5rem'}
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                />
                <Input placeholder={'Restaurante'} _placeholder={{ color: '#d0d0d0' }} h={'3.5rem'} w={'20.5rem'} type={'text'} name={'query'}>
                </Input>
            </InputGroup>
            <Filtro />
            <div>
                {rest && rest.map((rest) => {
                    return (
                        <CardRest key={rest.id}>
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
            <div>NavBar</div>
        </Flex>
    )
}

export default HomePage