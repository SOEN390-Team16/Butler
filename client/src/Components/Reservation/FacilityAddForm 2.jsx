import AddButton from "../Buttons/AddButton.jsx";
import Input from "../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../Forms/Label.jsx";
import { useModal } from "../Modals/Modal.jsx";
import { number, object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import FacilityService from "../../service/facility/facility.service.js";

export default function FacilityAddForm(props) {
  const { toggle } = useModal();

  let facilitySchema = object({
    name: string().required("A facility name is required"),
    facilityDescription: string().required(
      "A facility description is required"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
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

    const facility = {
      property_id: props.propertyId,
      name: values.name,
      description: values.description,
    };

    console.log("Facility to be added:", facility);

    FacilityService.addFacility(facility).then((res) => {
      console.log("Facility added successfully:", res);
      props.onAddFacility(facility);
      toast.success("Facility added successfully");
      formik.resetForm();
      toggle();
    });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="name">Facility Name</Label>
          {errorMessage("name")}
          <Input onChange={formik.handleChange} id="name" name="name" />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="description">Facility Description</Label>
          {errorMessage("description")}
          <Input
            onChange={formik.handleChange}
            id="description"
            name="description"
          />
        </div>
      </form>
      <AddButton onClick={formik.submitForm}>Add Facility</AddButton>
    </>
  );
}

FacilityAddForm.propTypes = {
  onAddFacility: PropTypes.func.isRequired,
  propertyId: PropTypes.string.isRequired,
};
