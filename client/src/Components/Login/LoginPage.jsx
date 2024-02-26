import React from "react";
import './LoginPage.css';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQuery } from "react-responsive";
import LoginCard from "./LoginCard";
import SidePicture from "./SidePicture";


const LoginPage = () => {

    const isMobile = useMediaQuery({ query: `(max-width: 760px)` }) // Hook that verifies if display is media or desktop
    console.log(uuidv4());
    console.log(isMobile)
    return(
        <div className="login__main__page">
          
           <SidePicture>
                {isMobile && (<LoginCard/>)}  
           </SidePicture>
           {
            !isMobile && (
                    <LoginCard/>
            )
           }
        </div>
       
    )
}

export default LoginPage;