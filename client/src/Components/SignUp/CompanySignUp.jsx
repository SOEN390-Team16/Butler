import React, {useState} from "react";
import ContinueButton from "../Buttons/ContinueButton";
import './CompanySignUp.css';


const CompanySignUp = props => {


    const [companyInfo,setCompanyInfo] = useState({
        companyName: '',
        email: '',
        password: ''
    })

    const [wrongInformation, setIsWrongInformation] = useState(false)
    
    // Onclick function that will take care of all the login API calls
    const handleClick = async e => {
        e.preventDefault();
        console.log(userInfo)

    }
    // Function that stores the users information into the object for querying as theyre typing
    const handleChange  = e => {
        setCompanyInfo(prev => ({...prev, [e.target.name]:e.target.value}))
        console.log(companyInfo)
    }

    return (
        <>
            <div className="signup__entry">
                <p>Company Name </p>
                <div className="input__holder">
                    <input type="email" className="" name ="companyName" onChange={handleChange} required/>
                </div>
            </div>
            <div className="signup__entry">
                <p>Email</p>
                <div className="input__holder">
                    <input type="email"  className="" onChange={handleChange} name="email" required/>
                </div>
            </div>
            <div className="signup__entry">
                <p>Password</p>
                <div className="input__holder">
                    <input type="password"  className="" onChange={handleChange} name="password" required/>
                </div>
            </div>
            <ContinueButton onClick={handleClick} name={"Create Account"}/>
        </>
      
    );
}

export default CompanySignUp