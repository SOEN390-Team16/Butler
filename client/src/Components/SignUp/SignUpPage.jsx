import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@chakra-ui/react";

import SignCard from "../Cards/SignCard";

const SignUpPage = () => {
  // This logingPage is for hosting the googlesignup component where the software directs to when
  // youre first accessing the sign up page. its the "Parent" page for the first sign up option

  const navigation = useNavigate();
  const googleSignUp = () => {
    window.location.href = "http://localhost:3000/api/v1/google/";
  };

  return (
    <SignCard title="Sign up to Butler">
      {/* Google Sign in */}
      <button
        className="flex gap-4 py-2 w-full bg-[#F0F1F5] rounded border-grey-300 border items-center justify-center"
        onClick={googleSignUp}
      >
        <FcGoogle size={25} />
        <p className="text font-semibold">Sign up with Google</p>
      </button>

      <p className="text-gray-500"> Or sign in with email</p>

      {/* Email Sign up */}
      <div className="w-full">
        <Button
          colorScheme="blue"
          size="lg"
          w="full"
          onClick={() => navigation("/SignUp/userSignUp")}
        >
          Sign up with email
        </Button>

        {/* Sign in */}
        <div className="flex justify-center mt-4">
          <p>Already a user? </p>
          <Link className="underline" to="/">
            Sign in!
          </Link>
        </div>
      </div>
    </SignCard>
  );
};

export default SignUpPage;
