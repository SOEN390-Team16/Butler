import React from "react";
import {useState} from "react"
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SidePicture from "../Login/SidePicture";
import InformationHolder from "./InformationHolder";
import { FcGoogle } from "react-icons/fc";
import './SignUpPage.css'



const LoginPage = () => {

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
    

    return(
        <div className="signup__main__page">
                <SidePicture>
                    <InformationHolder>
                        <div className="first__signup__card">
                            <h1>Sign up to Butler.</h1>
                            <div className="googleSignUp__button">
                               <Link><button><p><FcGoogle size={25}/> Sign up with google</p></button></Link> 
                            </div>
                            <div>
                                <p>Or</p>
                            </div>
                            <div className="email__signUp">
                                <Link><button>Sign up with email</button></Link>
                            </div>
                            <div className="aditional__info">
                                <p>Already have an account ?</p>
                                <Link><p>Sign in</p></Link>
                            </div>
                        </div>
                        
                    </InformationHolder>
                </SidePicture>
        </div>
       
    )
}

export default LoginPage;