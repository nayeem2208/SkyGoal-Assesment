import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Singup'
import Home from './components/Home'



function Routers() {
  return (
   <Routes>
    <Route path='/login'  element={<Login/>}/>
    <Route path='/signup'  element={<Signup/>}/>
    <Route path='/'  element={<Home/>}/>
   </Routes>
  )
}

export default Routers