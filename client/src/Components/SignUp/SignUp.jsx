import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./GoogleSignUp.css";

const SignUp = () => {
  // The googlesignup component is the form that is displaying the initial information and option
  // for signing up for butler, either the google method or the user method

  return (
    <div className="w-96 flex flex-col text-center gap-4">
      <h1>Sign up to Butler.</h1>

      {/* TODO: Create a component for the google button */}
      <Link className="flex gap-4 h-12 w-full bg-[#F0F1F5] rounded border-grey-300 border items-center justify-center">
        <FcGoogle size={25} /> Sign up with google
      </Link>

      <p>Or</p>

      <Link
        to="/SignUp/userSignUp"
        className="flex justify-center w-full font-inter font-bold h-12 rounded-md bg-black text-white"
      >
        <button>Sign up with email</button>
      </Link>

      <div className="flex flex-col justify-center">
        <p>Already have an account ?</p>
        <Link to={"/"} className="underline">
          <p>Sign in</p>
        </Link>
      </div>
    </div>
  );
};
export default SignUp;
