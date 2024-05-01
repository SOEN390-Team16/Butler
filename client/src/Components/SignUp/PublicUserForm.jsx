import { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../../store/auth/auth.store.js";

export default function PublicUserForm() {
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    profile_picture: "",
  });

  const registerPublicUser = useAuthStore((state) => state.registerPublicUser);

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(userInfo);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await registerPublicUser(userInfo);
    if (response && response.status === 201) {
      toast.success("Successfully registered!");
      navigation("/");
    } else if (response && response.status === 404) {
      toast.error("Email already in use");
    } else {
      if (response.data.error) {
        toast.error(`Something went wrong: ${response.data.error}`);
      }
    }
  };
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Input
        placeholder="First Name"
        size={"lg"}
        name="first_name"
        onChange={handleChange}
      />
      <Input
        placeholder="Last Name"
        size={"lg"}
        name="last_name"
        onChange={handleChange}
      />
      <Input
        type="email"
        placeholder="Email"
        size={"lg"}
        name="email"
        onChange={handleChange}
      />
      <InputGroup size="lg">
        <Input
          pr="5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          name="password"
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem" pr={2}>
          <Button h="70%" size="md" onClick={handleShow}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button colorScheme="blue" size="lg" w="full" onClick={handleClick}>
        Sign up
      </Button>
    </div>
  );
}
