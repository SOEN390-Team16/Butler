import Input from "../Forms/Input.jsx";
import Label from "../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../Modals/Modal.jsx";
import { object, string } from "yup";
import AddButton from "../Buttons/AddButton.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

export default function CreateEmployeeForm({ propertyList }) {
  const { toggle } = useModal();
  const token = localStorage.getItem("token");

  console.log("properties: ", propertyList);
  let employeeSchema = object({
    first_name: string().required("A first name is required"),
    last_name: string().required("A last name is required"),
    role: string().required("A role is required."),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      companyid: 16,
      role: "employee",
      property_id: 0,
    },
    validationSchema: employeeSchema,
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
    values.property_id = parseInt(values.property_id);
    console.log(values);
    await axios
      .post("http://localhost:3000/api/v1/emp", values, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Employee added successfully!");
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
          <Label htmlFor="first_name">First Name:</Label>
          {errorMessage("first_name")}
          <Input
            onChange={formik.handleChange}
            id="first_name"
            name="first_name"
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="last_name">Last Name:</Label>
          {errorMessage("last_name")}
          <Input
            onChange={formik.handleChange}
            id="last_name"
            name="last_name"
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="property_id">Property assigned:</Label>
          {errorMessage("role")}
          <select
            id="property_id"
            onChange={formik.handleChange}
            name="property_id"
            value={formik.values.property_id}
            className="border border-gray-400 rounded-lg px-4 py-3"
          >
            {propertyList.map((p) => {
              return (
                <option key={p.property_id} value={p.property_id}>
                  {p.property_name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="role">Role:</Label>
          {errorMessage("role")}
          <Input
            // onChange={formik.handleChange}
            id="role"
            name="role"
            value={formik.values.role}
          />
        </div>
      </form>

      <AddButton onClick={formik.submitForm}>Add Employee</AddButton>
    </>
  );
}

CreateEmployeeForm.propTypes = {
  propertyList: PropTypes.arrayOf(
    PropTypes.shape({
      property_id: PropTypes.number.isRequired,
      property_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
