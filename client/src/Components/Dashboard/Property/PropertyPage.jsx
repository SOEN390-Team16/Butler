// React imports
import { useEffect, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";

// Axios for API calls
import axios from "axios";

// React Icons
import { RxHamburgerMenu } from "react-icons/rx";
import { GoArrowUpRight } from "react-icons/go";
import { IoArrowBack } from "react-icons/io5";

// Components
import SideDrawerCMC from "../SideDrawerCMC";
import TableCard from "../../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../../Cards/Tables/TableCardHeader.jsx";
import Table from "../../Tables/Table.jsx";
import TableHeader from "../../Tables/TableHeader.jsx";
import TableRow from "../../Tables/TableRow.jsx";
import ModalToggler from "../../Modals/ModalToggler.jsx";
import ModalContent from "../../Modals/ModalContent.jsx";
import Modal from "../../Modals/Modal.jsx";

// Buttons
import AddButton from "../../Buttons/AddButton.jsx";

// Assets
import image from "../../../assets/condo.jpeg";

// Styles
import "../DashBoardHome.css";
import CondoAddForm from "./CondoAddForm.jsx";

// Dashboard home is the home component where clients will enter
// It will host the side drawer, profile information, condo information all that
export default function PropertyPage() {
  const { id } = useParams();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [property, setProperty] = useState();
  const [condoUnits, setCondoUnits] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProperty = () => {
      axios
        .get(`http://hortzcloud.com:3000/api/v1/pp/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProperty(res.data);
          console.log("Property:", res.data);
        })
        .catch((err) => {
          console.error("Error fetching property:", err);
        });
    };

    const fetchCondoUnits = () => {
      axios
        .get(`http://hortzcloud.com:3000/api/v1/cu`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCondoUnits(
            res.data.filter(
              (condoUnit) => condoUnit.companyid === userData.cmcId
            )
          );
          console.log("Condo Units:", condoUnits);
        })
        .catch((err) => {
          console.error("Error fetching condo units:", err);
        });
    };

    fetchProperty();
    fetchCondoUnits();
  }, [token]);

  const addPropertyToState = (newProperty) => {
    setProperty((prevProperty) => [...prevProperty, newProperty]);
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

  if (!token) {
    Navigate("/");
  }

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard__home">
      <div className="sidedrawer__open"></div>
      <button className="patty__button" onClick={toggleDrawer}>
        <RxHamburgerMenu size={40} />
      </button>

      {/* The Side drawer is whats being opened for main navigation */}
      <SideDrawerCMC
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
      </SideDrawerCMC>
      {/* Your main content goes here */}
      <div className="container flex flex-col items-center px-24 pb-16 gap-12">
        {/* Property Detail Card */}
        <div className="flex flex-row justify-between w-full gap-8 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
          <div className="flex flex-1 flex-col p-8">
            {/* Card Title */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <Link to={"/DashboardHomeCMC"}>
                <IoArrowBack
                  size={30}
                  className="text-gray-700 hover:text-gray-900"
                />
              </Link>
              <h1 className="text-xl font-semibold text-gray-800">
                {property.property_name} details
              </h1>
              {/* Ghost Icon for alignment */}
              <IoArrowBack
                size={30}
                className="text-gray-700 hover:text-gray-900"
                color="transparent"
              />
            </div>

            <div className="flex flex-1 px-8 flex-col justify-around font-medium text-gray-700">
              <p className="flex justify-between">
                Property Name:{" "}
                <span className="font-bold">{property.property_name}</span>
              </p>
              <p className="flex justify-between">
                Address: <span className="font-bold">{property.address}</span>
              </p>
              <p className="flex justify-between">
                # Condo Unit:{" "}
                <span className="font-bold">{property.unit_count}</span>
              </p>
              <p className="flex justify-between">
                # Parking Units:{" "}
                <span className="font-bold">{property.parking_count}</span>
              </p>
              <p className="flex justify-between">
                # Locker Units:{" "}
                <span className="font-bold">{property.locker_count}</span>
              </p>
            </div>
          </div>
          <img src={image} alt="condo" className="object-cover w-[50%]" />
        </div>

        {/* Condo Units Table */}
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Condo Units 🏢"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Condo Units</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Condo Unit?"
                    description="Add the information associated to the condo unit to add it to your account"
                  >
                    <CondoAddForm
                      onAddProperty={addPropertyToState}
                      propertyId={id}
                    />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              {condoUnits.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th></th>
                    <th>Unit Number</th>
                    <th>Unit Size</th>
                    <th>Unit Occupant Type</th>
                    <th>Unit Total Fees</th>
                  </TableHeader>
                  {condoUnits.map((condoUnit, index) => (
                    <TableRow key={index}>
                      <td>
                        <Link to={``}>
                          <GoArrowUpRight size={24} />
                        </Link>
                      </td>
                      <td>{condoUnit.number}</td>
                      <td>{condoUnit.size}</td>
                      <td>{condoUnit.occupantType}</td>
                      <td>{condoUnit.totalFees}</td>
                    </TableRow>
                  ))}
                </Table>
              ) : (
                <div className={"text-black text-base font-medium font-inter"}>
                  <h3>Add a condo unit to see it here!</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>

        {/* Parking Units */}
        {/* Condo Units Table */}
        <div className="flex flex-col justify-center items-center w-full">
          {/* Properties card goes here */}
          <TableCard className={"gap-4"}>
            <TableCardHeader title={"Parking Units 🚘"}>
              <div className="flex items-center gap-4">
                {/* See more button should appear when a certain threshold is exceeded */}
                <Link className="underline" to={""}>
                  See more
                </Link>

                {/* This is the modal that display once a button is interacted with */}
                <Modal>
                  <ModalToggler>
                    <AddButton>Add Parking Units</AddButton>
                  </ModalToggler>
                  <ModalContent
                    title="Want to add a Parking Unit?"
                    description="Add the information associated to the parking unit to add it to your account"
                  >
                    <CondoAddForm
                      onAddProperty={addPropertyToState}
                      propertyId={id}
                    />
                  </ModalContent>
                </Modal>
              </div>
            </TableCardHeader>
            {/* Body of properties card */}
            <div>
              {condoUnits.length > 0 ? (
                <Table>
                  <TableHeader>
                    <th></th>
                    <th>Property Name</th>
                    <th>Property Address</th>
                    <th>Unit Count</th>
                    <th>Parking Count</th>
                    <th>Locker Count</th>
                  </TableHeader>
                  {condoUnits.map((property, index) => (
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
                  <h3>Add a condo unit to see it here!</h3>
                </div>
              )}
            </div>
          </TableCard>
        </div>
      </div>
    </div>
  );
}
