import Input from "../../Forms/Input.jsx";
import Label from "../../Forms/Label.jsx";
import { useFormik } from "formik";
import { useModal } from "../../Modals/Modal.jsx";
import { object, string } from "yup";
import AddButton from "../../Buttons/AddButton.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";

export default function AddOperationForm({ propertyList }) {
  const { toggle } = useModal();
  const token = localStorage.getItem("token");

  console.log("properties: ", propertyList);
  let operationSchema = object({
    operation_type: string().required("Please define an operation type."),
    cost: string().required("Please enter an operational cost."),
    property_id: string().required("Please select a property."),
    date: string().required("Please insert date.")
  });

  const formik = useFormik({
    initialValues: {
      operation_type: "",
      cost: 0,
      property_id: 0,
      date: ''
    },
    validationSchema: operationSchema,
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
        toast.success("Operation added successfully!");
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
          <Label htmlFor="operation_type">Operation Type:</Label>
          {errorMessage("operational_type")}
          <Input
            onChange={formik.handleChange}
            id="operation_type"
            name="operation_type"
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="cost">Cost:</Label>
          {errorMessage("cost")}
          <Input
            onChange={formik.handleChange}
            id="cost"
            name="cost"
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="property_id">Property assigned:</Label>
          {errorMessage("property_id")}
          <select
            id="property_id"
            onChange={formik.handleChange}
            name="property_id"
            className="border border-gray-400 rounded-lg px-4 py-3"
          >
            <option value={formik.values.property_id}> -- </option>
            {propertyList.length > 0 && (propertyList.map((p) => {
              return (
                <option key={p.property_id} value={p.property_id}>
                  {p.property_name}
                </option>
              );
            }))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="date">Date:</Label>
          {errorMessage("date")}
          <Input
            onChange={formik.handleChange}
            id="date"
            name="date"
            type="date"
          />
        </div>
      </form>

      <AddButton onClick={formik.submitForm}>Add Operation</AddButton>
    </>
  );
}

AddOperationForm.propTypes = {
  propertyList: PropTypes.arrayOf(
    PropTypes.shape({
      property_id: PropTypes.number.isRequired,
      property_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

