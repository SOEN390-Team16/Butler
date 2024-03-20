import AddButton from "../../Buttons/AddButton.jsx";
import Input from "../../Forms/Input.jsx";
import { useFormik } from "formik";
import Label from "../../Forms/Label.jsx";
import { useModal } from "../../Modals/Modal.jsx";
import { number, object, string } from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function CondoAddForm(props) {
  const { toggle } = useModal();

  let condoUnitSchema = object({
    condoUnitNumber: number()
      .required("A condo unit number is required")
      .integer("Condo unit number must be an integer"),
    condoUnitSize: number()
      .required("A condo unit size is required")
      .integer("Condo unit size must be an integer"),
    condoUnitOccupantType: string().required(
      "A condo unit occupant type is required"
    ),
    condoUnitTotalFees: number()
      .typeError("Condo unit total fees must be a number")
      .required("A condo unit total fees is required")
      .min(0, "You must indicate a minimum of 0 for condo unit total fees"),
  });

  const formik = useFormik({
    initialValues: {
      condoUnitNumber: "",
      condoUnitSize: "",
      condoUnitOccupantType: "",
      condoUnitTotalFees: "",
    },
    validationSchema: condoUnitSchema,
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
    const condoUnit = {
      companyid: userData.cmcId,
      propertyid: props.propertyId,
      condo_number: values.condoUnitNumber,
      size: values.condoUnitSize,
      occupant_type: values.condoUnitOccupantType,
      total_fees: values.condoUnitTotalFees,
    };

    axios
      .post("http://hortzcloud.com:3000/api/v1/unit", condoUnit, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Condo Unit Successfully Added!");
        props.onAddCondoUnit(condoUnit);
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
          <Label htmlFor="condoUnitNumber">Condo Unit Number</Label>
          {errorMessage("condoUnitNumber")}
          <Input
            onChange={formik.handleChange}
            id="condoUnitNumber"
            name="condoUnitNumber"
            value={formik.values.condoUnitNumber}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="condoUnitSize">Condo Unit Size</Label>
          {errorMessage("condoUnitSize")}
          <Input
            onChange={formik.handleChange}
            id="condoUnitSize"
            name="condoUnitSize"
            value={formik.values.condoUnitSize}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="condoUnitOccupantType">
            Condo Unit Occupant Type
          </Label>
          {errorMessage("condoUnitOccupantType")}
          <Input
            onChange={formik.handleChange}
            id="condoUnitOccupantType"
            name="condoUnitOccupantType"
            value={formik.values.condoUnitOccupantType}
          />
        </div>
        <div className="flex flex-col gap-2 w-[360px] font-inter h-fit">
          <Label htmlFor="condoUnitTotalFees">Condo Unit Total Fees</Label>
          {errorMessage("condoUnitTotalFees")}
          <Input
            onChange={formik.handleChange}
            id="condoUnitTotalFees"
            name="condoUnitTotalFees"
            value={formik.values.condoUnitTotalFees}
          />
        </div>
      </form>
      <AddButton onClick={formik.submitForm}>Add Condo Unit</AddButton>
    </>
  );
}

CondoAddForm.propTypes = {
  onAddCondoUnit: PropTypes.func.isRequired,
  propertyId: PropTypes.number.isRequired,
};
