import React, { useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/Login/LoginPage'
import SignUpPage from './Components/SignUp/SignUpPage'
import './App.css'

function App() {


  return (
    <>
       <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/SignUp" element={<SignUpPage/>}/>
            </Routes> 
        </BrowserRouter>
    </>
  )
}

export default App
