import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from '../pages/User/Login';
import Signup from '../pages/User/Signup';
import Address from '../pages/User/Address';
import GlobalState from '../components/global/GlobalState';
import { EditAddress } from '../pages/Profile/EditAddress';
import HomePage from '../pages/homePage/HomePage';
import Profile from '../pages/Profile/Profile';
import RestaurantPage from '../pages/RestaurantPage/RestaurantPage';
import EditProfile from '../pages/Profile/EditProfile';
import Cart from '../pages/Cart';



const Router = () => {
  return (
    <BrowserRouter>
      <GlobalState>
        <Routes>
          <Route path='/login' element={<Login />}></Route>     
          <Route path='/signup' element={<Signup />}></Route>  
          <Route path='/profile' element={<Profile />}></Route>             
          <Route path='/address' element={<Address />}></Route>    
          <Route path='/' element={<HomePage />}></Route>   
          <Route path='/restaurant/:id' element={<RestaurantPage />}></Route>   
          <Route path='/editaddress' element={<EditAddress />}></Route>
          <Route path='/editprofile' element={<EditProfile />}></Route>                 
          <Route path='/cart' element={<Cart />}></Route>                 
        </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router;