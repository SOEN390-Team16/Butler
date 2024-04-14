import React, { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./DashBoardHome.css";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import axios from "axios";
import ModalToggler from "../Modals/ModalToggler.jsx";
import AddButton from "../Buttons/AddButton.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";
import ServicesDashBoardHeader from "../Tables/ServicesDashBoardHeader.jsx";
import CompanyContactDisplayForm from "./CompanyContactDisplayForm.jsx";
import SideNav from "../SideNav/SideNav.jsx";
import { IconButton } from "@chakra-ui/react";
import CreateRequestForm from "./CreateRequestForm.jsx";

const ServicesDashBoard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userDataArray = userData ? Object.entries(userData) : [];
  const userID = userDataArray.length > 1 ? userDataArray[0][1] : "";
  const token = localStorage.getItem("token");

  const [request, setRequest] = useState([]);

  const getRequestByUserID = () => {
    // const userIdToFetch = 19;
    axios
      .get(`http://hortzcloud.com:3000/api/v1/req?userid=${userID}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((requestResponse) => {
        setRequest(requestResponse.data);

        // console.log("requestResponse.data:");
        // console.log(requestResponse);
        // console.log("request:");
        // console.log(request);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  };

  useEffect(() => {
    getRequestByUserID();
  }, [token, userID]);

  const addRequestToState = (newRequest) => {
    setRequest((prevRequest) => [...prevRequest, newRequest]);
  };

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
              <h2 style={{ marginBottom: "20px", fontSize: "20px" }}>
                Having an issue or want to ask question? Submit a Request <br />
                <span style={{ marginLeft: "60px" }}>and</span> one of our
                employees will get back to you
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
                    <AddButton>Submit a Request</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Submit a Service Request"
                    description="Fill the form to submit a service request"
                    onExit={() => console.log("exit")}
                  >
                    <CreateRequestForm onAddProperty={addRequestToState} />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            <div>
              {request.length > 0 && (
                <Table>
                  <TableHeader>
                    <th>Request ID</th>
                    <th>Request Type</th>
                    <th>Request Description</th>
                    <th>Request Status</th>
                  </TableHeader>
                  {request.map((req, index) => (
                    <TableRow key={index}>
                      <td>{req.request_id}</td>
                      <td>{req.type}</td>
                      <td>{req.description}</td>
                      <td>{req.status}</td>
                    </TableRow>
                  ))}
                </Table>
              )}
            </div>
          </TableCard>
        </div>
      </div>
    </div>
  );
};

export default ServicesDashBoard;
