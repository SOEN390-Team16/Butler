import React, {useState} from "react";
import { Link, useLocation } from "react-router-dom";

import './FinishProfile.css'
import SidePicture from "../Login/SidePicture";
import InformationHolder from "./InformationHolder";
import PersonalInfo from "./PersonalInfo";


const FinishProfile = props => {

    return(
        <div className="finished__profile__main">
            <SidePicture>
                <InformationHolder>
                    <PersonalInfo/>
                </InformationHolder>
            </SidePicture>
        </div>
    )


}

export default FinishProfile;