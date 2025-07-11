import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Customize from './pages/Customize.jsx'
import { userDataContext } from './context/UserContext.jsx'
import Home from './Home.jsx'
import Customize2 from './pages/Customize2.jsx'

function App() {
  const {userData, SetUserData} = useContext(userDataContext)
  return (
    <Routes>
      <Route path='/' element={(userData?.assistantImage && 
      userData?.assistantName)?<Home/> : <Navigate to = {"/Customize"}/>}/>
      <Route path='/Signup' element={!userData ? <SignUp/> : <Navigate to = {"/"}/>}/>
      <Route path='/Signin' element={!userData ? <SignIn/> : <Navigate to = {"/"}/>}/>
      <Route path='/Customize' element={userData ? <Customize/> : <Navigate to = {"/Signup"}/>}/>
      <Route path='/Customize2' element={userData ? <Customize2/> : <Navigate to = {"/Signup"}/>}/>
    </Routes>
  )
}

export default App