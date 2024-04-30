import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useAuthStore from "../../store/auth/auth.store.js";
import { UserRoles } from "../../models/user-roles.enum.js";
import usePublicUserStore from "../../store/user/public-user.store.js";
import useCondoManagementCompany from "../../store/user/condo-management-company.store.js";
import { toast } from "react-toastify";
import SignCard from "../Cards/SignCard.jsx";

const LoginPage = () => {
  const navigation = useNavigate();

  // Basic object that will temporarily hold the users information that will be requested to the DB
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const login = useAuthStore((state) => state.login);
  const publicUserStore = usePublicUserStore();
  const condoManagementCompanyStore = useCondoManagementCompany();

  // On click of button, this will login the users and redirect them to their profiles
  const handleClick = async (e) => {
    e.preventDefault();
    // This is where the user will be logged in and redirected to their profile
    if (!userInfo.email || !userInfo.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await login(userInfo.email, userInfo.password);
      if (response.status === 200) {
        const userData = jwtDecode(response.data.token);
        localStorage.setItem("userData", JSON.stringify(userData));

        switch (String(userData.role)) {
          case UserRoles.CONDO_MANAGEMENT_COMPANY:
            await condoManagementCompanyStore.fetchCondoManagementCompany(
              userData.cmcId
            );
            navigation("/DashboardHomeCMC");
            break;
          case UserRoles.CONDO_OWNER:
            await publicUserStore.fetchPublicUser(userData.userId);
            navigation("/DashBoardHomeCO");
            break;
          case UserRoles.CONDO_RENTER:
            await publicUserStore.fetchPublicUser(userData.userId);
            navigation("/DashBoardHomeCR");
            break;
          case UserRoles.PUBLIC_USER:
            await publicUserStore.fetchPublicUser(userData.userId);
            navigation("/DashboardHome/editUser");
        }
      }
    } catch (err) {
      console.log(err);
      if (err.response.data.message === "Invalid email or password") {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };
  // Function that stores the users information into the object for querying
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <SignCard title={"Sign in to Butler."}>
      {/* Google Sign in */}
      <Link
        to="/googleSignin"
        className="flex gap-4 py-2 w-full bg-[#F0F1F5] rounded border-grey-300 border items-center justify-center"
      >
        <FcGoogle size={25} />
        <p className="text font-semibold">Sign in With Google</p>
      </Link>

      <p className="text-gray-500"> Or sign in with email</p>

      {/* Email Sign in */}
      <div className="w-full">
        {/* Inputs */}
        <div className="border-1 border-gray-300 rounded overflow-hidden">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full"
            size={"lg"}
            rounded={"none"}
            border={"none"}
            onChange={handleChange}
          />
          <div className="h-[1px] w-full border border-gray-300"></div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full"
            size={"lg"}
            rounded={"none"}
            border={"none"}
            onChange={handleChange}
          />
        </div>

        {/* Forgot password */}
        <div className="flex flex-row-reverse justify-between my-2">
          <Link className="underline" to="/">
            Forgot Password?
          </Link>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full">
        <Button colorScheme="blue" size="lg" w="full" onClick={handleClick}>
          Sign In
        </Button>

        {/* Sign up */}
        <div className="flex justify-center mt-4">
          <p>New user? </p>
          <Link className="underline" to="/SignUp">
            Sign up!
          </Link>
        </div>
      </div>
    </SignCard>
  );
};

export default LoginPage;
