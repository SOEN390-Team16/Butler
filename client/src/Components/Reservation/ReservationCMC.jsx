import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "../Dashboard/DashBoardHome.css";

import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import { Link } from "react-router-dom";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import ModalToggler from "../Modals/ModalToggler.jsx";
import AddButton from "../Buttons/AddButton.jsx";
import { IconButton, Select } from "@chakra-ui/react";

import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";

import SideNavCMC from "../SideNav/SideNavCMC.jsx";
import FacilityService from "../../service/facility/facility.service.js";
import PropertyService from "../../service/property/property.service.js";
import ReservationService from "../../service/reservation/reservation.service.js";
import ReservationCalendar from "./ReservationCalendar.jsx";
import FacilityAddForm from "./FacilityAddForm.jsx";

export default function ReservationCMC() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [properties, setProperties] = useState([]); // Use this to handle property data
  const [property, setProperty] = useState(null); // Use this to handle property data
  const [facilities, setFacilities] = useState([]); // Use this to handle facility data
  const [reservations, setReservations] = useState([]); // Use this to handle reservation data

  const userData = JSON.parse(localStorage.getItem("userData"));

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const checkReservationToday = async (facilityId) => {
    const status = await FacilityService.checkFacilityStatus(facilityId);
    console.log(
      "Facility Status:",
      status.data.hasReservations ? "Reserved" : "Available"
    );
    return status.data.hasReservations ? "Reserved" : "Available";
  };

  useEffect(() => {
    PropertyService.getPropertiesByCompanyId(userData.cmcId)
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
      });
  }, [userData.cmcId]);

  const handlePropertyChange = async (value) => {
    if (!value) return;

    setProperty(value);
    try {
      const facilitiesResponse =
        await FacilityService.getFacilityByPropertyId(value);
      setFacilities(facilitiesResponse.data);

      facilitiesResponse.data.forEach(async (facility) => {
        const status = await checkReservationToday(facility.facility_id);
        setFacilities((prevFacilities) =>
          prevFacilities.map((f) =>
            f.facility_id === facility.facility_id ? { ...f, status } : f
          )
        );
      });

      const reservationsResponse =
        await ReservationService.getReservationByPropertyId(value);

      let tempEvents = reservationsResponse.data.map((reservation) => {
        const facility = facilitiesResponse.data.find(
          (facility) => facility.facility_id === reservation.facility_id
        );

        return {
          title: facility ? facility.name : "Unknown Facility",
          start: new Date(reservation.date),
          end: new Date(reservation.date),
        };
      });

      setReservations(tempEvents);
    } catch (err) {
      console.error("Error in fetching data:", err);
    }
  };

  useEffect(() => {
    // Debugging output to ensure data is loaded correctly
  }, [reservations]);

  const addFacilityToState = (newFacility) => {
    setFacilities((prevFacilities) => [...prevFacilities, newFacility]);
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

      <div className="container flex flex-col items-start px-24 pb-16">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-row w-full justify-start items-center gap-4 mb-4">
            <p className="font-semibold text-xl w-fit">
              Select the property you would like to see:
            </p>
            <Select
              size={"lg"}
              variant={"filled"}
              bg={"white"}
              placeholder="Select option"
              shadow={"md"}
              w={64}
              value={property}
              onChange={(e) => handlePropertyChange(e.target.value)}
            >
              {properties.map((property, index) => (
                <option key={index} value={property.property_id}>
                  {property.property_name}
                </option>
              ))}
            </Select>
          </div>

          {property && (
            <div className="w-full">
              <TableCard className={"gap-4 mb-12"}>
                <TableCardHeader title={"My Facilities 🏢"}>
                  <div className="flex items-center gap-4">
                    <Link className="underline" to={""}>
                      See more
                    </Link>
                    <Modal>
                      <ModalToggler>
                        <AddButton>Add Facility</AddButton>
                      </ModalToggler>
                      <ModalContent
                        title="Want to add a Facility?"
                        description="Add the information associated to the facility to add it to your account"
                      >
                        {/* Assuming a form component exists for adding properties */}
                        <FacilityAddForm
                          onAddFacility={addFacilityToState}
                          propertyId={property}
                        />
                      </ModalContent>
                    </Modal>
                  </div>
                </TableCardHeader>
                <div>
                  {facilities.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <th>Facility Name</th>
                        <th>Facility Description</th>
                        <th>Status</th>
                      </TableHeader>
                      {facilities.map((facility, index) => (
                        <TableRow key={index}>
                          <td>{facility.name}</td>
                          <td>{facility.description}</td>
                          <td>{facility.status}</td>
                        </TableRow>
                      ))}
                    </Table>
                  ) : (
                    <h3 className="text-black text-base font-medium font-inter">
                      Click on the add property button to start!
                    </h3>
                  )}
                </div>
              </TableCard>

              <TableCard className={"gap-4 mb-12"}>
                <TableCardHeader
                  title={"Reservation Calendar 📅"}
                ></TableCardHeader>
                <ReservationCalendar events={reservations} />
              </TableCard>

              <TableCard className={"gap-4 mb-12"}>
                <TableCardHeader
                  title={"Current Reservations"}
                ></TableCardHeader>
                <Table>
                  <TableHeader>
                    <th>Facility Name</th>
                    <th>Reservation Date</th>
                  </TableHeader>

                  {reservations
                    .sort((a, b) => new Date(a.start) - new Date(b.start))
                    .map((reservation, index) => (
                      <TableRow key={index}>
                        <td>{reservation.title}</td>
                        <td>{new Date(reservation.start).toDateString()}</td>
                      </TableRow>
                    ))}
                </Table>
              </TableCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
