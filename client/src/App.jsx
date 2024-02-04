import React, { useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/Login/LoginPage'
import SignUpPage from './Components/SignUp/SignUpPage'
import './App.css'
import UserSignUp from './Components/SignUp/UserSignUp'
import FinishProfile from './Components/SignUp/FinishProfile'

function App() {


  return (
    <>
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/SignUp" element={<SignUpPage/>}/>
                <Route path="/SignUp/userSignUp" element={<UserSignUp/>}/>
                <Route path="/SignUp/userSignUp/Finalize" element ={<FinishProfile/>}/>
            </Routes> 
        </BrowserRouter>
    </>
  )
}

export default App
