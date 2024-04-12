import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "../DashBoardHome.css";
import SideDrawerCMC from "../SideDrawer.jsx";
import TableCard from "../../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../../Cards/Tables/TableCardHeader.jsx";
import { Link } from "react-router-dom";
import Table from "../../Tables/Table.jsx";
import TableHeader from "../../Tables/TableHeader.jsx";
import TableRow from "../../Tables/TableRow.jsx";
import { GoArrowUpRight, GoPerson } from "react-icons/go";
import ModalToggler from "../../Modals/ModalToggler.jsx";
import AddButton from "../../Buttons/AddButton.jsx";
import KeyButton from "../../Buttons/KeyButton.jsx";
import DeleteButton from "../../Buttons/DeleteButton.jsx";
import SearchButton from "../../Buttons/SearchButton.jsx";
import RegisterButton from "../../Buttons/RegisterButton.jsx";
import ModalContent from "../../Modals/ModalContent.jsx";
import Modal from "../../Modals/Modal.jsx";
import EditButton from "../../Buttons/EditButton.jsx";
import EditEmployeeForm from "../EditEmployeeForm.jsx";

import axios from "axios";
import AddOperationForm from "./AddOperationForm.jsx";


// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
const FinanceHome = () => {
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

  const options = [
    { key: 1, option: "Finance" },
    { key: 2, option: "Label 2" },
    { key: 3, option: "Label 3" },
    { key: 4, option: "Label 4" },
  ];

  const dummyUser = {
    fName: "Condo",
    lName: "Owner",
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
console.log(properties)
  return (
    <div className="dashboard__home">
      <div className="finance__hero"></div>
      <button className="patty__button" onClick={toggleDrawer}>
        <RxHamburgerMenu size={40} />
      </button>

      {/* The Side drawer is whats being opened for main navigation */}
      <SideDrawerCMC
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
      
      >
        <div className="link__holder">
          {options &&
            options.map((obj) => {
              return (
                <div key={obj.key} className="link__option">
            
                  <Link to="/DashboardHomeCMC/Finance" >
                    {obj.option}
                  </Link>
                </div>
              );
            })}
        </div>
      </SideDrawerCMC>
      {/* Your main content goes here */}
      <div className="container flex flex-col items-center px-24 pb-16">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Total Finance 🏦"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  {/* <ModalToggler>
                    <AddButton>Add Transaction</AddButton>
                  </ModalToggler> */}
                  <ModalContent
                    title="Want to add a Transaction?"
                    description="Add the information associated to the transaction to add it to your account."
                  >
                    <AddOperationForm />
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
                    <th>Property</th>
                    <th>Revenue Generated</th>
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
                  <h3>No fees collected yet.</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>
       
        
      </div>
      <div className="container flex flex-col items-center px-24 pb-16">
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Finance History 🏦"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Transaction</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Transaction?"
                    description="Add the information associated to the transaction to add it to your account."
                  >
                    <AddOperationForm propertyList={properties}/>
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              {properties.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th>Operation Type</th>
                    <th>Property</th>
                    <th>Cost</th>
                    <th>Date</th>
                    <th></th>
                   
                  </TableHeader>
                  {properties.map((property, index) => (
                    <TableRow key={index}>
                      {/* <td>
                        <Link
                          to={`/DashboardHomeCMC/property/${property.property_id}`}
                        >
                          <GoArrowUpRight size={24} />
                        </Link>
                      </td> */}
                      <td>{property.property_name}</td>
                      <td>{property.address}</td>
                      <td>{property.unit_count}</td>
                      <td>{property.parking_count}</td>
                      <td>
                      <Modal>
                        <ModalToggler>
                          <EditButton>Edit</EditButton>
                        </ModalToggler>
                        <ModalContent
                          title="Edit Transaction "
                          description="Edit the information associated with the operation. We will generate the rest for you!"
                          onExit={() => console.log("exit")}
                        >
                          <EditEmployeeForm
                            operation={property} // CHANGE PROPERTY TO THE OPERATION
                            propertyList={properties}
                          />
                        </ModalContent>
                      </Modal>
                      </td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>Click on the add operation button to start!</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>
       
        
      </div>
    </div>
  );
};

export default FinanceHome;

    