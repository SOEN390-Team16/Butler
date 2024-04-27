import AddButton from "../Buttons/AddButton.jsx";
import { useFormik } from "formik";
import Label from "../Forms/Label.jsx";
import { useModal } from "../Modals/Modal.jsx";
import { number, object, string } from "yup";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import FacilityService from "../../service/facility/facility.service.js";
import { useEffect, useState } from "react";
import PropertyService from "../../service/property/property.service.js";
import ReservationService from "../../service/reservation/reservation.service.js";
import { Select } from "@chakra-ui/react";

import ReservationDatePicker from "./ReservationDatePicker.jsx";

export default function ReservationAddForm() {
  const { toggle } = useModal();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [properties, setProperties] = useState([]); // Use this to handle property data
  const [property, setProperty] = useState(null); // Use this to handle property data
  const [facilities, setFacilities] = useState([]); // Use this to handle facility data
  const [facility, setFacility] = useState(); // Use this to handle facility data
  const [reservations, setReservations] = useState([]); // Use this to handle reservation data

  useEffect(() => {
    PropertyService.getPropertiesByUserId(userData.userId)
      .then((res) => {
        setProperties(res.data);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
      });
  }, []);

  let facilitySchema = object({
    facility_id: number().required("A facility id is required"),
    date: string().required("A reservation date is required"),
  });

  const formik = useFormik({
    initialValues: {
      facility_id: "",
      date: "",
    },
    validationSchema: facilitySchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const errorMessage = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return (
        <span className="text-red-400 text-sm">{formik.errors[fieldName]}</span>
      );
    }
    return null;
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);

    const reservation = {
      user_id: userData.userId,
      facility_id: values.facility_id,
      date: values.date, // Ensure date is formatted as 'YYYY-MM-DD'
    };

    ReservationService.addReservation(reservation)
      .then((res) => {
        toast.success("Reservation added successfully");
        toggle();
        formik.resetForm();
      })
      .catch((err) => {
        console.error("Error adding reservation:", err);
        toast.error("Failed to add reservation");
      });
  };

  const handleDateChange = (value) => {
    formik.setFieldValue("date", value);
  };

  const handleFacilityChange = (value) => {
    setFacility(value);
    formik.setFieldValue("facility_id", value);
  };

  const handlePropertyChange = async (value) => {
    if (!value) return;

    setProperty(value);
    try {
      const facilitiesResponse =
        await FacilityService.getFacilityByPropertyId(value);
      setFacilities(facilitiesResponse.data);

      const reservationsResponse =
        await ReservationService.getReservationByPropertyId(value);

      setReservations(reservationsResponse.data);
    } catch (err) {
      console.error("Error in fetching data:", err);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
            <Label htmlFor="facility_id">Property</Label>
            <Select
              bg={"white"}
              placeholder="Select Property"
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
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
            <Label htmlFor="facility_id">Facility ID</Label>
            {errorMessage("facility_id")}
            <Select
              bg={"white"}
              placeholder="Select Facility"
              onChange={(e) => handleFacilityChange(e.target.value)}
              id="facility_id"
              name="facility_id"
            >
              {facilities.map((facility) => (
                <option key={facility.facility_id} value={facility.facility_id}>
                  {facility.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {property && (
          <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
            <Label htmlFor="date">Reservation Date</Label>
            {errorMessage("date")}
            <ReservationDatePicker
              reservations={reservations}
              currentFacility={facility}
              handleDateChange={handleDateChange}
            />
          </div>
        )}
      </form>
      <AddButton onClick={formik.submitForm}>Add Reservation</AddButton>
    </>
  );
}

ReservationAddForm.propTypes = {
  onAddReservation: PropTypes.func.isRequired,
};
