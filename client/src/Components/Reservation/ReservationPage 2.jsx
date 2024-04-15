import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import "../Dashboard/DashBoardHome.css";

import TableCard from "../Cards/Tables/TableCard.jsx";
import TableCardHeader from "../Cards/Tables/TableCardHeader.jsx";
import Table from "../Tables/Table.jsx";
import TableHeader from "../Tables/TableHeader.jsx";
import TableRow from "../Tables/TableRow.jsx";
import ModalToggler from "../Modals/ModalToggler.jsx";
import AddButton from "../Buttons/AddButton.jsx";
import { Button, IconButton } from "@chakra-ui/react";

import ModalContent from "../Modals/ModalContent.jsx";
import Modal from "../Modals/Modal.jsx";

import FacilityService from "../../service/facility/facility.service.js";
import ReservationService from "../../service/reservation/reservation.service.js";
import ReservationCalendar from "./ReservationCalendar.jsx";
import SideNav from "../SideNav/SideNav.jsx";
import ReservationAddForm from "./ReservationAddForm.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import { toast } from "react-toastify";

export default function ReservationPage() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [reservations, setReservations] = useState([]); // Use this to handle reservation data

  const userData = JSON.parse(localStorage.getItem("userData"));

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const facilitiesResponse = await FacilityService.getFacilityByUserId(
          userData.userId
        );

        const reservationsResponse =
          await ReservationService.getReservationByUserId(userData.userId);

        let tempEvents = reservationsResponse.data.map((reservation) => {
          const facility = facilitiesResponse.data.find(
            (facility) => facility.facility_id === reservation.facility_id
          );

          return {
            id: reservation.reservation_id,
            title: facility ? facility.name : "Unknown Facility",
            start: new Date(reservation.date),
            end: new Date(reservation.date),
          };
        });

        setReservations(tempEvents);
      } catch (err) {
        console.error("Error in fetching data:", err);
      }
    }

    fetchData();
  }, []);

  const handleReservationDelete = async (reservationId) => {
    ReservationService.deleteReservation(reservationId)
      .then((res) => {
        toast.success("Reservation deleted successfully");
        setReservations(
          reservations.filter((reservation) => reservation.id !== reservationId)
        );
      })
      .catch((err) => {
        console.error("Error deleting reservation:", err);
        toast.error("Error deleting reservation");
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

      <SideNav isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      <div className="container flex flex-col items-start px-24 pb-16">
        <div className="flex flex-col justify-center items-center w-full">
          {reservations ? (
            <div className="w-full">
              <TableCard className={"gap-4 mb-12"}>
                <TableCardHeader title={"Reservation Calendar 📅"}>
                  <Modal>
                    <ModalToggler>
                      <AddButton>Add Reservation</AddButton>
                    </ModalToggler>
                    <ModalContent
                      title="Want to add a Reservation?"
                      description="Add the information associated to the reservation to add it to your account"
                    >
                      {/* Assuming a form component exists for adding properties */}
                      <ReservationAddForm />
                    </ModalContent>
                  </Modal>
                </TableCardHeader>
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
                    <th>Actions</th>
                  </TableHeader>

                  {reservations.map((reservation, index) => (
                    <TableRow key={index}>
                      <td>{reservation.title}</td>
                      <td>{reservation.start.toDateString()}</td>
                      <td>
                        <Button
                          type="button"
                          colorScheme="red"
                          onClick={() =>
                            handleReservationDelete(reservation.id)
                          }
                        >
                          Delete
                        </Button>
                      </td>
                    </TableRow>
                  ))}
                </Table>
              </TableCard>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
