import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalContext } from '../../components/global/GlobalContext'
import Header from '../../components/Header'
import { goToLoginPage } from '../../routes/coordinator'
import { getRestaurantsDetail } from '../../services/restaurants'


const RestaurantPage = () => {
  const {restDetail, setRestDetail} = useContext(GlobalContext)
  const params = useParams()
  useEffect(()=>{
    getRestaurantsDetail(setRestDetail, params.id)
  },[])
  const navigate = useNavigate();
  useEffect(()=>{
    !localStorage.getItem('token') && goToLoginPage(navigate)
  },[])
  return (
    <Header/>
  )
}

export default RestaurantPage