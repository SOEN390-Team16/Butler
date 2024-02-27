import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import SidePicture from "../Login/SidePicture";

import "./SignUpPage.css";
import SignUp from "./SignUp";

const LoginPage = () => {
  // This logingPage is for hosting the googlesignup component where the software directs to when
  // youre first accessing the sign up page. its the "Parent" page for the first sign up option

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  return (
    <div className="signup__main__page">
      <SidePicture>{isMobile && <SignUp />}</SidePicture>
      {!isMobile && <SignUp />}
    </div>
  );
};

export default LoginPage;
