import React , {useState} from "react";
import ContinueButton from "../Buttons/ContinueButton";
import { Link } from "react-router-dom";
import './CreateAccount.css'


const CreateAccount = props => {

    


    return(
        <div className="signup__credentials">
            <h1>Sign up to Butler.</h1>
            <div className="input__holder">
                <input type="email" placeholder="Email" className="" name ="email" onChange={props.onChange} required/>
            </div>
            <div className="input__holder">
                <input type="password" placeholder="Password" className="" onChange={props.onChange} name="password" required/>
            </div>
            <div className="input__holder">
                <input type="password" placeholder="Confirm Password" className="" onChange={props.onChange} name="confirmed" required/>
            </div>
            <ContinueButton onClick={props.onClick} name={"Continue"}/>
            <div className="redirect">
                <p>Already have an account ?</p>
                <Link to="/" ><p>Sign in</p></Link>
            </div>
         </div>
    )
}

export default CreateAccount