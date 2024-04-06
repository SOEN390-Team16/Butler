import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./DashBoardHome.css";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import { GoArrowUpRight } from "react-icons/go";
import ModalToggler from "../Modals/ModalToggler.jsx";
import SubmitRequestButton from "../Buttons/SubmitRequestButton.jsx";
import RequestForm from "./RequestForm.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";
import ServicesDashBoardHeader from "../Tables/ServicesDashBoardHeader.jsx";
import CompanyContactDisplayForm from "./CompanyContactDisplayForm.jsx";
import SideNav from "../SideNav/SideNav.jsx";
import { IconButton } from "@chakra-ui/react";

const ServicesDashBoard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 1,
      type: "Spa",
      dateSubmitted: "3/3/2024",
      status: "Pending",
    },
    {
      id: 2,
      type: "Gym",
      dateSubmitted: "4/3/2024",
      status: "Approved",
    },
    {
      id: 3,
      type: "Spa",
      dateSubmitted: "4/3/2024",
      status: "Approved",
    },
  ]);

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

      <SideNav isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
     
     <ServicesDashBoardHeader />
      <div className="container flex flex-col items-center px-24">
        <div className="flex flex-col justify-center items-center w-full">
          <Modal>
            <ModalToggler>
              <h2 style={{ marginBottom: "20px",fontSize: "20px"}}>
                Having an issue or want to ask question? Submit a Request <br />  
                and one of our employees will get back to you
              </h2>
            </ModalToggler>
            <ModalContent
              title="Company Contact Info"
              description=""
              onExit={() => console.log("exit")}
            >
              <CompanyContactDisplayForm />
            </ModalContent>
          </Modal>
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Your Service Requests"}>
              <div className="flex items-center gap-4">
                <Modal>
                  <ModalToggler>
                    <SubmitRequestButton>
                      Submit a Request 
                    </SubmitRequestButton>
                  </ModalToggler>
                  <ModalContent
                    title="Request Form"
                    description="Fill out the request form below"
                    onExit={() => console.log("exit")}
                  >
                    <RequestForm />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            <div>
              <Table>
                <TableHeader>
                  <th></th>
                  <th>Request Type</th>
                  <th>Date Submitted</th>
                  <th>Request Status</th>
                  <th></th>
                  <th></th>
                </TableHeader>
                {serviceRequests.map((request) => (
                  <TableRow key={request.id}>
                    <td>
                      <GoArrowUpRight size={24} />
                    </td>
                    <td>{request.type}</td>
                    <td>{request.dateSubmitted}</td>
                    <td>{request.status}</td>
                    <td></td>
                    <td></td>
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

export default ServicesDashBoard;

