import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "../Dashboard/DashBoardHome.css";

import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import ModalToggler from "../Modals/ModalToggler.jsx";
import RegisterButton from "../Buttons/RegisterButton.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";
import axios from "axios";
import SideNavCMC from "../SideNav/SideNavCMC.jsx";
import { IconButton } from "@chakra-ui/react";
import ViewRequestsForm from "./ViewRequestsForm.jsx";

const ServiceRequestCMC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [allOwners, setAllOwners] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  const fetchCondoOwners = () => {
    axios
      .get(`http://hortzcloud.com:3000/api/v1/co`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((owners) => {
        setAllOwners(owners.data);
        // console.log("all owners:");
        // console.log(owners.data);
      })
      .catch((error) => {
        console.error("Error fetching condo owners:", error);
      });
  };

  useEffect(() => {
    if (allOwners.length > 0) {
      console.log("all ownsers:", allOwners);
    }
  }, [allOwners]);

  useEffect(() => {
    fetchCondoOwners();
  }, [token, userData.cmcId]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="dashboard__home">
      <div className="sidedrawer__open"></div>
      <IconButton
        onClick={toggleDrawer}
        icon={<RxHamburgerMenu />}
        className="fixed top-10 shadow z-50"
        backgroundColor={"#FFFFFF"}
        rounded={"0 10px 10px 0"}
        _hover={{ backgroundColor: "#CCCCCC" }}
      />
      <SideNavCMC isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <div className="container flex flex-col items-center px-24 pb-16">
        <div className="flex flex-col justify-center items-center w-full">
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"User Service Requests"}></TableCardHeader>
            <div>
              <Table>
                <TableHeader>
                  <th>User Name</th>
                  <th>User Role</th>
                  <th></th>
                </TableHeader>
                {allOwners.map((owner, index) => (
                  <TableRow key={index}>
                    <td>{owner.first_name + " " + owner.last_name}</td>
                    <td>{owner.role}</td>
                    <td>
                      <Modal>
                        <ModalToggler>
                          <RegisterButton>View Requests</RegisterButton>
                        </ModalToggler>
                        <ModalContent
                          title="User Requests"
                          description=""
                          onExit={() => console.log("exit", owner.ownerid)}
                        >
                          <ViewRequestsForm userId={owner.userId} />
                        </ModalContent>
                      </Modal>
                    </td>
                  </TableRow>
                ))}
              </Table>
            </div>
          </TableCard>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestCMC;
