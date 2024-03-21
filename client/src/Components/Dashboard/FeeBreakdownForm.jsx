// used in the dashboards of CO and CR to display contact
// information of the company
import { useState } from "react";
import Label from "../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../Modals/Modal.jsx";
import { object, string } from "yup";

export default function FeeBreakdownForm() {
  const { toggle } = useModal();
  const [userRole] = useState(""); // State for selected user role

  const dummyCondoFee = 100;

  let propertySchema = object({
    propertyName: string().required("A property name is required"),
    propertyAddress: string().required("A property address is required"),
  });

  const formik = useFormik({
    initialValues: {
      propertyName: "",
      propertyAddress: "",
    },
    validationSchema: propertySchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    if (!userRole) {
      // If no radio input is selected, show the error message and prevent form submission
      return;
    }
    values.userRole = userRole; // Assign selected user role to form values
    toggle(); // Close the form
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="propertyName">Parking Fee</Label>
          <h2>{dummyCondoFee * 0.7}</h2>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="propertyAddress">Locker Fee</Label>
          <h2>{dummyCondoFee * 0.3}</h2>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="userRole">Other Condo Service Fees</Label>
          <h2>0</h2>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="propertyName">Total Condo Fee</Label>
          <h2>{dummyCondoFee}</h2>
        </div>
      </form>
    </>
  );
}
