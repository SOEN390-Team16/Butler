import { Link } from "react-router-dom";
import { Tabs, TabPanel, Tab, TabList, TabPanels } from "@chakra-ui/react";

import SignCard from "../Cards/SignCard";
import PublicUserForm from "./PublicUserForm";
import CompanyForm from "./CompanyForm";

const UserSignUp = () => {
  return (
    <SignCard title="Sign up to Butler.">
      {/* Card Body */}
      <Tabs isFitted size={"lg"} className="w-full">
        <TabList>
          <Tab>Public User</Tab>
          <Tab>Company</Tab>
        </TabList>
        <TabPanels>
          {/* Public User */}
          <TabPanel>
            <PublicUserForm />
          </TabPanel>

          {/* Company */}
          <TabPanel>
            <CompanyForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div className="flex justify-center">
        <p>Already a user? </p>
        <Link className="underline" to="/">
          Sign in!
        </Link>
      </div>
    </SignCard>
  );
};

export default UserSignUp;
