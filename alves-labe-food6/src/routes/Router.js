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
import { EditAddress } from '../pages/editAddress';
const Router = () => {
  return (
    <BrowserRouter>
      <GlobalState>
        <Routes>
          <Route path='/login' element={<Login />}></Route>     
          <Route path='/signup' element={<Signup />}></Route>  
          <Route path='/address' element={<Address />}></Route>  
          <Route path='/editaddress' element={<EditAddress />}></Route>        
        </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router;