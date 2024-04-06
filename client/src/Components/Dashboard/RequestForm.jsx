import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup"; // Import yup for form validation
import Input from "../Forms/Input.jsx";
import Label from "../Forms/Label.jsx";
import SubmitRequestButton from "../Buttons/SubmitRequestButton.jsx";

const RequestForm = () => {
  // Define yup validation schema
  const requestSchema = Yup.object({
    serviceRequest: Yup.string().required("A service request is required"),
    requestType: Yup.string().required("A request type is required"),
    requestInformation: Yup.string().required("Request information is required"),
  });

  // Initialize formik form
  const formik = useFormik({
    initialValues: {
      serviceRequest: "",
      requestType: "",
      requestInformation: "",
    },
    validationSchema: requestSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  // Handle form submission
  const handleSubmit = (values) => {
    // Submit logic here
    console.log("Form submitted:", values);
    // Reset form fields after submission
    formik.resetForm();
  };

  // Helper function to display error message for a field
  const errorMessage = (fieldName) =>
    formik.touched[fieldName] && formik.errors[fieldName] ? (
      <span className="text-red-400 text-sm">{formik.errors[fieldName]}</span>
    ) : null;

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="serviceRequest">Request Type</Label>
        {errorMessage("serviceRequest")}
        <Input
          type="text"
          id="serviceRequest"
          name="serviceRequest"
          value={formik.values.serviceRequest}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="requestType">Information about the Request</Label>
        {errorMessage("requestType")}
        <Input
          type="text"
          id="requestType"
          name="requestType"
          value={formik.values.requestType}
          onChange={formik.handleChange}
        />
      </div>
      
      <SubmitRequestButton type="submit">Submit a Service Request</SubmitRequestButton>
    </form>
  );
};

export default RequestForm;


