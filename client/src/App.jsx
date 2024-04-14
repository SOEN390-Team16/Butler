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
import RequestForm from "./Components/Dashboard/RequestForm";
import { ChakraProvider } from "@chakra-ui/react";
import ServiceRequestCMC from "./Components/ServiceRequestPageCMC/ServiceRequestCMC";
import ServiceRequestCMC2 from "./Components/ServiceRequestPageCMC/ServiceRequestCMC2";
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
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ChakraProvider>
    </>
  );
}

export default App;
