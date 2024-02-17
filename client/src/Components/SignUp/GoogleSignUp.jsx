import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import './GoogleSignUp.css'


const GoogleSignUp = () => {


// The googlesignup component is the form that is displaying the initial information and option
// for signing up for butler, either the google method or the user method

  return(  
    <div className="first__signup__card">
        <h1>Sign up to Butler.</h1>
        <div className="googleSignUp__button">
        <Link><button><p><FcGoogle size={25}/> Sign up with google</p></button></Link> 
        </div>
        <div style={{margin:'4% 0'}}>
            <p>Or</p>
        </div>
        <div className="email__signUp">
            <Link to="/SignUp/userSignUp"><button>Sign up with email</button></Link>
        </div>
        <div className="aditional__info">
            <p>Already have an account ?</p>
            <Link><p>Sign in</p></Link>
        </div>
    </div>
  );
}
export default GoogleSignUp;