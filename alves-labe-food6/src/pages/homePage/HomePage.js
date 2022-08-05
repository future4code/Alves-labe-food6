import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../components/global/GlobalContext'
import styled from 'styled-components'
import { Input, InputGroup, InputLeftElement, Flex, Box, useSlider } from '@chakra-ui/react/'
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { goToRestaurant } from '../../routes/coordinator'

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
    const [filter, setFilter] = useState('')
    const [query, setQuery] = useState('')
    const [color, setColor] = useState(false)

    const navigate = useNavigate()

    const handleFilter = (category) => {
        if(filter===category){
            setFilter('')
            setColor(false)
        }else{
        setFilter(category)
        setColor(true)
        }
    }
    const handleQuery = (e) => {
        setQuery(e.target.value)
    }


    return (
        <Flex flexDir={'column'} justifyItems={'center'} alignItems={'center'} w='100vw'>
            <div>Ifuture</div>
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
            <Flex w='100vw' padding='1rem' flexWrap='wrap'>
                {rest && rest.map((rest) => <Box
                    as='button'
                    height='24px'
                    lineHeight='1.2'
                    transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                    px='8px'
                    border='none'
                    fontSize='14px'
                    fontWeight='semibold'
                    bg='inherit'
                    color='#B8B8B8'
                    _focus={{
                        color: color ? '#E8222E' : '#B8B8B8',
                    }}
                    onClick={() => handleFilter(rest.category)}
                >
                    {rest.category}
                </Box>)}
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
                            <CardRest key={rest.id} onClick={()=>goToRestaurant(navigate, rest.id)}>
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