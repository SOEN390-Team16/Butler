import AddButton from "../Buttons/AddButton.jsx";
import Input from "../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../Forms/Label.jsx";
import { useModal } from "../Modals/Modal.jsx";
import { number, object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function PropertyAddForm(props) {
  const { toggle } = useModal();

  let propertySchema = object({
    requestType: string().required("A request type is required"),
    requestInfo: string().required("Information about the request is required"),
  });

  const formik = useFormik({
    initialValues: {
      requestType: "",
      requestInfo: "",
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

  // const handleSubmit = (values) => {
  //   const userData = JSON.parse(localStorage.getItem("userData"));
  //   const token = localStorage.getItem("token");
  //   const property = {
  //     companyid: userData.cmcId,
  //     property_name: values.propertyName,
  //     address: values.propertyAddress,
  //     unit_count: values.numberOfCondoUnits,
  //     parking_count: values.numberOfParkingUnits,
  //     locker_count: values.numberOfLockers,
  //   };

  //   axios
  //     .post("http://hortzcloud.com:3000/api/v1/pp/", property, {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(() => {
  //       toast.success("Property Successfully Added!");
  //       props.onAddProperty(property);
  //       toggle();
  //     })
  //     .catch((reason) => {
  //       toast.error(`Something went wrong: ${reason.message}`);
  //       throw reason;
  //     });
  // };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="RequestType">Request Type</Label>
          {errorMessage("requestType")}
          <Input
            // onChange={formik.handleChange}
            id="requestType"
            name="requestType"
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="RequestInfo">Information about the request</Label>
          {errorMessage("requestInfo")}
          <Input
            // onChange={formik.handleChange}
            id="requestInfo"
            name="requestInfo"
          />
        </div>
      </form>
      <AddButton onClick={formik.submitForm}>Submit Request</AddButton>
    </>
  );
}

PropertyAddForm.propTypes = {
  onAddProperty: PropTypes.func.isRequired,
};
