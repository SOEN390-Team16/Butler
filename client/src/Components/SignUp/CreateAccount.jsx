import { useState } from "react";
import ContinueButton from "../Buttons/ContinueButton";
import { Link, useNavigate } from "react-router-dom";
import "./CreateAccount.css";
import CompanySignUp from "./CompanySignUp";
import { toast } from "react-toastify";
import useAuthStore from "../../store/auth/auth.store.js";

const CreateAccount = () => {
  const navigation = useNavigate();

  const [userAccount, setIsUserAccount] = useState(true);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    profile_picture: "",
  });

  const registerPublicUser = useAuthStore(state => state.registerPublicUser)

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(userInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    const response = await registerPublicUser(userInfo)
    console.log(response)
    if (response && response.status === 201) {
      toast.success("Successfully registered!")
      navigation("/");
    } else if (response.status === 404) {
      toast.error("Email already in use")
    } else {
      toast.error(`Something went wrong: ${response.data.error}`);
    }

  };

  // Create account holds the information records for when a client signs up.
  // 1. when a client signs up , there will be an axios post method to see whether the email/password combo already exists
  // 2. IF verified and good, add the client to the database.
  //3. A client will be able to edit their information as well as add a profile picture once theyre logged in
  //4. Also if good, this will redirect them to the sign in page
  return (
    <div className="signup__credentials">
      <h1>Sign up to Butler.</h1>
      <div className="signup__options">
        <div>
          <p
            className={`${userAccount ? "active" : ""}`}
            onClick={() => setIsUserAccount(true)}
          >
            Public User
          </p>
        </div>

        <div>
          <p
            className={`${!userAccount ? "active" : ""}`}
            onClick={() => setIsUserAccount(false)}
          >
            Company User
          </p>
        </div>
      </div>
      {userAccount ? (
        <div className="flex flex-col py-8">
          <div className="signup__entry">
            <p>First name</p>
            <div className="input__holder">
              <input
                type="text"
                className=""
                name="first_name"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="signup__entry">
            <p>Last name</p>
            <div className="input__holder">
              <input
                type="text"
                className=""
                onChange={handleChange}
                name="last_name"
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
          <ContinueButton onClick={handleSignup} name={"Create Account"}/>
        </div>
      ) : (
        <CompanySignUp/>
      )}
      <div className="flex flex-col justify-center items-center">
        <p>Already have an account ?</p>
        <Link to={"/"} className="underline">
          <p>Sign in</p>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
