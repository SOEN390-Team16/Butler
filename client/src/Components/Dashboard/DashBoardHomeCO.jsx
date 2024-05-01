import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./DashBoardHome.css";
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
import FeeBreakdownForm from "./FeeBreakdownForm.jsx";
import axios from "axios";
import MakePaymentButton from "../Buttons/MakePaymentButton.jsx";
import FeeBreakdownButton from "../Buttons/FeeBreakdownButton.jsx";
import SideNav from "../SideNav/SideNav.jsx";
import { IconButton } from "@chakra-ui/react";

// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
const DashBoardHomeCO = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [lockers, setLockers] = useState([]);
  const [condoUnit, setCondoUnit] = useState([]);
  const [condos, setCondos] = useState([]);
  const [condoCurrentPage, setCondoCurrentPage] = useState(1);
  const [condosPerPage, setCondosPerPage] = useState(5);
  const [lockerCurrentPage, setLockerCurrentPage] = useState(1);
  const [lockersPerPage, setLockersPerPage] = useState(5);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userDataArray = userData ? Object.entries(userData) : [];
  const userID = userDataArray.length > 1 ? userDataArray[0][1] : "";
  const token = localStorage.getItem("token");

  // Fetch parking spots data
  const fetchParkingSpots = () => {
    axios
      .get(`http://hortzcloud.com:3000/api/v1/aps/getByU/${userID}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((parkingSpotsResponse) => {
        setParkingSpots(parkingSpotsResponse.data);
        console.log("parking:");
        console.log(parkingSpots);
      })
      .catch((error) => {
        console.error("Error fetching parking spots:", error);
      });
  };

  // Fetch lockers data
  const fetchLockers = () => {
    axios
      .get(`http://hortzcloud.com:3000/api/v1/al/getByU/${userID}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((lockersResponse) => {
        setLockers(lockersResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching lockers:", error);
      });
  };

  const fetchCondos = () => {
    axios
      .get(`http://hortzcloud.com:3000/api/v1/cu/getByU/${userData.userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res fetch condos:", res.data);
        setCondos(res.data);
      })
      .catch((error) => {
        console.error("Error fetching condo units:", error);
      });
  };

  const fetchCondo = () => {
    axios
      .get(`http://hortzcloud.com:3000/api/v1/cu/${19}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCondoUnit(res.data);
      })
      .catch((error) => {
        console.error("Error fetching condo unit:", error);
      });
  };

  useEffect(() => {
    fetchParkingSpots();
    fetchLockers();
    fetchCondos();
    fetchCondo();
  }, [token, userID]);

  const addPropertyToState = (newProperty) => {
    setProperties((prevProperties) => [...prevProperties, newProperty]);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  // Calculate the currently displayed condos
  const indexOfLastCondo = condoCurrentPage * condosPerPage;
  const indexOfFirstCondo = indexOfLastCondo - condosPerPage;
  const currentCondos = condos.slice(
    indexOfFirstCondo,
    indexOfLastCondo
  );

  // change page
  const paginateCondos = (pageNumber) => setCondoCurrentPage(pageNumber);

  // change number of rows per page
  const handleCondoRowsChange = (event) => {
    setCondosPerPage(Number(event.target.value));
    setCondoCurrentPage(1); // reset to the first page to avoid index range issues
  };

  // Calculate the currently displayed lockers
  const indexOfLastLocker = lockerCurrentPage * lockersPerPage;
  const indexOfFirstLocker = indexOfLastLocker - lockersPerPage;
  const currentLockers = lockers.slice(
    indexOfFirstLocker,
    indexOfLastLocker
  );

  // change page
  const paginateLockers = (pageNumber) => setLockerCurrentPage(pageNumber);

  // change number of rows per page
  const handleLockerRowsChange = (event) => {
    setLockersPerPage(Number(event.target.value));
    setLockerCurrentPage(1); // reset to the first page to avoid index range issues
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

      <PageHeaderTable />
      <div className="container flex flex-col items-center px-24">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="table-container">
            {/* Payment Due table */}
            <div className="small-table">
              <TableCard className={"gap-4"} style={{ width: "100%" }}>
                <div className="flex justify-between items-center">
                  <div className="table-title">Payment Due</div>
                  <ArrowButton to="/payment-due">
                    {" "}
                    {/* Relative path */}
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
                  <ArrowButton to="/Upcoming Payments">
                    {" "}
                    {/* Relative path */}
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
                  <ArrowButton to="/Reservations">
                    {" "}
                    {/* Relative path */}
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
                  <ArrowButton to="/Total-units">
                    {" "}
                    {/* Relative path */}
                  </ArrowButton>
                </div>
                <div className="total-units">
                  <div className="total-units">300</div>
                </div>
              </TableCard>
            </div>
          </div>

          {/* condo units table */}
          <div
          className="flex flex-col justify-center items-center w-full"
          style={{ paddingTop: 48, paddingBottom: 0 }}
          >
            {/* Properties card goes here */}
            <TableCard className={"gap-4"}>
              <TableCardHeader title={"My Condo Units"}></TableCardHeader>
              {/* Body of condo card */}
              <div>
              {condos.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th>Condo ID</th>
                    <th>Condo Number</th>
                    <th>Condo Size</th>
                    <th>Occupant Type</th>
                  </TableHeader>
                  {currentCondos.map((condo, index) => (
                    <TableRow key={index}>
                      <td>{condo.condoid}</td>
                      <td>{condo.condo_number}</td>
                      <td>{condo.size || 'N/A'}</td>
                      <td>Condo Owner</td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>You currently have no condo units associated to your account!</h3>
                </div>
              )}
              </div>
              <div className="flex justify-between items-center p-4">
                <button
                  onClick={() => paginateCondos(condoCurrentPage - 1)}
                  disabled={condoCurrentPage === 1}
                  className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Previous
                </button>
                <span>{`Showing ${indexOfFirstCondo + 1} to ${indexOfLastCondo > condos.length ? condos.length : indexOfLastCondo} of ${condos.length}`}</span>
                <button
                  onClick={() => paginateCondos(condoCurrentPage + 1)}
                  disabled={indexOfLastCondo >= condos.length}
                  className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-300"
                >
                  Next
                </button>
              </div>
              <div className="p-4">
                <label className="pr-2">Rows per page:</label>
                <select
                  onChange={handleCondoRowsChange}
                  className="p-2 rounded bg-white border border-gray-300"
                >
                  <option value="5" selected>5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
              </div>
            </TableCard>
          </div>

          <div className="table-space"></div>

          <TableCard className={"gap-4"} style={{ marginBottom: "48px" }}>
            <TableCardHeader title={"Parking Units 🚗"}></TableCardHeader>
            <div>
              <Table>
                <TableHeader>
                  <th>Parking Spot ID</th>
                  <th>User ID</th>
                  <th>Property ID</th>
                </TableHeader>
                {parkingSpots.map((spot) => (
                  <TableRow key={spot.parkingid}>
                    <td>{spot.parkingid}</td>
                    <td>{userID}</td>
                    <td>{spot.property_id}</td>
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
                    <td>{lockers[0].lockerid}</td>
                    <td>{userID}</td>
                  </TableRow>
                ))}
              </Table>
            </div>
          </TableCard>
        </div>
        <div className="table-space"></div>
        <TableCard className={"gap-4"} style={{ marginBottom: "48px" }}>
          <TableCardHeader title={"Condo Fees"}>
            <div className="flex items-center gap-4">
              {/* <Link className="underline" to={""}>
                See more
              </Link> */}

              <Modal>
                {/* <ModalToggler>
                  <AddButton>Add Property</AddButton>
                </ModalToggler> */}
                <ModalContent
                  title="Want to add a Property"
                  description="Add the information associated to the property to add it to your account"
                  onExit={() => console.log("exit")}
                >
                  <PropertyAddForm onAddProperty={addPropertyToState} />
                </ModalContent>
              </Modal>
            </div>
          </TableCardHeader>
          <div>
            {properties.length > 0 ? (
              <Table>
                <TableHeader>
                  <th></th>
                  <th>Condo ID</th>
                  <th>Condo Fee</th>
                  <th>Breakdown</th>
                  <th>Make Payment</th>
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
                  </TableRow>
                ))}
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <th></th>
                  <th>Condo ID</th>
                  <th>Total Condo Fee</th>
                  <th></th>
                  <th></th>
                </TableHeader>
                <TableRow>
                  <td>
                    <GoArrowUpRight size={24} />
                  </td>
                  <td>{condoUnit.condoid}</td>
                  <td>100</td>
                  <td>
                    <Modal>
                      <ModalToggler>
                        <FeeBreakdownButton>
                          View Fee Breakdown
                        </FeeBreakdownButton>
                      </ModalToggler>
                      <ModalContent
                        title="Condo Fee Breakdown"
                        description="This Section Displays the Breakdown of Your Total Condo Fees."
                        onExit={() => console.log("exit")}
                      >
                        <FeeBreakdownForm />
                      </ModalContent>
                    </Modal>
                  </td>
                  <td>
                    <Modal>
                      <MakePaymentButton>Make Payment</MakePaymentButton>
                      <ModalContent
                        title="Want to add a Property"
                        description="Add the information associated to the property to add it to your account"
                        onExit={() => console.log("exit")}
                      >
                        <PropertyAddForm onAddProperty={addPropertyToState} />
                      </ModalContent>
                    </Modal>
                  </td>
                </TableRow>
              </Table>
            )}
          </div>
        </TableCard>
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

export default DashBoardHomeCO;
