import React from "react";

import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import PropTypes from "prop-types";

export default function ReservationDatePicker({
  reservations,
  currentFacility,
  handleDateChange,
}) {
  const [selected, setSelected] = React.useState();
  const [disabledDays, setDisabledDays] = React.useState([]);
  console.log(reservations);

  React.useEffect(() => {
    console.log("Reservations:", reservations);
    console.log("Current Facility:", currentFacility);
    setDisabledDays(
      reservations
        .filter((reservation) => reservation.facility_id == currentFacility)
        .map((reservation) => new Date(reservation.date))
    );
  }, [reservations, currentFacility]);

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={(date) => {
        console.log(date);
        setSelected(date);
        handleDateChange(date);
      }}
      disabled={disabledDays}
    />
  );
}

ReservationDatePicker.propTypes = {
  currentFacility: PropTypes.int,
  reservations: PropTypes.array,
  handleDateChange: PropTypes.func,
};
