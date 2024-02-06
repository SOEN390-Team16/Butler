import React from "react";
import {useState} from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SidePicture from "../Login/SidePicture";
import InformationHolder from "./InformationHolder";

import './SignUpPage.css'
import GoogleSignUp from "./GoogleSignUp";



const LoginPage = () => {

// This logingPage is for hosting the googlesignup component where the software directs to when 
// youre first accessing the sign up page. its the "Parent" page for the first sign up option


    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
   
    return(
        <div className="signup__main__page">
                <SidePicture>
                  { isMobile && (<InformationHolder>
                        {/* <div className="first__signup__card">
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
                        </div> */}
                        <GoogleSignUp />
                    </InformationHolder>)}

                   
                </SidePicture>
                {!isMobile && (
                        <InformationHolder>
                            <GoogleSignUp />
                        </InformationHolder>
                    )}
        </div>
       
    )
}

export default LoginPage;