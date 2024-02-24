import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./LoginCard.css";
import ContinueButton from "../Buttons/ContinueButton";

const LoginCard = () => {
  const navigation = useNavigate();

  // Basic object that will temporarily hold the users information that will be requested to the DB
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // On click of button, this will login the users and redirect them to their profiles
  const handleClick = async (e) => {
    e.preventDefault();

    // This is where the user will be logged in and redirected to their profile
    axios
      .post("/api/login", userInfo)
      .then((res) => {
        if (res.status !== 200) {
          console.log("Issue logging in");
        } else {
          console.log("Successfully logged in");
        }
      })
      .catch((err) => {
        console.log("Error logging in:", err.response.data.message);
      });

    navigation("/DashboardHome");
  };
  // Function that stores the users information into the object for querying
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(userInfo);
  };

  return (
    <div className="login__card">
      <div className="login__content">
        <h1>Sign in to Butler. </h1>
        <div className="flex flex-col gap-6 justify-center text-center">
          <Link
            to="/googleSignin"
            className="flex gap-4 py-2 w-full bg-[#F0F1F5] rounded border-grey-300 border items-center justify-center"
          >
            <FcGoogle size={25} />
            <p className="text font-semibold">Sign in With Google</p>
          </Link>

          <p> Or sign in with email</p>

          <div>
            <div className="credentials__section c1">
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="credentials__section c2">
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="row redirect__container">
              <div className="col-lg-6 col-sm-3 signup__redirect">
                <Link to="/SignUp">New user, sign up!</Link>
              </div>
              <div className="col-lg-6 col-sm-3 forgot__password">
                <Link to="/">Forgot Password?</Link>
              </div>
            </div>
          </div>

          <ContinueButton onClick={handleClick} name={"Sign In"} />
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
