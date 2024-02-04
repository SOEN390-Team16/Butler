import React from "react";
import {useState, useEffect} from 'react'
import {useMediaQuery} from 'react-responsive'
import { FcGoogle } from "react-icons/fc";
import { Link } from 'react-router-dom';


import './LoginCard.css'
import ContinueButton from "../Buttons/ContinueButton";


const LoginCard = () => {
    const [next, setNext] = useState(false)

    // Basic object that will temporarily hold the users information that will be requested to the DB
    const [userInfo, setUserInfo] = useState({ 
        email: '',
        password: '',
        username: ''
    })

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })

    // On click of button, 
    const handleClick = async e => {
        e.preventDefault();
        setNext(true)
        console.log(userInfo)
    }
    // Function that stores the users information into the object for querying
    const handleChange  = e => {
        setUserInfo(prev => ({...prev, [e.target.name]:e.target.value}))
        console.log(userInfo)
    }


    return(
        
           <div className="login__card">
                <div className="login__content">
                    <h1>Sign in to Butler. </h1>
                    <div >
                    <div className="google__button">
                        <button><Link to="/googleSignin" className="google__link"><p><FcGoogle size={25}/>  Sign in With Google</p></Link></button>
                    </div>
                    <div>
                        <p> Or sign in with email.</p>
                    </div>
                    <div className="credentials__section c1">
                        <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                    </div>
                    <div className="credentials__section c2">
                        <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                    </div>
                    <div className="forgot__password">
                        <Link to ="/">Forgot Password?</Link>
                    </div>
                    {/* <div className="continue__button">
                        <Link to="/" onClick={handleClick}><button>Continue</button></Link>
                    </div> */}
                    <ContinueButton name={"Continue"}/>
                </div>
                    
            </div>
           </div>
        
    )

}

export default LoginCard;