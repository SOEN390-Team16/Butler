import React from "react";
import { useState } from "react";
import ContinueButton from "../Buttons/ContinueButton";
import { Link } from "react-router-dom";
import "./CreateAccount.css";
import CompanySignUp from "./CompanySignUp";
import FadeIn from "react-fade-in";

const CreateAccount = (props) => {
  const [userAccount, setIsUserAccount] = useState(true);

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
        <>
          <FadeIn>
            <div className="signup__entry">
              <p>Username</p>
              <div className="input__holder">
                <input
                  type="email"
                  className=""
                  name="username"
                  onChange={props.onChange}
                  required
                />
              </div>
            </div>
            <div className="signup__entry">
              <p>Name</p>
              <div className="input__holder">
                <input
                  type="text"
                  className=""
                  onChange={props.onChange}
                  name="name"
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
                  onChange={props.onChange}
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
                  onChange={props.onChange}
                  name="password"
                  required
                />
              </div>
            </div>
          </FadeIn>
          <ContinueButton onClick={props.onClick} name={"Create Account"} />
        </>
      ) : (
        <FadeIn>
          <CompanySignUp />
        </FadeIn>
      )}
      <div className="redirect">
        <p>Already have an account ?</p>
        <Link to="/">
          <p>Sign in</p>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
