import React, { useState } from "react";
import GenerateKeyButton from "../Buttons/GenerateKeyButton.jsx";
import Checkbox from "../Checkbox/Checkbox.jsx";
import Input from "../Forms/Input.jsx";
import Label from "../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../Modals/Modal.jsx";
import { number, object, string } from "yup";

export default function GenerateKeyForm() {
  const { toggle } = useModal();
  const [isCheckedParking, setIsCheckedParking] = useState(false); // State for parking checkbox
  const [isCheckedLocker, setIsCheckedLocker] = useState(false); // State for locker checkbox

  let propertySchema = object({
    propertyName: string().required("A property name is required"),
    propertyAddress: string().required("A property address is required"),
    unitNumber: number()
      .typeError("Your input for Unit Number must be a number")
      .required("A number of lockers is required")
      .integer("Unit number must be an integer")
      .min(0, "You must indicate a minimum of 0"),
  });

  const formik = useFormik({
    initialValues: {
      propertyName: "",
      propertyAddress: "",
      unitNumber: "",
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

  const handleCheckboxParkingChange = (event) => {
    setIsCheckedParking(event.target.checked);
  };

  const handleCheckboxLockerChange = (event) => {
    setIsCheckedLocker(event.target.checked);
  };

  const handleSubmit = (values) => {
    toggle();
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="propertyName">Property Name</Label>
          {errorMessage("propertyName")}
          <Input
            onChange={formik.handleChange}
            id="propertyName"
            name="propertyName"
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="propertyAddress">Property Address</Label>
          {errorMessage("propertyAddress")}
          <Input
            onChange={formik.handleChange}
            id="propertyAddress"
            name="propertyAddress"
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="unitNumber">Unit Number</Label>
          {errorMessage("unitNumber")}
          <Input
            onChange={formik.handleChange}
            id="unitNumber"
            name="unitNumber"
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="unitNumber">Additional options</Label>
          <Checkbox
            label="Parking"
            isChecked={isCheckedParking}
            onChange={handleCheckboxParkingChange}
          />
          <Checkbox
            label="Locker"
            isChecked={isCheckedLocker}
            onChange={handleCheckboxLockerChange}
          />
        </div>
      </form>
      <GenerateKeyButton onClick={formik.submitForm}>
        Generate Key
      </GenerateKeyButton>
    </>
  );
}
