import Input from "../Forms/Input.jsx";
import Label from "../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../Modals/Modal.jsx";
import { object, string } from "yup";
import AddButton from "../Buttons/AddButton.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

export default function CreateRequestForm({ requestList }) {
  const { toggle } = useModal();
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userDataArray = userData ? Object.entries(userData) : [];
  const userID = userDataArray.length > 1 ? userDataArray[0][1] : "";

  console.log("requests: ", requestList);
  let requestSchema = object({
    description: string().required("A description is required"),
    type: string().required("A request type is required"),
  });

  const formik = useFormik({
    initialValues: {
      user_id: userID,
      description: "",
      type: "",
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

  const handleSubmit = async (values) => {
    // console.log(values);
    await axios
      .post("http://hortzcloud.com:3000/api/v1/req", values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Request created successfully!");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    toggle();
    // alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="type">Request Type</Label>
          {errorMessage("type")}
          <Input onChange={formik.handleChange} id="type" name="type" />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="description">Description</Label>
          {errorMessage("description")}
          <Input
            onChange={formik.handleChange}
            id="description"
            name="description"
          />
        </div>
      </form>

      <AddButton onClick={formik.submitForm}>Submit Request</AddButton>
    </>
  );
}

CreateRequestForm.propTypes = {
  requestList: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
};
