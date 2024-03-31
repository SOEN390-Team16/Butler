import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./DashBoardHome.css";

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
import PropertyAddForm from "./PropertyAddForm.jsx";
import GenerateKeyForm from "./GenerateKeyForm.jsx";
import UserRegistrationForm from "./UserRegistrationForm.jsx";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import EmployeeSection from "./EmployeeSection.jsx";
import SideNavCMC from "../SideNav/SideNavCMC.jsx";
import { IconButton } from "@chakra-ui/react";

// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
const DashBoardHomeCMC = () => {
  // test table
  const [selectedHeading, setSelectedHeading] = useState("allUsers");

  const handleHeadingClick = (heading) => {
    setSelectedHeading(heading);
  };
  // test table ends

  // toggles the drawer between being open and closed
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [publicUsers, setPublicUsers] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  const deletePublicUser = (user) => {
    axios
      .delete(`http://hortzcloud.com:3000/api/v1/pu/${user.userid}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res for deleting user:");
        console.log(res);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

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

  useEffect(() => {
    const fetchPublicUsers = () => {
      axios
        .get("http://hortzcloud.com:3000/api/v1/pu", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPublicUsers(res.data);
          // console.log("public users:");
          // console.log(publicUsers);
        })
        .catch((err) => {
          console.error("Error fetching properties:", err);
        });
    };

    fetchPublicUsers();
  }, [token]);

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

  // for register users table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(publicUsers.length / itemsPerPage);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleClickPrevious = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleUsers = publicUsers.slice(startIndex, endIndex);

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
        </div>
        {/* second table */}
        <div
          className="flex flex-col justify-center items-center w-full"
          style={{ paddingTop: 48, paddingBottom: 0 }}
        >
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"My Clients"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <KeyButton>Generate Key</KeyButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to generate a Registration Key?"
                    description="Add the information associated to the unit. We will generate the Registration Key for you!"
                    onExit={() => console.log("exit")}
                  >
                    <GenerateKeyForm />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              <Table>
                <TableHeader>
                  <th></th>
                  <th>Client Name</th>
                  <th>Unit Address</th>
                  <th>Status</th>
                  <th>Parking</th>
                  <th>Locker</th>
                </TableHeader>
                <TableRow>
                  <td>
                    <GoPerson size={24} />
                  </td>
                  <td>Client Name</td>
                  <td>Unit Address</td>
                  <td>Public</td>
                  <td>1</td>
                  <td>2</td>
                </TableRow>
                <TableRow>
                  <td>
                    <GoPerson size={24} />
                  </td>
                  <td>Client Name</td>
                  <td>Unit Address</td>
                  <td>Rental</td>
                  <td>1</td>
                  <td>2</td>
                </TableRow>
                <TableRow>
                  <td>
                    <GoPerson size={24} />
                  </td>
                  <td>Client Name</td>
                  <td>Unit Address</td>
                  <td>Owner</td>
                  <td>1</td>
                  <td>2</td>
                </TableRow>
              </Table>
            </div>
          </TableCard>
        </div>

        {/* third & fourth tables */}
        <div
          className="flex flex-col justify-center items-center w-full"
          style={{ paddingTop: 48, paddingBottom: 64 }}
        >
          {/* Properties card goes here */}
          <TableCard className={"gap-8"}>
            {/* Body of properties card */}

            <div className="flex flex-row justify-around button-container">
              <button
                className={
                  selectedHeading === "allUsers" ? "selected-button" : ""
                }
                onClick={() => handleHeadingClick("allUsers")}
              >
                All Users
              </button>
              <button
                className={
                  selectedHeading === "registerUsers" ? "selected-button" : ""
                }
                onClick={() => handleHeadingClick("registerUsers")}
              >
                Register Users
              </button>
            </div>
            <div className="flex flex-row items-center gap-8">
              <div className="relative">
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-[24px] text-gray-600" />
                <input
                  type="text"
                  placeholder="Email Address..."
                  className="border border-gray-300 py-2 w-[360px] rounded-md pl-10"
                />
              </div>

              <SearchButton>Search</SearchButton>
            </div>
            <div>
              {selectedHeading === "allUsers" && (
                <div>
                  <Table>
                    <TableHeader>
                      <th></th>
                      <th>Client Name</th>
                      <th>Email Address</th>
                      <th>Status</th>
                      <th>Register</th>
                    </TableHeader>
                    {visibleUsers.map((user, index) => (
                      <TableRow key={index}>
                        <td>
                          <GoPerson size={24} />
                        </td>
                        <td>{user.first_name + " " + user.last_name}</td>
                        <td>{user.email}</td>
                        <td>Public User</td>
                        <td>
                          <DeleteButton onClick={() => deletePublicUser(user)}>
                            Delete
                          </DeleteButton>
                        </td>
                      </TableRow>
                    ))}
                  </Table>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "1rem",
                      alignItems: "center",
                      paddingTop: "2%",
                    }}
                  >
                    <SearchButton
                      onClick={handleClickPrevious}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </SearchButton>
                    <span
                      style={{ fontSize: "1.2rem" }}
                    >{`Page ${currentPage} of ${totalPages}`}</span>
                    <SearchButton
                      onClick={handleClickNext}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </SearchButton>
                  </div>
                </div>
              )}
              <div>
                {selectedHeading === "registerUsers" && (
                  <div>
                    <Table>
                      <TableHeader>
                        <th></th>
                        <th>Client Name</th>
                        <th>Email Address</th>
                        <th>Status</th>
                        <th>Register</th>
                      </TableHeader>
                      {visibleUsers.map((user, index) => (
                        <TableRow key={index}>
                          <td>
                            <GoPerson size={24} />
                          </td>
                          <td>{user.first_name + " " + user.last_name}</td>
                          <td>{user.email}</td>
                          <td>Public User</td>
                          <td>
                            <Modal>
                              <ModalToggler>
                                <RegisterButton>Register</RegisterButton>
                              </ModalToggler>
                              <ModalContent
                                title="User Registration"
                                description="Is this the user you would like to register? A Registration Key will automatically be associated to their account."
                                onExit={() => console.log("exit")}
                              >
                                <UserRegistrationForm />
                              </ModalContent>
                            </Modal>
                          </td>
                        </TableRow>
                      ))}
                    </Table>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "1rem",
                        alignItems: "center",
                        paddingTop: "2%",
                      }}
                    >
                      <SearchButton
                        onClick={handleClickPrevious}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </SearchButton>
                      <span
                        style={{ fontSize: "1.2rem" }}
                      >{`Page ${currentPage} of ${totalPages}`}</span>
                      <SearchButton
                        onClick={handleClickNext}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </SearchButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TableCard>
        </div>

        {/* // EMPLOYEES */}
        <EmployeeSection />
      </div>
    </div>
  );
};

export default DashBoardHomeCMC;
