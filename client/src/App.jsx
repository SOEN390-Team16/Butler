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
import ServicesDashBoard from "./Components/Dashboard/ServicesDashBoard";
import DashBoardHomeCR from "./Components/Dashboard/DashBoardHomeCR";
import PropertyPage from "./Components/Dashboard/Property/PropertyPage";
import { ChakraProvider } from "@chakra-ui/react";
import ServiceRequestCMC from "./Components/ServiceRequestPageCMC/ServiceRequestCMC";
import ServiceRequestCMC2 from "./Components/ServiceRequestPageCMC/ServiceRequestCMC2";
import FinanceHome from "./Components/Dashboard/Finance/FinanceHome.jsx";
import ReservationPage from "./Components/Reservation/ReservationPage.jsx";
import ReservationCMC from "./Components/Reservation/ReservationCMC.jsx";
import ManageCondosCMC from "./Components/ServiceRequestPageCMC/ManageCondosCMC.jsx";
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
            <Route path="/ServicesDashBoard" element={<ServicesDashBoard />} />

            <Route
              path="/DashBoardHomeCMC/property/:id"
              element={<PropertyPage />}
            />
            <Route path="/ServiceRequestCMC" element={<ServiceRequestCMC />} />
            <Route
              path="/ServiceRequestCMC2"
              element={<ServiceRequestCMC2 />}
            />
            <Route path="/Reservation" element={<ReservationPage />} />
            <Route path="/ReservationCMC" element={<ReservationCMC />} />
            <Route path="/DashBoardHomeCMC/Finance" element={<FinanceHome />} />
            <Route path="/ManageCondosCMC" element={<ManageCondosCMC />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ChakraProvider>
    </>
  );
}

export default App;
