import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import image from "../../pictures/loginHero.jpg";

SideNavCMC.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default function SideNavCMC({ isOpen, toggleDrawer }) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userDataArray = userData ? Object.entries(userData) : [];
  const firstName = userDataArray.length > 1 ? userDataArray[1][1] : ""; // Assuming user name is the second item
  const lastName = userDataArray.length > 1 ? userDataArray[2][1] : "";

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear userData from localStorage
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <Drawer isOpen={isOpen} placement="left">
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton
            onClick={toggleDrawer}
            size={30}
            top={8}
            right={8}
          />
          <DrawerHeader>
            <Text fontSize={34}>Butler.</Text>
          </DrawerHeader>

          <DrawerBody>
            <div className="flex items-center justify-between">
              <Avatar
                size="xl"
                name={firstName + " " + lastName}
                src={image}
                backgroundColor={"#FFFFFF"}
                textColor={"#000000"}
                border={"2px solid #DDDDDD"}
              />
              <div className="pr-4">
                <p className="text">👋 Welcome back</p>
                <p className="flex-1 text-xl font-semibold">{firstName} </p>
              </div>
            </div>

            <div className="flex flex-col mt-8 gap-2">
              <Button
                variant="outline"
                textAlign="left"
                size={"lg"}
                onClick={() => navigate("/DashboardHomeCMC")}
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                size={"lg"}
                onClick={() => navigate("")}
              >
                Finance
              </Button>
              <Button
                variant="outline"
                size={"lg"}
                onClick={() => navigate("")}
              >
                Reservations
              </Button>
              <Button
                variant="outline"
                size={"lg"}
                onClick={() => navigate("/ServiceRequestCMC2")}
              >
                Service Requests
              </Button>
            </div>
          </DrawerBody>

          <DrawerFooter>
            <div className="w-full flex justify-between">
              <Button
                variant="outline"
                mr={3}
                onClick={() => navigate("/DashboardHome/editUserCMC")}
              >
                Edit profile
              </Button>
              <Button colorScheme="blue" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
