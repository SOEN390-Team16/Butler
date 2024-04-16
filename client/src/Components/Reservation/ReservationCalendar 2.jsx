import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReservationService from "../../service/reservation/reservation.service";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export default function ReservationCalendar({ events }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    setReservations(events);
    console.log("Events:", events);
  }, [events]);

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={reservations}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
