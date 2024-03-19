import React, { useState, useEffect } from "react";
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
import ArrowButton from "../Buttons/ArrowButton";
import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";
import PropertyAddForm from "./PropertyAddForm.jsx";
import PageHeaderTable from "../Tables/PageHeaderTable.jsx";
import CompanyContactDisplayForm from "./CompanyContactDisplayForm.jsx";
import axios from 'axios';
import { IoMdArrowForward } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";

// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
const DashBoardHomeCO = () => {
  const [selectedHeading, setSelectedHeading] = useState("allUsers");
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [lockers, setLockers] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchPropertiesLockersAndParkingSpots = () => {
      axios.get("http://hortzcloud.com:3000/api/v1/pp", {
        headers: {
          'authorization': `Bearer ${token}`,
        }
      })
      .then((propertiesResponse) => {
        setProperties(propertiesResponse.data.filter(property => property.companyid === userData.cmcId));
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  
      axios.get(`http://hortzcloud.com:3000/api/v1/l/company/${userData.cmcId}`, {
        headers: {
          'authorization': `Bearer ${token}`,
        }
      })
      .then((lockersResponse) => {
        setLockers(lockersResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching lockers:", error);
      });
  
      axios.get("http://hortzcloud.com:3000/api/v1/l/parking/spots", {
        headers: {
          'authorization': `Bearer ${token}`,
        }
      })
      .then((parkingSpotsResponse) => {
        setParkingSpots(parkingSpotsResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching parking spots:", error);
      });
    };
  
    fetchPropertiesLockersAndParkingSpots();
  }, [token, userData.cmcId]);
  

  const addPropertyToState = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
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

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="dashboard__home">
      <div className="sidedrawer__open"></div>
      <button className="patty__button" onClick={toggleDrawer}>
        <RxHamburgerMenu size={40} />
      </button>

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

      <PageHeaderTable />
      <div className="container flex flex-col items-center px-24">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="table-container">
            {/* Payment Due table */}
            <div className="small-table">
  <TableCard className={"gap-4"} style={{ width: "100%" }}>
    <div className="flex justify-between items-center">
      <div className="table-title">Payment Due</div>
      <ArrowButton to="/payment-due"> {/* Relative path */}
      </ArrowButton>
    </div>
    <div className="payment-due">
      <div className="payment-amount">1800$</div>
    </div>
  </TableCard>
</div>
 {/* Upcoming Payments */}
 <div className="small-table">
 <TableCard className={"gap-4"} style={{ width: "100%" }}>
  <div className="flex justify-between items-center">
  <div className="table-title">Upcoming Payment</div>
  <ArrowButton to="/Upcoming Payments"> {/* Relative path */}
  </ArrowButton>
  </div>
  <div className="upcoming-payments">
  <div className="upcoming-payments">1800$</div>
  </div>
  </TableCard>
</div>
 {/* Reservations */}
 <div className="small-table">
  <TableCard className={"gap-4"} style={{ width: "100%" }}>
  <div className="flex justify-between items-center">
  <div className="table-title">Reservations</div>
  <ArrowButton to="/Reservations"> {/* Relative path */}
  </ArrowButton>
  </div>
  <div className="reservations">
  <div className="reservations">0</div>
  </div>
  </TableCard>
</div>

            {/* Total Units */}
            <div className="small-table">
  <TableCard className={"gap-4"} style={{ width: "100%" }}>
  <div className="flex justify-between items-center">
  <div className="table-title">Total Units</div>
  <ArrowButton to="/Total-units"> {/* Relative path */}
  </ArrowButton>
  </div>
  <div className="total-units">
  <div className="total-units">300</div>
  </div>
  </TableCard>
</div>
 </div>
<div className="table-space"></div>
<TableCard className={"gap-4"} style={{ marginBottom: "48px" }}>
            <TableCardHeader title={"My Properties 🏢"}>
              <div className="flex items-center gap-4">
                <Link className="underline" to={""}>
                  See more
                </Link>

                <Modal>
                  <ModalToggler>
                    <AddButton>Add Property</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Property"
                    description="Add the information associated to the property to add it to your account"
                    onExit={() => console.log("exit")}
                  >
                    <PropertyAddForm onAddProperty={addPropertyToState}/>
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
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
                        <GoArrowUpRight size={24} />
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
                <Table>
                  <TableHeader>
                    <th></th>
                    <th>Property Name</th>
                    <th>Property Address</th>
                    <th>Unit Count</th>
                    <th>Parking Count</th>
                    <th>Locker Count</th>
                  </TableHeader>
                  <TableRow>
                    <td>
                      <GoArrowUpRight size={24} />
                    </td>
                    <td>Property Name</td>
                    <td>Property Address</td>
                    <td>Unit Count</td>
                    <td>Parking Count</td>
                    <td>Locker Count</td>
                  </TableRow>
                </Table>
              )}
            </div>
          </TableCard>

          <div className="table-space"></div>

          <TableCard className={"gap-4"}style={{ marginBottom: "48px"}}>
            <TableCardHeader title={"Parking Units 🚗"}>
              <div className="flex items-center gap-4">
                <Modal>
                  <ModalContent
                    title="Want to add a Parking Unit"
                    description="Add the information associated with the parking unit to add it to your account"
                    onExit={() => console.log("exit")}
                  >
                    {/* Add Parking Unit Form */}
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            <div>
              <Table>
                <TableHeader>
        <th>Parking Spot ID</th>
        <th>Property ID</th>
        <th>Company ID</th>
      </TableHeader>
      {parkingSpots.map((spot) => (
        <TableRow key={spot.parking_spot_id}>
          <td>{spot.parking_spot_id}</td>
          <td>{spot.property_id}</td>
          <td>{spot.company_id}</td>
        </TableRow>
        ))}
              </Table>
            </div>
          </TableCard>

          <div className="table-space"></div>

          <TableCard className={"gap-4"} style={{ marginBottom: "48px" }}>
            <TableCardHeader title={"Locker Units 🔒"}>
              <div className="flex items-center gap-4">
                <Modal>
                  <ModalContent
                    title="Want to add a Locker Unit"
                    description="Add the information associated with the locker unit to add it to your account"
                    onExit={() => console.log("exit")}
                  >
                    {/* Add Locker Unit Form */}
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            <div>
              <Table>
                <TableHeader>
                  <th>Locker ID</th>
                  <th>User ID</th>
                
                </TableHeader>
                {lockers.map((locker) => (
             <TableRow key={locker.locker_id}>
            <td>{locker.locker_id}</td>
           <td>{locker.user_id}</td>
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

export default DashBoardHomeCO;
