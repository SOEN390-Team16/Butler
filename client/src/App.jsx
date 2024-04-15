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
import "./config/axios.config.js";
import DashBoardHomeCO from "./Components/Dashboard/DashBoardHomeCO";
import DashBoardHomeCR from "./Components/Dashboard/DashBoardHomeCR";
import PropertyPage from "./Components/Dashboard/Property/PropertyPage";
import { ChakraProvider } from "@chakra-ui/react";
import ReservationCMC from "./Components/Reservation/ReservationCMC";
import ReservationPage from "./Components/Reservation/ReservationPage";
import FinanceHome from "./Components/Dashboard/Finance/FinanceHome";

function App() {
  return (
    <>
      <ChakraProvider>
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
            <Route path="/DashBoardHomeCO" element={<DashBoardHomeCO />} />
            <Route path="/DashBoardHomeCR" element={<DashBoardHomeCR />} />
            <Route
              path="/DashBoardHomeCMC/property/:id"
              element={<PropertyPage />}
            />
            <Route path="/ReservationCMC" element={<ReservationCMC />} />
            <Route path="/Reservation" element={<ReservationPage />} />
            <Route path="/DashBoardHomeCMC/Finance" element={<FinanceHome />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ChakraProvider>
    </>
  );
}

export default App;
