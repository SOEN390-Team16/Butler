import { useState } from "react";
import ContinueButton from "../Buttons/ContinueButton";
import "./CompanySignUp.css";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth/auth.store.js";
import { toast } from "react-toastify";

const CompanySignUp = () => {
  const navigation = useNavigate();
  const registerCompany = useAuthStore(state => state.registerCompany)

  const [companyInfo, setCompanyInfo] = useState({
    company_name: "",
    email: "",
    password: "",
  });

  // Onclick function that will take care of all the login API calls
  const handleClick = async (e) => {
    e.preventDefault();
    const response = await registerCompany(companyInfo)
    if (response && response.status === 201) {
      toast.success("Successfully registered!")
      navigation('/')
    } else if (response && response.status === 400) {
      toast.error("Email already in use")
    } else {
      if (response.data.error) {
        toast.error(`Something went wrong: ${response.data.error}`)
      }
    }
  }

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
      <ContinueButton onClick={handleClick} name={"Create Account"}/>
    </div>
  );
};

export default CompanySignUp;
