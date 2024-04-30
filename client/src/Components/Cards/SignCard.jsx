import { Heading } from "@chakra-ui/react";
import PropTypes from "prop-types";
import loginHero from "../../pictures/loginHero.jpg";

export default function SignCard({ title, children }) {
  return (
    <div className="h-screen relative">
      <img
        src={loginHero}
        className="absolute -z-10 h-full w-full object-cover"
      />
      <div className="flex h-full items-center justify-center">
        <div className="bg-white w-[80%] pb-8 rounded-lg shadow px-4 max-w-96">
          {/* Card Header */}
          <Heading size="lg" textAlign="center" className="my-10">
            {title}
          </Heading>
          {/* Card Body */}
          <div className="w-full flex flex-col justify-center items-center gap-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

SignCard.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
