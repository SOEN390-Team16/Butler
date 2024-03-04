import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Login/LoginPage";
import SignUpPage from "./Components/SignUp/SignUpPage";
import "./App.css";
import UserSignUp from "./Components/SignUp/UserSignUp";
import DashboardHome from "./Components/Dashboard/DashboardHome";
import DashboardHomeCMC from "./Components/Dashboard/DashBoardHomeCMC";
import EditAccount from "./Components/EditAccount/EditAccount";
import EditAccountCMC from "./Components/EditAccount/EditAccountCMC";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/SignUp/userSignUp" element={<UserSignUp />} />
          <Route path="/DashboardHome" element={<DashboardHome />} />
          <Route path="/DashboardHomeCMC" element={<DashboardHomeCMC />} />
          <Route path="/DashboardHome/editUser" element={<EditAccount />} />
          <Route
            path="/DashboardHome/editUserCMC"
            element={<EditAccountCMC />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
