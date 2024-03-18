// used in the dashboards of CO and CR to display contact
// information of the company
import React, { useState } from "react";
import Label from "../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../Modals/Modal.jsx";
import { object, string } from "yup";

export default function UserRegistrationForm() {
  const { toggle } = useModal();
  const [userRole, setUserRole] = useState(""); // State for selected user role
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to control button enable/disable
  const [showError, setShowError] = useState(false); // State to control visibility of error message

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

  const errorMessage = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return (
        <span className="text-red-400 text-sm">{formik.errors[fieldName]}</span>
      );
    }
    return null;
  };

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
    setIsButtonEnabled(true); // Enable the button when a radio input is selected
    setShowError(false); // Hide the error message when a radio input is selected
  };

  const handleSubmit = (values) => {
    if (!userRole) {
      // If no radio input is selected, show the error message and prevent form submission
      setShowError(true);
      return;
    }
    values.userRole = userRole; // Assign selected user role to form values
    toggle(); // Close the form
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {showError && (
          <h4 className="flex flex-row text-red-500 text-sm place-items-center justify-center">
            Please select a user role
          </h4>
        )}
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="propertyName">Company Email</Label>
          <h2>Company@email.com</h2>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="propertyAddress">Company Phone</Label>
          <h2>438-123-4567</h2>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="userRole">Company Office Location</Label>
          <h2>Some office location ...</h2>
        </div>
      </form>
    </>
  );
}

// used in the dashboards of CO and CR to display contact
// information of the company
import React, { useState } from "react";
import Label from "../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../Modals/Modal.jsx";
import { object, string } from "yup";

export default function UserRegistrationForm() {
  const { toggle } = useModal();
  const [userRole, setUserRole] = useState(""); // State for selected user role
  const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to control button enable/disable
  const [showError, setShowError] = useState(false); // State to control visibility of error message

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

  const errorMessage = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return (
        <span className="text-red-400 text-sm">{formik.errors[fieldName]}</span>
      );
    }
    return null;
  };

  const handleUserRoleChange = (event) => {
    setUserRole(event.target.value);
    setIsButtonEnabled(true); // Enable the button when a radio input is selected
    setShowError(false); // Hide the error message when a radio input is selected
  };

  const handleSubmit = (values) => {
    if (!userRole) {
      // If no radio input is selected, show the error message and prevent form submission
      setShowError(true);
      return;
    }
    values.userRole = userRole; // Assign selected user role to form values
    toggle(); // Close the form
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        {showError && (
          <h4 className="flex flex-row text-red-500 text-sm place-items-center justify-center">
            Please select a user role
          </h4>
        )}
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="propertyName">Company Email</Label>
          <h2>Company@email.com</h2>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="propertyAddress">Company Phone</Label>
          <h2>438-123-4567</h2>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit place-items-center">
          <Label htmlFor="userRole">Company Office Location</Label>
          <h2>Some office location ...</h2>
        </div>
      </form>
    </>
  );
}