import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import SignUpPage from "./Components/SignUp/SignUpPage";
import "./App.css";
import UserSignUp from "./Components/SignUp/UserSignUp";
import DashboardHome from "./Components/Dashboard/DashboardHome";
import EditAccount from "./Components/EditAccount/EditAccount";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/SignUp/userSignUp" element={<UserSignUp />} />
          <Route path="/DashboardHome" element={<DashboardHome />} />
          <Route path="/DashboardHome/editUser" element={<EditAccount />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
