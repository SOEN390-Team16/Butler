import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import './UserSignUp.css'
import { useMediaQuery } from "react-responsive";
import SidePicture from "../Login/SidePicture";
import InformationHolder from "./InformationHolder";
import ContinueButton from "../Buttons/ContinueButton";
import CreateAccount from "./CreateAccount";



const UserSignUp = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` })
    
    // Userinfo object that stores the inserted info
    const [userInfo,setUserInfo] = useState({
        username: '',
        name:'',
        email: '',
        password: ''
    })
    const [route,setRoute] = useState('/SignUp/userSignUp')
    const [wrongInformation, setIsWrongInformation] = useState(false)
    

    // Onclick function that will take care of all the login API calls
    const handleClick = async e => {
        e.preventDefault();
        if( userInfo.username === '' || userInfo.name === '' || userInfo.email === '' || userInfo.password === ''){
            console.log('not good')
        }else{
            navigate('/')
        }

    }
    // Function that stores the users information into the object for querying as theyre typing
    const handleChange  = e => {
        setUserInfo(prev => ({...prev, [e.target.name]:e.target.value}))
        console.log(userInfo)
        console.log(route)
    }

    return(
        <div className="user__signup">
            <SidePicture>
                {/* if the user is on mobile , display this code */}
           { isMobile &&(<InformationHolder>
                    <CreateAccount onChange={handleChange} onClick={handleClick}/>
                </InformationHolder>)}
            </SidePicture>
            {/* If user is NOT on mobile, display this code */}
                {!isMobile && (
                    <InformationHolder>
                        <CreateAccount route = {route} credentials ={userInfo} onChange={handleChange} onClick={handleClick}/>
                        {/* <ContinueButton onClick={handleClick} name={"Continue"}/>
                        <div className="redirect">
                            <p>Already have an account ?</p>
                            <Link to="/" ><p>Sign in</p></Link>
                        </div> */}
                    </InformationHolder>
                )}
        </div>
    )
}

export default UserSignUp;