import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from '../pages/Login';
import GlobalState from '../components/global/GlobalState';

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalState>
        <Routes>
          <Route path='/login' element={<Login />}></Route>          
        </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router;