import React, { useState } from "react";
import ContinueButton from "../Buttons/ContinueButton";
import "./CompanySignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompanySignUp = (props) => {
  const navigation = useNavigate();

  const [companyInfo, setCompanyInfo] = useState({
    company_name: "",
    email: "",
    password: "",
  });

  const [wrongInformation, setIsWrongInformation] = useState(false);

  // Onclick function that will take care of all the login API calls
  const handleClick = async (e) => {
    e.preventDefault();
    // This is where the user will be logged in and redirected to their profile
    console.log(companyInfo);
    axios
      .post("http://hortzcloud.com:3000/api/v1/cmc/", companyInfo) // Added 'http://' protocol
      .then((res) => {
        console.log("res", res);
        if (res) {
          console.log("Company account created successfully");
          let userData = res.data;
          console.log("User data:", userData);
          navigation('/')
          //   navigation("/DashboardHome");
        } else {
          console.log("Incorrect email or password");
          wrongInformation(true);
        }
      })
      .catch((err) => {
        console.log("Error logging in:", err);
      });
  };
  // Function that stores the users information into the object for querying as theyre typing
  const handleChange = (e) => {
    setCompanyInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(companyInfo);
  };

  return (
    <div className="flex flex-col py-8">
      <div className="signup__entry">
        <p>Company Name </p>
        <div className="input__holder">
          <input
            type="email"
            className=""
            name="company_name"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="signup__entry">
        <p>Email</p>
        <div className="input__holder">
          <input
            type="email"
            className=""
            onChange={handleChange}
            name="email"
            required
          />
        </div>
      </div>
      <div className="signup__entry">
        <p>Password</p>
        <div className="input__holder">
          <input
            type="password"
            className=""
            onChange={handleChange}
            name="password"
            required
          />
        </div>
      </div>
      <ContinueButton onClick={handleClick} name={"Create Account"} />
    </div>
  );
};

export default CompanySignUp;
