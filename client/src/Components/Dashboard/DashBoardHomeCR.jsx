import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./DashBoardHome.css";
import SideDrawer from "./SideDrawer";
import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import { Link } from "react-router-dom";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import { GoArrowUpRight } from "react-icons/go";
import ModalToggler from "../Modals/ModalToggler.jsx";
import AddButton from "../Buttons/AddButton.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";
import PropertyAddForm from "./PropertyAddForm.jsx";
import MaintenanceRequestForm from "./MaintenanceRequestForm.jsx";
import PageHeaderTable from "../Tables/PageHeaderTable.jsx";
import CompanyContactDisplayForm from "./CompanyContactDisplayForm.jsx";

// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
const DashBoardHomeCR = () => {
  // toggles the drawer between being open and closed
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  // useEffect(() => {
  //   const fetchRequests = () => {
  //     axios
  //       .get("http://hortzcloud.com:3000/api/v1/pp", {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         setRequests(
  //           res.data.filter((request) => request.userid === userData.userId)
  //         );
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching requests:", err);
  //       });
  //   };

  //   fetchProperties();
  // }, [token]);

  const addRequestToState = (newRequest) => {
    setRequests((prevProperties) => [...prevProperties, newRequest]);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const options = [
    { key: 1, option: "Label 1" },
    { key: 2, option: "Label 2" },
    { key: 3, option: "Label 3" },
    { key: 4, option: "Label 4" },
  ];

  const dummyUser = {
    fName: "Condo",
    lName: "Owner",
  };

  return (
    <div className="dashboard__home">
      <div className="sidedrawer__open"></div>
      <button className="patty__button" onClick={toggleDrawer}>
        <RxHamburgerMenu size={40} />
      </button>

      {/* The Side drawer is whats being opened for main navigation */}
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        firstName={dummyUser.fName}
        lastName={dummyUser.lName}
      >
        <div className="link__holder">
          {options &&
            options.map((obj) => {
              return (
                <div key={obj.key} className="link__option">
                  <p>{obj.option}</p>
                </div>
              );
            })}
        </div>
      </SideDrawer>
      {/* Your main content goes here */}
      <PageHeaderTable />
      <div className="container flex flex-col items-center px-24">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Maintenance Requests"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Create Maintenance Request</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Create Maintenance Request"
                    description={
                      <>
                        Please do not include personal information. Descriptions
                        of issues will be stored on this portal
                        <br />
                        and visible to the other legal residents on your lease
                        and by authorized staff.
                        <br />
                        <br />
                        IMPORTANT
                        <br />
                        If this is an emergency, contact your management office
                        immediately.
                      </>
                    }
                    // description="Please do not include personal information. Descriptions of issues \n will be stored on this portal and visible to the other legal residents on your lease and by authorized staff."
                    onExit={() => console.log("exit")}
                  >
                    <MaintenanceRequestForm
                      onCreateRequest={addRequestToState}
                    />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              {requests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th></th>
                    <th>Category</th>
                    <th>Suite Location</th>
                  </TableHeader>
                  {requests.map((request, index) => (
                    <TableRow key={index}>
                      <td>
                        <GoArrowUpRight size={24} />
                      </td>
                      <td>{request.category}</td>
                      <td>{request.suiteLocation}</td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>
                    Click on the Create Maintenance Request button to start!
                  </h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>
        {/* first table ends here */}
        <div
          className="flex flex-col justify-center items-center w-full"
          style={{ paddingTop: 48, paddingBottom: 64 }}
        >
          <Modal>
            <ModalToggler>
              <h2>
                Need support from the management team? Click here to view their
                contact info
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
        </div>
      </div>
    </div>
  );
};

export default DashBoardHomeCR;
