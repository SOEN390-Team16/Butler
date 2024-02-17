import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import ContinueButton from "../Buttons/ContinueButton";
import './PersonalInfo.css'
import SidePicture from "../Login/SidePicture";
import InformationHolder from "./InformationHolder";


const PersonalInfo = props => {


    return(
        <div className="final__profile">
            <h1>Sign up to Butler.</h1>
        <div className="profile__picture">
            <img src="" alt="profile-pic"/>
        </div>
        <div className="profile__pic__instruction">
            <p>Add profile picture.</p>
        </div>
        <div className="input__holder">
            <input type="text" placeholder="First Name" className="" name ="firstName" onChange={props.onChange} required/>
        </div>
        <div className="input__holder">
            <input type="text" placeholder="Last Name" className="" onChange={props.onChange} name="lastName" required/>
        </div>
        <div className="input__holder">
            <input type="text" placeholder="Phone Number" className="" onChange={props.onChange} name="phone" required/>
        </div>
        <ContinueButton onClick={props.onClick} name={"Continue"}/>
        <div className="redirect">
            <p>Already have an account ?</p>
            <Link to="/" ><p>Sign in</p></Link>
        </div>
     </div>
    )

}

export default PersonalInfo;