import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Address from '../pages/Address';
import GlobalState from '../components/global/GlobalState';
import { EditAddress } from '../pages/EditAddress';
import HomePage from '../pages/homePage/HomePage';
import Profile from '../pages/Profile';
import RestaurantPage from '../pages/RestaurantPage/RestaurantPage';
import EditProfile from '../pages/RestaurantPage/EditProfile';



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

        </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router;