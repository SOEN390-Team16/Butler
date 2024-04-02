import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "../Dashboard/DashBoardHome.css";

import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import { Link } from "react-router-dom";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import { GoArrowUpRight, GoPerson } from "react-icons/go";
import ModalToggler from "../Modals/ModalToggler.jsx";
import AddButton from "../Buttons/AddButton.jsx";
import KeyButton from "../Buttons/KeyButton.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import SearchButton from "../Buttons/SearchButton.jsx";
import RegisterButton from "../Buttons/RegisterButton.jsx";
import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";
import PropertyAddForm from "../Dashboard/PropertyAddForm.jsx";
import GenerateKeyForm from "../Dashboard/GenerateKeyForm.jsx";
import UserRegistrationForm from "../Dashboard/UserRegistrationForm.jsx";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import EmployeeSection from "../Dashboard/EmployeeSection.jsx";
import SideNavCMC from "../SideNav/SideNavCMC.jsx";
import { IconButton } from "@chakra-ui/react";
import Dropdown from "../Dropdown/Dropdown.jsx";

const ServiceRequestCMC = () => {
  // toggles the drawer between being open and closed
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [properties, setProperties] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProperties = () => {
      axios
        .get("http://hortzcloud.com:3000/api/v1/pp", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProperties(
            res.data.filter((property) => property.companyid === userData.cmcId)
          );
        })
        .catch((err) => {
          console.error("Error fetching properties:", err);
        });
    };

    fetchProperties();
  }, [token, userData.cmcId]);

  // TODO: Add the property to the database
  const addPropertyToState = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
    axios
      .post("http://hortzcloud.com:3000/api/v1/pp", newProperty, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Property added successfully:", res);
      })
      .catch((err) => {
        console.error("Error adding property:", err);
      });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // this is for the Service Requests table
  const handleChangeRequestStatus = (requestId, newStatus) => {
    // Update the status in the local state
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property.id === requestId
          ? { ...property, status: newStatus }
          : property
      )
    );

    // Make an API call to update the status in the backend
    axios
      .patch(`api-endpoint/${requestId}`, {
        status: newStatus,
      })
      .then((response) => {
        // Handle successful response
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating request status:", error);
      });
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

      {/* The Side drawer is whats being opened for main navigation */}
      <SideNavCMC isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      {/* Your main content goes here */}
      <div className="container flex flex-col items-center px-24 pb-16">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"My Properties 🏢"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Property</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Property?"
                    description="Add the information associated to the property to add it to your account"
                  >
                    <PropertyAddForm onAddProperty={addPropertyToState} />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              {properties.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th></th>
                    <th>Property Name</th>
                    <th>Property Address</th>
                    <th>Unit Count</th>
                    <th>Parking Count</th>
                    <th>Locker Count</th>
                  </TableHeader>
                  {properties.map((property, index) => (
                    <TableRow key={index}>
                      <td>
                        <Link
                          to={`/DashboardHomeCMC/property/${property.property_id}`}
                        >
                          <GoArrowUpRight size={24} />
                        </Link>
                      </td>
                      <td>{property.property_name}</td>
                      <td>{property.address}</td>
                      <td>{property.unit_count}</td>
                      <td>{property.parking_count}</td>
                      <td>{property.locker_count}</td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>Click on the add property button to start!</h3>
                </div>
              )}
            </div>
          </TableCard>

          <div className="table-space"></div>

          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Service Requests"}></TableCardHeader>
            {/* Body of properties card */}
            <div>
              {properties.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th></th>
                    <th>Request ID</th>
                    <th>Property ID</th>
                    <th>Unit ID</th>
                    <th>Request Type</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </TableHeader>
                  {properties.map((property, index) => (
                    <TableRow key={index}>
                      <td>
                        <GoArrowUpRight size={24} />
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <Dropdown
                          options={[
                            "Pending",
                            "In Progress",
                            "Completed",
                            "Closed",
                          ]}
                          // defaultValue={request.status}
                          // onChange={(e) =>
                          //   handleChangeRequestStatus(
                          //     request.id,
                          //     e.target.value
                          //   )
                          // }
                        />
                      </td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>No Services Requested at the Moment</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestCMC;
