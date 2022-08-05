import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../../components/global/GlobalContext'
import Header from '../../components/Header'
import { getRestaurantsDetail } from '../../services/restaurants'


const RestaurantPage = () => {
  const {restDetail, setRestDetail} = useContext(GlobalContext)
  const params = useParams()
  useEffect(()=>{
    getRestaurantsDetail(setRestDetail, params.id)
  },[])
  return (
    <Header/>
  )
}

export default RestaurantPage