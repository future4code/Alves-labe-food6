import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalContext } from '../../components/global/GlobalContext'
import Header from '../../components/Header'
import { goToLoginPage } from '../../routes/coordinator'
import { getRestaurantsDetail } from '../../services/restaurants'
import RestaurantCardProfile from '../../components/RestaurantCardProfile'
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import ProductCard from '../../components/ProductCard'

const RestaurantPage = () => {
  const { setRestDetail, setConfirmProduct, confirmProduct, restaurantProducts, restaurantDetails } = useContext(GlobalContext)
  const productCategories = restaurantProducts.map((item) => {
    return item.category
  })

  const navigate = useNavigate()
  let uniqueCategories = [...new Set(productCategories)]

  useEffect(() => {
    localStorage.setItem('restaurantDetails', JSON.stringify(restaurantDetails))
    !localStorage.getItem('token') && goToLoginPage(navigate)
  }, [])

  return (
    <div>
      <Header name={'Restaurante'} onRestaurant={true}/>
      <RestaurantCardProfile></RestaurantCardProfile>
      {uniqueCategories.map((item) => {
        const products = restaurantProducts.filter((product) => {
          return product.category === item
        })
        return <Flex flexDir={'column'}>
          <Text fontFamily={'Roboto'} marginX={'1rem'} borderBottom={'1px solid black'} w={'90%'} h={'1.75rem'} marginBottom={'0.25rem'} marginTop={'1rem'}>{item}</Text>
          {products.map((product) => {
            return <Flex align={'center'} justify={'center'} flexDir={'column'}>
              <ProductCard
                photoUrl={product.photoUrl}
                name={product.name}
                price={product.price}
                description={product.description}
                id={product.id}
              ></ProductCard>
            </Flex>
          })}
        </Flex>
      })}
    </div>
  )
}

export default RestaurantPage