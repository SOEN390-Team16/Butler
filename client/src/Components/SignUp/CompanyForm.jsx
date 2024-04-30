import { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "../../store/auth/auth.store.js";

export default function CompanyForm() {
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const registerCompany = useAuthStore((state) => state.registerCompany);

  const [companyInfo, setCompanyInfo] = useState({
    company_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCompanyInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(companyInfo);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await registerCompany(companyInfo);
    if (response && response.status === 201) {
      toast.success("Successfully registered!");
      navigation("/");
    } else if (response && response.status === 400) {
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
        placeholder="Company Name"
        size={"lg"}
        name="company_name"
        onChange={handleChange}
      />
      <Input
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
