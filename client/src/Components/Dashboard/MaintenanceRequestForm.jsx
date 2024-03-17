import AddButton from "../Buttons/AddButton.jsx";
import Input from "../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../Forms/Label.jsx";
import { useModal } from "../Modals/Modal.jsx";
import { number, object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function MaintenanceRequestForm(props) {
  const { toggle } = useModal();

  let requestSchema = object({
    category: string().required("A category is required"),
    suiteLocation: string().required("A suite location is required"),
    subject: string().required("A subject is required"),
    description: string().required("A description is required"),
  });

  const formik = useFormik({
    initialValues: {
      category: "",
      suiteLocation: "",
      subject: "",
      description: "",
    },
    validationSchema: requestSchema,
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
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("token");
    const request = {
      userid: userData.userId,
      category: values.category,
      suiteLocation: values.suiteLocation,
      subject: values.subject,
      description: values.description,
    };

    axios
      .post("http://hortzcloud.com:3000/api/v1/pp", request, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Request Successfully Created!");
        props.onCreateRequest(request);
        toggle();
      })
      .catch((reason) => {
        toast.error(`Something went wrong: ${reason.message}`);
        throw reason;
      });
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="category">Category</Label>
          {errorMessage("category")}
          <select
            id="category"
            name="category"
            onChange={formik.handleChange}
            style={{
              border: "1px solid #ced4da", // specify border style, width, and color
              borderRadius: "4px", // optional: specify border radius for rounded corners
              padding: "8px", // optional: specify padding for inner content
            }}
          >
            <option value="">Select Category</option>
            <option value="category1">Appliances</option>
            <option value="category2">Doors/Windows</option>
            <option value="category3">Electrical</option>
            <option value="category4">Flooring</option>
            <option value="category5">Heating/Cooling</option>
            <option value="category6">Pest Control</option>
            <option value="category7">Plumbing</option>
            <option value="category8">Walls and Ceiling</option>
            <option value="category0">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="suiteLocation">Suite Location</Label>
          {errorMessage("suiteLocation")}
          <select
            id="suiteLocation"
            name="suiteLocation"
            onChange={formik.handleChange}
            style={{
              border: "1px solid #ced4da", // specify border style, width, and color
              borderRadius: "4px", // optional: specify border radius for rounded corners
              padding: "8px", // optional: specify padding for inner content
            }}
          >
            <option value="">Select Suite Location</option>
            <option value="suiteLocation1">Balcony</option>
            <option value="suiteLocation2">Bathroom</option>
            <option value="suiteLocation3">Bedroom</option>
            <option value="suiteLocation4">Dining Room</option>
            <option value="suiteLocation5">Kitchen</option>
            <option value="suiteLocation6">Living Room</option>
            <option value="suiteLocation7">Locker</option>
            <option value="suiteLocation8">Parking</option>
            <option value="suiteLocation9">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="subject">Subject</Label>
          {errorMessage("subject")}
          <Input onChange={formik.handleChange} id="subject" name="subject" />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="description">Brief Description</Label>
          {errorMessage("description")}
          <Input
            onChange={formik.handleChange}
            id="description"
            name="description"
          />
        </div>
      </form>
      <AddButton onClick={formik.submitForm}>Create Request</AddButton>
    </>
  );
}

MaintenanceRequestForm.propTypes = {
  onCreateRequest: PropTypes.func.isRequired,
};
