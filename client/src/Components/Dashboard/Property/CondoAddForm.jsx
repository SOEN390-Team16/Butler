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
      .integer("Condo unit number must be an integer")
      .min(1, "Condo unit number must be a positive integer and greater than 0")
      .default(props.condoUnitsUncompleted[0].condo_number),
    condoUnitSize: number()
      .required("A condo unit size is required")
      .integer("Condo unit size must be an integer"),
    condoUnitOccupantType: string()
      .required("A condo unit occupant type is required")
      .oneOf(["Owner", "Renter"]),
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
    console.log("Condo Unit values:", values);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const token = localStorage.getItem("token");
    const condoUnit = {
      companyid: userData.cmcId,
      property_id: props.propertyId,
      condo_number: values.condoUnitNumber,
      size: values.condoUnitSize,
      occupant_type: values.condoUnitOccupantType,
      total_fees: values.condoUnitTotalFees,
    };

    for (const key in condoUnit) {
      if (condoUnit[key] === "") {
        toast.error(`Please fill in the ${key} field`);
        return;
      }
    }

    console.log("Condo Unit:", condoUnit);

    const currCondoUnit = props.condoUnitsUncompleted.find(
      (unit) => unit.condo_number == condoUnit.condo_number
    );

    console.log("Current Condo Unit:", currCondoUnit);
    const condoUnitId = currCondoUnit.condoid;

    axios
      .patch(`http://hortzcloud.com:3000/api/v1/cu/${condoUnitId}`, condoUnit, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("Condo Unit Successfully Added!");
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
          <select
            id="condoUnitNumber"
            name="condoUnitNumber"
            value={formik.values.condoUnitNumber}
            onChange={formik.handleChange}
            className="border border-gray-400 rounded-lg px-4 py-3"
          >
            {props.condoUnitsUncompleted.map((condoUnit) => (
              <option
                key={condoUnit.condo_number}
                value={condoUnit.condo_number}
              >
                {condoUnit.condo_number}
              </option>
            ))}
          </select>
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
          <select
            onChange={formik.handleChange}
            id="condoUnitOccupantType"
            name="condoUnitOccupantType"
            value={formik.values.condoUnitOccupantType}
            className="border border-gray-400 rounded-lg px-4 py-3"
          >
            <option value="Owner">Owner</option>
            <option value="Renter">Renter</option>
          </select>
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
  propertyId: PropTypes.number.isRequired,
  condoUnitsUncompleted: PropTypes.array.isRequired,
};
